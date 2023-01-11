---
title: 자바 복습 후기
slug: java-intermediate
category: java
date: 2023.01.07
description: 프로그래머스 자바 중급 강의를 듣고 배운점
img: java.png
author: XIO1016
visibility: true
---

# 자바
자바를 사용할 때마다 구글링으로 간단한 것들을 찾아보고 코딩을 하면서 나는 자바를 잘 사용하지 못하고 있구나 생각했다.
자바에 대해서 잘 모르니 효율적인 코드를 작성하지 못하고, 무엇보다 자바가 가진 특성을 제대로 활용하지 못한 코딩을 하는 느낌이 들었다.
그래서 이번에 다시 기본기를 잡는다는 느낌으로 프로그래머스에 있는 자바 중급 강의를 듣고 글을 작성한다.
<p align="center">
<img src="/java-intermediate/1.PNG"  width="200">
</p>

## Object class
### Override
모든 클래스는 Object 클래스의 메서드를 사용할 수 있다. 
<br />
ex) equals, toString, hashCode 등의 메서드를 사용할 경우, 오버라이딩하여 사용한다.

````
- equals : 객체 간의 값 비교시 사용
- toString : 객체가 가진 값을 문자열로 반환
- hashCode : 객체의 해시코드 값 반환
````
override 부분은 flutter를 하면서 봤어서 조금 익숙하다. 새로운 객체를 만들고 toString, toMap 같은 함수들을 오버라이드해서 편하게 썼던 기억이 난다.

## java.lang
자바에서 가장 중요하고 기본이 되는 패키지이다.
<br />
다음과 같은 클래스들이 있다.
````
- wrapper 클래스 : 8가지의 기본형 타입을 객체로 변환시킬 때 사용하는 클래스
  ex) Boolean, Byte, Short, Integer, Long, Float, Double
- Object 클래스 : 모든 클래스의 최상위 클래스
- String, StringBuffer, StringBuilder 클래스 : 문자열 관련
- System 클래스 : 화면 값 출력
- Math 클래스 : 수학
  이 외에도 Thread와 관련된 클래스 등이 java.lang 패키지에 존재한다.
````
### 오토박싱(Auto Boxing)
  기본형 값을 객체 타입으로 형변환해주는 기능
````java
Integer i3 = 5;
````

### 오토언박싱(Auto unboxing)

  객체 타입 값을 기본형으로 자동 형변환하여 값을 할당

  wrapper 클래스를 사용하여 컴파일러가 자동으로 메서드(ex. intValue) 호출
````java
int i4 = i2.intValue();
int i5 = i2;      
````

## 문자열 다루기
### String Buffer class
문자열을 다룰 때 사용하며 가변 클래스이다. 
````java
StringBuffer sb = new StringBuffer();
sb.append("hello");
sb.append(" ");
sb.append("world");
// StringBuffer에 추가된 값을 toString()메소드를 이용하여 반환

  String str = sb.toString();
````
위와 같이 문자열 뒤에 문자열을 추가하는 등 변화시킬 수 있다.
### 메소드 체이닝
StringBuffer가 가지고 있는 메소드들은 대부분 자기 자신, this를 반환한다.
자기 자신의 메소드를 호출하여 자기 자신의 값을 바꿔나가는 것을 메소드체이닝 이라고 한다.
즉, append 하면 자기자신이 변한 뒤, 그것을 리턴하는 방식이다.

### String class
문자열을 다룰 때 사용하며 불변 클래스이다.

````java
String str1 = "hello world";
String str2 = str1.substring(5);
````
str1의 부분 문자열을 str2에 저장할지라도 str1 자체는 전혀 변화가 없다.

### String class의 문제점
for문 안에서 String 클래스를 사용할 경우, 반복 횟수만큼 String 객체를 생성한다.
````java
String str5 = "";
for (int i=0; i < 100; i++) {
    str5 = str5 + "*";
    }

StringBuffer sb = new StringBuffer();
for (int i=0; i<100; i++) {
    sb.append("*");
}
String s = sb.toString();

````
두 경우 결과는 같지만 +연산을 한 경우에는 반복문 안에서 내부적으로 String 객체를 만든다. 매번 new를 사용해서 연산을 해야하기 때문에 속도가 그만큼 느려진다.


예전에 자바 코드를 작성할 때 1번의 문제가 있는 코드를 작성했는데, 그때마다 이유를 모른 채
intellij의 해결을 수용하곤 했다 .

### Math class
수학 계산을 위한 클래스이다.
</br>
Math 클래스의 생성자가 private이기에 new 연산자로 객체를 생성할 수는 없다.
하지만 모든 메서드와 속성이 static으로 정의되어 있기 때문에 객체를 생성하지 않고 사용할 수 있다.
