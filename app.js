const profiles = {
  red: {
    name: 'Red',
    trait: 'The decisive doer',
    desc: 'You often bring drive, clarity, and a bias for action. Your answers point to a style that likes progress and directness.',
    strengths: ['You turn decisions into action.', 'You bring courage and momentum when things feel stuck.', 'You are often clear about goals and expectations.'],
    watch: ['Moving quickly can leave others feeling unheard.', 'Impatience may hide useful information or nuance.', 'Directness works best when it leaves room for a different view.'],
    growth: ['Before acting, ask: “What might I be missing?”', 'Pair clear expectations with a check-in about how others are doing.', 'Choose one moment each day to listen without trying to fix.'],
    signals: {
      ownership: 'You tend to feel responsible for taking charge when progress stalls.',
      pace: 'Speed and visible progress seem important to your sense of effectiveness.',
      impact: 'You care about being candid, while also noticing how your delivery affects others.',
      trust: 'You are practicing letting others own a different approach or timeline.'
    },
    questions: [
      { prompt: 'When a goal matters deeply to you, what most often drives you?', options: [
        { text: 'The satisfaction of turning a difficult goal into a real result.', signal: 'ownership' },
        { text: 'The freedom to choose my own approach and take responsibility.', signal: 'ownership' },
        { text: 'The chance to prove to myself that I can handle the challenge.', signal: 'impact' },
        { text: 'The possibility of making a meaningful difference for others.', signal: 'trust' }
      ] },
      { prompt: 'A team is moving more slowly than you think it should. What is your honest first reaction?', options: [
        { text: 'I want to clarify the decision and get everyone moving.', signal: 'pace' },
        { text: 'I feel frustrated, then try to understand what is blocking progress.', signal: 'impact' },
        { text: 'I take over because waiting feels riskier than acting.', signal: 'ownership' },
        { text: 'I check whether people need context or a chance to raise concerns.', signal: 'trust' }
      ] },
      { prompt: 'When someone challenges your decision, what can feel hardest?', options: [
        { text: 'The conversation taking time when action seems obvious.', signal: 'pace' },
        { text: 'Wondering whether they trust my judgment.', signal: 'impact' },
        { text: 'Giving up control over a result I feel accountable for.', signal: 'ownership' },
        { text: 'Staying curious instead of preparing my counterargument.', signal: 'trust' }
      ] },
      { prompt: 'Think of a recent disagreement. What do you wish you had done differently?', options: [
        { text: 'Asked one more question before stating my conclusion.', signal: 'trust' },
        { text: 'Made my point with less force and more context.', signal: 'impact' },
        { text: 'Allowed the other person more time to think.', signal: 'pace' },
        { text: 'Shared responsibility instead of trying to solve everything myself.', signal: 'ownership' }
      ] },
      { prompt: 'When you are under pressure, which pattern are you most likely to recognize in yourself?', options: [
        { text: 'I become blunt because efficiency feels urgent.', signal: 'impact' },
        { text: 'I make decisions before everyone has the information they need.', signal: 'pace' },
        { text: 'I take on too much rather than risk losing control of the outcome.', signal: 'ownership' },
        { text: 'I find it difficult to show uncertainty or ask for help.', signal: 'trust' }
      ] },
      { prompt: 'What kind of feedback is most useful—and most difficult—to hear?', options: [
        { text: 'That my tone can shut down people who have something valuable to add.', signal: 'impact' },
        { text: 'That my pace leaves others scrambling to catch up.', signal: 'pace' },
        { text: 'That I could delegate instead of holding every decision.', signal: 'ownership' },
        { text: 'That listening is not the same as agreeing or losing authority.', signal: 'trust' }
      ] },
      { prompt: 'How do you usually respond when a plan fails despite your effort?', options: [
        { text: 'I quickly look for a new route and get moving again.', signal: 'pace' },
        { text: 'I examine what I could have controlled or done better.', signal: 'ownership' },
        { text: 'I feel the disappointment but rarely show it.', signal: 'trust' },
        { text: 'I focus on fixing the immediate problem, sometimes before acknowledging people’s reactions.', signal: 'impact' }
      ] },
      { prompt: 'Which change would make your strength of decisiveness work better for people around you?', options: [
        { text: 'Invite disagreement before I commit to a decision.', signal: 'trust' },
        { text: 'Explain the reason behind the urgency, not only the deadline.', signal: 'impact' },
        { text: 'Pause to check whether speed is actually needed.', signal: 'pace' },
        { text: 'Delegate the method as well as the task.', signal: 'ownership' }
      ] },
      { prompt: 'What makes you feel most respected when you lead or drive something forward?', options: [
        { text: 'People trust that I will move things to completion.', signal: 'ownership' },
        { text: 'People feel the urgency without being overwhelmed by it.', signal: 'pace' },
        { text: 'People know I am direct but fair.', signal: 'impact' },
        { text: 'People feel safe enough to challenge me constructively.', signal: 'trust' }
      ] },
      { prompt: 'Which image feels most true about your growth edge?', options: [
        { text: 'I can act with control only when I stop trying to control everything.', signal: 'ownership' },
        { text: 'I can be stronger when I slow down enough to check the impact of my rhythm.', signal: 'pace' },
        { text: 'I can be more effective when I lead with less force and more context.', signal: 'impact' },
        { text: 'I can become more influential when I listen more before I conclude.', signal: 'trust' }
      ] }
    ]
  },
  yellow: {
    name: 'Yellow',
    trait: 'The enthusiastic connector',
    desc: 'You often bring energy, optimism, and a gift for connection. Your answers point to a style that enjoys possibility and people.',
    strengths: ['You help people feel welcome and energized.', 'You bring imagination and fresh possibilities.', 'You can make collaboration feel engaging.'],
    watch: ['Excitement can pull you toward too many things at once.', 'Keeping things upbeat may postpone a necessary conversation.', 'Big ideas need follow-through to become real.'],
    growth: ['Pick one priority before starting something new.', 'Make a small plan for the follow-through, not only the exciting start.', 'Practice honest conversations even when they may feel awkward.'],
    signals: {
      connection: 'Being understood and connected with others appears to matter a lot to you.',
      novelty: 'New possibilities and creative energy seem to bring out your best.',
      followthrough: 'You are noticing the gap between exciting beginnings and steady completion.',
      approval: 'You may sometimes protect the mood or others’ approval at the cost of your own needs.'
    },
    questions: [
      { prompt: 'When you enter a new group, what do you instinctively hope to create?', options: [
        { text: 'A warm atmosphere where people feel included.', signal: 'connection' },
        { text: 'A lively exchange of ideas and possibilities.', signal: 'novelty' },
        { text: 'A sense that people enjoy having me there.', signal: 'approval' },
        { text: 'A chance to bring people together around something meaningful.', signal: 'connection' }
      ] },
      { prompt: 'You have several exciting commitments, but your energy is running low. What is hardest?', options: [
        { text: 'Letting someone down by changing a promise.', signal: 'approval' },
        { text: 'Choosing one thing when all the options feel interesting.', signal: 'novelty' },
        { text: 'Admitting that enthusiasm did not equal available time.', signal: 'followthrough' },
        { text: 'Missing time with people I care about while catching up.', signal: 'connection' }
      ] },
      { prompt: 'When a conversation turns uncomfortable, what do you tend to do?', options: [
        { text: 'Use humor or optimism to soften the moment.', signal: 'approval' },
        { text: 'Shift toward a more positive or interesting topic.', signal: 'novelty' },
        { text: 'Try to address it, but worry about how the other person feels.', signal: 'connection' },
        { text: 'Wait too long, then wish I had been clearer earlier.', signal: 'followthrough' }
      ] },
      { prompt: 'Think about a project you started but did not finish. What most often got in the way?', options: [
        { text: 'A newer idea became more exciting.', signal: 'novelty' },
        { text: 'The routine details felt draining after the inspiring start.', signal: 'followthrough' },
        { text: 'I was waiting for other people’s energy or encouragement.', signal: 'connection' },
        { text: 'I said yes to too many things and did not want to disappoint anyone.', signal: 'approval' }
      ] },
      { prompt: 'What do you most want people to understand about your outgoing or upbeat side?', options: [
        { text: 'It is a real strength, but I also have quieter or uncertain moments.', signal: 'connection' },
        { text: 'My ideas are sincere even when I am still figuring out the details.', signal: 'novelty' },
        { text: 'I may appear fine when I am actually overwhelmed.', signal: 'approval' },
        { text: 'I care about finishing well, not only starting with energy.', signal: 'followthrough' }
      ] },
      { prompt: 'When you feel overlooked or excluded, what response feels familiar?', options: [
        { text: 'I try harder to be entertaining or helpful.', signal: 'approval' },
        { text: 'I reach out and try to reconnect directly.', signal: 'connection' },
        { text: 'I distract myself with a new plan or activity.', signal: 'novelty' },
        { text: 'I say nothing, then replay it later and wish I had spoken up.', signal: 'followthrough' }
      ] },
      { prompt: 'What kind of structure would support you without making life feel dull?', options: [
        { text: 'A short list of priorities with room for spontaneity.', signal: 'followthrough' },
        { text: 'A partner who helps turn ideas into manageable steps.', signal: 'connection' },
        { text: 'A flexible deadline that keeps an exciting idea moving.', signal: 'novelty' },
        { text: 'Permission to say no without needing everyone to approve.', signal: 'approval' }
      ] },
      { prompt: 'Which growth step feels most meaningful for you right now?', options: [
        { text: 'Finish one important thing before adding a new commitment.', signal: 'followthrough' },
        { text: 'Let a difficult conversation be honest, not just pleasant.', signal: 'approval' },
        { text: 'Make room for depth with a few people, not only broad connection.', signal: 'connection' },
        { text: 'Capture new ideas without feeling obliged to pursue each one.', signal: 'novelty' }
      ] },
      { prompt: 'What do you usually do when your social energy is high but your practical energy is low?', options: [
        { text: 'I keep making plans because it feels better than being still.', signal: 'novelty' },
        { text: 'I lean on people for emotional support and accountability.', signal: 'connection' },
        { text: 'I resent that I cannot keep up with my own pace.', signal: 'followthrough' },
        { text: 'I hide the overload and keep the mood positive anyway.', signal: 'approval' }
      ] },
      { prompt: 'If someone described your strongest gift in one sentence, what would likely feel most accurate?', options: [
        { text: 'You make people feel less alone and more possible.', signal: 'connection' },
        { text: 'You bring excitement and a new angle to what was stuck.', signal: 'novelty' },
        { text: 'You help people move forward without getting lost in the fear of it.', signal: 'followthrough' },
        { text: 'You create warmth while helping everyone feel okay.', signal: 'approval' }
      ] }
    ]
  },
  green: {
    name: 'Green',
    trait: 'The steady supporter',
    desc: 'You often bring patience, care, and a steady presence. Your answers point to a style that values trust and thoughtful connection.',
    strengths: ['You make space for people to feel heard.', 'You bring steadiness when situations get tense.', 'You are thoughtful about how change affects others.'],
    watch: ['Avoiding tension can make your own needs hard to see.', 'Waiting for certainty may delay a decision you are ready to make.', 'Being supportive does not mean carrying everything alone.'],
    growth: ['Say what you need before resentment builds.', 'Set a decision time, even when you do not have perfect certainty.', 'Offer support with a clear boundary around your time and energy.'],
    signals: {
      harmony: 'You often work to preserve trust and emotional steadiness in relationships.',
      needs: 'Your own preferences or needs may be quieter than the care you offer others.',
      change: 'Time to adjust and a sense of security matter when things are changing.',
      boundaries: 'You are learning where compassion ends and taking on too much begins.'
    },
    questions: [
      { prompt: 'When someone you care about is upset with you, what worries you most?', options: [
        { text: 'That the relationship may feel less safe or close.', signal: 'harmony' },
        { text: 'That I will not know how to explain what I need.', signal: 'needs' },
        { text: 'That I will be expected to fix feelings I cannot control.', signal: 'boundaries' },
        { text: 'That the disagreement could change the relationship for a long time.', signal: 'change' }
      ] },
      { prompt: 'A decision affects your routine and the people around you. What do you need most?', options: [
        { text: 'Time to consider how it will affect everyone involved.', signal: 'harmony' },
        { text: 'A chance to understand what I personally want, apart from others.', signal: 'needs' },
        { text: 'A gradual transition and clear expectations.', signal: 'change' },
        { text: 'Confidence that I will not be left carrying all the work.', signal: 'boundaries' }
      ] },
      { prompt: 'When you agree to help but later feel overloaded, what usually happened?', options: [
        { text: 'I did not want to disappoint someone in the moment.', signal: 'harmony' },
        { text: 'I had not checked what I needed or had capacity for.', signal: 'needs' },
        { text: 'The request grew or changed after I had agreed.', signal: 'boundaries' },
        { text: 'I hoped the situation would settle before I had to address it.', signal: 'change' }
      ] },
      { prompt: 'When change is announced suddenly, what is your private first response?', options: [
        { text: 'I wonder how everyone else will manage with it.', signal: 'harmony' },
        { text: 'I need time to notice how I feel about it.', signal: 'needs' },
        { text: 'I want to know what will stay familiar and dependable.', signal: 'change' },
        { text: 'I worry that I will be expected to support everyone through it.', signal: 'boundaries' }
      ] },
      { prompt: 'Which sentence is hardest for you to say plainly?', options: [
        { text: '“I see it differently.”', signal: 'harmony' },
        { text: '“This is what I want.”', signal: 'needs' },
        { text: '“I am ready to make a change.”', signal: 'change' },
        { text: '“I cannot take that on.”', signal: 'boundaries' }
      ] },
      { prompt: 'After supporting someone through a difficult time, what can happen to you?', options: [
        { text: 'I keep checking that they are okay, even when they have support.', signal: 'harmony' },
        { text: 'I realize I never said how the situation affected me.', signal: 'needs' },
        { text: 'I need time to return to my own routine.', signal: 'change' },
        { text: 'I feel drained because I took responsibility for more than my part.', signal: 'boundaries' }
      ] },
      { prompt: 'How do you tend to make an important choice when people disagree?', options: [
        { text: 'Look for a solution that protects the relationship.', signal: 'harmony' },
        { text: 'Listen carefully, then try to identify my own view.', signal: 'needs' },
        { text: 'Wait until the situation feels less uncertain.', signal: 'change' },
        { text: 'Check whether I am choosing freely or just accommodating.', signal: 'boundaries' }
      ] },
      { prompt: 'What would healthy assertiveness look like in your life right now?', options: [
        { text: 'Naming a disagreement while staying respectful and connected.', signal: 'harmony' },
        { text: 'Saying what I want before I have fully rehearsed it.', signal: 'needs' },
        { text: 'Taking one manageable step toward a change I have delayed.', signal: 'change' },
        { text: 'Offering care without automatically saying yes.', signal: 'boundaries' }
      ] },
      { prompt: 'When someone depends on you heavily, what is the most common risk?', options: [
        { text: 'I start helping in ways that make me feel invisible.', signal: 'needs' },
        { text: 'I postpone my own discomfort to keep everyone calm.', signal: 'harmony' },
        { text: 'I become slower to make a needed decision because I am unsure about everyone’s reaction.', signal: 'change' },
        { text: 'I carry too much of the emotional load without naming it.', signal: 'boundaries' }
      ] },
      { prompt: 'What kind of environment helps you feel strongest emotionally?', options: [
        { text: 'One where people are honest but still kind.', signal: 'harmony' },
        { text: 'One where my needs matter without being framed as burdensome.', signal: 'needs' },
        { text: 'One where change is explained and paced with care.', signal: 'change' },
        { text: 'One where I do not have to perform support in order to be valued.', signal: 'boundaries' }
      ] }
    ]
  },
  blue: {
    name: 'Blue',
    trait: 'The thoughtful analyst',
    desc: 'You often bring care, precision, and a desire to understand things clearly. Your answers point to a style that values substance and good reasoning.',
    strengths: ['You notice details and patterns others may miss.', 'You make thoughtful, considered choices.', 'You care about doing work carefully and well.'],
    watch: ['Looking for perfect information can delay useful action.', 'High standards can turn into harsh self-criticism.', 'Focusing on facts may leave feelings unspoken.'],
    growth: ['Decide what “good enough for now” looks like.', 'Share a first draft or early thought before it feels perfect.', 'Make room to ask how people feel, as well as what they think.'],
    signals: {
      certainty: 'You value reliable information and can feel exposed when certainty is unavailable.',
      standards: 'Doing things well matters to you, though your standards may sometimes become heavy.',
      emotion: 'You may process feelings privately or translate them into analysis before sharing.',
      action: 'You are exploring how to move forward before every question is resolved.'
    },
    questions: [
      { prompt: 'When you face a complex decision, what feels most uncomfortable?', options: [
        { text: 'Having to choose while important information is still missing.', signal: 'certainty' },
        { text: 'Knowing my choice may not meet the standard I hoped for.', signal: 'standards' },
        { text: 'Making a decision that could disappoint someone emotionally.', signal: 'emotion' },
        { text: 'Committing before I have compared every reasonable option.', signal: 'action' }
      ] },
      { prompt: 'When you make a mistake, what does your inner response sound like?', options: [
        { text: '“I should have checked more carefully.”', signal: 'standards' },
        { text: '“I need to understand exactly how this happened.”', signal: 'certainty' },
        { text: '“I hope I have not let someone down.”', signal: 'emotion' },
        { text: '“Fix what is possible, then keep going.”', signal: 'action' }
      ] },
      { prompt: 'You have a useful idea but it is not fully developed. What do you usually do?', options: [
        { text: 'Keep refining it until I can explain it precisely.', signal: 'standards' },
        { text: 'Research more so I can support it with evidence.', signal: 'certainty' },
        { text: 'Wait for a moment when sharing it feels less exposing.', signal: 'emotion' },
        { text: 'Share the early version and invite questions.', signal: 'action' }
      ] },
      { prompt: 'In a close relationship, what can be difficult to say out loud?', options: [
        { text: 'That I am hurt, before I have fully understood why.', signal: 'emotion' },
        { text: 'That I need reassurance rather than another explanation.', signal: 'emotion' },
        { text: 'That I do not have a definite answer yet.', signal: 'certainty' },
        { text: 'That something is good enough even if it is not ideal.', signal: 'standards' }
      ] },
      { prompt: 'When someone changes a plan at the last minute, what reaction is most familiar?', options: [
        { text: 'I want to understand the reason and the new details.', signal: 'certainty' },
        { text: 'I feel unsettled because I had prepared for the original plan.', signal: 'standards' },
        { text: 'I may hide my disappointment to keep things smooth.', signal: 'emotion' },
        { text: 'I adapt, but first need to decide what matters most now.', signal: 'action' }
      ] },
      { prompt: 'Which feedback might be hardest but most useful for you?', options: [
        { text: '“You do not need to be certain to make a thoughtful choice.”', signal: 'certainty' },
        { text: '“Your standards are making this harder than it needs to be.”', signal: 'standards' },
        { text: '“Tell me how this feels, not only what you think.”', signal: 'emotion' },
        { text: '“A small imperfect step could teach you more than more planning.”', signal: 'action' }
      ] },
      { prompt: 'When a project is almost finished, what most often slows you down?', options: [
        { text: 'I keep reviewing details for possible errors.', signal: 'standards' },
        { text: 'I want one more piece of information before finalizing.', signal: 'certainty' },
        { text: 'I worry how people will respond to the finished work.', signal: 'emotion' },
        { text: 'I find it hard to call it complete and release it.', signal: 'action' }
      ] },
      { prompt: 'What would trusting yourself more look like this month?', options: [
        { text: 'Make a considered decision with the information I already have.', signal: 'certainty' },
        { text: 'Let one task be solid and complete instead of flawless.', signal: 'standards' },
        { text: 'Name a feeling or need without first proving it is rational.', signal: 'emotion' },
        { text: 'Take a small visible step before I feel completely ready.', signal: 'action' }
      ] },
      { prompt: 'When you are solving a problem, how do you know you have enough information?', options: [
        { text: 'When I can explain the logic in plain language.', signal: 'certainty' },
        { text: 'When the quality is high enough that I no longer feel uneasy about it.', signal: 'standards' },
        { text: 'When I understand what the people affected are actually feeling.', signal: 'emotion' },
        { text: 'When I have enough to move without stalling the whole process.', signal: 'action' }
      ] },
      { prompt: 'Which kind of challenge is most likely to make you feel alive and useful?', options: [
        { text: 'One where the truth matters and I can test my thinking carefully.', signal: 'certainty' },
        { text: 'One where I can bring a high standard to something meaningful.', signal: 'standards' },
        { text: 'One where emotional truth and logical clarity can both matter.', signal: 'emotion' },
        { text: 'One where I can act decisively without drowning in a perfect plan.', signal: 'action' }
      ] }
    ]
  }
};

