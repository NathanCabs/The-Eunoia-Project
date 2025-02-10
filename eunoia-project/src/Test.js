import './Login.css';

function Test() {
    return(
        /* Show result by the end and Categorize home by disorder
        */
        <div class="game-quiz-container">

        <div class="game-details-container">
            <h1>Score : <span id="player-score"></span> / 10</h1>
            <h1> Question : <span id="question-number"></span> / 10</h1>
        </div>

        <div class="game-question-container">
            <h1 id="display-question"></h1>
        </div>

        <div class="game-options-container">

           <div class="modal-container" id="option-modal">

                <div class="modal-content-container">
                     <h1>Please Pick An Option</h1>

                     <div class="modal-button-container">
                        <button onclick="closeOptionModal()">Continue</button>
                    </div>

                </div>

           </div>

            <span>
                <input type="radio" id="option-one" name="option" class="radio" value="optionA" />
                <label for="option-one" class="option" id="option-one-label"></label>
            </span>


            <span>
                <input type="radio" id="option-two" name="option" class="radio" value="optionB" />
                <label for="option-two" class="option" id="option-two-label"></label>
            </span>


            <span>
                <input type="radio" id="option-three" name="option" class="radio" value="optionC" />
                <label for="option-three" class="option" id="option-three-label"></label>
            </span>


            <span>
                <input type="radio" id="option-four" name="option" class="radio" value="optionD" />
                <label for="option-four" class="option" id="option-four-label"></label>
            </span>


        </div>

        <div class="next-button-container">
            <button onclick="handleNextQuestion()">Next Question</button>
        </div>

    </div>
    )
}

export default Test;