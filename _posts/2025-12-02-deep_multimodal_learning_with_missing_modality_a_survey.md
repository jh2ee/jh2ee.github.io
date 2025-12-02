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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBNHKPRB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQD3jcwJ9PeGCa9r0OEI6B0cLer0dcWZ6t%2FD5M7Blmi7RwIhAOYJZtzc%2FipP5ReRdOiVQXGE6zWak3HOgs3ssqK1k9CiKv8DCAwQABoMNjM3NDIzMTgzODA1Igz%2BFo5vbKH9%2F%2F6vzyEq3AOpqq0J6mQCgf8I7islMhpilpPJeqttX7XQsHgC3yLS%2B2IiK3iZ%2Bzl%2BBIBlYR3iocCB0VIUFA4naARYsDJrYet7AaznMX6enSNZd1P%2B%2FMVmunOKslGM%2BIVwu%2B0zOQWhqoOhpp4IPW156q8BW2MONzj5cNfLRaQJ4V3yO0fAwXzadfb3EAP1uOkUdDbbYDWbVLs17SlwcKw%2FfFCF977YOjINB4zjwYoCF0FTLDqN3j2FfCiQk5AilNIzCVU%2FB4tzOynGKB%2Bt9ZNvsVLotbnC6dV7K71uUqDywUMEE%2FZc%2B82WndlKFg2dsQoHYvSj7DGc8IGTuoeR2aAPkS%2Bhc94528htNgEj3NX0%2FIEH%2B8rkkhdrFopDSHIpTlDEkMEln4f%2BmzSc5a6oF7NsMQ3ccRLqCShHTvbw5LUvIVmWQ2%2FOG%2BcoEaNguMk1JeFhg1QLEuKImGlwGwEnlJK1ZeILpXkngFD0H2GSV91hIUtRzpl3x2yKEPqiD8NF6mggdOnAKxf51t8T%2Faeuj23LXp2k3sjA5XGiNGGDx2myvBjvs52SxXhhOSYDSraXmxxV%2FA2cS5beZPEwh3bVzCyX8haa1FVUum2PI7Qih4%2BaD9SW02UBrryoNEbwLiifaddc4XfW3zCsornJBjqkAYLcn1Ic7H%2BTRfL6fp%2BsE1LK8xMVEx58pkB3urRz6IhFG9V8YgaCb6SsG2Tu1iND5CEKh17feD3d4LIB%2BOIbWlgkj%2FsPNz50i8%2B%2BclcqBxGQhRoo%2Bzoo2%2FhcoqllceJxgbvCFNpp1TUWK8Wkpp%2Fe78eFCs8p1JA6kwzn3qUIilqubaWFZbFyIWY5IXDtD6B3ZXs6JiTf3mpfxMwvCj2w9IrcbdeR&X-Amz-Signature=ec580a5823c6b679f4612131559b7ec29142dbb8d0e94090e352415bf034bb81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBNHKPRB%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQD3jcwJ9PeGCa9r0OEI6B0cLer0dcWZ6t%2FD5M7Blmi7RwIhAOYJZtzc%2FipP5ReRdOiVQXGE6zWak3HOgs3ssqK1k9CiKv8DCAwQABoMNjM3NDIzMTgzODA1Igz%2BFo5vbKH9%2F%2F6vzyEq3AOpqq0J6mQCgf8I7islMhpilpPJeqttX7XQsHgC3yLS%2B2IiK3iZ%2Bzl%2BBIBlYR3iocCB0VIUFA4naARYsDJrYet7AaznMX6enSNZd1P%2B%2FMVmunOKslGM%2BIVwu%2B0zOQWhqoOhpp4IPW156q8BW2MONzj5cNfLRaQJ4V3yO0fAwXzadfb3EAP1uOkUdDbbYDWbVLs17SlwcKw%2FfFCF977YOjINB4zjwYoCF0FTLDqN3j2FfCiQk5AilNIzCVU%2FB4tzOynGKB%2Bt9ZNvsVLotbnC6dV7K71uUqDywUMEE%2FZc%2B82WndlKFg2dsQoHYvSj7DGc8IGTuoeR2aAPkS%2Bhc94528htNgEj3NX0%2FIEH%2B8rkkhdrFopDSHIpTlDEkMEln4f%2BmzSc5a6oF7NsMQ3ccRLqCShHTvbw5LUvIVmWQ2%2FOG%2BcoEaNguMk1JeFhg1QLEuKImGlwGwEnlJK1ZeILpXkngFD0H2GSV91hIUtRzpl3x2yKEPqiD8NF6mggdOnAKxf51t8T%2Faeuj23LXp2k3sjA5XGiNGGDx2myvBjvs52SxXhhOSYDSraXmxxV%2FA2cS5beZPEwh3bVzCyX8haa1FVUum2PI7Qih4%2BaD9SW02UBrryoNEbwLiifaddc4XfW3zCsornJBjqkAYLcn1Ic7H%2BTRfL6fp%2BsE1LK8xMVEx58pkB3urRz6IhFG9V8YgaCb6SsG2Tu1iND5CEKh17feD3d4LIB%2BOIbWlgkj%2FsPNz50i8%2B%2BclcqBxGQhRoo%2Bzoo2%2FhcoqllceJxgbvCFNpp1TUWK8Wkpp%2Fe78eFCs8p1JA6kwzn3qUIilqubaWFZbFyIWY5IXDtD6B3ZXs6JiTf3mpfxMwvCj2w9IrcbdeR&X-Amz-Signature=ec580a5823c6b679f4612131559b7ec29142dbb8d0e94090e352415bf034bb81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VLIF4RC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDoLlmL9%2Fkc1ZHwoIEL1vWz4Gil%2BN1Z3ZaJL7J6Uv3BuwIhANB9wRMGEEj6HqoMOizqMfzvp5rxehkF1dAkJezQ5%2F%2F1Kv8DCAwQABoMNjM3NDIzMTgzODA1IgwiueEINtOAbqc7QuAq3AM00qclVHIkyK49Nx33qcfhS9FjfkGskF6QQ7qIvp%2FSutQI5r7hXRxIZGmHNjKmi9ve4MjvBV2OIELXwUBm2LCpvBULZZTnxuCP5r%2FRV5bF7T2kbyZEOy4pUWDjAWLbCCcnqZGbkUK%2BhJtk8MHvPQqcpmRlIMnjxXBC9%2FYY5Kc8A7vy180eWtGwpSX5gZc1NPGOg6T4ri6NUm0Jayo%2BG%2FDV5hEvwP1ax75IYKgb%2B6YZcS7mjbVQYt3kFfzY4fCeRC2s3kQFrv%2BoGkxTlNojgqtCLVP7ehW6sZYvLo5vL%2FS3cmTz7Bs8Bvg1Xts4U4vc%2FZJcAkdQYUuVhMgNkxwS46KZFMnZiCc%2BnLFdtAGCIptBmgjT59czRLR4xD%2F7ViTwTi%2B64ARjvtrs8YmBxWBlkRfmPpxhPNAdMsKE7tiEP%2BXEK%2BLU8AEt6mYAzJlg9QZVPqSCCvkWn4nSOuj0MTEYKYfF1SOMOGJ7rpMFgLe9nTVV%2Fr01bndStFNOfQidENGfp5HgpWjZ14t2Q4uU74hy0yYH8CbsRF8upchZ5BOljG0UWbl5mS4ukwT97jrgI6A0piKKDbgGZmFye95hHSj%2F2bEeHggIJhBpuHdc4dRx%2F37dolCdZnHDr1xESblwazCsornJBjqkAehSEvOgQ7KODzQOuELr%2B3pUcErvfuA3F4jg0IH60gZUVKlj6c09n6Xcm9fv%2BLMCtkCDGL2K9oBcKzUjXAsyLl2cM1RhM1r1s4Z5Se%2F1%2FjiaS77FWgMIJkXQsl5VtfoV0pKk6Jxc0JrlXwftIwQPyTBF8TbXOnNQYfFfMaDiJC4leggatztgwVxh73%2Fyda4S%2Bfvtd4P0H44mdXNch0%2FxAs7EWWpa&X-Amz-Signature=cc29b6de71feaee327ee39cba24a466944623b8a9f64b525427bf97490f97074&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VLIF4RC%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJIMEYCIQDoLlmL9%2Fkc1ZHwoIEL1vWz4Gil%2BN1Z3ZaJL7J6Uv3BuwIhANB9wRMGEEj6HqoMOizqMfzvp5rxehkF1dAkJezQ5%2F%2F1Kv8DCAwQABoMNjM3NDIzMTgzODA1IgwiueEINtOAbqc7QuAq3AM00qclVHIkyK49Nx33qcfhS9FjfkGskF6QQ7qIvp%2FSutQI5r7hXRxIZGmHNjKmi9ve4MjvBV2OIELXwUBm2LCpvBULZZTnxuCP5r%2FRV5bF7T2kbyZEOy4pUWDjAWLbCCcnqZGbkUK%2BhJtk8MHvPQqcpmRlIMnjxXBC9%2FYY5Kc8A7vy180eWtGwpSX5gZc1NPGOg6T4ri6NUm0Jayo%2BG%2FDV5hEvwP1ax75IYKgb%2B6YZcS7mjbVQYt3kFfzY4fCeRC2s3kQFrv%2BoGkxTlNojgqtCLVP7ehW6sZYvLo5vL%2FS3cmTz7Bs8Bvg1Xts4U4vc%2FZJcAkdQYUuVhMgNkxwS46KZFMnZiCc%2BnLFdtAGCIptBmgjT59czRLR4xD%2F7ViTwTi%2B64ARjvtrs8YmBxWBlkRfmPpxhPNAdMsKE7tiEP%2BXEK%2BLU8AEt6mYAzJlg9QZVPqSCCvkWn4nSOuj0MTEYKYfF1SOMOGJ7rpMFgLe9nTVV%2Fr01bndStFNOfQidENGfp5HgpWjZ14t2Q4uU74hy0yYH8CbsRF8upchZ5BOljG0UWbl5mS4ukwT97jrgI6A0piKKDbgGZmFye95hHSj%2F2bEeHggIJhBpuHdc4dRx%2F37dolCdZnHDr1xESblwazCsornJBjqkAehSEvOgQ7KODzQOuELr%2B3pUcErvfuA3F4jg0IH60gZUVKlj6c09n6Xcm9fv%2BLMCtkCDGL2K9oBcKzUjXAsyLl2cM1RhM1r1s4Z5Se%2F1%2FjiaS77FWgMIJkXQsl5VtfoV0pKk6Jxc0JrlXwftIwQPyTBF8TbXOnNQYfFfMaDiJC4leggatztgwVxh73%2Fyda4S%2Bfvtd4P0H44mdXNch0%2FxAs7EWWpa&X-Amz-Signature=cc29b6de71feaee327ee39cba24a466944623b8a9f64b525427bf97490f97074&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLQPLCWZ%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIGCdNBlplmR0cdtf28m8d5NfwbmrKtDcXkvp9FP1%2FC1XAiA0bRHOzptTxTtqcaPWrhezCuB5ZfIF6szYC2j5AzRssSr%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIM507vneu0v1p63POXKtwD0hvEcHN5cBnhXEh6dK08H3g5kVp4wueSu5LjL3wtlhxYrHQUAp9dPDvCuKnq%2F14PY0rfuGrUUcOZiLEmFo2abUbWF%2FGmAiJeoCKFdNgrWQjSmZufuHgDuPhoHZ9cHwSSgRIe6aQAvnGKI6NCzKhrfTzc9ciRjEVAPssM%2BFwHsI3E8TBjJNRGrV4LnToNbOgWkX5JjNEv7K6S0WxP3sPxJYprNzKPNOxjLGD9s3O1wlow4HuFsmRhkrRzJSVbP2lFVyxiAk9uScMHh5zm0r6emMzOjjyLX2%2FPDE4pPePm7PGMrc7qNrN80gLB9rrdlP6SO7m2SEBJNWPs8QjsnSeL6n06o2ZSJm24osP6QAZ5yvU%2BV4TBXH448V2A2HNcNltzs7tgMI6JpZwqg5RO1Qn0%2FKdwy77N7AJqkpcKmdCUb6AQKMcDTQOLTHyynaZlcu3JLPIhRj2lmqndB89NNyNsMwqa28STPS6ZuHIJAtH9rOfWqHPb0zl5lyi4wOOt1BqCF8wGpldbCRZASFv4NpJ9HUFNKGwINakjb12xoFrEmkvenv9siBPawzU9qh2e4h7MUKb%2BPIRCtItdDM3ltZBV8T3J7HWCh%2F0mR3Bruow1RWG6MOCKgBbbCu0Eppcwl6O5yQY6pgGYHltJnYvBVCjIRFzm%2FxUvXCrLqNwVClDlZANaUNVv6KJNhKcJyToGXf19iTbAfxgqLdjh5X2pCxppik5HKF61wPRHNX6odl2%2BPQ0pMUlVGN74%2Fo9OjzrVQzryBK2%2Bb59A8nKf2ImjN%2FfGtskVoN4JwZQk0DimCAekwn7KsLlB%2FBnBCgOmL1JzQBGuwHo3GsgOjpIOiqk33UccvalFgvSeNp1p5UVe&X-Amz-Signature=14e92d46fd84405e9e1ba8bd440edbd53a296f02e171fc5ca3b2143feb950296&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7UW2DY7%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBvr14vg0EsSb4LWl4qUC6fxFayBIr8G1CcybAa1mrerAiB%2BKFJZYSfEN0vCUTh3nQgmirDgzhFidBoC13Nv%2F%2B1fpir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMw985UmJ63Y%2FaVYO%2BKtwDWpv6H1eLKuaKVwgJNgQSVzXcJ9tYg4m5IoGMiftk%2Bokcj4Q5Zjw51ge8Ww1RmXpXldaDuy2W5iVfsyNENT2Bs9ryyTGqnVyVgPLNif4R8toih1hI%2BaV1zcAI2jf2PyO%2BPkmjLHLZV3pKbFev3f3n8s%2FBfmMturB1o%2Ba3hH%2B0ISv6j0ohI8w6loesA2%2Fq5hTjgHsyOoRbwa%2F%2BvOQGjwnttZpBEaHLmqfJwgyUsilETF9RIDIeKfUbLJVr6tSEM7B84amdfsJDOaQ5WntCsSoQQXehWHil0FfUL8%2B2Oqjxrr3lvbFUQfIjhIhraFL1ic7fl9n8jrfQkbEiQsDIh6cAQzHGwoE1aPU5TJx%2BuKkw8JyDGBosXb624obLwUsrTCWHIvzyBtn%2BiDAkX1nwfCxCW7brMBrFgzPrHAkFXEljlk84AV0eOOH7EAGe3ihcqECo4t9Jd2ML%2Fpltq4giXNjdJgeD7PD%2FhCUO06%2BB2uOHx79z0NLfbhlQskIglin0KSMrKula52hRSCVkhXNmPEb%2B%2BZXewMfr4N6J%2Fuhlpga4tareN%2BCZd73byHp8TJy%2Fb911lAzEXKtul2W03ch328430adNWu0wr10nD25WziySv0t3DF6PVQnsHrtA%2B%2F4wgqO5yQY6pgG2Nf8hfP%2Fvbcn4rwGB2xvsZOsu9mGhMsvq%2FL1C1gAuvmhD582dKszooVVQuTdVpG437pe9F6ZTfvpl%2BrR7B2hFl2SlYRjgO3lcH2Kf0sYLEfpR%2BjzQWGckKXc9Qt5NZW6DN2NDNAiWoqSD%2Fm%2FbirVHCizg0SZTZMvHaTfwuuCR96D23%2B%2F76ZYaUhiWMQkAM8faiKQ5%2FJKGv0yEqNFpRPLcd16t6pq2&X-Amz-Signature=5be6f777e8e2d0d22e156cc27d127d4b89fcbf5e61d39bbafe98d8307517969e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7UW2DY7%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T061447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBvr14vg0EsSb4LWl4qUC6fxFayBIr8G1CcybAa1mrerAiB%2BKFJZYSfEN0vCUTh3nQgmirDgzhFidBoC13Nv%2F%2B1fpir%2FAwgMEAAaDDYzNzQyMzE4MzgwNSIMw985UmJ63Y%2FaVYO%2BKtwDWpv6H1eLKuaKVwgJNgQSVzXcJ9tYg4m5IoGMiftk%2Bokcj4Q5Zjw51ge8Ww1RmXpXldaDuy2W5iVfsyNENT2Bs9ryyTGqnVyVgPLNif4R8toih1hI%2BaV1zcAI2jf2PyO%2BPkmjLHLZV3pKbFev3f3n8s%2FBfmMturB1o%2Ba3hH%2B0ISv6j0ohI8w6loesA2%2Fq5hTjgHsyOoRbwa%2F%2BvOQGjwnttZpBEaHLmqfJwgyUsilETF9RIDIeKfUbLJVr6tSEM7B84amdfsJDOaQ5WntCsSoQQXehWHil0FfUL8%2B2Oqjxrr3lvbFUQfIjhIhraFL1ic7fl9n8jrfQkbEiQsDIh6cAQzHGwoE1aPU5TJx%2BuKkw8JyDGBosXb624obLwUsrTCWHIvzyBtn%2BiDAkX1nwfCxCW7brMBrFgzPrHAkFXEljlk84AV0eOOH7EAGe3ihcqECo4t9Jd2ML%2Fpltq4giXNjdJgeD7PD%2FhCUO06%2BB2uOHx79z0NLfbhlQskIglin0KSMrKula52hRSCVkhXNmPEb%2B%2BZXewMfr4N6J%2Fuhlpga4tareN%2BCZd73byHp8TJy%2Fb911lAzEXKtul2W03ch328430adNWu0wr10nD25WziySv0t3DF6PVQnsHrtA%2B%2F4wgqO5yQY6pgG2Nf8hfP%2Fvbcn4rwGB2xvsZOsu9mGhMsvq%2FL1C1gAuvmhD582dKszooVVQuTdVpG437pe9F6ZTfvpl%2BrR7B2hFl2SlYRjgO3lcH2Kf0sYLEfpR%2BjzQWGckKXc9Qt5NZW6DN2NDNAiWoqSD%2Fm%2FbirVHCizg0SZTZMvHaTfwuuCR96D23%2B%2F76ZYaUhiWMQkAM8faiKQ5%2FJKGv0yEqNFpRPLcd16t6pq2&X-Amz-Signature=5be6f777e8e2d0d22e156cc27d127d4b89fcbf5e61d39bbafe98d8307517969e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

