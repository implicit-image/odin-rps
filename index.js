

const items = ["ROCK", "PAPER", "SCISSORS"]
const [ROCK, PAPER, SCISSORS] = items


function getComputerChoice() {
  return items[Math.round(Math.random() * (items.length - 1))]
}


function getHumanChoice(correctionNeeded) {
  let message = correctionNeeded
      ? `Incorrect value entered. Please enter correct value :)`
      : "We are playing rock paper scissors.\nWhats your play?"
  let choice = prompt(message)
  if (items.includes(choice.toUpperCase()))
    return choice.toUpperCase()
  return -1
}

function fight(choices) {
  // early out
  if (choices.player == -1 || choices.computer == -1) return -1
  if (choices.player == choices.computer) return "draw"

  if (choices.player == ROCK) {
    if (choices.computer == PAPER) return "computer"
    if (choices.computer == SCISSORS) return "player"
  } else if (choices.player == PAPER) {
    if (choices.computer == SCISSORS) return "computer"
    if (choices.computer == ROCK) return "player"
  } else if (choices.player == SCISSORS) {
    if (choices.computer == ROCK) return "computer"
    if (choices.computer == PAPER) return "player"
  } else { // choices have invalid values
    return -1
  }
}


function playRound(errored, score, choices, scoreLimit) {
  choices.computer = getComputerChoice()
  choices.player = getHumanChoice(errored)
  let res = fight(choices)
  if (res === -1) {
    console.log("ERROR: invalid values in choices")
    return -1
  } else {
    console.log(`${choices.player} vs ${choices.computer}\n`)
    if (res == "draw") {
      console.log("DRAW!!!! NO POINTS!")
      return 1
    } else {
      let curr = ++score[res]
      console.log(`fight won by ${res}!!!`)
      console.log(`player has ${score.player} points`)
      console.log(`computer has ${score.computer} points`)
      if (curr >= scoreLimit) {
        console.log(`THE WINNER IS ${res}`)
        return 0
      }
    }
  }
}


function mainLoop() {
  let errored = false
  let score = {
    player: 0,
    computer: 0
  }

  let choices = {
    player: "",
    computer: ""
  }

  let scoreLimit = 3
  while (score.player < scoreLimit && score.computer < scoreLimit) {
    res = playRound(errored, score, choices, scoreLimit)
    if (res == -1) errored = true
  }
}



mainLoop()
