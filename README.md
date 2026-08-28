# Asobi

## About the Site

Okay, first let me introduce the site itself.

I'm trying to make a **game collection site**.

I have currently added **one game**, but it took time because of the codebase I had to make.

It has around **five HTML pages**:

1. The **Landing Page**
2. The **Username / Login Page**
3. The **Game List Page**
4. The **Guess the Number Game** (the game itself)
5. The **Leaderboard**

Probably the next game will not take me this much time, because I won't have to make the other pages again, like the homepage, leaderboard, game list, and stuff.

I'll just have to add the new game, though I'll still have to do it manually.

---

## Login System

So, let me explain the login system.

I did not use any sort of **Gmail or email system** verification this time, as I thought that would be a bit too much for a basic game collection site.

I only used the basic system where you need to have a **unique username and password**, which you can use to log in on any device.

---

# Guess the Number

Okay, so now let's talk about the game itself (The only game I added till now).

It's a basic game, but I did try to make it interesting.

The name of the game is **Guess the Number** (sorry, I suck at naming -_-), and it has different levels where you will get points based on how well you perform.

The difficulties range from **Beginner to Impossible**.

- **Beginner:** 1 - 10
- **Normal:** 1 - 100
- **Hard:** 1 - 1,000
- **Expert:** 1 - 10,000
- **Master:** 1 - 100,000
- **Impossible:** 1 - 1,000,000

---

## Hints

Okay, let's talk about the **hints**.

First, the hints are available in **Normal Mode**.

Whenever you guess a number, the game will tell you whether the **next number you choose should be higher or lower**.

There are mainly **two types of text hints**.

### Higher / Lower Hint

The first hint tells you whether you should guess **higher or lower** than your previous guess.

For example:

- **Guess higher**
- **Guess lower**

Though they are not the exact same message that the game will display =)

### How Close Are You?

The second hint tells you **how close you are to the actual number**.

There are two levels for this:

- If you are around **20% or closer** to the actual number, it will say **"You are close."**
- If you are around **5% or closer** to the actual number, it will give you a stronger hint that you are **very close**.
- Otherwise, it would say **"You are too far"**.

So basically, the closer you get to the actual number, the stronger the hint becomes =)

---

## Hardcore Mode

I have also added a **Hardcore Mode**.

Basically, you will not get any sort of hints in Hardcore Mode.

But there is one catch.

You will get **2× the points** that you would usually get in Normal Mode.

And there is another catch that I'll explain below.

---

## GIF Reactions

So, let's talk about the catch I was talking about.

There are **GIF reactions** in the game.

Whenever you play a match, you will get a GIF displayed in the **bottom-right corner** of the game.

And sometimes, that GIF can actually be a hint.

There are a total of **18 GIFs**:

- **3 GIFs** hint you to guess lower
- **3 GIFs** hint you to guess higher
- The other **12 GIFs** are just for fun (not an actual hint)

So there is a **33.33% chance** that the GIF will actually be a useful hint.

And yes, this is also why Hardcore Mode has a little catch =)

---

## Leaderboard

There are **three filters** on the leaderboard:

- **Last 24 Hours**
- **Weekly**
- **All Time**

I did this so that even **new players should get a chance to rise and get a chance to show themselves on the leaderboard**.

Someone who has just started playing shouldn't have to compete against someone who has been playing for a long time.

So, with the Last 24 Hours and Weekly leaderboards, new players can also have a chance to compete as well.

---

## ⭐ Points System

I did think about making the leaderboard based on **tries**.

For example, if the Beginner level is from 1 to 10 and you completed it in just **one try**, you would be Rank 1.

If someone completed it in **higher tries**, they would be Rank 2, and so on.

But I thought there would be a problem with this.

There would probably be lots of people who completed the Beginner level in **one try**.

This could lead to almost everyone being **Rank 1**, which would make the value of Rank 1 feel less special.

So instead, I decided to use a **points system**.

The basic idea is:

**Lower tries = More points**

This also encourages people to keep playing and earn more points.

There are no limitations like there would be with a tries-based system.

If someone already got one try, there wouldn't really be anything more for them to achieve.

With the points system, they can continue trying to earn more points.

---

## Game History (along with another hint)

There is also a **Game History** system.

It shows your **recent five choices** that you have made.

If you have made fewer than five choices, it will obviously just show the choices you have made so far only.

If you make a sixth choice, then the **first choice you made will disappear**, and the newest choice will be added.

It also gives you a hint beside each number using an **up or down arrow**, guiding you toward what the next number should be.

- **↑** → Guess higher
- **↓** → Guess lower

And obviously, this feature is **not available in Hardcore Mode**.

It is only available in the **Normal Mode**.

---

## 🎮 Custom Games

Let's talk about the **Custom Games** now.

It is available at the **bottom-left of the game**.

In Custom Games, you can customize your own game.

You can choose:

- **Minimum number**
- **Maximum number**
- **Number of tries**

And then you can play the game with your own settings.

However, **Custom Games are not eligible for the points system**.

---

## How Scoring Works

I have also added the **pointing/scoring system inside the game**.

When you click the **"How Scoring Works"** button, you will see a card showing how the points work in the normal system.

And for Hardcore Mode, the points are **double** the normal points.

---

## 🔊 Sound System

There is also a **sound system** in the game.

Whenever you make a guess, it will play a sound.

However, the sound is **muted by default**.

You can always unmute it if you want to play with the sound. (Though they are only meme sounds especially)

---

## Designs & Credits

I have credited all the designs and resources that I used.

For reference, I also used **ChatGPT to create an image of the site layout**.

I did **not use it to create the code**, just the image.

Later, I tried to make a similar layout based on that image and added similar features that I thought would be good for the site.

I have also **added the reference images on the GitHub**.

---

## That's It!

Yeah, I guess I covered everything.

Thank you so much for reading!

I hope you will enjoy playing =)

---

# Credits

**Start Playing Button:**  
https://uiverse.io/dexter-st/fuzzy-dog-81

**Hover Sound [Title]:**  
Modern technology select from mixkit.co

**Card Effect [Username]:**  
https://uiverse.io/dylanharriscameron/stupid-mole-90

**Submit Button Design:**  
https://uiverse.io/elijahgummer/sweet-rabbit-5

**Play Button [Game List]:**  
https://uiverse.io/ke1221/ancient-walrus-24

**Trophy SVG [Leaderboard]:**  
https://lottiefiles.com/free-animation/trophy-ITXDedW9Xd

**Card Animation:**  
https://codepen.io/markmiro

**SoundOn SVG:**  
https://www.svgrepo.com/svg/522455/sound-max

**SoundOff SVG:**  
https://www.svgrepo.com/svg/522456/sound-min

**Logout SVG:**  
https://www.svgrepo.com/svg/507772/logout

**Eye Close SVG:**  
https://www.svgrepo.com/svg/445115/eye-close-solid

**Eye Open SVG:**  
https://www.svgrepo.com/svg/445116/eye-open-solid

**Loading Screen:**  
https://uiverse.io/mobinkakei/proud-ladybug-46
