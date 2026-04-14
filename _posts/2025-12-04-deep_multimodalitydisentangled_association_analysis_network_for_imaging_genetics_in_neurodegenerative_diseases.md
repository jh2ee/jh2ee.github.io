---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GSRD3TH%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID1zA2adreGqE11hC%2Ba%2FrCKIDVoMltujHLNiGWOhOzR%2FAiBeZS0%2BSfAt5zq9nUu%2F5U2R1HRdtkX2%2FpTNMm%2BE8gRviCqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhQGK04nb4E8%2FUN9UKtwDXTVdqPWBJTPyuH0azpNisvHnFdCbBy%2B64egxdb718Pd1I2YMa9eM4Wx75vH9PCg2pxVDk9G2syLOK8opNK3XYEn0%2FP5JT0Zu9Mghg5oU%2Bal5tI5UmYgOzDgpUqI5FdA86uJh7PLSlHcqmi4mZ%2FBfkr5H5Qg55o2B%2FEhuYuX7QiwasglguX2QFrsOSkdWRWt79lsokYXgxgTx9pkHdzK6zuopiwRjFSstRqqwo0K4sh%2BISdzbu3bD9y5JQlB%2BYUPDPRCUP0fZVP%2Bpu4%2FV0LvUbSslUwH7nDCuMVZ9t7hiT5lSmbycunaIfNKLNTEGG1pzqg5RCN0zCXGUIyO3M2m1UkwSTFthfqDghRmd0nJJZKQ5YRfW7OswSqTY8sGXRKI%2FNUMbD2TfeiffK0C6ZSrvRw2r4wu3NP4aeU5DyK1380uKpw1mLBnl8sKEt0%2F2oO7hkHeNcph3ZjkotzXuZxwb9pOA6O1QogWz4l0FLTwvO21l3TgS0h8bXjgRfkByiKpqz1Wglh7K8b3EhqXj%2BdhPm%2Blnge270klkYl%2BpCKHfZPCeAhcaDQgNcjHU5pJROhkAMjFSSbcWA2W%2BJihTnipEgGe8JDwg%2Brsg3m%2FmHipQt%2BMS56j%2Bb%2FZGx9SdDwQwro%2F7zgY6pgFrETuXdTv4f5ILUYbyCRBRlEsx19DJN6R7YUOl5OjaKzQ9ufcDVT6csKwIsTxzQIQJWSHLeIF6UWfx7IadOH%2BPkqyRwJeaA4JyVOuedyaD%2F%2B6%2FFbY0vEc6gNxayVQJ8mOEjIvBczzk2aT65hwoRfzY6OhEYRiccVkHAXktSWykCKL7TPWYZMMZErucT1fgYbT9K4DSVedPb9js81UAufF0Qp%2FFx5SV&X-Amz-Signature=1c71f92c7c0d9f02471a23587e8103d1553826f65bc7ad9e95d0b77b88f46779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GSRD3TH%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID1zA2adreGqE11hC%2Ba%2FrCKIDVoMltujHLNiGWOhOzR%2FAiBeZS0%2BSfAt5zq9nUu%2F5U2R1HRdtkX2%2FpTNMm%2BE8gRviCqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhQGK04nb4E8%2FUN9UKtwDXTVdqPWBJTPyuH0azpNisvHnFdCbBy%2B64egxdb718Pd1I2YMa9eM4Wx75vH9PCg2pxVDk9G2syLOK8opNK3XYEn0%2FP5JT0Zu9Mghg5oU%2Bal5tI5UmYgOzDgpUqI5FdA86uJh7PLSlHcqmi4mZ%2FBfkr5H5Qg55o2B%2FEhuYuX7QiwasglguX2QFrsOSkdWRWt79lsokYXgxgTx9pkHdzK6zuopiwRjFSstRqqwo0K4sh%2BISdzbu3bD9y5JQlB%2BYUPDPRCUP0fZVP%2Bpu4%2FV0LvUbSslUwH7nDCuMVZ9t7hiT5lSmbycunaIfNKLNTEGG1pzqg5RCN0zCXGUIyO3M2m1UkwSTFthfqDghRmd0nJJZKQ5YRfW7OswSqTY8sGXRKI%2FNUMbD2TfeiffK0C6ZSrvRw2r4wu3NP4aeU5DyK1380uKpw1mLBnl8sKEt0%2F2oO7hkHeNcph3ZjkotzXuZxwb9pOA6O1QogWz4l0FLTwvO21l3TgS0h8bXjgRfkByiKpqz1Wglh7K8b3EhqXj%2BdhPm%2Blnge270klkYl%2BpCKHfZPCeAhcaDQgNcjHU5pJROhkAMjFSSbcWA2W%2BJihTnipEgGe8JDwg%2Brsg3m%2FmHipQt%2BMS56j%2Bb%2FZGx9SdDwQwro%2F7zgY6pgFrETuXdTv4f5ILUYbyCRBRlEsx19DJN6R7YUOl5OjaKzQ9ufcDVT6csKwIsTxzQIQJWSHLeIF6UWfx7IadOH%2BPkqyRwJeaA4JyVOuedyaD%2F%2B6%2FFbY0vEc6gNxayVQJ8mOEjIvBczzk2aT65hwoRfzY6OhEYRiccVkHAXktSWykCKL7TPWYZMMZErucT1fgYbT9K4DSVedPb9js81UAufF0Qp%2FFx5SV&X-Amz-Signature=1c71f92c7c0d9f02471a23587e8103d1553826f65bc7ad9e95d0b77b88f46779&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X6JTNHG%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG5XNq5fE2Gx5kfyjBAJq6lM9XLF1hT2J1h0gFzzzvnHAiBRKfgQRPCPU7ygGVOjfxYco4s7AA9tDgsca3G%2BnzVxMiqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMd3PP2YQPW89p7N%2FyKtwDPlt7rXqVpXbjKxUqEs4Tbq0lq%2BOnNNM1II%2BYJZcNbfIokH4uhpEHCjA9Kr2P5403irvb%2BIermFtWKrblHxeZrgXWE4iqWRXOfqOMgm9G6eFKsg9Ysjz4ucSY%2F8qc2Ar%2B39hcT76gMZpQUJ%2BRkFOOxNaSb%2FhXKRkfxEjgitAlovxeap3E%2BvBivd1GfK6lecRqNsudtBcx0WBvSwA0qvlA%2Fpg95JaBFYPqnj9BQpTYJbHPPerpOodBPOHPC7InBJLvTS%2Fw7NpNtKmPA%2F3z2v26KhB1t1%2FaA2dZLNibMz%2FV7f%2BqneeS1BAKZUlGrEFtvqwfWzlvxaCU53PlaKQcLDWzRTrGsEMvS%2Fa1qIolBZoDgB%2FYHLyCMbekS6GYIr6WSb76Qjk9fSkhU%2BrfYTsjvBWtPvUmI%2BYIO29syCT0CFpe1x3KTzPSnzbd4KNWVPaeiZH0mq8mfXT%2B3XoPDAAqraTK0gKrHTXOK%2FYx1zj2KGRRrwVL1ViSYuMnGUXhueJxHfHaZ%2B2JFvP8S14mdec1dWxxPclNiVmiS5UFYRKnYt%2FOubtJxzY4NHS%2BVfykXK9wiEPzoYUfDQf2uKrAygYzjm6%2BQMEmb63KbbwB53hA5Mn1dboSAvtL%2FmE45flmzjkwt5D7zgY6pgH5iqyQtdtg8rOG994ro7Uqq88ofpUK%2BDLfXbXoX8p4rhTdYxvD6dp7gIrLpX6ItzlZmsjSsXSN6ldonqD56%2BebCr8Bq7V3%2FjlymcVqDlTziex9%2F0N0Tj77XxEkwAqgRe0O75kh74H%2FQ3UO%2FujHtJziZGfm3eMc5anS7kbd%2FKpEH6OiircwlQ0gRIogZG8fb6cGE%2FuKTnbA5BAzPm%2BBOyI4MGNXMT7L&X-Amz-Signature=63250f49c2d4169d4b323d28516fa9e68ab2da867e722c03067323c847c2a62c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673OEEFMJ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwzkKPS8yMjFjCSw7qrwb6kuMvjBfPyJ84mVzaGZWGDgIhANtuXEdiTX3SyswDFlAXmy50pP%2BY9NmCfvt812ftKUsJKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxsPElTRgOfHX2TIUwq3APuV4Ecj8l%2BLjzYzdtC0oWCFOBX0lnNknWsHJoqrq%2BKerRJUihPSZASLsJqrJwWxZ6tWxgNp4zrWJO3sqVZTtgV5xMMcWfa2rNL1%2FA%2BmmcTRxE9WxiFN7P%2BP4SWSMGpOy6xkK6Fz0xhSM9TtRtYeOSZfUiC2M8jPOfDh29Fg%2Fw1k0pGLA5mhuuoUnvkS5Hd7RuWmExvvrqmO5iua1rfmNcjPf%2BPS4XDa2T9oCNLV9tGinxTf7hydNanV9h2ZKp%2Bnjdh2mo2A%2FURjiHt%2BKjTvT9LDzMK0lhhSJIg6Ch%2BG3sy366wMApIYGZpsNkpG%2FgecmfnitjxdFN4AbyMpSFIrLCyXFxX7BsqXjZTUp%2Fq6M5M6FBPPVK2QokfJtUr6lFumUe1drz23jpoh9mir0iWNKiQ7t04U24dq5FtbiZPs1U%2FCY6WO%2FLfGYhRQwUrAPvabygBHjzMHAz%2FKGpmGAq%2BEMb2xTgQTpVwO%2FrbUEBymwn9OCbZYbtzAr6I%2FF3yOD10iKOLu6VYriFj5c7EL8YQ8q4o34H7XA1vFntCuUt6t8DbSO3kh%2BLz2W71a3a%2BAeJvbRMaF8SX1ap0Z2B5UkAtx%2Fv6agiGKtErQAevdwEPB0xAGJdKdGSBRLyDsN%2FIxTD1jvvOBjqkASY7NyHDS5CmCgyNFee9DZBxl5%2B8wugZz0ihUPxXRbs%2BuVAo6dRqBU%2FibtpGN11AE7BeF%2B9RnBmSpTf2uhik9SNce%2BlQMQSFIWESfR99K2NMpBfV8fDheUTCDfhSx6vb4FRCtTSZEseiDr72QNCIJft7u%2FvNGyaA2SfDVu1O2pCIGL5WvSR2Fv%2BYIyoi%2Be067%2FXWWBr%2FTWEUn3c7Mt9Nb0p4THY0&X-Amz-Signature=67af43f3e017263a710b2613be6c881fe22d6decda19b70ce5de731f9e11feb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46673OEEFMJ%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwzkKPS8yMjFjCSw7qrwb6kuMvjBfPyJ84mVzaGZWGDgIhANtuXEdiTX3SyswDFlAXmy50pP%2BY9NmCfvt812ftKUsJKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxsPElTRgOfHX2TIUwq3APuV4Ecj8l%2BLjzYzdtC0oWCFOBX0lnNknWsHJoqrq%2BKerRJUihPSZASLsJqrJwWxZ6tWxgNp4zrWJO3sqVZTtgV5xMMcWfa2rNL1%2FA%2BmmcTRxE9WxiFN7P%2BP4SWSMGpOy6xkK6Fz0xhSM9TtRtYeOSZfUiC2M8jPOfDh29Fg%2Fw1k0pGLA5mhuuoUnvkS5Hd7RuWmExvvrqmO5iua1rfmNcjPf%2BPS4XDa2T9oCNLV9tGinxTf7hydNanV9h2ZKp%2Bnjdh2mo2A%2FURjiHt%2BKjTvT9LDzMK0lhhSJIg6Ch%2BG3sy366wMApIYGZpsNkpG%2FgecmfnitjxdFN4AbyMpSFIrLCyXFxX7BsqXjZTUp%2Fq6M5M6FBPPVK2QokfJtUr6lFumUe1drz23jpoh9mir0iWNKiQ7t04U24dq5FtbiZPs1U%2FCY6WO%2FLfGYhRQwUrAPvabygBHjzMHAz%2FKGpmGAq%2BEMb2xTgQTpVwO%2FrbUEBymwn9OCbZYbtzAr6I%2FF3yOD10iKOLu6VYriFj5c7EL8YQ8q4o34H7XA1vFntCuUt6t8DbSO3kh%2BLz2W71a3a%2BAeJvbRMaF8SX1ap0Z2B5UkAtx%2Fv6agiGKtErQAevdwEPB0xAGJdKdGSBRLyDsN%2FIxTD1jvvOBjqkASY7NyHDS5CmCgyNFee9DZBxl5%2B8wugZz0ihUPxXRbs%2BuVAo6dRqBU%2FibtpGN11AE7BeF%2B9RnBmSpTf2uhik9SNce%2BlQMQSFIWESfR99K2NMpBfV8fDheUTCDfhSx6vb4FRCtTSZEseiDr72QNCIJft7u%2FvNGyaA2SfDVu1O2pCIGL5WvSR2Fv%2BYIyoi%2Be067%2FXWWBr%2FTWEUn3c7Mt9Nb0p4THY0&X-Amz-Signature=e6739f026c57625f1aa16c67b9f2053da856b7d6447f309f1f7bd93b25f648e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RNPMQHS%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcYFHMifpBD1M0dzzKd1FG3EsujlYYb7cSDWBdJKVbAgIgPsP%2B0zWcv1Q%2BqsoCtuMQ%2Brz1E3Wm6hSSiRyl%2F2mxgTIqiAQImP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDwfG6KGsv5NiKf5YCrcA9wXXivpwKSmDNByZAUdnB0bYAEhlnmaIhZjaYEB4R4g7ATOnAY8LDqCsG%2BowbrFGwzXhRoyemI%2BhXoFg4YXIEylY51VT3oyn8G4NlEoIAwkumrqfl5xeI6VgPe1WqJaUApcbwRR4Dut%2Bq7fMlrgIFTpmXFY08QRJ%2F%2BqXRwq88fcSOqHP%2B0ptA29Q%2FyVSVNqyD9G%2BgNwXdl2WZE%2F8u1VAj8Hp96%2FC9UTevGlk1l4%2BArzr1LOkEAHkmPjp5%2BSjTqQsn%2FiUncz2PCVGU9JvlWcAwCiA%2BTSZCVnjWt3p50H64YtAepuvNesDpytnaVc7lAZz9XnC%2B%2Fu%2BJF4uU5g5k3D27xOdhyvCJJ3I2Qa6q7YG6BGncJY9mvF4govYshhVJL3uc38h%2Bun31LNKuaURUg8hgc4XOLsIT97VYKBdV7%2FzbZcrZLvyz%2BJDl3eZI0r0fQjMGv95VF8EcqiCUgG%2BaR95tI3wYUGoimEcdFWnUZs%2BOR1QHGHthhu04VJgWEdwUhMcG4RTYDXhUI%2B9TVEh9aOFgPQx1REpzKKTLX9hBwa9oKxmIrA8OqqYbFzjjgqjZlz11urYVRz8ANJa6lMFj1JPO0aY9vYNWYs%2BSkNGax26xYINk8JpqM9W2%2FxzUOqMI%2BP%2B84GOqUBNBtwDVhhhyRYmgd%2BOsKmu4wGKZ7hVoS55A%2BuECE%2B7FJlL6RoqEpnEKRRRDvUQQi4eXLYV5O1RUacmyNA2qMUEGl1ncjxvAu5eL0cC1F40gcFpxwDwZUOK5lY6kIlkkyx9EuYaD7zZc9k%2BjBtCwMruEDUKop%2FHl6ydn9P%2BcK3jRv9zLC68lhizWtnQGHrWT%2Fnzx9IF2wLy5p%2Fb8j%2FzvIT6x1vOdyI&X-Amz-Signature=4fa6cb478a04d25c7f2f6ca17392cdd9737cad28fdd6ae70630228b7708b5642&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ULHXWMYU%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHwf0A69hqhusMe3%2BWC5wWUEMa9EbCALrxNObjj6k0yxAiAw5Q5xaSvI8iysW70q0iAoOsj0ZC0PzMJea%2FxNuVXTNyqIBAiY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlyZJguYZ5ic9KGLqKtwDejTpRUbXWXnGJpF7tKo6FBFKLxjrJpIdRB0tqT2knXecn%2BaS%2FWrr8FyvsZZSllE6ObsrMjC4CbqxdF5AKO4BchLpKqs0%2BU2pFUIeZqBZHngPcFRwjbD5KXvQonXRMq6PwXOLdPgQ1bNuH%2BW3t7JFu07NNdLftP4H%2FJikJr%2BqzvP1bpzDy6b5dJ%2FlVH6RRoFw1KqMNLJ0pnUw8h6qSa5gWVWIzKnzb1UBswvf%2FJN8pnU1pRBwHZuo1lBkCWikYv7ktkhGWGF%2FvJdkzraKeOxhchTwiYW%2Bb0oQ9IBB99EytcQZcbCQrXfEg851HAkuxpTw6qH1bTuMKG1E2jS2MPuNuowuW3wbLJpA1CcU8uccS12gyrCoCiKqDM2Dfp2a1pMmINftoGwFXNsTH3nNoTiLyzPQJet6%2B7zqmHh1Dsuz7dmyHJZ3UstP7pAW7CocPs6Gz%2BtXRjpLL6N8e9mc7yubFt6obwipC%2Fm5Tz4O%2F3v1ppFoVx0Hp5HLFUsDi7Ss7kipOcpBPKctc65JFGo339J1IUYhNidQLPAiZd%2FbwFrI0hIurUA7p0MTTRpRzJ50hPVddpP1iDANK%2FvsU9OxsTti48vfcDnsvrkNCW9rtdSsMKaGjRxS2wD3kWT6FHkwi4%2F7zgY6pgFLlSqgJ9%2BZO98Y%2Ffti2E4tr4plYg9BQatZ6Q7GLvcR4FYJJqfiLw8HULQEFr9B5odLgaoMjMQxEbYpfGE17dOEEF4uRewOxs%2B3adRSzfe42jWoyD4QSardBpsXTaAXFccYruyJ%2F0jHKfiEm7jGq0hq0d7pJDMcgEYJripWa3kQK0nu7%2BwMWIvHpQwpQp0kTDY7IxfKpkKw1TcNbGfx4WnFeusZGa9N&X-Amz-Signature=44e014aec3210f3f315f3b956675727eebaa39575121bfb50647e196e7e2bed7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y45COW34%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCqP3jBc9fQ%2B2bg37lkfmX7v8BTm8%2Fo4dObidiaXN%2BiVwIhAN9iG1hLm%2FOoOUNNvNe3mM7yDAhb7YTbN6UFFnvtHRHSKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxCYB7zV0yuTy9GwVEq3APbrc%2BrBcvuUOn6dgym9ZHXroIatm8NxSZsRgATH7E2c3Neom%2ByIYZHfEhYcIpfR86hw0apjCZfG8tP5S3eCn4dwtldAXJYvPHR0xZYT5q3WboFPg5iHIrnbSxIiCEta4I3t9X68CLPJKOMXY9nLu%2BJMrKJ2XtGT6%2B77%2BCqBmSg%2BP0HR5KnivIeXsu8Kj1hyJ5ujwVj8ZZaACNSWtx%2BlrXJqN4kXh%2FI8qShTbg%2FBRCIYtqPJdocDCt3iZ8vYKVFCbu1LH%2Bpq1k9Il54TbAZX%2FMVAI6VkDbTlYXwmV7z40e6VtQAQ6FuMEnhya1FgSLDVLs8j7mEVlR5zYV1Gf%2FXGuAEoTx6ysqy%2FvjtgT1B2P1bn0nU4NBlWwgagr3freVY4c6159yrQ3qVwhyhlQUhonsyi5KVgiaKRPRTH%2FuJFrGdZkZGuhBiHV%2FnhyrVQCUIdLY7KDt9Sx2y6FoWLShGX4a7Np55CgDWsTKQNQYYmJA%2Fob0JBAyzKzNlSpcL4T3D98m4rNg0qT%2F8Y33Y0svJxC0%2Foz5oMZsG2q7iG%2FI7HPFw%2Feibtf4tFT8R5jtGzph6eaHqUdIAs0MpgVH4GvUX%2FzXOL8brkFoJXOyJf2O%2F4%2F%2BWehPJAbT4KI%2BEpLA86TDbj%2FvOBjqkAVCG5slcfy1x5vj3QgilHVElJ9cy%2B%2FcgqUQfQClytwSxmz123T85jQhQxgfPsD3pFpNElrgXPC2NOTXXfCLv0T001S3mQ0h%2Fe6CTVJbMfgByPQx67smuVYacOmlDPDGg%2BG2V48yKodY5lwbk8F8U5SrIjkLayBxRuH1FdzvWUX0HvrmZ7b66%2FCn0CZID54GrR5tBs87rIIt4AeSvX65BtE7xF62c&X-Amz-Signature=585afb0220bef4a5b88e18d8d64c4d838ada545efbaf67a8918dd322a2fd316e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCFAAMJY%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BYNdp5OrB3hbUnqjQArINhNzRFcAJd38k46cmI631NgIhAIkn5NWe6liYKMtb7IF%2FhGa0L5YAtWYxsG4VHngPMKj1KogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyN%2BboHaCpEAujd6lYq3AO0llF3Q9RiWGGRkj%2FD2YLFPuuIPkWipSJPGq9uAK70YhbsIZqMvhmk0mLm6hD2c13t%2BGy3RCM0c5p3gsG1v4jTHzpKZBgQSEK7ZQLD3Fi%2BILcoFl612SFngNr8VX%2Fl7cjMfXPh69ao2dUrO9ot9hZj%2BSjYD%2F4%2F9OUhkkDw%2FDLTxP5WEKLkn9%2F0PJAW5LDKwrinw0h74oFnh2NHYHrMDXCiKJ37nyhTgFmh7nnykmtCU%2F%2FuIkQzwG2XOoHp%2FYE70AQJt6zi5cZXPq4RJsao5YsnZhopNvonsLvePQIbscr%2Bo1RLcQPQ9%2BEDqHKRM%2Bi5Morq5PjjNXo71E7HGIEn5%2BfAZk%2B3ZH0HtklID7ipuC8KJ3TwRN5ZcPSQXGPcBGSMpb2wcRG%2FvHDoqy5l7d%2BPI0Wi7EYKNgE%2FirITV27ncsp%2B6vCo3UWoP45Fw5kBeOpUokGlcMmCmZQ%2B3QOrsHjxqx%2Bx22mSvB9Dit%2FGt0i8ZuXRR5R0yxs2sxPZD1UdVX4mEtmOT9NKQZdDpgEJkf7QSai8HC4zNZ0QgL9DCXfHTCGfHp7Dbfd7Ykau21%2FcBWXBM1lzWaZx41bE9xQcVIA62EDdLFbXpjS6Q%2BQW48AF2L5Z3H1xPA2VYBRxnxF1rTDmjfvOBjqkAZ%2FoZIt3g%2FSfymHN5jiNOuVNHewRYfLorNNCKAOyw9vNfTqesxqtLYmZhy%2F%2BiglS3gqf38GY4rEXcXoEx%2BxpDHoz8%2BfRkgW8iACxmTJJy96LAdNLDU8plnddi71DQ9LGD2DoLWdUqbwUYyncu6p%2FYRAJObYdKNn33JMaPxMhska1A5GHZxfGwgQkbB1LrCPlZyo%2FcMF9QEW%2FUwSs9Rckjj1SZ3dS&X-Amz-Signature=670d8f2dd1dc738d1025613776a206de8bf22f47ede5a26e587a0750a643fc77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCFAAMJY%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2BYNdp5OrB3hbUnqjQArINhNzRFcAJd38k46cmI631NgIhAIkn5NWe6liYKMtb7IF%2FhGa0L5YAtWYxsG4VHngPMKj1KogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyN%2BboHaCpEAujd6lYq3AO0llF3Q9RiWGGRkj%2FD2YLFPuuIPkWipSJPGq9uAK70YhbsIZqMvhmk0mLm6hD2c13t%2BGy3RCM0c5p3gsG1v4jTHzpKZBgQSEK7ZQLD3Fi%2BILcoFl612SFngNr8VX%2Fl7cjMfXPh69ao2dUrO9ot9hZj%2BSjYD%2F4%2F9OUhkkDw%2FDLTxP5WEKLkn9%2F0PJAW5LDKwrinw0h74oFnh2NHYHrMDXCiKJ37nyhTgFmh7nnykmtCU%2F%2FuIkQzwG2XOoHp%2FYE70AQJt6zi5cZXPq4RJsao5YsnZhopNvonsLvePQIbscr%2Bo1RLcQPQ9%2BEDqHKRM%2Bi5Morq5PjjNXo71E7HGIEn5%2BfAZk%2B3ZH0HtklID7ipuC8KJ3TwRN5ZcPSQXGPcBGSMpb2wcRG%2FvHDoqy5l7d%2BPI0Wi7EYKNgE%2FirITV27ncsp%2B6vCo3UWoP45Fw5kBeOpUokGlcMmCmZQ%2B3QOrsHjxqx%2Bx22mSvB9Dit%2FGt0i8ZuXRR5R0yxs2sxPZD1UdVX4mEtmOT9NKQZdDpgEJkf7QSai8HC4zNZ0QgL9DCXfHTCGfHp7Dbfd7Ykau21%2FcBWXBM1lzWaZx41bE9xQcVIA62EDdLFbXpjS6Q%2BQW48AF2L5Z3H1xPA2VYBRxnxF1rTDmjfvOBjqkAZ%2FoZIt3g%2FSfymHN5jiNOuVNHewRYfLorNNCKAOyw9vNfTqesxqtLYmZhy%2F%2BiglS3gqf38GY4rEXcXoEx%2BxpDHoz8%2BfRkgW8iACxmTJJy96LAdNLDU8plnddi71DQ9LGD2DoLWdUqbwUYyncu6p%2FYRAJObYdKNn33JMaPxMhska1A5GHZxfGwgQkbB1LrCPlZyo%2FcMF9QEW%2FUwSs9Rckjj1SZ3dS&X-Amz-Signature=c9954074298735c655d91c29104f49fefd1dfb0c2377e7879d400f459859e3ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSA5YAA5%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDndIojc2AUSq8j2uQwSywzfQHJplsl%2BlX4ueYqrVF7oQIhAKvktXWdfBK%2BocIdSzPBXAye6%2FQa7s1%2BSdOEWt4MV6ehKogECJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQlQtuSEpOeWuAWrsq3AO5GY89YWd1AyexuVOhnPiJrfAQU%2FGamWThHU8RHnvNYt5mht%2BzjQ715QU3YQ5AD1IUqgqotw34ATmttZ19apL5KejNpQwUogQmZUviBTK8b1EE9cs9wopAESCVuqOUMzvlNL%2FVEHumeTdxIY3tfTmzclpWXzfQW6VCJ35%2FFGSnro487V16uTTGKIQsimS3sAnHsYkhvHcd%2Fq7%2B6leiA6JMuBvOKl5hhWJmJnn8%2BikXbK8P4Px2dYJrf10HssF1vu%2FoLhVNxVjgAQygRbCShhBpkA00jdy0KIFLTPDLoKu4Vq%2Bx7YYVGQEBKq9KGX5l%2BGo3A7Nm4R%2FATBFYjG6BjoSixv6PPaSgmBxWNn636WBc0eH7gO57KUkuiNneei7mXssJk%2BIiGxvQ7OExezjvDfcOsd8V7260O%2BGjr%2BjRbHGMB5tqgoMT5SwzaJdXpg0L%2Fc47RIUPrqiPPAyMtfDSXXmPxl8jiE0KFoJul4stBuVTf2y7Ht7eInZzbnxBIowaTo1Lg9XyeB27pH%2BO%2BqJfqpttT5gfDN1JxV88VuNkdgX3Efkjz1%2B2Yx%2BeHewipsbmlPYpJlSeiYjTVeSizZQAWWQLKxrJ62XS3sTWuoMcmFuorIOrUW7PYTdiC4tEdTCYjvvOBjqkAeoCGDgifr4DSMgbq30Ka1KQHpOMv%2Bv7j0MV7gmfx5kcaBxiyNBE7gFO%2BGT3ORTHAo2UOzUdD%2BLACn7lSppDDXw2ZYGk4OvVFZuSBpKBlhJJ0xPvuNpuXdzythRhmKjz1c3aafNr%2Btd5yHQh2G4fJN2OcUhzoBApwhKZZ3P%2B153a87ZGSBx%2BY6FhzLArNunotNlJO1%2FdyBCfLEWIKqXYtquu5WrW&X-Amz-Signature=10db7a230d2d28d66bb6897c0ac52e7cbf240233a34c6a6a413c054e79a0ad04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OWNILJU%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGs8YjVPdjKkATgGIpLCr74YeWdr5vJvigkKP%2FPzk%2FG5AiEA3%2BP0duRuLgpGfjv%2BaZbEexWDxY4dJME%2BwJL9AgR7A5AqiAQImP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA3lmUW6ta2pEhck4SrcA5Y5rbZlIj8qS7IwPL6wb1bX0LXxCBuB48D6cDimY%2BhYhkbKbvHOCgqEpI2qZSRcAzU6y9jgbL58ssHKV90CV0NxHM8GDWcOWD5qWnVwSOFhhXfZJdMXK%2FzuzAU7QxkY0g68wxMnjB0Fhur5TbF1OXY4rUlg0GDJsmWTIh3eOBk%2FcOxoPBi3SsPhtCxZGWJs8v6GgVCSovPcXgjLK9fk86dcfJdoP6%2FhzoVb7I5xsmcFaxi0Il%2Bwl3NyUBknbllPdiM6cCe31iPSoRFx65szSh07tzJFadwzcxpq3d9Ob%2BF6c36I0DCRo%2BUxtENQHdHWGJ87ww7N3004QxPfKXQFjrnUZB8VjNECIizx9S1GpUgpbYC8%2FaltydTblX7AE09WopgGhmm1nk%2BrPVKZ9ZxXdBHHIJjTAFLwNeBG3O3FaAJfLhFZoxC2FKK96hzHt4LBPmmhZCxITlcEcOKhoYMZHPGGM8aBLMFPPhwIYfwJL%2Br4ElCFxLyoXMrbGPY7SQsz0ufhfEprIxRDlTtBZSfJ1FLnSaa1VZ4JpuT5iKDGO6T5il9jHADqsSYRk9LddV0XqDF2heXYB97TukRWRocyX2gwOZsH4H2up6Epn9jOil37jOjo2DVuPlSy5c3jMOCN%2B84GOqUBKv2yKLk5WoT8yb3jG1efR6E8oZxjxM%2FpAQsCSbhGr5gQZDjIanBV1%2BgWTvZw%2BAwQ6okY%2F81U2DynZz%2BA4QCeSF8SNorod1%2BSXkKksb4ix3SgZ6gxZBjrP%2F0xqYd2h9CMDlrbY0Alp909r38MQnHUpKug087VctU%2BckqiTni8AQIS6NPn3LvBIrvW3GRAstHgjz7UHTIBCRfunzRf61FMlANyABB5&X-Amz-Signature=b8d5903b9fb491cbb3545b71db0644ae9364fbdcf130958f67f300d7acfa544d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OWNILJU%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGs8YjVPdjKkATgGIpLCr74YeWdr5vJvigkKP%2FPzk%2FG5AiEA3%2BP0duRuLgpGfjv%2BaZbEexWDxY4dJME%2BwJL9AgR7A5AqiAQImP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA3lmUW6ta2pEhck4SrcA5Y5rbZlIj8qS7IwPL6wb1bX0LXxCBuB48D6cDimY%2BhYhkbKbvHOCgqEpI2qZSRcAzU6y9jgbL58ssHKV90CV0NxHM8GDWcOWD5qWnVwSOFhhXfZJdMXK%2FzuzAU7QxkY0g68wxMnjB0Fhur5TbF1OXY4rUlg0GDJsmWTIh3eOBk%2FcOxoPBi3SsPhtCxZGWJs8v6GgVCSovPcXgjLK9fk86dcfJdoP6%2FhzoVb7I5xsmcFaxi0Il%2Bwl3NyUBknbllPdiM6cCe31iPSoRFx65szSh07tzJFadwzcxpq3d9Ob%2BF6c36I0DCRo%2BUxtENQHdHWGJ87ww7N3004QxPfKXQFjrnUZB8VjNECIizx9S1GpUgpbYC8%2FaltydTblX7AE09WopgGhmm1nk%2BrPVKZ9ZxXdBHHIJjTAFLwNeBG3O3FaAJfLhFZoxC2FKK96hzHt4LBPmmhZCxITlcEcOKhoYMZHPGGM8aBLMFPPhwIYfwJL%2Br4ElCFxLyoXMrbGPY7SQsz0ufhfEprIxRDlTtBZSfJ1FLnSaa1VZ4JpuT5iKDGO6T5il9jHADqsSYRk9LddV0XqDF2heXYB97TukRWRocyX2gwOZsH4H2up6Epn9jOil37jOjo2DVuPlSy5c3jMOCN%2B84GOqUBKv2yKLk5WoT8yb3jG1efR6E8oZxjxM%2FpAQsCSbhGr5gQZDjIanBV1%2BgWTvZw%2BAwQ6okY%2F81U2DynZz%2BA4QCeSF8SNorod1%2BSXkKksb4ix3SgZ6gxZBjrP%2F0xqYd2h9CMDlrbY0Alp909r38MQnHUpKug087VctU%2BckqiTni8AQIS6NPn3LvBIrvW3GRAstHgjz7UHTIBCRfunzRf61FMlANyABB5&X-Amz-Signature=b8d5903b9fb491cbb3545b71db0644ae9364fbdcf130958f67f300d7acfa544d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662ZRWEDH%2F20260414%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260414T233210Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhMXtlOmgjtChUkqgpXvSUkxqjAZR1e2XTAWRD%2BkRsaAIgXWoQ5WIfDIoYI5L4zGIcz9Ls8msl85yGUmgEV6u9T0sqiAQImP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAZ4I3aRr7SiLPhvnircAze0cVdghe2zEQ3kWRkpdGwmRc8ntDmnolDKDS%2FkhIP1twS8Cvgyiy3AoXFcfqkej2%2BuF4k%2BN5G6PB4%2Fmw%2BxPBMzXMaABfw08gZdfQ704h6kGhw1llomu1KgFpO9IDWIYsiE7XNko5OR7zVsDEs5kEeZ6UBIGu9hsHaB6D17CpJf54NfKQutleVSPvCxtyj67qTEmrN%2FT5tT1cB2Vsq%2BdbXULLb9RU13H2w4LAeTOHZaiSm5kW4pR%2BDlCIiJWJOvWK0uzdcvr3M2rxZ2L3ewBqqdS0Ve3C7I0EzFkqNVlON2peVDXZXLRri9ZLPFcmYTOAX8CyNrLfqGyZ0W4RdpJRX%2FHuPsKEfQDHRRZAp9z8rdhgo8zuDVN1mkU%2FBiea8q6I%2Fz%2FBdTOQYO1A%2BStC8V7fXtn1uPvaib4AmdSUhONnLpBXbPsksdjusl4JNPgls79uR30fj9fMgRxIIT5nuBzPTRyTBmKJCMZMoaj3Ebh2%2B9ATWW%2FOSyOEg9eH9p%2BoZpPdrZXPocmf9M9YGlRgWpk8saL33527%2FoyShGPEV1EK4IhXR%2BswdU0eM3rT%2FHOOa5xGVBUy5WsrPrOGRkUz02HAg2xjheBXn%2FyZNgyw8sUFbHllrCobgGQTwbzhcyMLmQ%2B84GOqUBrHOkWaI%2B73X3BmgV3OMrCWfenhTS%2Fsu2UxcamrphoAVzp934AJu%2FnJsqsdn7uCz7JCY0yjXo40x9Y4ATFXmLxpYtPxuypi%2B9825YOqEWWlwK%2B63fHTYm1FUgu8X%2FxQeQ0Pz1ua4E0OBQwQp%2FhRASw85Eit7LhV72QDTBWJU33Gp1Yi4J0TEH48c2LJE8xVs3bKQHnXUMCxlyAouk2wkR3bHUAyeT&X-Amz-Signature=b9dfd615a447c2717e56f618a85a6dd5e821747fe3f72adb7a1ee12eac566166&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

