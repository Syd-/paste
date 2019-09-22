# Paste Site

## Introduction

I want to build a site where people can paste snippets of text into a text box.
The users will then be given a convenient short link to share the text they just pasted.

It's very inconvenient to share a lot of text or code in messengers like Facebook Messenger, Whatsapp, Twitter, etc. 

By providing a quick short, shareable link; it becomes convenient to do so.

## Expected Features

1. The bare minimum is:   
  1.1 A text area to paste text into, and a submit button.  
  1.2 Being given a link to the paste upon hitting the submit button.  
  1.3 Being able to visit the link and be presented the pasted text.

2. I also want to provide an Expiration date for the paste.  
*The justification for this is that by generating a shortlink, we only have a limited number of characters, and thus limited pastes. By expiring pastes, we will be able to reuse
shortlinks.*

## Future Features (Nice to have if we have enough time in the project)

- Push back expiration date by some time whenever a paste is accessed.  
*The justification for this is that popular pastes that people visit can stay active as long as
people are visiting them.*
- Ability to encrypt & decrypt the text client-side with a key.  
*This way, the server never sees unencrypted text, guaranteeing the user's privacy.
The server will also never know the key for decryption. (Possibly using AES)*
- Burn after X reads.  
*The justification for this is to send a party some text and have that disappear for opsec.*

## Market Survey

1. Pastebin.com  
  - This is a fully featured paste site (the first).  
  - It has Syntax Highlightning, perpetual pastes, timed psates, API, and more
  - Does not do encryption.
2. Defuse.ca
  - Barebones paste site with expiring pastes and encryption. 
  - Very basic UI.
3. Privatebin.info
  - This is a fully featured, open source paste software written in bootstrap.
  - This allows paste expiration. 
  - Has passwords and encryption.
  - Has a "burn on read" feature.
4. Ubuntu pastebin
  - Barebones page that produces a fairly long URL.
  - Allows Paste expiration. 
5. 0Bin
  - Barebones page with paste expiration and automatic encryption and password.
  - Uses browser localstorage to keep track of previous pastes.
  - Has a "burn on read" feature.
  - The URL it generates is fairly long. 

## Market Comparison
- Most of the offerings on the market already have more features than I have planned for the project.
- Some of the offerings do not provide a shortlink. I want all my links to be short: for ease of use in messengers.
- A future feature I have planned (to push back expiration when a paste is accessed) has not been implemented by anyone yet.

I chose a limited feature set because I'm not sure I can implement all features I want over the duration of this course.

## References
1. https://pastebin.com
2. https://defuse.ca/pastebin.htm
3. https://privatebin.net 
4. https://paste.ubuntu.com
5. https://0bin.net