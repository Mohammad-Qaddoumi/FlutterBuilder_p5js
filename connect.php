<?php 

?>
<style>
    * {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    }

    body {
    margin: 0;
    background-color: #ffb0a7;
    }

    .container {
    width: 300px;
    height: 300px;
    background-color: #ffdeda;
    border-radius: 50%;
    z-index: -1;
    }

    .ground {
    width: 100%;
    height: 6px;
    border-radius: 6px;
    background-color: #514f62;
    top: 100%;
    }

    .rock {
    background-color: #ae8e83;
    width: 10px;
    height: 7px;
    left: -80%;
    top: -15px;
    border: 5px solid #514f62;
    border-radius: 90px 90px 0px 0px;
    }

    .cup {
    width: 200px;
    height: 200px;
    top: 100px;
    }

    .bottom {
    background-color: #dcc1b7;
    width: 120px;
    height: 19px;
    top: 85%;
    border-bottom: 5px solid #514f62;
    border-left: 5px solid #514f62;
    border-right: 5px solid #514f62;
    }

    .body {
    background-color: #ffebe3;
    width: 200px;
    height: 200px;
    top: -32%;
    border-radius: 10px 10px 45px 45px;
    border: 5px solid #514f62;
    left: -2.5%;
    }

    .TPart {
    height: 20px;
    background-color: #d15b51;
    border-bottom: 5px solid #514f62;
    border-radius: 4px 4px 0px 0px;
    top: -87.5%;
    }

    .BPart {
    height: 30px;
    background-color: #d15b51;
    border-top: 5px solid #514f62;
    top: 82.5%;
    border-radius: 0px 0px 45px 45px;
    }

    .handle {
    background-color: #c15147;
    width: 200px;
    left: 25%;
    top: -50%;
    border: 5px solid #514f62;
    border-radius: 0px 90px 90px 0px;
    height: 100px;
    }

    .inner {
    background-color: #ffdeda;
    width: 50%;
    height: 50%;
    left: 25%;
    border: inherit;
    border-radius: inherit;
    }

    .alpha {
    background-color: rgba(0, 0, 0, 0.05);
    width: 100px;
    height: 90%;
    left: -100px;
    border-radius: 0px 0px 0px 30px;
    }

    .coffee {
    width: 100px;
    height: 70px;
    top: 35px;
    left: 100px;
    }

    .drops {
    width: 12px;
    left: 40px;
    border-left: 4px solid #514f62;
    border-right: 4px solid #514f62;
    border-bottom: 4px solid #514f62;
    border-radius: 0px 0px 90px 90px;
    background-color: #b4947d;
    }

    .drops:nth-child(2) {
    left: -10px;
    height: 30px;
    top: -40px;
    }

    .smileContainer {
    width: 140px;
    height: 100px;
    }

    .eyes {
    width: 20px;
    height: 20px;
    left: -50%;
    top: -50px;
    border-radius: 50%;
    background-color: #514f62;
    }

    .eyes:nth-child(2) {
    left: 50%;
    }

    .eyeBall {
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background-color: white;
    }

    .smile {
    width: 50px;
    height: 20px;
    background-color: white;
    top: 40px;
    border: 4px solid #514f62;
    border-bottom-left-radius: 90px;
    border-bottom-right-radius: 90px;
    }

    .vapour {
    height: 30px;
    top: -60px;
    left: -160px;
    border-radius: 10px;
    width: 10px;
    }

    .vapour:nth-child(1) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(2) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(3) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(4) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(5) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(6) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(7) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(8) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(9) {
    opacity: 1;
    animation: evaporate 700ms infinite;
    }

    .vapour:nth-child(1) {
    animation-delay: 200ms;
    }

    .vapour:nth-child(2) {
    animation-delay: 400ms;
    }

    .vapour:nth-child(3) {
    animation-delay: 600ms;
    }

    .vapour:nth-child(4) {
    animation-delay: 800ms;
    }

    .vapour:nth-child(5) {
    animation-delay: 1000ms;
    }

    .vapour:nth-child(6) {
    animation-delay: 1200ms;
    }

    .vapour:nth-child(7) {
    animation-delay: 1400ms;
    }

    .vapour:nth-child(8) {
    animation-delay: 1600ms;
    }

    .vapour:nth-child(9) {
    animation-delay: 1800ms;
    }

    .vapour:nth-child(2) {
    left: -120px;
    }

    .vapour:nth-child(3) {
    left: -80px;
    }

    .vapour:nth-child(4) {
    left: -40px;
    }

    .vapour:nth-child(5) {
    left: 0px;
    }

    .vapour:nth-child(6) {
    left: 40px;
    }

    .vapour:nth-child(7) {
    left: 80px;
    }

    .vapour:nth-child(8) {
    left: 120px;
    }

    .vapour:nth-child(9) {
    left: 160px;
    }

    .glare {
    width: 50%;
    height: 90%;
    background-color: rgba(210, 105, 30, 0.7);
    border-radius: inherit;
    }

    @keyframes evaporate {
    0% {
        transform: translateY(0px);
    }
    100% {
        opacity: 0;
        transform: translateY(-70px);
    }
    }
    .vapour > p {
    color: red;
    }
    .input-data,.input-data > form ,
    .input-data > form > *{
        position: unset;
        top:unset;
        left:unset;
        right: unset;
        left:unset;
        margin:unset;
        white-space: nowrap;
    }
    .input-data{
        z-index: 9999999;
        position:fixed;

        /* size: 10em; */
        /* margin:0.1rem; */
        left:1px;
        top:1px;
        bottom: unset;
        right: unset;
        /* font-size: 3em; */
        /* padding:0.1em; */
    }
    .input-data > form{
        position: absolute;
        padding:0.2em;
        width: 100vw;
        height: fit-content;
        top:0;
        left:0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .input-data > form > *{
        z-index: 9999999;
        margin:0.2em;
        font-size: 3em;
    }
</style>



<div class="container">
  <div class="cup">
    <div class="handle">
      <div class="inner"></div>
    </div>
    <div class="body">
      <div class="alpha"></div>
      <div class="TPart">
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="vapour">
          <p>❤</p>
        </div>
        <div class="coffee">
          <div class="drops">
            <div class="glare"></div>
          </div>
          <div class="drops">
            <div class="glare"></div>
          </div>
        </div>
      </div>
      <div class="smileContainer">
        <div class="eyes">
          <div class="eyeBall"></div>
        </div>
        <div class="eyes">
          <div class="eyeBall"></div>
        </div>
        <div class="smile"></div>
      </div>
      <div class="BPart"></div>
    </div>
    <div class="bottom"></div>
  </div>
  <div class="ground">
    <div class="rock"></div>
  </div>
</div>

<div class="input-data">
    <form action='./public/index.php' method='post'>
        <label for='email' >Email : </label>
        <input name='email' type='email' required  value='@email.com'>
        <input type='submit' value='&nbsp;&nbsp;Submit&nbsp;&nbsp;'>
    </form>
</div>