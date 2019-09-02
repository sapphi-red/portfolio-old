import React, { FC } from 'react'

const Introduction: FC<{}> = () => (
  <main>
    <section className="introduction">
      <h1>自己紹介</h1>
      <p>翠(みどり)です。js周りいじってます。</p>
    </section>
    <section className="interests">
      <h2>興味・関心(≠得意・既知)</h2>
      <p>順番は適当です。</p>
      <ul>
        <li>アルゴリズム</li>
        <li>法学</li>
        <li>Xamarin</li>
        <li>自然言語処理</li>
        <li>暗号</li>
        <li>巨大数</li>
        <li>デザイン/3Dモデリング</li>
        <li>OS</li>
        <li>最適化</li>
        <li>量子力学</li>
      </ul>
    </section>
    <section>
      <h2>趣味</h2>
      <p>思いついたものだけ。</p>
      <ul>
        <li>旅行(外に出ることがあまりないけど)</li>
        <li>シミュレーションゲーム</li>
        <li>タワーディフェンスゲーム</li>
      </ul>
    </section>
    <section>
      <h2>触ったことのある言語やフレームワーク</h2>
      <p>触った量順です。</p>
      <ul>
        <li>TypeScript</li>
        <li>Sass/SCSS</li>
        <li>CoffeeScript</li>
        <li>Pug(Jade)</li>
        <li>JavaScript</li>
        <li>HTML</li>
        <li>Vue.js</li>
        <li>React</li>
        <li>Haml</li>
        <li>Go</li>
        <li>Java</li>
        <li>C++</li>
        <li>Rust</li>
        <li>C#</li>
        <li>Swift</li>
      </ul>
    </section>
    <section>
      <h2>これから使ってみたい言語/技術</h2>
      <ul>
        <li>Crystal</li>
        <li>Haskell</li>
        <li>Kotlin</li>
      </ul>
    </section>
  </main>
)

export default Introduction
