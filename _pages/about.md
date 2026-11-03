---
layout: editorial
permalink: /
title:
excerpt: "Ping-Ju Lin develops AI and machine learning methods for biomedical data, neuroimaging, Alzheimer's disease, and stroke recovery."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section class="editorial-hero" aria-labelledby="hero-title">
  <img class="editorial-hero-image" src="{{ base_path }}/pictures/pku1.jpg" alt="Boya Pagoda beside Weiming Lake at Peking University, photographed by Ping-Ju Lin" width="1080" height="1920" fetchpriority="high">
  <div class="editorial-hero-content"><p class="ed-kicker">AI · Neuroscience · Rehabilitation</p><h1 id="hero-title">Understanding the brain.<br>Improving recovery.</h1><p>Machine learning for biomedical data,<br>neuroimaging, and neurological recovery.</p><a class="ed-button ed-button--light" href="#research">Explore the research <span aria-hidden="true">→</span></a></div>
  <div class="hero-photo-note">Peking University · Photography by Ping-Ju Lin</div><a class="hero-scroll" href="#about">Discover more <span aria-hidden="true">↓</span></a>
</section>

<section class="editorial-intro ed-container" id="about" aria-labelledby="about-title">
  <div class="intro-portrait"><img src="{{ base_path }}/images/profile.png" alt="Ping-Ju Lin" width="601" height="601" loading="lazy"><span>Ping-Ju Lin, Ph.D.</span></div>
  <div class="intro-copy"><p class="ed-kicker">About the researcher</p><h2 id="about-title">At the intersection of<br>AI and brain health.</h2><p class="intro-lead">I'm Ping-Ju Lin, a Research Assistant Professor at Peking University. I develop machine-learning methods to better understand neurological disease and predict rehabilitation outcomes.</p><p>My research connects MRI, EEG, clinical measurements, and behavioral data, with a focus on Alzheimer's disease, stroke recovery, and brain-computer-interface supported rehabilitation.</p><a class="ed-text-link" href="{{ base_path }}/cv/">Read my curriculum vitae <span aria-hidden="true">→</span></a></div>
</section>

<section class="editorial-research" id="research" aria-labelledby="research-title"><div class="ed-container">
  <div class="ed-section-heading"><div><p class="ed-kicker">The research</p><h2 id="research-title">Signals. Models. Recovery.</h2></div><div class="ed-motion-heading"><span class="ed-section-note">Three connected areas of inquiry</span><button class="ed-motion-toggle" type="button" data-research-motion aria-label="Pause research image motion" aria-pressed="false">Pause motion <span aria-hidden="true">Ⅱ</span></button></div></div>
  <div class="research-columns">
    <article><h3>Neuroimaging<br>&amp; clinical AI</h3>{% include research-figure.html group="neu" %}<p>Developing multimodal models that bring together MRI, clinical data, and neurological disease diagnosis.</p><a href="{{ base_path }}/publications/">Explore publications <span aria-hidden="true">→</span></a></article>
    <article><h3>Explainable<br>biomedical models</h3>{% include research-figure.html group="exp" %}<p>Designing interpretable learning frameworks that connect predictions to clinically meaningful signals.</p><a href="{{ base_path }}/publications/">Explore publications <span aria-hidden="true">→</span></a></article>
    <article><h3>Stroke recovery<br>&amp; brain interfaces</h3>{% include research-figure.html group="rec" %}<p>Predicting rehabilitation response through EEG, behavioral measures, and corticomuscular coupling.</p><a href="{{ base_path }}/publications/">Explore publications <span aria-hidden="true">→</span></a></article>
  </div>
</div></section>

{% include work-gallery.html %}

<section class="editorial-experience" id="experience" aria-labelledby="experience-title"><div class="ed-container">
  <div class="ed-section-heading"><div><p class="ed-kicker">Education &amp; appointments</p><h2 id="experience-title">A pursuit across borders.</h2></div><p class="ed-section-note">Beijing · Los Angeles · Boston</p></div>
  <div class="institution-grid">{% assign institutions = site.data.journey | reverse %}{% for place in institutions %}{% unless place.id == 'gwu' %}<article class="ed-institution"><a href="{{ place.url }}"><div class="institution-photo institution-photo--{{ place.id }}"><img src="{{ base_path }}{{ place.personal_photo }}" alt="{{ place.alt }}" width="600" height="400" loading="lazy"></div><span class="ed-kicker">{{ place.period }} · {{ place.city }}</span><h3>{{ place.name }}</h3><p>{{ place.role }}</p></a></article>{% endunless %}{% endfor %}</div>
  <div class="experience-notes"><p>During my Ph.D., I was a Visiting Scholar at Harvard Medical School and the Laboratory for Translational Neurorecovery at Massachusetts General Hospital in 2023.</p><a class="ed-text-link" href="{{ base_path }}/cv/">Full academic history <span aria-hidden="true">→</span></a></div>
  <p class="editorial-credits" id="photography">Campus and hospital photography by Ping-Ju Lin.</p>
</div></section>

<section class="editorial-visit ed-container" aria-labelledby="visit-title">
  <figure class="visit-harvard"><img src="{{ base_path }}/pictures/harvard1.jpg" alt="The Harvard Medical School quadrangle, photographed by Ping-Ju Lin" width="1279" height="1706" loading="lazy"><figcaption>Harvard Medical School · Boston</figcaption></figure>
  <div class="visit-story"><p class="ed-kicker">A chapter in Boston · 2023</p><h2 id="visit-title">Bringing research<br>closer to recovery.</h2><p>As a Visiting Scholar at Harvard Medical School and Massachusetts General Hospital, I worked with David Lin, MD, at the Laboratory for Translational Neurorecovery during my doctoral studies.</p><figure><img src="{{ base_path }}/pictures/mgh2.jpg" alt="The historic Ether Dome at Massachusetts General Hospital, photographed by Ping-Ju Lin" width="1706" height="1279" loading="lazy"><figcaption>Massachusetts General Hospital · Through my lens</figcaption></figure></div>
</section>

<section class="editorial-contact ed-container" id="contact"><p class="ed-kicker">Contact</p><h2>Let's connect.</h2><p>For research inquiries and academic collaboration.</p><a class="ed-text-link" href="mailto:pjlin14@pku.edu.cn">pjlin14@pku.edu.cn <span aria-hidden="true">↗</span></a></section>
