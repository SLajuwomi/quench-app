# Learning a New Web Framework with Question Driven Development — Nick Janetakis

Updated on August 6, 2019 in [#dev-mindset](https://nickjanetakis.com/blog/tag/dev-mindset-tips-tricks-and-tutorials)

![learning-a-new-web-framework-with-question-driven-development.jpg](https://nickjanetakis.com/assets/blog/cards/learning-a-new-web-framework-with-question-driven-development-10cf31dd40e63b3230d96523042d727078e520ed3a68e2ae9bc59c172b46d147.jpg)

## When I'm learning a new language or web framework, I often go at it from a problem / solution angle and use error driven development.

**Quick Jump:**

- - [What Is Question Driven Development?](#what-is-question-driven-development)
  - [What about Books and Courses?](#what-about-books-and-courses)

A few years ago I wrote an article on [how to quickly learn a new programming language or framework](https://nickjanetakis.com/blog/how-to-quickly-learn-a-new-programming-language-or-framework) and that post really focused on the importance of writing code and “doing”, as opposed to reading an endless amount of books up front.

In this article I’d like to focus on a specific way to “learn by doing” which can be described as question driven development. This is how I picked up the Elixir language (and Phoenix which is Elixir’s go-to web framework) in a few weeks while only being able to spend a few hours a day working on the app I was building.

It didn’t take too long to get into the swing of things and this is isn’t limited to Elixir either. This strategy will work to learn any new language or tech stack.

Also, if you’re curious how I find answers to these questions [I made a video going over that](https://nickjanetakis.com/blog/how-i-quickly-find-answers-to-problems-and-research-new-things) process.

### [#](#what-is-question-driven-development) What Is Question Driven Development?

I don’t think this is an official term. It’s just something I labeled based on how I tend to learn new things, but the idea is pretty basic.

Instead of trying to read a book cover to cover or dive deep into documentation up front, I often approach learning a new web framework by asking questions based on a small direct problem I have right now. Basically the thing preventing me from moving onto the next step.

This really goes hand in hand with spending a majority of your time “doing” because you’ll be constantly running into small problems. This is also why you could partly label question driven development as error driven development (ie., you lookup an answer after you get an error trying to implement something).

The basic idea is, once you have your [application planned out](https://nickjanetakis.com/blog/live-demo-of-planning-a-real-world-web-application-from-scratch) you start developing it by asking yourself questions as they come up.

##### For example if you’re working with a brand new language or web framework your first 2 questions might look like this:

1.  _“How do I install XYZ language?”_
2.  _“How do I install XYZ web framework?”_

To get the answer to the first question, you’ll often go-to a search engine or the language’s official page and search for those specific questions.

Once you tackle the first question, then you would move onto the second question.

The next question after that might be _“How do I generate a new project in XYZ?”_. Some web frameworks will have a CLI app to do that, others will not. If it doesn’t, then maybe your next question would be _“How do I organize an XYZ app?”_.

After that, it really depends on what web framework you’re learning but the next question might be _“How do I modify a template in XYZ?”_ or _“How do I add a new route in XYZ?”_.

Also, through out this process if you don’t find an answer to your original question then you’ll ask yourself another sub-question and this process repeats until you finish whatever initial task you wanted to complete.

It seems silly but it really works. Within just a few hours of doing this you’ll end up making real progress on the app you’re building while learning things as you go.

#### Advantages of Question Driven Development

What’s really nice about this process is you’re constantly in a state of doing. Everything you end up learning is on a need to know basis. You don’t spend your time worrying about every language feature from day 1, you just focus on making progress on whatever application you’re building which is a great motivator.

It’s also nice because the problems you face are small and isolated. This is much better than being paralyzed by information overload from having large and vague questions that are nearly impossible to answer with a beginner level of whatever you’re learning.

#### Expectations of Question Driven Development

Now, you might be thinking to yourself that this style of learning is reckless and will create bad habits because you might be using language features incorrectly, aren’t aware of certain language features or you’re writing non-optimal code.

That’s absolutely true, but that’s also totally expected and recommended. Let’s be honest here, if you’re really new to a language or web framework, you’re not going to know what idiomatic code is because you haven’t experienced the reasoning on what makes it idiomatic in the first place.

It’s fully expected that you’ll be writing, deleting and re-writing bits of code quite often, and these re-writes happen out of necessity. In other words, when you figure out something doesn’t look right that’s when you naturally come to a new way of writing it.

Once you get enough base line programming experience with any language, your spidey sense will tingle when these situations arise – even in a new language. You just need to trust yourself.

Trust me, when you write some code that looks off, you’ll know it because you’ll find yourself having to do weird and abstract things to get around the problem you’re trying to solve or the code will just look convoluted.

#### The Workflow of Question Driven Development

We already covered the basis of this early on, but the workflow looks like this:

1.  Ask a question to yourself based on what you’d like to do
2.  Look up the answer (Google, Docs, Source code\*, Community Forums / Slack / IRC)
3.  Implement the solution based on what you found
4.  Likely get some errors along the way
5.  Look up the solution to those errors as they come up

That is why I think question driven development is pretty closely related to error driven development. I don’t think that’s an official term either, but I like to think of it as running into errors left and right and then fixing them as they come up.

We all deal with errors on a regular basis but I do think using question driven development leads to encountering more errors, simply because you’re often troubleshooting things on the fly. It’s a great exercise in debugging which overall improves you as a developer.

\*Even if you don’t know the language perfectly well, sometimes diving into the source code is the quickest way to find the solution. Either looking at the code implementation or the tests the code authors have written has a lot of value.

I typically reserve community questions as a last resort for when I truly get stuck and it feels like there’s no resolution in sight.

#### Testing Your Code with Question Driven Development

I’m not a big fan of TDD or even testing when I’m brand new to a language or framework. Personally I find it to be extremely counter productive.

There’s already so much new stuff to take in and you’ll be spending a huge portion of your time struggling with how to write good tests, which IMO really requires having a pretty decent understanding of the language / framework you’re working with.

I typically don’t write any tests during this initial learning stage and focus all of my efforts on making real progress on the project I’m working on.

Then, after a few weeks of development you’ll probably start to pick up the basics and get to the point where you don’t feel helpless. You might also find yourself doing very small refactors based on experience (these are often huge wins for learning too).

This is about the time where I’ll start thinking about tests. Having a good test suite available when you’re ready to start making big changes is very helpful. It raises a lot of confidence to have automated tests in that case.

Also by this point in time you’ll have a better understanding of how the language works, so learning how to write good tests won’t take too long. A majority of your time will just be cranking out test code for everything you’ve written so far.

##### An example of applying this to a real project:

Every project is different but here’s a real example from Elixir / Phoenix. I implemented magic link based user authentication, authorization and a way to modify your profile.

Initially the code wasn’t great but it worked. The next component of the project I wanted to write was the checkout experience (I’m building a custom course hosting platform), but I didn’t want to go too deep into that until I had tests set up for all of the user bits.

So after I was happy with how the user bits were working, I wrote a bunch of tests for that and refactored everything based on experience I gained. That whole process made me feel like I leveled up in Elixir and Phoenix and put me into a great position to start writing better code from here on out.

It wasn’t like I wrote a huge portion of my app and then immediately re-wrote it. I basically wrote as little as I needed until things started to click. This is really going to depend on what you’re learning and how much effort you put into improving.

Because remember, it’s very possible to have 5 years of programming experience but you spend 4 of those years just repeating what you’ve learned in the first year.

When I’m really trying to learn something new I’m asking a lot of questions either to myself (and Google) or on community outlets. In most cases I don’t care that I might spend 3 hours working on a 5 line function because I know the process of getting to that solution is what’s important, not the code itself.

### [#](#what-about-books-and-courses) What about Books and Courses?

Through out this post you haven’t heard me mention books or courses which is kind of funny since I am an author of a number of [video courses](https://nickjanetakis.com/courses) related to programming.

Honestly, I don’t like reading books or going through courses early on in the learning process. However, I do think they are super valuable once you get the basics down.

For example I didn’t pick up any books on Elixir until I was already developing my app for a few months (keep in mind I was only working on it for a few hours a day). The only book I bought was [Programming Phoenix 1.4](https://pragprog.com/book/phoenix14/programming-phoenix-1-4) and it was very much worth it.

It was worth it because you’ll often fill in a lot of gaps and get to see code examples that will help you out in your app. After finishing that book I had about 20 small things I wanted to change in my app based on what I learned in the book.

Just one of those tips alone was worth the price of the book, and I got 20 of them so I feel like I came out way ahead.

I also found the book a lot easier to follow because I wasn’t starting from ground 0. I felt like I got a lot of value out of it because I was able to spend my energy applying what I learned to my app instead of trying to learn something new as I struggled to even begin my app.

So I do think books and courses have huge value, especially if they focus on building and testing something real and I’m not just saying that because I make courses. I’m saying that because it’s what I personally do and it works very well for me. That’s why I make sure all of [my courses](https://nickjanetakis.com/courses) are very focused on building real things instead of focusing on toy examples.

**Have you ever tried this style of learning? Let me know below!**

Like you, I'm super protective of my inbox, so don't worry about getting spammed. You can expect a few emails per year (at most), and you can 1-click unsubscribe at any time. [See what else you'll get](https://nickjanetakis.com/newsletter) too.
