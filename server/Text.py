import subprocess

class GenText:
    def __init__(self, text):
        self.text = text

    def get_ipa(self, lang="en-us"):
        result = subprocess.run(["espeak", "-q", "--ipa", "-v", f"{lang}", self.text], capture_output=True, text=True)

        ipa = result.stdout.strip()

        ipa = ipa.replace("(en)","").replace(f"({lang})", "")
        ipa = ipa.replace('\n', ", ")

        return ipa


