# Mermaid Aria Landing Page — Quick Reference

## What's in here
```
index.html              ← the main page
quiz.html                ← "Continue the Adventure" cruise-match quiz
css/style.css             ← main site styling
css/quiz.css              ← quiz-specific styling (same colors/fonts)
js/quiz.js                ← quiz logic
assets/img/               ← images
```

## All real images now in place
- `hero.jpg` — ocean scene, full bleed
- `character-aria.png` / `character-rosemary.png` — transparent cutouts
- `book-cover-1.jpg` — Aria's Big Wish cover
- `book-cover-2-donate.jpg` — same cover with the "Donate a Copy" button baked in

## Links to fill in
- `#REPLACE-WITH-SQUARE-LINK` (hero button + Buy Now button) — your Square
  checkout link for the book
- `#REPLACE-WITH-DONATE-LINK` (donate cover + Donate a Copy button) — your
  Square checkout link for the donation copy

## The cruise quiz ("Continue the Adventure")
A standalone page at `quiz.html`: 5 quick questions, then an email capture,
then a personalized result (Disney Wish for family answers, Virgin Voyages
for adults-only answers) with a "Talk Cruise Details" button.

**Important — the email capture isn't connected to a real list yet.** Right
now, submitting the quiz just opens the visitor's email client with a
pre-filled message to shellotravels@gmail.com containing their name, email,
and quiz result — it's a placeholder, not real list-building. Once you pick
an email tool (Mailchimp, ConvertKit, etc.), I can wire the form to actually
add them to a list automatically. Until then, you'll get manually-sent
emails from interested visitors, but nothing automated yet.

**To make this fire after every book purchase:** in your Square Dashboard,
go to Payment Links → your link → Advanced settings → toggle on "Redirect
to a website after checkout," and set the URL to your published quiz.html
page (e.g. https://sherie65.github.io/[your-repo]/quiz.html). That sends
every buyer straight into the quiz right after they pay, while they're
still warm.

There's also a quiet teaser link on the main page itself, below the books,
for visitors who haven't bought yet but are curious.

## Character & book blurbs
Search `index.html` for `[Replace with...]` placeholders.

## Menu
The gray "Menu Here" bar on the main page is a placeholder — tell me what
nav links you want and I'll build it out.

## Fonts
Body text uses **Nunito**. Headlines use **Pacifico** as a free stand-in for
what looks like the **More Sugar** script font on your current site. Send the
font file if you have a licensed copy and I'll swap it in for an exact match.

## Publishing to GitHub Pages
Same process as your quiz project — upload this whole folder's contents to
your `sherie65` repo and enable Pages in the repo settings.
