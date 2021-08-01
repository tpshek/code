# 07.30.2021 Solve New York Times Puzzle Spelling Bee
import sys

# Grabbed a list of English words from https://github.com/dwyl/english-words/blob/master/words_alpha.txt
# WORD_FILE = "/usr/share/dict/words"
WORD_FILE = "words_alpha_sorted.txt"

# TODO: Test for command line parameter
letters = sys.argv[1]

# TODO: Test for minimum number of letters
required_letter = letters[0]    # Word must contain this letter
optional_letters = letters[1:7] # Besides required letter, word can only contain these letters
# print (required_letter)
# print (optional_letters)

with open(WORD_FILE) as f:
    for line in f:
        word = line.strip()

        # Only long words are valid
        if len(word) < 4:
            continue

        # Word must contain the required letter & only certain letters
        # We can stop looking at the word if it contains any invalid letters.
        has_required_letter = False
        has_invalid_letter = False

        for ch in word:
            if ch == required_letter:
                has_required_letter = True
            elif optional_letters.find(ch) < 0:
               has_invalid_letter = True
               break

        if has_required_letter and not has_invalid_letter:
            # Highlight words that contain required letter plus all the optional letters
            is_missing_letter = False 
            for ch in optional_letters:
                if word.find(ch) < 0:
                    is_missing_letter = True
                    break

            highlight = "" if is_missing_letter else "* "
            print(highlight + word)
            
