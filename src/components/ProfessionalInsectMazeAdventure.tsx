"use client"


import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertCircle, Trophy, VolumeX, Volume2, LogOut, CheckCircle, XCircle, Play, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaticImageData } from 'next/image'
import confetti from 'canvas-confetti'


import BackgroundMaze from '../Images/BackgroundMaze.jpg'
import AntImage from '../Images/ant.jpg'
import AssassinBugImage from '../Images/assassinbug.jpg'
import ButterflyImage from '../Images/butterfly.jpg'
import HoneybeeImage from '../Images/honeybee.jpg'
import HornetImage from '../Images/hornet.jpg'
import MothImage from '../Images/moth.jpg'
import StickInsectImage from '../Images/stickinsect.jpg'
import StinkbugImage from '../Images/stinkbug.jpg'
import FrontPageImage from '../Images/FrontPage.png'
import BirdImage from '../Images/Bird.jpg'


type Language = 'english' | 'marathi';


interface Insect {
  name: string;
  defense: string;
  options: string[];
  fact: string;
  image: StaticImageData;
}


type InsectData = {
  [key in Language]: Insect[];
};


const insects: InsectData = {
  english: [
    {
      name: "Moths (Oleander Hawk Moth)",
      defense: "Camouflage",
      options: ["Camouflage", "Spraying Chemicals", "Sudden Movement"],
      fact: "Moths are masters of camouflage. They can perfectly match the substrate they rest on (tree bark, wall, leaves etc.)",
      image: MothImage,
    },
    {
      name: "Stink Bug (Brown marmorated stink bug)",
      defense: "Chemical",
      options: ["Chemical", "Bite", "Camouflage"],
      fact: "It releases bad odor which is toxic and discourages predators like birds and lizards.",
      image: StinkbugImage,
    },
    {
      name: "Butterflies (Danaid Eggfly female)",
      defense: "Mimicry",
      options: ["Mimicry", "Camouflage", "Toxic chemical"],
      fact: "Danaid Eggfly female looks like the completely distasteful Plain tiger butterfly to get away from predators.",
      image: ButterflyImage,
    },
    {
      name: "Ants (Weaver ants)",
      defense: "Strong bite",
      options: ["Strong bite", "Sting", "Bad odor"],
      fact: "Weaver Ants spray formic acid on their bite wounds to inflict pain",
      image: AntImage,
    },
    {
      name: "Assassin bug",
      defense: "Venom",
      options: ["Venom", "Chemical", "Sacrificing a leg"],
      fact: "Assassin bugs produce offensive and defensive venoms in two distinct glands, an evolutionary adaptation that has not been described for any other venomous animal.",
      image: AssassinBugImage,
    },
    {
      name: "Stick insect",
      defense: "Sacrificing a leg",
      options: ["Sacrificing a leg", "Camouflage", "Mimicry"],
      fact: "The Stick insects can sacrifice their limb and run away when a predator tries to catch them. They can regrow a leg just like Lizard's tail.",
      image: StickInsectImage,
    },
    {
      name: "Honey Bee",
      defense: "Sting",
      options: ["Sting", "Bite", "Power in numbers"],
      fact: "Unlike wasps, bees die shortly after delivering a sting.",
      image: HoneybeeImage,
    },
    {
      name: "Hornet",
      defense: "Power in numbers",
      options: ["Power in numbers", "Camouflage", "Bite"],
      fact: "Hornets live in huge colonies and possess swarm intelligence like ants and termites.",
      image: HornetImage,
    }
  ],
  marathi: [
    {
      name: "पतंग (ओलिएंडर हॉक पतंग)",
      defense: "छद्मावरण",
      options: ["छद्मावरण", "रासायनिक फवारणी", "अचानक हालचाल"],
      fact: "पतंग छद्मावरणाचे मास्टर आहेत. ते ज्या आधारावर विश्रांती घेतात (झाडाची साल, भिंत, पाने इत्यादी) त्याच्याशी पूर्णपणे जुळवून घेऊ शकतात.",
      image: MothImage,
    },
    {
      name: "दुर्गंधी किडा (ब्राउन मार्मोरेटेड स्टिंक बग)",
      defense: "रासायनिक",
      options: ["रासायनिक", "चावा", "छद्मावरण"],
      fact: "तो वाईट वास सोडतो जो विषारी असतो आणि पक्षी आणि सरडे यांसारख्या शिकाऱ्यांना निरुत्साहित करतो.",
      image: StinkbugImage,
    },
    {
      name: "फुलपाखरू (डॅनाइड एगफ्लाय मादी)",
      defense: "अनुकरण",
      options: ["अनुकरण", "छद्मावरण", "विषारी रसायन"],
      fact: "डॅनाइड एगफ्लाय मादी शिकाऱ्यांपासून वाचण्यासाठी पूर्णपणे अरुचिकर प्लेन टायगर फुलपाखरासारखी दिसते.",
      image: ButterflyImage,
    },
    {
      name: "मुंग्या (वीव्हर मुंग्या)",
      defense: "मजबूत चावा",
      options: ["मजबूत चावा", "डंख", "वाईट वास"],
      fact: "वीव्हर मुंग्या त्यांच्या चाव्याच्या जखमांवर फॉर्मिक अॅसिड फवारतात ज्यामुळे वेदना होतात.",
      image: AntImage,
    },
    {
      name: "घातक किडा",
      defense: "विष",
      options: ["विष", "रासायनिक", "पाय त्यागणे"],
      fact: "घातक किडे दोन वेगळ्या ग्रंथींमध्ये आक्रमक आणि संरक्षणात्मक विष तयार करतात, हे एक उत्क्रांतीशील अनुकूलन आहे जे इतर कोणत्याही विषारी प्राण्यासाठी वर्णन केलेले नाही.",
      image: AssassinBugImage,
    },
    {
      name: "काडी किडा",
      defense: "पाय त्यागणे",
      options: ["पाय त्यागणे", "छद्मावरण", "अनुकरण"],
      fact: "काडी किडे जेव्हा शिकारी त्यांना पकडण्याचा प्रयत्न करतो तेव्हा त्यांचा अवयव त्याग करू शकतात आणि पळून जाऊ शकतात. ते पाली सरड्याच्या शेपटीसारखे पाय पुन्हा वाढवू शकतात.",
      image: StickInsectImage,
    },
    {
      name: "मधमाशी",
      defense: "डंख",
      options: ["डंख", "चावा", "संख्येत शक्ती"],
      fact: "वॉस्प्सच्या विपरीत, मधमाश्या डंख दिल्यानंतर लवकरच मरतात.",
      image: HoneybeeImage,
    },
    {
      name: "भोळ",
      defense: "संख्येत शक्ती",
      options: ["संख्येत शक्ती", "छद्मावरण", "चावा"],
      fact: "भोळ प्रचंड वसाहतींमध्ये राहतात आणि मुंग्या आणि वाळवीसारखी गट बुद्धिमत्ता असतात.",
      image: HornetImage,
    }
  ]
};


