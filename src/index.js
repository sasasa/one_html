'use strict';
// import '@babel/polyfill';

// npm init -y
// npm i -D webpack webpack-cli webpack-dev-server style-loader css-loader sass-loader node-sass postcss-loader autoprefixer url-loader file-loader  babel-loader　@babel/core @babel/preset-env @babel/polyfill core-js@3 html-webpack-plugin html-loader extract-text-webpack-plugin@next
// npm install --save-dev json-server
// npx json-server --watch db.json

// npm i object-fit-images
// npm install smoothscroll-polyfill
// npm install stickyfilljs --save
// npm install fetch-polyfill  es6-promise
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import Stickyfill from 'stickyfilljs';

import "es6-promise/auto";
import "fetch-polyfill";

import './style.scss';

{
  
  const position = {};
  const obj = {};
  let timeoutId ;
  let scrollTimeoutId;
  let isScrollEnd = false;

  document.addEventListener('DOMContentLoaded', (event) => {
    const elements = document.querySelectorAll('.sticky');
    Stickyfill.add(elements);

    const mymenu = document.getElementById("navi-menu");
    const homeElement = document.getElementById('home');
    const aboutElement = document.getElementById('about');
    const productElement = document.getElementById('product');
    const contactElement = document.getElementById('contact');
    const offset = document.querySelector('header').offsetHeight;
    const contact = document.getElementById('contact'); 
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const messageElement = document.getElementById('message');
    const sendboxElement = document.getElementById('sendbox');
    const nameboxElement = document.getElementById('namebox');
    const emailboxElement = document.getElementById('emailbox');
    const messageboxElement = document.getElementById('messagebox');
    const connectingElement = document.querySelector('.connecting');
    // アニメ対象となる要素
    const targets = document.querySelectorAll('.text');

    mymenu.addEventListener('click', () => {
      menuToggle();
    });
    
    document.getElementById("sp-icon").addEventListener('click', () => {
      menuToggle();
    });
  
    // window.addEventListener("load", (event) => {
      
    // });
    setScrollPosition();
  
    let isRunning = false
    window.addEventListener('resize', () => {
      // 呼び出されるまで何もしない
      if (!isRunning) {
        isRunning = true

        // 描画する前のタイミングで呼び出してもらう
        window.requestAnimationFrame(function() {
          clearTimeout(timeoutId);
    
          timeoutId = setTimeout(() => {
            setScrollPosition();
          }, 100);

          isRunning = false
        })
      }
    });
  
    window.addEventListener('orientationchange', () => {
      setScrollPosition();
    });
    
    let isScrollRunning = false
    document.addEventListener('scroll', () => {
      // 呼び出されるまで何もしない
      if (!isScrollRunning) {
        isScrollRunning = true

        // 描画する前のタイミングで呼び出してもらう
        window.requestAnimationFrame(() => {
          // 画面下部からの閾値
          const threshold = 200;
          
          Array.prototype.slice.call(targets, 0).forEach((target) => {
            if (window.innerHeight > target.getBoundingClientRect().top + threshold) {
              target.classList.remove('loading');
            }
          });

          clearTimeout(scrollTimeoutId);
          scrollTimeoutId = setTimeout(() => {
            if (!isScrollEnd) {
              isScrollEnd = true;
              // console.log({isScrollEnd});
            }
          }, 50);
          
          isScrollRunning = false
        })
      } 

    });

    Array.prototype.slice.call(document.querySelectorAll('.navi-item-sp'), 0).forEach((label) => {
      // console.log(label.textContent.toLowerCase());
      const labelText = label.textContent.toLowerCase();
      label.addEventListener('click', () => {
        obj[labelText].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        isScrollEnd = false;
        // window.scrollTo(0, position[label.textContent.toLowerCase()], {
        //   behavior: "smooth"
        // });
        adjustScroll(labelText);
      });
    });
  
    document.querySelector(".input-form input[type='submit']").addEventListener('click', () => {
      createConfirmBox();
      contact.classList.toggle('confirmation');
    });
  
    document.getElementById('closebtn').addEventListener('click', () => {
      contact.classList.toggle('confirmation');
    });
  
    sendboxElement.addEventListener('click', () => {
      contact.classList.toggle('confirmation');
      contact.classList.toggle('sending');
      createData();
    });


  
    function menuToggle() {
      document.body.classList.toggle('open');
    
      if (mymenu.style.maxHeight){
        mymenu.style.maxHeight = null;
      } else {
        mymenu.style.maxHeight = mymenu.scrollHeight + "px";
      }
    }
  
    function setScrollPosition() {
      [homeElement, aboutElement, productElement, contactElement].forEach((element) => {
        const elementName = element.id;
  
        obj[elementName] = element;
        let pos = window.pageYOffset + element.getBoundingClientRect().top - offset;

        position[elementName] = pos;
      })
    }
    
    function adjustScroll(labelText) {
      setTimeout(() => {
        if (isScrollEnd) {
          // console.log(position[labelText]);
          
          window.scrollTo(0, position[labelText], {
            behavior: "smooth"
          });
        } else {
          adjustScroll(labelText)
        }
      }, 50);
    }
  
    function escapeHTML(s) {
      return s.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;" )
              .replace(/'/g, "&#39;" );
    }
  
    function createConfirmBox() {
      const name = nameElement.value.trim();
      const email = emailElement.value.trim();
      const message = messageElement.value.trim();
      if (name === '') {
        nameboxElement.innerHTML = "入力してください";
        sendboxElement.value = "戻る";
      } else {
        nameboxElement.innerHTML = escapeHTML(name);
        sendboxElement.value = "送信";
      }
      if (email === '') {
        emailboxElement.innerHTML = "入力してください";
        sendboxElement.value = "戻る";
      } else {
        emailboxElement.innerHTML = escapeHTML(email);
        sendboxElement.value = "送信";
      }
      if (message === '') {
        messageboxElement.innerHTML = "入力してください";
        sendboxElement.value = "戻る";
      } else {
        messageboxElement.innerHTML = escapeHTML(message).replace(/\r?\n/g, '<br>');
        sendboxElement.value = "送信";
      }
    }
    function getContact(json) {
      fetch(`http://localhost:3000/messages/${json.message.id || json.id}` , { 
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-type': 'application/json' }
      })
      .then((response) => {
        return response.json();
      })
      .then(json => {
        console.log('Success:', JSON.stringify(json))
      });
    }

    function createData() { 
      const name = nameElement.value.trim();
      const email = emailElement.value.trim();
      const message = messageElement.value.trim();
      if (name === '' || email === '' || message === '') {
        contact.classList.toggle('sending');
        return;
      }
      // const messageObj = { "message": { name, email, message }};
      const messageObj = { name, email, message };
      fetch(`//${location.host}/messages`, { 
        method: 'POST',
        mode: 'cors',
        // mode: 'no-cors',
        // dataType: 'json',
        credentials: 'include',
        // headers: { 'Content-type': 'application/json; charset=utf-8' },
        headers: { 'Content-type': 'application/json' },
        // headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(messageObj)
      })
      .then((response) => {
        // console.table(response);
        if (200 <= response.status < 300 && response.ok) {
          return response.json();
        } else if (response.status === 422) {
          return response.json();//validation error
        } else {
          throw new Error(`status NG ${response.status}:${response.statusText}`);
        }
      })
      .then(json => {
        console.log('Success:', JSON.stringify(json))
        connectingElement.innerHTML = "送信に成功しました。";
        nameElement.value = '';
        emailElement.value = '';
        messageElement.value = '';
        setTimeout(() => {
          // getContact(json);
          contact.classList.toggle('sending');
          connectingElement.innerHTML = "通信中…";
        }, 800);
      })
      .catch((err) => {
        console.log('Error:', err);
        connectingElement.innerHTML = "送信に失敗しました。再度お試しください。";
        setTimeout(() => {
          contact.classList.toggle('sending');
          connectingElement.innerHTML = "通信中…";
        }, 800);
      });
    }
  });
}



