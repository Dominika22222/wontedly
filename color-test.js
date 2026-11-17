const colorInfo = {
  red: { name: 'Red', trait: 'drive and decisive action', color: '#f16c5b', summary: 'You may be energized by taking initiative, making progress, and meeting a clear challenge.' },
  yellow: { name: 'Yellow', trait: 'energy and connection', color: '#e6bf52', summary: 'You may be energized by possibility, expression, and bringing people into the moment.' },
  green: { name: 'Green', trait: 'steadiness and support', color: '#82ae79', summary: 'You may be energized by trust, patience, and creating a sense of care and stability.' },
  blue: { name: 'Blue', trait: 'clarity and thoughtful care', color: '#79a7cf', summary: 'You may be energized by understanding details, thinking things through, and doing careful work.' }
};

// Each response is associated with one of the four color styles. The order rotates
// so a given color is not always represented by the same option position.
const rawQuestions = [
  ['When a new project begins, what do you naturally do first?', ['Clarify the goal and get moving.', 'Share ideas and build excitement.', 'Check how everyone can contribute comfortably.', 'Understand the details and plan carefully.']],
  ['A plan suddenly changes. What is your first instinct?', ['Choose a new direction quickly.', 'Look for the interesting opportunity in it.', 'Help everyone adjust at a manageable pace.', 'Find out what changed and what is now certain.']],
  ['In a group conversation, which role feels most natural?', ['Bring the discussion to a decision.', 'Keep the energy lively and invite ideas.', 'Make sure people feel heard and included.', 'Ask questions that make the topic clearer.']],
  ['When you have a difficult goal, what helps you most?', ['A clear challenge and the freedom to act.', 'Enthusiasm and people to share it with.', 'A steady routine and encouragement.', 'A sound plan and enough information.']],
  ['A friend asks for help at a busy time. What do you tend to do?', ['Work out the quickest practical way to help.', 'Respond warmly and lift their spirits.', 'Make time to listen and offer steady support.', 'Ask what they need and think through a useful solution.']],
  ['What is most satisfying after finishing a task?', ['Seeing a concrete result.', 'Celebrating the experience with others.', 'Knowing the process felt good for everyone.', 'Knowing the work is accurate and complete.']],
  ['When you disagree with someone, what is your usual approach?', ['Say directly what I think and why.', 'Talk it through openly and expressively.', 'Look for common ground and keep the tone respectful.', 'Explain my reasoning and consider the evidence.']],
  ['What kind of work environment helps you do your best?', ['Fast-moving, with room to make decisions.', 'Friendly, energetic, and full of interaction.', 'Calm, supportive, and dependable.', 'Organized, focused, and clear about expectations.']],
  ['When you have several things to do, how do you choose what comes first?', ['Prioritize what will make the biggest impact.', 'Start with what feels inspiring or engaging.', 'Consider who is relying on me and work steadily.', 'Sort the details and make a logical plan.']],
  ['A conversation gets tense. What are you most likely to do?', ['Address the issue directly.', 'Try to ease the tension and reconnect.', 'Stay calm and give people room to speak.', 'Pause to understand exactly what is being said.']],
  ['How do you usually respond to a new idea?', ['Decide whether it can work and take a first step.', 'Get excited and imagine the possibilities.', 'Think about how it will affect people over time.', 'Examine the details, risks, and evidence.']],
  ['What kind of recognition feels most meaningful?', ['Being trusted with an important challenge.', 'Having my enthusiasm and contribution noticed.', 'Knowing people value my support and reliability.', 'Having the quality and care in my work recognized.']],
  ['When you make a decision, what do you rely on most?', ['My judgment and willingness to take responsibility.', 'My instinct about what feels promising.', 'The effect on people and what feels sustainable.', 'Careful comparison of facts and options.']],
  ['What can be hardest when working with other people?', ['Waiting when a decision or action seems clear.', 'Losing momentum when the work feels routine.', 'Speaking up when it might create tension.', 'Moving ahead before the details feel settled.']],
  ['What do you tend to bring to a celebration or gathering?', ['A plan to make things happen.', 'Warmth, stories, and lively conversation.', 'Thoughtfulness about everyone feeling welcome.', 'Attention to the details that make it run smoothly.']],
  ['When something goes wrong, what do you do first?', ['Take charge of the immediate next step.', 'Help people stay hopeful and find another option.', 'Check in on those affected and offer support.', 'Work out what happened and how to prevent it.']],
  ['How do you prefer to learn a new skill?', ['Try it hands-on and improve as I go.', 'Explore it with others and keep it fun.', 'Practice gradually with encouragement.', 'Study the instructions and understand the method.']],
  ['What makes you feel confident about a plan?', ['It has a clear goal and room for action.', 'It feels exciting and people are on board.', 'It is considerate and has a steady pace.', 'It is realistic, detailed, and well thought through.']],
  ['When someone shares good news, what is your natural response?', ['Ask what comes next and how to build on it.', 'Celebrate enthusiastically with them.', 'Take time to share in how it feels for them.', 'Ask thoughtful questions about what it means.']],
  ['What do you usually do with an open afternoon?', ['Choose something purposeful to accomplish.', 'Follow an interesting idea or make social plans.', 'Enjoy familiar comforts or time with people close to me.', 'Organize, read, or focus on an absorbing interest.']],
  ['When a deadline is close, what is most like you?', ['Focus hard and drive toward completion.', 'Bring energy to the final push and keep morale up.', 'Stay steady and help the group keep a manageable pace.', 'Check the work carefully so nothing important is missed.']],
  ['How do you tend to react to a compliment?', ['Appreciate it and turn attention to the next goal.', 'Enjoy the moment and share the good feeling.', 'Feel touched that someone noticed my effort.', 'Wonder specifically what I did well.']],
  ['What matters most to you in a close friendship?', ['Mutual respect and being able to count on each other.', 'Fun, openness, and shared experiences.', 'Trust, consistency, and genuine care.', 'Honesty, depth, and thoughtful understanding.']],
  ['When faced with uncertainty, what helps you move forward?', ['Choosing a direction and learning by doing.', 'Talking it through and staying open to possibilities.', 'Having reassurance and taking one step at a time.', 'Gathering enough information to make a considered choice.']],
  ['Which task would you be most likely to volunteer for?', ['Leading a decision or tackling a difficult target.', 'Presenting an idea or bringing people together.', 'Supporting someone or coordinating a steady process.', 'Reviewing information or improving the quality.']],
  ['What do you notice first in a new place?', ['What is happening and where I can get things started.', 'The people, atmosphere, and interesting possibilities.', 'Whether the space feels comfortable and welcoming.', 'The layout, details, and how things are organized.']],
  ['When you receive feedback, what do you want most?', ['The key point and what action to take.', 'A constructive conversation that feels encouraging.', 'A respectful tone and time to absorb it.', 'Specific examples and a clear rationale.']],
  ['What is your typical approach to a long-term commitment?', ['Set milestones and keep pushing toward the result.', 'Stay inspired by the purpose and people involved.', 'Build a reliable rhythm that can last.', 'Plan carefully and monitor the details.']],
  ['If a meeting is going in circles, what might you do?', ['Suggest a decision and assign next steps.', 'Introduce a fresh angle to bring the energy back.', 'Invite quieter people to share and find agreement.', 'Summarize what is known and identify open questions.']],
  ['What is most likely to make you proud of your work?', ['The impact and progress I helped create.', 'The creativity and enthusiasm I brought to it.', 'The trust and support I offered along the way.', 'The thoughtfulness and quality of the finished result.']],
  ['How do you usually make plans with friends?', ['Pick a time and settle the details efficiently.', 'Suggest something spontaneous and fun.', 'Find an option that works comfortably for everyone.', 'Compare options and confirm the practical details.']],
  ['What is your instinct when someone is being treated unfairly?', ['Speak up firmly and push for change.', 'Stand beside them and rally others to help.', 'Offer personal support and make sure they feel safe.', 'Understand what happened and raise the facts clearly.']],
  ['When you are tired, what kind of task is easiest to keep doing?', ['A focused task with a clear finish line.', 'Something social, creative, or varied.', 'A familiar task that helps someone or keeps things steady.', 'A quiet task that needs concentration and care.']],
  ['What kind of compliment would feel most accurate?', ['“You make things happen.”', '“You make things feel possible.”', '“You help people feel supported.”', '“You notice what matters.”']],
  ['When you have to explain an idea, what do you focus on?', ['The outcome and the decision needed.', 'The story, energy, and possibilities.', 'How it affects people and what support they need.', 'The logic, evidence, and important details.']],
  ['What is your response when a routine becomes repetitive?', ['Look for a faster or more effective way.', 'Add variety or find something more stimulating.', 'Keep the dependable rhythm if it is working for people.', 'Refine the process and make it more consistent.']],
  ['How do you prefer to handle an important responsibility?', ['Take ownership and have authority to act.', 'Share it with people and keep communication open.', 'Work collaboratively with clear mutual support.', 'Know the requirements and have time to do it thoroughly.']],
  ['When you are part of a team, what do you value most?', ['Commitment to results and clear accountability.', 'Positive energy and open exchange of ideas.', 'Respect, cooperation, and reliability.', 'Good preparation and high-quality thinking.']],
  ['What helps you recover after a challenging day?', ['Doing something active that restores a sense of control.', 'Connecting with people or something enjoyable.', 'Quiet comfort and time with someone trusted.', 'Solitude, reflection, or an orderly reset.']],
  ['Which growth opportunity sounds most appealing?', ['Taking on a bigger challenge and making a difference.', 'Expressing ideas and connecting with new people.', 'Building stronger relationships and sustainable habits.', 'Deepening expertise and producing excellent work.']]
];

