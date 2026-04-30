---
layout: post
notion_page_id: "276ad5ef-e42b-80f1-9f2f-db7aa2e2e55b"
date: 2025-10-14
title: "[Tensorboard] ssh 원격 시 포트포워딩"
tags: [linux]
categories: [Development]
---


{% raw %}
```bash
ssh -N -L 16006:localhost:6006 user@remote.host
```
{% endraw %}



local의 port : 16006


원격의 port : 6006 (tensorboard default port)