const mazePositions = [
  { top: '85%', left: '10%' },
  { top: '70%', left: '25%' },
  { top: '55%', left: '15%' },
  { top: '40%', left: '30%' },
  { top: '25%', left: '45%' },
  { top: '40%', left: '60%' },
  { top: '55%', left: '75%' },
  { top: '70%', left: '90%' },
];


export default function ProfessionalInsectMazeAdventure() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [language, setLanguage] = useState<Language>('english')
  const [showLanguageSelection, setShowLanguageSelection] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [showFrontPage, setShowFrontPage] = useState(true)
  const [showFacts, setShowFacts] = useState(false)
  const [showGameRules, setShowGameRules] = useState(false)
  const [showAnswerPopup, setShowAnswerPopup] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [showLostProgressMessage, setShowLostProgressMessage] = useState(false)


  const frontPageAudioRef = useRef<HTMLAudioElement>(null)
  const birdMoveAudioRef = useRef<HTMLAudioElement>(null)
  const correctAnswerAudioRef = useRef<HTMLAudioElement>(null)
  const incorrectAnswerAudioRef = useRef<HTMLAudioElement>(null)
  const gameWinAudioRef = useRef<HTMLAudioElement>(null)


  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage)
    setShowLanguageSelection(false)
    setShowRules(true)
  }


  const handleStart = useCallback(() => {
    setShowFrontPage(false)
    setShowLanguageSelection(true)
    if (frontPageAudioRef.current) {
      frontPageAudioRef.current.play().catch(error => console.error("Audio playback failed:", error))
    }
  }, [])


  const handleStartGame = useCallback(() => {
    setGameStarted(true)
    setShowRules(false)
    setCurrentPosition(0)
    setScore(0)
    setGameOver(false)
    setMessage('')
    setSelectedAnswer('')
    setShowCorrectAnswer(false)
    if (frontPageAudioRef.current) {
      frontPageAudioRef.current.pause()
      frontPageAudioRef.current.currentTime = 0
    }
    if (birdMoveAudioRef.current) {
      birdMoveAudioRef.current.play().catch(error => console.error("Bird move audio playback failed:", error))
    }
  }, [])


  const handleAnswer = useCallback((option: string) => {
    setSelectedAnswer(option)
    const isCorrect = option === insects[language][currentPosition].defense
    setIsAnswerCorrect(isCorrect)
    if (isCorrect) {
      setScore(prevScore => prevScore + 50)
      setMessage(language === 'english' ? 'Correct! +50 points' : 'बरोबर! +५० गुण')
      setShowCorrectAnswer(true)
      if (correctAnswerAudioRef.current) correctAnswerAudioRef.current.play().catch(error => console.error("Correct answer audio playback failed:", error))
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      setScore(prevScore => Math.max(0, prevScore - 20))
      setMessage(language === 'english' ? 'Incorrect. -20 points.' : 'चूक. -२० गुण.')
      setShowCorrectAnswer(false)
      if (incorrectAnswerAudioRef.current) incorrectAnswerAudioRef.current.play().catch(error => console.error("Incorrect answer audio playback failed:", error))
    }
    setShowAnswerPopup(true)
  }, [currentPosition, language])


  const handleNextQuestion = useCallback(() => {
    setShowQuiz(false)
    setShowAnswerPopup(false)
    setMessage('')
    setSelectedAnswer('')
    setShowCorrectAnswer(false)
    setIsMoving(true)
    setCurrentPosition(prevPosition => {
      if (prevPosition === insects[language].length - 1) {
        setGameOver(true)
        if (gameWinAudioRef.current) gameWinAudioRef.current.play().catch(error => console.error("Game win audio  playback failed:", error))
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return prevPosition
      }
      if (birdMoveAudioRef.current) {
        birdMoveAudioRef.current.play().catch(error => console.error("Bird move audio playback failed:", error))
      }
      return prevPosition + 1
    })
  }, [language])


  useEffect(() => {
    if (gameStarted && currentPosition < insects[language].length) {
      const timer = setTimeout(() => {
        setShowQuiz(true)
        setIsMoving(false)
      }, 3000)


      return () => clearTimeout(timer)
    }
  }, [gameStarted, currentPosition, language])


  const toggleMute = () => {
    setIsMuted(!isMuted)
    ;[frontPageAudioRef, birdMoveAudioRef, correctAnswerAudioRef, incorrectAnswerAudioRef, gameWinAudioRef].forEach(ref => {
      if (ref.current) {
        ref.current.muted = !isMuted
      }
    })
  }


  const handleShowFacts = () => {
    setShowFacts(true)
  }


  const handleShowGameRules = () => {
    setShowGameRules(true)
  }


  const handleCloseFacts = () => {
    setShowFacts(false)
  }


  const handleCloseGameRules = () => {
    setShowGameRules(false)
  }


  const confirmExit = () => {
    setGameStarted(false)
    setShowExitConfirmation(false)
    setShowFrontPage(true)
    setShowLostProgressMessage(true)
    if (frontPageAudioRef.current) {
      frontPageAudioRef.current.play().catch(error => console.error("Front page audio playback failed:", error))
    }
  }


  const handleInsectClick = (index: number) => {
    if (index !== currentPosition) {
      setShowLostProgressMessage(true)
    }
  }


  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif" }}>
      {showFrontPage ? (
        <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
          <Image
            src={FrontPageImage}
            alt="Forest background with butterflies"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div
            className="z-10 text-center space-y-10 p-12 rounded-3xl shadow-xl bg-cover bg-center"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
    <div className="relative">
  {/* Green background shadow container */}
  {/* <div className="absolute inset-0 bg-green-700/30 rounded-lg blur-md" /> */}


  {/* Foreground content with a greenish white tint */}
  <div className="w-full bg-green-600 rounded-lg hover:bg-green-700 shadow-lg transition transform hover:scale-105 duration-150 ease-in-out hover:shadow-xl p-6">
  <h2 className="text-white text-2xl font-bold">Insect Defense Mechanism</h2>
  <p className="text-white mt-2 text-lg">
    Learn how insects protect themselves with fascinating defensive strategies.

  </p>
  
</div>
</div>
            {/* <h2 className="text-xl font-extrabold uppercase tracking-wide text-Green drop-shadow-[0_1px_8px_rgba(0,128,0,0.6)] hover:scale-105 transition-transform duration-300">
              Quiz Adventure
            </h2> */}
            <div className="flex flex-col items-center space-y-6">
              <Button
                className="w-64 h-16 text-xl rounded-full bg-green-700 text-white hover:bg-green-400 hover:scale-105 shadow-lg transition duration-300 ease-in-out"
                onClick={handleStart}
              >
                <Play className="mr-2 h-6 w-6" /> Start Adventure
              </Button>
              {/* <Button
                className="w-64 h-16 text-xl rounded-full bg-teal-400 text-white hover:bg-green-400 hover:scale-105 shadow-lg transition duration-300 ease-in-out"
                onClick={handleShowFacts}
              >
                <Info className="mr-2 h-6 w-6" /> Fun Facts
              </Button> */}
              <Button
                className="w-64 h-16 text-xl rounded-full bg-teal-500 text-white hover:bg-green-400 hover:scale-105 shadow-lg transition duration-300 ease-in-out"
                onClick={handleShowGameRules}
              >
                <Info className="mr-2 h-6 w-6" /> Game Rules
              </Button>
              <Button
            onClick={toggleMute}
            className="w-64 h-16 text-xl rounded-full bg-green-700 text-white hover:bg-green-400 hover:scale-105 shadow-lg transition duration-300 ease-in-out"
            >
            {isMuted ? <VolumeX className="mr-2 h-6 w-6" /> : <Volume2 className="mr-2 h-6 w-6" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow relative overflow-hidden">
            <Image
              src={BackgroundMaze}
              alt="Forest Maze Background"
              layout="fill"
              objectFit="cover"
              priority
            />
           
            <motion.div
              className="absolute top-4 left-1/2 rounded-full transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg z-20"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-3xl font-bold rounded-full">
                {language === 'english' ? `Score: ${score}` : `गुण: ${score}`}
              </span>
            </motion.div>
           
            {insects[language].map((insect, index) => (
              <div
                key={index}
                className={`absolute ${index === currentPosition ? 'animate-pulse' : ''} overflow-hidden shadow-md transition-transform duration-200 hover:scale-110`}
                style={{
                  top: mazePositions[index].top,
                  left: mazePositions[index].left,
                  width: '10vw',
                  height: '10vw',
                  maxWidth: '80px',
                  maxHeight: '80px',
                  borderRadius: '50%',
                }}
                onClick={() => handleInsectClick(index)}
              >
                <Image
                  src={insect.image}
                  alt={insect.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}


            {gameStarted && !gameOver && (
              <AnimatePresence>
                <motion.div
                  key={currentPosition}
                  className="absolute w-1/4 h-1/4 max-w-[160px] max-h-[160px] z-30"
                  initial={{
                    top: mazePositions[currentPosition - 1]?.top || mazePositions[currentPosition].top,
                    left: mazePositions[currentPosition - 1]?.left || mazePositions[currentPosition].left,
                    scale: 1
                  }}
                  animate={{
                    top: `calc(${mazePositions[currentPosition].top} - 10%)`,
                    left: mazePositions[currentPosition].left,
                    scale: isMoving ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <Image
                    src={BirdImage}
                    alt="Bird"
                    layout="fill"
                    objectFit="contain"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>


          <div className="bg-green-800 p-2 shadow-md relative">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">
                {language === 'english' ? "Insect Defense Maze" : "कीटक संरक्षण चक्रव्यूह"}
              </h1>
              <div className="flex items-center space-x-2">
                <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white hover:bg-green-700">
                  {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
                <Button
                  onClick={() => setShowExitConfirmation(true)}
                  variant="ghost"
                  className="text-white hover:bg-green-700"
                >
                  Exit
                </Button>
              </div>
            </div>
            {!gameStarted && (
              <Button onClick={handleStart} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out">
                {language === 'english' ? 'Start Adventure' : 'साहस सुरू करा'}
              </Button>
            )}
          </div>
        </>
      )}


      <Dialog open={showLanguageSelection} onOpenChange={setShowLanguageSelection}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-r from-green-300 to-green-500 text-Black rounded-3xl shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Select Language / भाषा निवडा  🌎
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleLanguageSelect('english')}
              className="w-full bg-green-600 rounded-full hover:bg-green-700 text-white text-lg font-bold py-3 px-6 shadow-lg transition transform hover:scale-105 duration-150 ease-in-out hover:shadow-xl"
            >
              English
            </Button>
            <Button
              onClick={() => handleLanguageSelect('marathi')}
              className="w-full bg-green-600 rounded-full hover:bg-green-700 text-white text-lg font-bold py-3 px-6 shadow-lg transition transform hover:scale-105 duration-150 ease-in-out hover:shadow-xl"
            >
              मराठी
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 border border-green-200 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800">
              {language === 'english' ? 'Game Rules' : 'खेळाचे नियम'}
            </DialogTitle>
          </DialogHeader>
          <motion.div
            className="space-y-4 text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {language === 'english' ? (
              <>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                  Welcome to the Insect Defense Maze Adventure!
                </motion.p>
                <motion.ul className="list-disc pl-6 space-y-2">
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    Navigate through the maze and encounter various insects.
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    For each insect, choose the correct defense mechanism.
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                    Correct answer: +50 points
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }}>
                    Incorrect answer: -20 points
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
                    Learn about different insect defense strategies.
                  </motion.li>
                </motion.ul>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.5 }}>
                  Good luck and enjoy your learning experience!
                </motion.p>
              </>
            ) : (
              <>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                  कीटक संरक्षण चक्रव्यूह साहसात आपले स्वागत आहे!
                </motion.p>
                <motion.ul className="list-disc pl-6 space-y-2">
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    चक्रव्यूहातून मार्ग काढा आणि विविध कीटकांना भेटा.
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    प्रत्येक कीटकासाठी योग्य संरक्षण यंत्रणा निवडा.
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                    बरोबर उत्तर: +५० गुण
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.5 }}>
                    चुकीचे उत्तर: -२० गुण
                  </motion.li>
                  <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
                    विविध कीटक संरक्षण धोरणांबद्दल जाणून घ्या.
                  </motion.li>
                </motion.ul>
                <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.5 }}>
                  शुभेच्छा आणि आपला शिक्षण अनुभव आनंददायी होवो!
                </motion.p>
              </>
            )}
          </motion.div>
          <DialogFooter>
            <Button onClick={handleStartGame} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out">
              {language === 'english' ? 'Start' : 'खेळ सुरू करा'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <AnimatePresence>
        {showQuiz && (
          <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
            <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-y-auto bg-white text-gray-800 border border-green-200 rounded-lg p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-green-800 mb-4">{insects[language][currentPosition].name}</DialogTitle>
                  <DialogDescription className="text-xl text-green-600 mb-6">
                    {language === 'english' ? 'Select the correct defense mechanism:' : 'योग्य संरक्षण यंत्रणा निवडा:'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-green-300"
                  >
                    <Image
                      src={insects[language][currentPosition].image}
                      alt={insects[language][currentPosition].name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                  <div className="flex flex-col justify-center space-y-6">
                    {insects[language][currentPosition].options.map((option, index) => (
                      <motion.div
                        key={option}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      >
                        <Button
                          onClick={() => handleAnswer(option)}
                          variant="secondary"
                          disabled={selectedAnswer !== ''}
                          className={`w-full py-3 text-lg font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105
                            bg-green-100 hover:bg-green-200 text-green-800`}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {showAnswerPopup && (
          <Dialog open={showAnswerPopup} onOpenChange={setShowAnswerPopup}>
            <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-y-auto bg-white text-gray-800 border border-green-200 rounded-lg p-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <DialogHeader>
                  <DialogTitle className={`text-3xl font-bold mb-4 ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isAnswerCorrect
                      ? (language === 'english' ? 'Correct!' : 'बरोबर!')
                      : (language === 'english' ? 'Incorrect' : 'चूक')}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {isAnswerCorrect ? (
                    <>
                      <p className="text-xl">{message}</p>
                      <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-lg font-semibold mb-2">{language === 'english' ? 'Fact:' : 'माहिती:'}</p>
                        <p>{insects[language][currentPosition].fact}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xl">{message}</p>
                      <p className="text-lg">
                        {language === 'english' ? 'The correct answer is:' : 'बरोबर उत्तर आहे:'}
                        <span className="font-bold"> {insects[language][currentPosition].defense}</span>
                      </p>
                      <div className="bg-red-100 p-4 rounded-lg">
                        <p className="text-lg font-semibold mb-2">{language === 'english' ? 'Fact:' : 'माहिती:'}</p>
                        <p>{insects[language][currentPosition].fact}</p>
                      </div>
                    </>
                  )}
                  <div className="mt-6 text-center">
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      {language === 'english' ? 'Next' : 'पुढे'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>


      <Dialog open={gameOver} onOpenChange={setGameOver}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 border border-green-200 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 flex items-center">
              {language === 'english' ? 'Game Over!' : 'खेळ संपला!'} <Trophy className="ml-2 text-yellow-500" />
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg">
              {language === 'english'
                ? `Congratulations! You've completed the Insect Defense Maze.`
                : `अभिनंदन! आपण कीटक संरक्षण चक्रव्यूह पूर्ण केला आहे.`}
            </p>
            <p className="text-xl font-bold">
              {language === 'english' ? `Final Score: ${score}` : `अंतिम गुण: ${score}`}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setGameOver(false)
              setShowFrontPage(true)
              setGameStarted(false)
              if (frontPageAudioRef.current) {
                frontPageAudioRef.current.play().catch(error => console.error("Front page audio playback failed:", error))
              }
            }} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out">
              {language === 'english' ? 'Back to Main Menu' : 'मुख्य मेनूकडे परत जा'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={showExitConfirmation} onOpenChange={setShowExitConfirmation}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 border border-green-200 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800">
              {language === 'english' ? 'Exit Game?' : 'खेळातून बाहेर पडायचे?'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-lg">
            {language === 'english'
              ? 'Are you sure you want to exit the game? Your progress will be lost.'
              : 'तुम्हाला खेळातून बाहेर पडायचे आहे का? तुमची प्रगती गमावली जाईल.'}
          </p>
          <DialogFooter className="flex justify-end space-x-2">
            <Button onClick={() => setShowExitConfirmation(false)} variant="outline">
              {language === 'english' ? 'Cancel' : 'रद्द करा'}
            </Button>
            <Button onClick={confirmExit} variant="destructive">
              {language === 'english' ? 'Exit' : 'बाहेर पडा'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={showFacts} onOpenChange={setShowFacts}>
  <DialogContent className="max-w-[80vw] max-h-[80vh] bg-green-100 text-gray-900 border border-green-300 rounded-3xl p-8 shadow-xl overflow-auto">
    <DialogHeader>
      <DialogTitle
        className="text-2xl font-bold text-green-800"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {language === 'english' ? 'Insect Defense Facts' : 'कीटक संरक्षण तथ्ये'}
      </DialogTitle>
    </DialogHeader>


    <div className="mt-4 space-y-6 text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
      {insects[language].map((insect, index) => (
        <div key={index} className="border-b border-gray-300 pb-4 last:border-b-0">
          <h3 className="text-2xl font-semibold text-green-800 mb-2">{insect.name}</h3>
          <p>{insect.fact}</p>
        </div>
      ))}
    </div>


    <DialogFooter className="mt-6 flex justify-center">
      <Button
        onClick={handleCloseFacts}
        className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
        style={{ fontFamily: 'Verdana, sans-serif' }}
      >
        {language === 'english' ? 'Close' : 'बंद करा'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


      <Dialog open={showGameRules} onOpenChange={setShowGameRules}>
        <DialogContent className="max-w-[80vw] max-h-[80vh] bg-green-100 text-gray-900 border border-green-300 rounded-3xl p-8 shadow-xl overflow-auto">
          <DialogHeader>
            <div className="flex items-center justify-center">
              <DialogTitle
                className="text-7xl font-extrabold text-center text-green-800"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                {language === 'english' ? 'Game Rules' : 'खेळाचे नियम'}
              </DialogTitle>
            </div>
          </DialogHeader>
         
          <div className="mt-8 space-y-6 text-2xl leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {language === 'english' ? (
              <>
                <p className="text-3xl font-bold">Welcome to the Insect Defense Maze Adventure!</p>
                <ul className="list-disc pl-10 space-y-4">
                  <li className="text-2xl">Navigate through the maze and encounter various insects.</li>
                  <li className="text-2xl">For each insect, choose the correct defense mechanism.</li>
                  <li className="text-2xl">Correct answer: +50 points</li>
                  <li className="text-2xl">Incorrect answer: -20 points</li>
                  <li className="text-2xl">Learn about different insect defense strategies.</li>
                </ul>
                <p className="text-3xl font-bold">Good luck and enjoy your learning experience!</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">कीटक संरक्षण चक्रव्यूह साहसात आपले स्वागत आहे!</p>
                <ul className="list-disc pl-10 space-y-4">
                  <li className="text-2xl">चक्रव्यूहातून मार्ग काढा आणि विविध कीटकांना भेटा.</li>
                  <li className="text-2xl">प्रत्येक कीटकासाठी योग्य संरक्षण यंत्रणा निवडा.</li>
                  <li className="text-2xl">बरोबर उत्तर: +५० गुण</li>
                  <li className="text-2xl">चुकीचे उत्तर: -२० गुण</li>
                  <li className="text-2xl">विविध कीटक संरक्षण धोरणांबद्दल जाणून घ्या.</li>
                </ul>
                <p className="text-3xl font-bold">शुभेच्छा आणि आपला शिक्षण अनुभव आनंददायी होवो!</p>
              </>
            )}
          </div>
         
          <DialogFooter className="mt-8 flex justify-center">
            <Button
              onClick={handleCloseGameRules}
              className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
              style={{ fontFamily: 'Verdana, sans-serif' }}
            >
              {language === 'english' ? 'Back' : 'मागे'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={showLostProgressMessage} onOpenChange={setShowLostProgressMessage}>
        <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 border border-green-200 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">
              {language === 'english' ? 'Progress Lost' : 'प्रगती गमावली'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-lg">
            {language === 'english'
              ?  'You have lost your progress. Start again from the beginning.'
              : 'तुमची प्रगती गमावली गेली आहे. पुन्हा सुरुवातीपासून सुरू करा.'}
          </p>
          <DialogFooter>
            <Button onClick={() => {
              setShowLostProgressMessage(false)
              setGameStarted(false)
              setShowFrontPage(true)
              setCurrentPosition(0)
              setScore(0)
            }} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out">
              {language === 'english' ? 'OK' : 'ठीक आहे'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <audio ref={frontPageAudioRef} src="/audio/GameStart.mp3" loop />
      <audio ref={birdMoveAudioRef} src="/audio/BirdMove.mp3" />
      <audio ref={correctAnswerAudioRef} src="/audio/CorrectAnswer.mp3" />
      <audio ref={incorrectAnswerAudioRef} src="/audio/IncorrectAnswer.mp3" />
      <audio ref={gameWinAudioRef} src="/audio/GameWin.mp3" />
    </div>
  )
}