const colorOrder = ['red', 'yellow', 'green', 'blue'];
const questions = rawQuestions.map(([prompt, choices], questionIndex) => ({
  prompt,
  options: choices.map((text, optionIndex) => ({
    text,
    color: colorOrder[(optionIndex + questionIndex) % colorOrder.length]
  }))
}));

const beginButton = document.getElementById('begin');
const quiz = document.getElementById('finder-quiz');
const result = document.getElementById('finder-result');
const prompt = document.getElementById('prompt');
const options = document.getElementById('options');
const continueButton = document.getElementById('continue');
const previousButton = document.getElementById('previous');
let questionIndex = 0;
let answers = Array(questions.length).fill(null);

function begin() {
  questionIndex = 0;
  answers = Array(questions.length).fill(null);
  result.classList.add('hidden');
  quiz.classList.remove('hidden');
  renderQuestion();
  quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderQuestion() {
  const question = questions[questionIndex];
  const completed = questionIndex + 1;
  document.getElementById('question-number').textContent = `Question ${completed} of ${questions.length}`;
  document.getElementById('percent').textContent = `${Math.round((questionIndex / questions.length) * 100)}%`;
  document.querySelector('.finder-progress').setAttribute('aria-valuenow', String(questionIndex));
  document.getElementById('progress-fill').style.width = `${(questionIndex / questions.length) * 100}%`;
  prompt.textContent = question.prompt;
  options.replaceChildren();

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement('button');
    button.className = `finder-option${answers[questionIndex] === optionIndex ? ' selected' : ''}`;
    button.type = 'button';
    button.setAttribute('aria-pressed', String(answers[questionIndex] === optionIndex));
    button.textContent = option.text;
    button.addEventListener('click', () => {
      answers[questionIndex] = optionIndex;
      renderQuestion();
    });
    options.append(button);
  });

  previousButton.style.visibility = questionIndex === 0 ? 'hidden' : 'visible';
  continueButton.disabled = answers[questionIndex] === null;
  continueButton.innerHTML = questionIndex === questions.length - 1 ? 'See my result <span>→</span>' : 'Next <span>→</span>';
}

