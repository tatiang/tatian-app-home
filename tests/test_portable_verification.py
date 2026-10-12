"""Run the preservation checker from an exported tree with no Git metadata."""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]

class PortableVerification(unittest.TestCase):
    def test_source_export_and_content_regressions(self):
        with tempfile.TemporaryDirectory() as directory:
            exported = Path(directory)/'source'
            shutil.copytree(ROOT, exported, ignore=shutil.ignore_patterns('.git', '__pycache__'))
            self.assertFalse((exported/'.git').exists())
            def verify():
                return subprocess.run([sys.executable, str(exported/'tests/verify_site.py')],
                                      cwd=directory, capture_output=True, text=True)
            result = verify()
            self.assertEqual(result.returncode, 0, result.stderr)
            homepage = exported/'index.html'
            original = homepage.read_text()
            homepage.write_text(original.replace('https://mission-control.tatian.app', 'https://example.com'))
            self.assertNotEqual(verify().returncode, 0, 'Changed destination must fail')
            homepage.write_text(original)
            archive = exported/'nature-reads.html'
            archive.write_text(archive.read_text()+'\n<!-- changed archive -->\n')
            self.assertNotEqual(verify().returncode, 0, 'Changed reading archive must fail')

if __name__ == '__main__':
    unittest.main()
