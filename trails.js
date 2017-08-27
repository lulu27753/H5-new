// 绘制树冠
function createCanopyPath (context) {
	
	context.beginPath();

	context.moveTo(-25, -50);
	context.lineTo(-10,-80);
	context.lineTo(-20,-80);
	context.lineTo(-5,-110);
	context.lineTo(-15,-110);

	// 树的顶点
	context.lineTo(0,-140);

	context.lineTo(15,-110);
	context.lineTo(5,-110);
	context.lineTo(20,-80);
	context.lineTo(10,-80);
	context.lineTo(25, -50);

// 连接起点，闭合路径
	context.closePath();
}

// 填充渐变颜色
function gradientFill (context) {
	// 创建用作树干纹理的三阶水平渐变
	var trunkGradient = context.createLinearGradient(-5, -50, 5, -50);

	 trunkGradient.addColorStop(0, '#663300');
	 trunkGradient.addColorStop(0.4, '#996600');
	 trunkGradient.addColorStop(1, '#552200');

	 context.fillStyle = trunkGradient;
     context.fillRect(-5, -50, 10, 50);

     // 创作垂直渐变，以用作树冠在树干上的投影
     var canopyShadow = context.createLinearGradient(0, -50, 0, 0);

     canopyShadow.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
     canopyShadow.addColorStop(0.2, 'rgba(0, 0, 0, 0.0)');

     context.fillStyle = canopyShadow;
     context.fillRect(-5, -50, 10, 50);


}
function drawTree (context) {
	context.save();
	// 创建表现树冠的路径
	createCanopyPath(context);

	// 样式设置：加宽绘制线条，平滑路径的结合点，将夜色改成棕色
	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.strokeStyle = '#663300';
	// 绘制当前路径
	context.stroke();

	// 填充颜色为绿色
	context.fillStyle = '#339900';
    context.fill();

    // 绘制树干并填充颜色为棕色
    gradientFill (context);

    // 恢复原有的绘制状态
	context.restore();
}
function drawTrail (context) {
	context.save();
	context.beginPath();
	context.moveTo(0,0);
	// 第一条曲线向右上方弯曲
	context.quadraticCurveTo(170, -50, 260, -190);
	// 第二条曲线向右下方弯曲
	context.quadraticCurveTo(310, -250, 410,-250);
	// 设置棕色的粗线条来绘制路径
	context.strokeStyle = '#663300';
    context.lineWidth = 20;
    context.stroke();
    context.restore();
    
}
function treeShadow (context) {
	context.save();
	context.transform(1, 0, -0.5, 1, 0, 0);
	context.scale(1, 0.6);
	context.fillStyle = 'rgba(0, 0, 0, 0.2)';
	context.fillRect(-5, -50 ,10,50);
	createCanopyPath (context);
	context.fill();
	context.restore();

}
function textFill (context, text) {
	context.save();
	context.font = '60px impact';
	context.fillStyle ='#996600';
	context.textAlign = 'center';
	context.fillText(text, 200, 60, 400);
	context.restore;
}
function drawTrails () {
	var canvas = document.getElementById('trails');
	var context = canvas.getContext('2d');

	textFill (context, 'Happy Trails!')

	// 在(130,250)的位置上绘制第一棵树
	
	context.translate(130,250);
	drawTree (context);
	treeShadow (context);


	// 在(-10, 350)的位置上绘制弯曲的小道
	context.translate(-130,180);
	drawTrail (context);

	// 在(260,500)的位置上绘制第二棵树
	
	context.translate(260,150);
	// 将第二棵树的宽高分别放大至原来的两倍
	context.scale(2,2);
	drawTree (context);
	treeShadow (context);
	


	
	



	
	
	
}
window.addEventListener('load', drawTrails, true );