import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArchiveLayout from "../components/layout/ArchiveLayout";
import sourdoughImage from "../assets/sourdough.jpg";
import briocheImage from "../assets/brioche.jpg";
import bagelImage from "../assets/bagel.jpg";
import croissantImage from "../assets/croissant.jpg";
import garlicBreadImage from "../assets/garlic-bread.jpg";
import "./BreadQuiz.css";

const breadProfiles = {
  sourdough: {
    name: "Sourdough",
    image: sourdoughImage,
    subtitle: "The Complex Main Character",
    description:
      "You look low-key, but you are carrying forty-seven layers of personality and one oddly specific opinion about olive oil.",
  },
  brioche: {
    name: "Brioche",
    image: briocheImage,
    subtitle: "The Soft Luxury",
    description:
      "You are warm, rich, and slightly dramatic. People trust you with their feelings and their brunch plans.",
  },
  bagel: {
    name: "Bagel",
    image: bagelImage,
    subtitle: "The Reliable Chaos Orb",
    description:
      "You are practical, loyal, and impossible to intimidate. You are somehow both comforting and slightly threatening.",
  },
  croissant: {
    name: "Croissant",
    image: croissantImage,
    subtitle: "The Flaky Icon",
    description:
      "You are stylish, unpredictable, and allergic to boring routines. You enter rooms like a dramatic wind machine.",
  },
  garlicBread: {
    name: "Garlic Bread",
    image: garlicBreadImage,
    subtitle: "The Chaotic Comfort Legend",
    description:
      "You are loud, beloved, and always invited to parties. You fix bad moods and leave a powerful emotional aftertaste.",
  },
};

