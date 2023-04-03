import subprocess

text = "Now is the winter of our discontent made glorious summer by this son of york"

def get_ipa(text):
    result = subprocess.run(["espeak", "-q", "--ipa", "-v", "en", text], capture_output=True, text=True)

    ipa = result.stdout.strip()

    ipa = ipa.replace("(en)","").replace("(el)", "")

    return ipa


print(get_ipa(text))