function showResult() {
  const scores = Object.fromEntries(colorOrder.map(color => [color, 0]));
  answers.forEach((answerIndex, index) => {
    if (answerIndex !== null) scores[questions[index].options[answerIndex].color] += 1;
  });
  const ranked = [...colorOrder].sort((a, b) => scores[b] - scores[a]);
  const highest = scores[ranked[0]];
  const leaders = ranked.filter(color => scores[color] === highest);
  const leadNames = leaders.map(color => colorInfo[color].name).join(' + ');
  document.getElementById('result-heading').textContent = leaders.length > 1 ? `Your color blend: ${leadNames}` : `Your starting color: ${leadNames}`;
  document.getElementById('result-copy').textContent = leaders.length > 1
    ? `Your answers connect most strongly with ${leadNames}. You may recognize a blend of ${leaders.map(color => colorInfo[color].trait).join(' and ')}. Use these as useful clues, not strict categories.`
    : `${colorInfo[ranked[0]].summary} This is a helpful place to start exploring—not a box or a complete description of you.`;

  const scoreList = document.getElementById('score-list');
  scoreList.replaceChildren();
  ranked.forEach(color => {
    const info = colorInfo[color];
    const row = document.createElement('div');
    row.className = 'score-row';
    const label = document.createElement('div');
    label.className = 'score-label';
    const name = document.createElement('strong');
    name.textContent = info.name;
    const trait = document.createElement('span');
    trait.textContent = info.trait;
    label.append(name, trait);
    const track = document.createElement('div');
    track.className = 'score-track';
    track.setAttribute('role', 'img');
    track.setAttribute('aria-label', `${info.name}: ${scores[color]} of ${questions.length}`);
    const fill = document.createElement('span');
    fill.style.width = `${(scores[color] / questions.length) * 100}%`;
    fill.style.backgroundColor = info.color;
    track.append(fill);
    const number = document.createElement('span');
    number.className = 'score-number';
    number.textContent = `${scores[color]} / ${questions.length}`;
    row.append(label, track, number);
    scoreList.append(row);
  });

  quiz.classList.add('hidden');
  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

beginButton.addEventListener('click', begin);
document.getElementById('retake').addEventListener('click', begin);
previousButton.addEventListener('click', () => {
  if (questionIndex > 0) {
    questionIndex -= 1;
    renderQuestion();
  }
});
continueButton.addEventListener('click', () => {
  if (answers[questionIndex] === null) return;
  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});
