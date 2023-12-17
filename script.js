    
        const canvas  = document.querySelector(".canvas");
        const context = canvas.getContext("2d");
        const sound   = document.querySelector("#sound");
        const balls   = [];

        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        function Ball(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color  = color;
            this.speedY = 0;
            this.GRAVITY     = 2500;
            this.bounce      = 0.8;
            this.bounceCount = 0;
        }

        let lastTime;
        function tick(currentTime) {        
            const deltaTime = (currentTime - lastTime) / 1000;             
            context.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach((ball) => {
                ball.y += ball.speedY * deltaTime;
                ball.speedY += ball.GRAVITY * deltaTime;

                // Bouncing
                if (ball.y + ball.radius > canvas.height) {
                    ball.y = canvas.height - ball.radius;
                    ball.color = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;                
                    ball.speedY = -(ball.speedY * ball.bounce); 
                    ball.bounceCount += 1;                   
                    
                }

                if (ball.x < ball.radius ) {
                    ball.x = ball.x + ball.radius;
                }
                if (ball.x > canvas.width - ball.radius){
                    ball.x = canvas.width - ball.radius;
                }

                if (ball.bounceCount > 19) {                    
                    ball.speedY = 0;                    
                }
                // Drawing
                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                context.fillStyle = ball.color;
                context.fill();
                context.closePath();               
            })

            lastTime = currentTime;

            requestAnimationFrame(tick);       
        }     
        requestAnimationFrame(tick);
                  
        function spawnBall(event) {           
            sound.play();
            sound.currentTime = 0;
            const radius  = randomNumber(30, 50);
            const color   = `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
            const newBall = new Ball(event.clientX, event.clientY, radius, color);
            
            if (balls.length < 15) {     
                balls.push(newBall);
            } else if (balls.length = 15) {
                balls.push(newBall);
                balls.shift();
            }      
        }
       
        function randomNumber(min,max) {
            return Math.floor(Math.random()*(max-min) + min);
        }

        canvas.addEventListener('click', spawnBall); 
        

        