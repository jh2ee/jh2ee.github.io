---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFLWOZBV%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC3nBuS54BWHYAH31n%2BOtf6dtUlVIqS%2FX3k9cgFNBqEBQIgBR4VmnmRka1rICtUlcSPLIzmEriUPSH7zWGNI8gdIi0q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDHs%2BLFatO2ihbF%2FlHyrcAxMsfEvHMxk2kXjMVyTc%2BpmJip2ZltSRhmn%2B%2FmqPZbW%2B0C2HMhF2fpvz8iPVCkCRk1q80ljhT%2Bn3y%2F%2FFwsJ%2FSdZIPSc%2Bg21nwAmIM2Dlrs29TtfXgJKw92%2BxgY4fMri5DUQrFYtaTFRTMb8q5%2BLtEKMj%2Bm3DAvj%2Fwumqo4Ck5K98XX5UFtOZfveHOmhK7T1vxf8R5knNt0Ob%2FsK6cnJ%2BhPn%2BsCoAmtOanE2f0%2Fv7Jy1n1Oa8zQezYxm8pW6qclP1feOQqzZCLrH5xNhoKzfPyz8XBn4x93FJshzt3W%2FKfCcNdb608L0OO38X%2FSkrB0InNT2s090VeGllrp%2F2SxaTYR5Og3BRFr1MxIX0LhRqnrJqrdubEke67Ow3VEAlczpj8AiSxiVZ2wg58km0oe20C4RAt9mM9eeANtQU3KmhLvQDC3w%2FL%2Bx4Wb8T8UI52s2ZKmiIWQnpsaCUsMMt83NM0fwqYnr3aNB9MMg2ZaWrJkppsf5f2W51Biph1MEkNZBVJUw587AL9iNFXj7iB%2BH5M9bEiCL98sh8%2FUV6ehj%2Bj25qtIwYwpE9N7YqIgFZJrIyYy31NuYO7pefce4%2FO9awnTXych8%2FNAGlQ6dgl4U57ez0heR9bBuf%2Fg3GPE9RMOPKu8kGOqUBs4f44SfTC6djWB4Dkf%2B6631KzPszq57sYr0phQ2kZ1GEV6ci1fm7BihijljxABK8bMl0Jwfr%2BoZ3VbVpbqC6Nti63is63apjNG7mQU4Xoc4vqjK43%2B9q7FiMIeMs1BvSFIi3Oyh0vrx%2BmAweOTNrSzvCLzGIWZ0H10CHhDHB7U12lZ4PN5sQ3AHUVv5NjmTxwse0abK0yqITPjq6Aw2CLdECFfrS&X-Amz-Signature=921d3ca6fc0c8347fb1dfddb7aeff9c153f115d1ead0814da7cecb8224ad3f37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFLWOZBV%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQC3nBuS54BWHYAH31n%2BOtf6dtUlVIqS%2FX3k9cgFNBqEBQIgBR4VmnmRka1rICtUlcSPLIzmEriUPSH7zWGNI8gdIi0q%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDHs%2BLFatO2ihbF%2FlHyrcAxMsfEvHMxk2kXjMVyTc%2BpmJip2ZltSRhmn%2B%2FmqPZbW%2B0C2HMhF2fpvz8iPVCkCRk1q80ljhT%2Bn3y%2F%2FFwsJ%2FSdZIPSc%2Bg21nwAmIM2Dlrs29TtfXgJKw92%2BxgY4fMri5DUQrFYtaTFRTMb8q5%2BLtEKMj%2Bm3DAvj%2Fwumqo4Ck5K98XX5UFtOZfveHOmhK7T1vxf8R5knNt0Ob%2FsK6cnJ%2BhPn%2BsCoAmtOanE2f0%2Fv7Jy1n1Oa8zQezYxm8pW6qclP1feOQqzZCLrH5xNhoKzfPyz8XBn4x93FJshzt3W%2FKfCcNdb608L0OO38X%2FSkrB0InNT2s090VeGllrp%2F2SxaTYR5Og3BRFr1MxIX0LhRqnrJqrdubEke67Ow3VEAlczpj8AiSxiVZ2wg58km0oe20C4RAt9mM9eeANtQU3KmhLvQDC3w%2FL%2Bx4Wb8T8UI52s2ZKmiIWQnpsaCUsMMt83NM0fwqYnr3aNB9MMg2ZaWrJkppsf5f2W51Biph1MEkNZBVJUw587AL9iNFXj7iB%2BH5M9bEiCL98sh8%2FUV6ehj%2Bj25qtIwYwpE9N7YqIgFZJrIyYy31NuYO7pefce4%2FO9awnTXych8%2FNAGlQ6dgl4U57ez0heR9bBuf%2Fg3GPE9RMOPKu8kGOqUBs4f44SfTC6djWB4Dkf%2B6631KzPszq57sYr0phQ2kZ1GEV6ci1fm7BihijljxABK8bMl0Jwfr%2BoZ3VbVpbqC6Nti63is63apjNG7mQU4Xoc4vqjK43%2B9q7FiMIeMs1BvSFIi3Oyh0vrx%2BmAweOTNrSzvCLzGIWZ0H10CHhDHB7U12lZ4PN5sQ3AHUVv5NjmTxwse0abK0yqITPjq6Aw2CLdECFfrS&X-Amz-Signature=921d3ca6fc0c8347fb1dfddb7aeff9c153f115d1ead0814da7cecb8224ad3f37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKCCMGJB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIBfkhEp2T4RDfcuvs%2BAPHNKlTuBfxpBZVAGATCaOSYhvAiAQGpO5%2BHXV4bXZeapecF3vLmopF%2BpyPdNGfcsK2EGv1ir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMXVSYEKq%2BZdr3lUwvKtwD%2BPtnerraNu7cVln0BJAPpjLivJu%2Bdbfn8fycwdjw4wS9LP0NXY9zP%2BEHOBqVhuJR%2Bi0yWMXDnAu63KL8IHmupj0zcIkKUxSU7%2BNLOIvJFu5gEuRVUUckrHxmPVakMjGnyeyETLmpJM8hBBJZS2FnBQdvVt8xKlbTPaPQOEzmgHxjcuEOdnDJSXpSn5grA3PX5vRoU%2Fl33PH9Q3ekeXgLPfzEtsvGcX%2FFv0MGlhr6Vn988DfVyRjZA9IYRGOKBVFB%2Bq3lR%2BZdyASg44pdk%2FdkaFYogH93dvKmh1AWKinlPfy7lY0kZC5e3IEdvGN8egBjRfNsEOE2oLNG%2FIXckBy7p03M5JsLwhKXq32y%2B0VymiPzs3rB%2BIlUqawPc3pvnydfU03vi%2FTgqFtrrKgWm2Mb0zi%2FHCC90s5fhoSnOYa5%2B6DGIKVqtODIwDiLapBtIRW2NQJa%2FXE5%2Btl9%2BamUZJhClYhQb4vob%2BM3zSklagqxc%2FT0px%2F5G648n9tkcf%2FuzA%2F2RdRhkFC%2F1E1gCYjX3c9XM5LDgM42GrqnQBUf1TA5kyEHWUP2g%2F2MpmI1gBZIuUhA6YzVLH0lKc7qX4OvPkOMnqLljPgnHN03ijD8ttUYHFuWUW2SnJQk9FHS0qYwpMq7yQY6pgF0RrWCU1WjWVfzGunQo5gsnZrf4dfnEZ%2FD%2BPbMGr2HiZt5CYoVqFvy%2BTi%2B8wkQJn6mb1lURBM2FvmvPHG7tQpXGICZ6wHiwcClCTPMnU6E3TECNylOKJKNCqtyNqG08rSr2cCQ4b78zI9zbIfnZaL%2BXWGysUeHqSKRE7buFt%2Fda%2BatubCL38ySR04RDYTaTNW1IbHvr8beZ6mDnangS0Zf9nBdMDEq&X-Amz-Signature=8c24aaa5ed9121b7ed0436056ad8b5e5a3b5335dad904f3b04b0e8a282fd67d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKCCMGJB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIBfkhEp2T4RDfcuvs%2BAPHNKlTuBfxpBZVAGATCaOSYhvAiAQGpO5%2BHXV4bXZeapecF3vLmopF%2BpyPdNGfcsK2EGv1ir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMXVSYEKq%2BZdr3lUwvKtwD%2BPtnerraNu7cVln0BJAPpjLivJu%2Bdbfn8fycwdjw4wS9LP0NXY9zP%2BEHOBqVhuJR%2Bi0yWMXDnAu63KL8IHmupj0zcIkKUxSU7%2BNLOIvJFu5gEuRVUUckrHxmPVakMjGnyeyETLmpJM8hBBJZS2FnBQdvVt8xKlbTPaPQOEzmgHxjcuEOdnDJSXpSn5grA3PX5vRoU%2Fl33PH9Q3ekeXgLPfzEtsvGcX%2FFv0MGlhr6Vn988DfVyRjZA9IYRGOKBVFB%2Bq3lR%2BZdyASg44pdk%2FdkaFYogH93dvKmh1AWKinlPfy7lY0kZC5e3IEdvGN8egBjRfNsEOE2oLNG%2FIXckBy7p03M5JsLwhKXq32y%2B0VymiPzs3rB%2BIlUqawPc3pvnydfU03vi%2FTgqFtrrKgWm2Mb0zi%2FHCC90s5fhoSnOYa5%2B6DGIKVqtODIwDiLapBtIRW2NQJa%2FXE5%2Btl9%2BamUZJhClYhQb4vob%2BM3zSklagqxc%2FT0px%2F5G648n9tkcf%2FuzA%2F2RdRhkFC%2F1E1gCYjX3c9XM5LDgM42GrqnQBUf1TA5kyEHWUP2g%2F2MpmI1gBZIuUhA6YzVLH0lKc7qX4OvPkOMnqLljPgnHN03ijD8ttUYHFuWUW2SnJQk9FHS0qYwpMq7yQY6pgF0RrWCU1WjWVfzGunQo5gsnZrf4dfnEZ%2FD%2BPbMGr2HiZt5CYoVqFvy%2BTi%2B8wkQJn6mb1lURBM2FvmvPHG7tQpXGICZ6wHiwcClCTPMnU6E3TECNylOKJKNCqtyNqG08rSr2cCQ4b78zI9zbIfnZaL%2BXWGysUeHqSKRE7buFt%2Fda%2BatubCL38ySR04RDYTaTNW1IbHvr8beZ6mDnangS0Zf9nBdMDEq&X-Amz-Signature=8c24aaa5ed9121b7ed0436056ad8b5e5a3b5335dad904f3b04b0e8a282fd67d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAAYSHL6%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQDlAJG0UCPPzkybOOb3N6t6SXbG7LTzryR2abAGVmrNjAIhAPpib7n5oB943by0a8f1cSXh3M1d1UvIcMlf%2BvelF7f0Kv8DCBYQABoMNjM3NDIzMTgzODA1Igz38G%2Bmsuu4ehlZs38q3AMVPZgZAnWkAD8mWHOJ61WS8MUgr45I08BtpE3hfxPI5x%2FiaKf2LUOxUUEH%2Fv%2BRu07Gt41czxWF2aDb0nj8PhK9FJbVjGP%2Fr%2FzgD%2FpizN%2FxU4H3Dr3Voec7955EN0AdTRMC%2BRde6rOWaC9uhKFImbazrTw0ErAz22cDzc87d3S5q6u6roAK80oQB2zXLlEFRXODx3OrFLvi0KQn0lXRfIuSJAY3WKQkf2IoMFxtwXsQDtjVJ3xuABlltqMTdxgRKWOEeX19tQu0tweVhK6GKu8%2BDZ1%2Fhjn%2FyZ4w9CnFONRGpWsLtRZnVA%2FXrTz0%2FlKiQcooMnXj6e%2Bho8JwvmxkSZzBuxvrROdZm2FJl%2FqaysPE7qkfl0ez%2BjCcUdf9yz5%2BvyrwhCpSNHnzdUX894Phk00ScWq3JpA%2BcNFF2zeyDzMFf5gGSIM5gGvEaNTT1FI5Rz8bx58fqsKcvqefumi%2FTX%2Fn6qWFo2hQKdSEtcyq68ubt92w7Yfgzq8mdVdwS5GZnWbzChURRh9emI4qKuS%2BDpmBpvNnLWBFA25MNkBCrXxKNiN78q4n9nrZqePzX2QHTrJX44iRt2p1h5Qi9Hhx1XZDASi2q0gKsxcSGdDjfLQ42xUNLZKRczQIHW2I5TD2yrvJBjqkAQd%2BncDTAtpNrG5oJYfRWY%2BiMt%2B%2FadHihU6phCeu3bekIX1cSD83oA%2FFc735uNB1mhrkpAzIA1sCd6qOj%2BlY5do2k86Z886Eo0%2FV24iHnuoKdJEf66rIIltwQQIHWyzQ2r758zCf6NXRO6tT%2F1OpSZQIy%2BJ%2F%2FO7UBC%2FVnxHlyLoKrYb8GO5t7xos0iD1Zb4EtZISMOB6W1jnnlZLLMuc9QG7UXnN&X-Amz-Signature=645606cd1e2ed1c9406d8a99f4320dc082813eb2d97ed5105505f5d247857899&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXA6VQV5%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIEcF9Pkb7KLAquNGMI59NsHLdSkQ0iApdTYzslbInjDHAiBMt%2FKyNo%2Fo5vJsr8tQSHGvCnBDs%2BvdWLfrIufvMEXQvir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMqXtwwMUzWM9m8DGfKtwD6ydXO4lnPfOJAlRrYJ79z3dAg8kcdBCr1OlML%2FPzYWpwGXnUWu86%2FK9GJJLxTMA5itCtEKvSrwO3DX2kmG5PR122d3DlrgKPOytw%2Br%2BTlkWONQkoD%2BQahSc1bnoDr%2BLeFynptYyv94g%2Bhv4hR365j%2FgeuzHHAIRj8mMuD63J9HqyZDygFnWZnna8xGuFqZl0oRfdmlO%2F0OlZSXN1cEwv3769X0IIZF4lHDTAtZvuWUjBFjuK4DPLv8mpbNAvb%2BDt6et0gWKeapLfDgQMDnO3gVaX6aygoE4uOVCAFHkEaEH5g6%2BpVoAxGkQzBFuA85eS7i9pumlD1wdvmsCLU%2FTzwoVpGIo%2FceUFP5Rt36MKySnqO9UtVwJYStJJRP9v1WEaDS6fcTEld7l7%2FH9e6EVvWNDxKXDhQcCTtc3DRvcb5NBG8gxhQRVKDCcPYm7vER6PEE7Omp4NvLucmEsvX%2BZUDHg065CQ4bJR6S%2FKu7%2FOOkERRvB%2FdC71Ck6rFpf%2F3AaaAlFgqp3GfZ5EkwTYDkGs1FNwmv0WfTqEgvwElrz3nPx5UzU%2B6EAPyYTFhxjbdMNJoQ81E0VLftzzIkSzwxUUrxml54R0EIzBn9Hkaq7GoadoHQpsuo%2BgujOFJD8wnMq7yQY6pgHgOzn1dPXA%2Fz5B6WEEezaJHh8%2BiOXKOuUKHHNGyQJPrZFtIDZRCAFvDurx3%2Ffoc2O8ngrZMmnAE4bHakn0VumO98baJ3zFvOVsFhq2eXzkhb3piC5rBtsUvQnkgHNlmhEpDKniSepKybqlr%2B0u%2BUgeT8kPLiy76Vv2OkcRpmyLx2gaLMe4gHPjRMG%2F9SlXqlnEht8Y7h4ZFaeslyFJSWMBgOTazvgF&X-Amz-Signature=efe9ec3e690af060d02a6841c159dcf87719a30c3a0d5594201bef4be4988337&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXA6VQV5%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T132917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIEcF9Pkb7KLAquNGMI59NsHLdSkQ0iApdTYzslbInjDHAiBMt%2FKyNo%2Fo5vJsr8tQSHGvCnBDs%2BvdWLfrIufvMEXQvir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMqXtwwMUzWM9m8DGfKtwD6ydXO4lnPfOJAlRrYJ79z3dAg8kcdBCr1OlML%2FPzYWpwGXnUWu86%2FK9GJJLxTMA5itCtEKvSrwO3DX2kmG5PR122d3DlrgKPOytw%2Br%2BTlkWONQkoD%2BQahSc1bnoDr%2BLeFynptYyv94g%2Bhv4hR365j%2FgeuzHHAIRj8mMuD63J9HqyZDygFnWZnna8xGuFqZl0oRfdmlO%2F0OlZSXN1cEwv3769X0IIZF4lHDTAtZvuWUjBFjuK4DPLv8mpbNAvb%2BDt6et0gWKeapLfDgQMDnO3gVaX6aygoE4uOVCAFHkEaEH5g6%2BpVoAxGkQzBFuA85eS7i9pumlD1wdvmsCLU%2FTzwoVpGIo%2FceUFP5Rt36MKySnqO9UtVwJYStJJRP9v1WEaDS6fcTEld7l7%2FH9e6EVvWNDxKXDhQcCTtc3DRvcb5NBG8gxhQRVKDCcPYm7vER6PEE7Omp4NvLucmEsvX%2BZUDHg065CQ4bJR6S%2FKu7%2FOOkERRvB%2FdC71Ck6rFpf%2F3AaaAlFgqp3GfZ5EkwTYDkGs1FNwmv0WfTqEgvwElrz3nPx5UzU%2B6EAPyYTFhxjbdMNJoQ81E0VLftzzIkSzwxUUrxml54R0EIzBn9Hkaq7GoadoHQpsuo%2BgujOFJD8wnMq7yQY6pgHgOzn1dPXA%2Fz5B6WEEezaJHh8%2BiOXKOuUKHHNGyQJPrZFtIDZRCAFvDurx3%2Ffoc2O8ngrZMmnAE4bHakn0VumO98baJ3zFvOVsFhq2eXzkhb3piC5rBtsUvQnkgHNlmhEpDKniSepKybqlr%2B0u%2BUgeT8kPLiy76Vv2OkcRpmyLx2gaLMe4gHPjRMG%2F9SlXqlnEht8Y7h4ZFaeslyFJSWMBgOTazvgF&X-Amz-Signature=efe9ec3e690af060d02a6841c159dcf87719a30c3a0d5594201bef4be4988337&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

