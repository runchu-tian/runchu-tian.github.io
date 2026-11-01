---
layout: page
permalink: /publications/
title: publications
description: 
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

<h3 style="font-size: 1.1rem; margin-top: 30px;">First / Co-First Author</h3>
{% bibliography -f {{ site.scholar.bibliography }} -q @*[authorship=first]* %}

<h3 style="font-size: 1.1rem; margin-top: 40px; padding-top: 25px; border-top: 1px solid rgb(239, 236, 236);">Collaborator</h3>
{% bibliography -f {{ site.scholar.bibliography }} -q @*[authorship!=first]* %}

</div>