const quizQuestions = [
  {
    prompt: "Pick your ideal Friday night:",
    options: [
      { text: "Deep talk + cozy playlist", scores: { sourdough: 2, brioche: 1 } },
      { text: "Brunch at 9pm because time is fake", scores: { croissant: 2, brioche: 1 } },
      { text: "Board games and strategic betrayal", scores: { bagel: 2, sourdough: 1 } },
      { text: "Movie marathon and snacks for six", scores: { garlicBread: 2, bagel: 1 } },
    ],
  },
  {
    prompt: "Your social energy is:",
    options: [
      { text: "Selective but intense", scores: { sourdough: 2 } },
      { text: "Warm and people-pleasing", scores: { brioche: 2 } },
      { text: "Chaotic but dependable", scores: { bagel: 2, garlicBread: 1 } },
      { text: "Elegant in public, goblin at home", scores: { croissant: 2 } },
    ],
  },
  {
    prompt: "Choose a superpower:",
    options: [
      { text: "Reading the room instantly", scores: { sourdough: 2, brioche: 1 } },
      { text: "Making everyone laugh mid-crisis", scores: { garlicBread: 2 } },
      { text: "Perfect timing forever", scores: { bagel: 2 } },
      { text: "Effortless glamour on zero sleep", scores: { croissant: 2, brioche: 1 } },
    ],
  },
  {
    prompt: "Your reaction to drama:",
    options: [
      { text: "Analyze all sides like a detective", scores: { sourdough: 2 } },
      { text: "Bring snacks and emotional support", scores: { brioche: 2, garlicBread: 1 } },
      { text: "Solve it quickly and move on", scores: { bagel: 2 } },
      { text: "Disappear stylishly until it passes", scores: { croissant: 2 } },
    ],
  },
  {
    prompt: "Pick a dream travel vibe:",
    options: [
      { text: "Rustic town with mystery bookstores", scores: { sourdough: 2 } },
      { text: "Fancy hotel + room service", scores: { brioche: 2, croissant: 1 } },
      { text: "City crawl with a strict itinerary", scores: { bagel: 2 } },
      { text: "Beach bonfire and wild stories", scores: { garlicBread: 2, croissant: 1 } },
    ],
  },
  {
    prompt: "How do friends describe you?",
    options: [
      { text: "Wise but weird in a good way", scores: { sourdough: 2 } },
      { text: "Sweet and emotionally expensive", scores: { brioche: 2 } },
      { text: "Solid, steady, and secretly hilarious", scores: { bagel: 2 } },
      { text: "Unhinged sparkle energy", scores: { croissant: 1, garlicBread: 2 } },
    ],
  },
  {
    prompt: "Your morning routine is:",
    options: [
      { text: "Slow and intentional", scores: { sourdough: 2 } },
      { text: "Cozy with a treat", scores: { brioche: 2 } },
      { text: "Efficient and no-nonsense", scores: { bagel: 2 } },
      { text: "Pure chaos, somehow still chic", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
  {
    prompt: "Pick your ideal pet sidekick:",
    options: [
      { text: "A wise old cat", scores: { sourdough: 2 } },
      { text: "A fluffy spoiled dog", scores: { brioche: 2 } },
      { text: "A practical little turtle", scores: { bagel: 2 } },
      { text: "A dramatic parrot", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
  {
    prompt: "Your group project role:",
    options: [
      { text: "Strategy brain", scores: { sourdough: 2, bagel: 1 } },
      { text: "Mood manager", scores: { brioche: 2 } },
      { text: "Deadline enforcer", scores: { bagel: 2 } },
      { text: "Wildcard idea machine", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
  {
    prompt: "Choose a comfort food vibe:",
    options: [
      { text: "Something rustic and warm", scores: { sourdough: 2 } },
      { text: "Sweet and buttery", scores: { brioche: 2 } },
      { text: "Classic and filling", scores: { bagel: 2 } },
      { text: "Loud, cheesy, and glorious", scores: { garlicBread: 2, croissant: 1 } },
    ],
  },
  {
    prompt: "Pick a weather mood:",
    options: [
      { text: "Crisp cloudy morning", scores: { sourdough: 2 } },
      { text: "Golden sunlight", scores: { brioche: 2 } },
      { text: "Steady light rain", scores: { bagel: 2 } },
      { text: "Windstorm with dramatic skies", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
  {
    prompt: "How do you text people?",
    options: [
      { text: "Thoughtful paragraph", scores: { sourdough: 2 } },
      { text: "Gentle check-ins and hearts", scores: { brioche: 2 } },
      { text: "Short and useful", scores: { bagel: 2 } },
      { text: "Memes, voice notes, dramatic timing", scores: { croissant: 1, garlicBread: 2 } },
    ],
  },
  {
    prompt: "Your playlist energy:",
    options: [
      { text: "Indie + lyrical depth", scores: { sourdough: 2 } },
      { text: "Warm pop and nostalgia", scores: { brioche: 2 } },
      { text: "Reliable classics", scores: { bagel: 2 } },
      { text: "Genre roulette", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
  {
    prompt: "What are you bringing to a potluck?",
    options: [
      { text: "Homemade artisan thing", scores: { sourdough: 2 } },
      { text: "Beautiful dessert", scores: { brioche: 2 } },
      { text: "Something everyone actually eats", scores: { bagel: 2 } },
      { text: "Garlic monster masterpiece", scores: { garlicBread: 2, croissant: 1 } },
    ],
  },
  {
    prompt: "Your conflict style:",
    options: [
      { text: "I want to understand first", scores: { sourdough: 2 } },
      { text: "Keep the peace, then process later", scores: { brioche: 2 } },
      { text: "Direct and fair", scores: { bagel: 2 } },
      { text: "Big feelings, quick recovery", scores: { croissant: 2, garlicBread: 1 } },
    ],
  },
];

const initialScores = {
  sourdough: 0,
  brioche: 0,
  bagel: 0,
  croissant: 0,
  garlicBread: 0,
};

function mergeScores(current, incoming) {
  const next = { ...current };
  Object.entries(incoming).forEach(([bread, value]) => {
    next[bread] = (next[bread] || 0) + value;
  });
  return next;
}

export default function BreadQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const [finished, setFinished] = useState(false);

  const totalQuestions = quizQuestions.length;
  const activeQuestion = quizQuestions[step];

  const resultKey = useMemo(() => {
    if (!finished) return null;

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return ranked[0]?.[0] || "brioche";
  }, [finished, scores]);

  const result = resultKey ? breadProfiles[resultKey] : null;

  const handleAnswer = (option) => {
    const updatedScores = mergeScores(scores, option.scores);
    setScores(updatedScores);

    if (step + 1 >= totalQuestions) {
      setFinished(true);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
    setScores(initialScores);
    setFinished(false);
  };

  return (
    <ArchiveLayout themeId="celestial">
      <section className="bread-quiz-shell">
        <div className="bread-quiz-top">
          <Link to="/extras" className="bread-quiz-back-link">
            Back To Extras
          </Link>
          <p className="bread-quiz-kicker">Comedy Quiz</p>
          <h1 className="bread-quiz-title">What Type of Bread Are You?</h1>
          <p className="bread-quiz-subtitle">
            Absolutely scientific personality diagnostics, baked fresh.
          </p>
        </div>

        {!finished ? (
          <div className="bread-quiz-card">
            <div className="bread-quiz-progress-wrap">
              <span>
                Question {step + 1} of {totalQuestions}
              </span>
              <div className="bread-quiz-progress-bar">
                <div
                  className="bread-quiz-progress-fill"
                  style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="bread-quiz-question">{activeQuestion.prompt}</h2>

            <div className="bread-quiz-options">
              {activeQuestion.options.map((option) => (
                <button
                  key={option.text}
                  type="button"
                  className="bread-quiz-option"
                  onClick={() => handleAnswer(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bread-quiz-result-card">
            <p className="bread-quiz-result-kicker">Your Bread Identity</p>
            <img
              className="bread-quiz-result-image"
              src={result.image}
              alt={result.name}
            />
            <h2 className="bread-quiz-result-title">{result.name}</h2>
            <p className="bread-quiz-result-subtitle">{result.subtitle}</p>
            <p className="bread-quiz-result-description">{result.description}</p>

            <div className="bread-quiz-result-actions">
              <button type="button" className="bread-quiz-btn" onClick={handleReset}>
                Retake Quiz
              </button>
              <Link to="/extras" className="bread-quiz-btn bread-quiz-btn--ghost">
                Back To Extras
              </Link>
            </div>
          </div>
        )}
      </section>
    </ArchiveLayout>
  );
}