const cards = document.getElementById('cards');
const quiz = document.getElementById('quiz');
const result = document.getElementById('result');
let type = '';
let index = 0;
let answers = [];

cards.innerHTML = Object.entries(profiles).map(([key, profile]) =>
  `<button class="type-card ${key}" data-type="${key}" type="button"><span class="section-num">COLOR STYLE</span><h3>${profile.name}</h3><p>${profile.trait}. A way to reflect, not a label to live up to.</p></button>`
).join('');
cards.querySelectorAll('button').forEach(button => button.addEventListener('click', () => start(button.dataset.type)));

function start(key) {
  type = key;
  index = 0;
  answers = [];
  document.getElementById('type-title').textContent = `${profiles[type].name} · ${profiles[type].trait}`;
  quiz.classList.remove('hidden');
  result.classList.add('hidden');
  render();
  quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function render() {
  const profile = profiles[type];
  const question = profile.questions[index];
  document.getElementById('question').textContent = question.prompt;
  document.getElementById('step').textContent = `${String(index + 1).padStart(2, '0')} / ${String(profile.questions.length).padStart(2, '0')}`;
  document.getElementById('progress').style.width = `${((index + 1) / profile.questions.length) * 100}%`;
  document.getElementById('options').innerHTML = question.options.map((option, optionIndex) =>
    `<button class="option ${answers[index] === optionIndex ? 'selected' : ''}" data-i="${optionIndex}" type="button"><span class="radio"></span>${option.text}</button>`
  ).join('');
  document.querySelectorAll('.option').forEach(button => button.addEventListener('click', () => {
    answers[index] = Number(button.dataset.i);
    render();
  }));
  const next = document.getElementById('next');
  next.disabled = typeof answers[index] !== 'number';
  next.innerHTML = index === profile.questions.length - 1 ? 'See my reflection <span>→</span>' : 'Next <span>→</span>';
  document.getElementById('back').style.visibility = index === 0 ? 'hidden' : 'visible';
}

document.getElementById('next').addEventListener('click', () => {
  if (typeof answers[index] !== 'number') return;
  if (index < profiles[type].questions.length - 1) {
    index++;
    render();
  } else {
    showResult();
  }
});
document.getElementById('back').addEventListener('click', () => {
  if (index > 0) {
    index--;
    render();
  }
});

function showResult() {
  const profile = profiles[type];
  const counts = {};
  answers.forEach((answerIndex, questionIndex) => {
    const signal = profile.questions[questionIndex].options[answerIndex].signal;
    counts[signal] = (counts[signal] || 0) + 1;
  });
  const topSignals = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const personalReflection = topSignals.map(([signal]) => profile.signals[signal]).join(' ');
  document.getElementById('result-title').textContent = `Your ${profile.name.toLowerCase()} reflection`;
  document.getElementById('result-lead').textContent = `${profile.desc} ${personalReflection}`;
  for (const [id, list] of [['strengths', profile.strengths], ['watchouts', profile.watch], ['growth', profile.growth]]) {
    document.getElementById(id).innerHTML = list.map(item => `<li>${item}</li>`).join('');
  }
  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('again').addEventListener('click', () => {
  result.classList.add('hidden');
  quiz.classList.add('hidden');
  document.getElementById('check').scrollIntoView({ behavior: 'smooth' });
});
