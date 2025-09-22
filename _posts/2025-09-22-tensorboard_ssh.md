---
layout: post
date: 2025-09-22
title: "[Tensorboard] ssh 원격 시 포트포워딩"
---


{% raw %}
```bash
ssh -N -L 16006:localhost:6006 user@remote.host
```
{% endraw %}



local의 port : 16006


원격의 port : 6006 (tensorboard default port)

