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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4FEUFC3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGhVSQbKPicW73bZl6z18ASTL3to4EHXTe3buDhCa%2BBHAiEA26DHSb9Kp8r1I9Mh%2FPSRjJD8Ggey12hLWLa4qU8SMWMqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBEc%2BxwMxQKI%2BrNCPCrcA5LkFcBvsQR%2F66GQUgvDrHUi3es9Zm%2BP4E4tGEmhKz5gGEnf6eLXPR8Fd7dTVo30t4CTqjxRhTvXdf43VhNrsP7ZXUk9xD3%2BbZASzXa%2BO50Tb62mQyjVysU5Wss0UtFU6I8ciWnejUCI754mn2FYtdUO7xXR7KEyZyO1EGRCn1yA1yufi3pZak3MDqaU9%2Fv8MkeIvZo7mwCLl9AoVjA10UiKaGdJwFzqplJ%2BDICqhbB7ZMjkXNPGGWviXBgYcRHNL%2BTlBoASGSlfNF49PsVJRXhfnzyMmpZ1kdFRNdChB4f3%2Bo7hpUcA4ikNhXyHEEXF2TKS7owX%2BFSOuB6DmGfzy2fvn%2BdJOmSF1pBqWRktOAo3Vg2JoBv26hRrJUskwzTZwwIAbSyom46UYZPiEafh0U8gBTtUkbp%2F0Ka0NnFIT4rLnNdQ%2B0GLBTQ9nH4ZpApFZe8bNGWGq%2B530lLZ3MLh2CK98vMxx4QwEB6Fo%2BJOFUW%2F1l%2BIEKTYEzrn%2Bfjzs%2F6q63WobxfMxNMJTXZ3CV%2BFJmSuNqLZ1eYQk9yfnk%2F0f1KzYjlE9xKFwrLZFs%2FhKhXNik0i5XQIBCKdd9aspj7H7Ue1UpZuemOK8afHc6RqYqIxOdBiyXL303k%2BHoOqMLmjz80GOqUBwdiDFkgCGJmho78V%2FnWCg8JIPT0vPSWXOf4aA75gHKpXF8%2BsC3khBDCTdJuTavYir1bgWO%2BCTtwMP77kZ4VbqSxSJq557cGuzPRGLnwMb0P8BRHMa27RRoiChpTgZbFZHOWaNwTDMwh0aLc6U3XYJCKu4KKctv2ZhC3v%2BYVroLh1lV9dD6TluBhSjonIRz8KbLkH9u5ND6nYivC1S5hDZO8d2eNY&X-Amz-Signature=f93f9686da89ff596122e642d56225c762605388027755e51c9a5f3ef5d9a738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4FEUFC3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGhVSQbKPicW73bZl6z18ASTL3to4EHXTe3buDhCa%2BBHAiEA26DHSb9Kp8r1I9Mh%2FPSRjJD8Ggey12hLWLa4qU8SMWMqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBEc%2BxwMxQKI%2BrNCPCrcA5LkFcBvsQR%2F66GQUgvDrHUi3es9Zm%2BP4E4tGEmhKz5gGEnf6eLXPR8Fd7dTVo30t4CTqjxRhTvXdf43VhNrsP7ZXUk9xD3%2BbZASzXa%2BO50Tb62mQyjVysU5Wss0UtFU6I8ciWnejUCI754mn2FYtdUO7xXR7KEyZyO1EGRCn1yA1yufi3pZak3MDqaU9%2Fv8MkeIvZo7mwCLl9AoVjA10UiKaGdJwFzqplJ%2BDICqhbB7ZMjkXNPGGWviXBgYcRHNL%2BTlBoASGSlfNF49PsVJRXhfnzyMmpZ1kdFRNdChB4f3%2Bo7hpUcA4ikNhXyHEEXF2TKS7owX%2BFSOuB6DmGfzy2fvn%2BdJOmSF1pBqWRktOAo3Vg2JoBv26hRrJUskwzTZwwIAbSyom46UYZPiEafh0U8gBTtUkbp%2F0Ka0NnFIT4rLnNdQ%2B0GLBTQ9nH4ZpApFZe8bNGWGq%2B530lLZ3MLh2CK98vMxx4QwEB6Fo%2BJOFUW%2F1l%2BIEKTYEzrn%2Bfjzs%2F6q63WobxfMxNMJTXZ3CV%2BFJmSuNqLZ1eYQk9yfnk%2F0f1KzYjlE9xKFwrLZFs%2FhKhXNik0i5XQIBCKdd9aspj7H7Ue1UpZuemOK8afHc6RqYqIxOdBiyXL303k%2BHoOqMLmjz80GOqUBwdiDFkgCGJmho78V%2FnWCg8JIPT0vPSWXOf4aA75gHKpXF8%2BsC3khBDCTdJuTavYir1bgWO%2BCTtwMP77kZ4VbqSxSJq557cGuzPRGLnwMb0P8BRHMa27RRoiChpTgZbFZHOWaNwTDMwh0aLc6U3XYJCKu4KKctv2ZhC3v%2BYVroLh1lV9dD6TluBhSjonIRz8KbLkH9u5ND6nYivC1S5hDZO8d2eNY&X-Amz-Signature=f93f9686da89ff596122e642d56225c762605388027755e51c9a5f3ef5d9a738&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPSSHENG%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGIq2XgKml53A9OaD78VvEdWNjsu9uByegVG5IYaB5d6AiAdSHt3%2Fl8J%2FM5Wyrq7rY4GhrkWghbcCjyexJd3lzuolyqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMn2Xdcg4WzNkXZcSgKtwDF7UHCjm54vrqy7QRZdSVLJbHpLydgj4UL%2F7iEu7t%2BF%2F1yS4OQ4SxBCg6TcZ42rBBk0l0dxWs1%2BERQxVI%2B%2BmQot8%2FX2yAEJ3hv29xsBg9Qo%2BuwAH1B1AXza2%2Bne62uh0S7%2F%2F0ajKGhtONtdv745dMQRj123XY2b2YgWxEWkBFKqK8r6DMFKWMWPNcav2YVRJs7bGNg8vRqj7unT5%2FJFlwpGgH22wTai7oBiyR3124gBoYWdUs9Y1rqy1g1hUdv1QVBX8lqoZnAHLhtTwsHbp%2BEyzwHonzD4KJN3ebFqNeYh12%2BazS2kgpdIxU1%2FeU85PNtKGxS5MKkQYwrmYbI2QeSG1V5x9eYabrVRnDjEL0CKz44HQUq6a1I1v0Eq3s457Iw%2BMeMtf93yu0sl3vq5NG4KvUvZcd3XqEmgejOO2REYottrkZxeDqngHNDGmjtF%2BZzoiKR8s%2FHYZJmF3816GtiuEom4ueLYDgEqbci%2FGo9%2BlziB%2FGc%2FEHHE1ozNB%2FihtdZYKYDXeFE8ridnAoRAd%2F0WgoHzp0q%2Fd4%2BJu3azXRiEJd73dW2Kwlkf8n3pONAXqnInGJxdIpyd42RRh%2BZTQQiTnSejtHEK3Xx%2F7F2n0muVZH%2Bq0lLLjw%2B5jXK20wwaLPzQY6pgFrlM4AQcDIIf0YEHq2tTRm9%2BS1Kd%2BQ3REu2V%2FCNShWaggu1wubDfzdRyLp4%2Bt9XCBmwSRWrgBEUVV1h8LxD7dBWEaZFY9vr3fVA3KuxLRz0fxOarRGBxnMVHgVI6QQnhszXw96zmSEYtq2ytH6La26ND0Q3sJv9bICUEXxnj7ehYUuQxrWyejvLZ51PNwfNeNGnoxA82Q%2F%2FHEgA39tHCqkTd2Epb9Y&X-Amz-Signature=f471c28e0d97fd8a9baa68d5b7e8e28b6892ffa560f7547c642affdb4be1d735&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665F7JA3F%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFl%2Bohy9Q4uS%2BjUMT65cHvFPXJjtvLUjD5kwSlAKKZt7AiEA4Y84RispaRehIrp5kNGjLykr82o7lHZH18gQa9rL7K0qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG2GpfEhE8wf6IocCSrcA1VB%2F%2BGjy%2BiGWB1ZlVgM%2FgLFj1PFmBOdAefEEpJ2FIqJ6sj1nXPoC4FIBof0gIX3FR%2BEu4vhCqnkkMI3Smrkk5e8zVCgqSfJAPT2MqGK2voq9QsV4vbl8nn8jo3aIv8mDRgsEWQP5A7%2FbnsPzsg8fEmxdW0%2Bgdn0P%2B4ZIV10AKhNJ44%2BRAMorxSV%2B21tvYGtzK1vtlcyQZqFrzZtEqoplyxhx7v3cbvRGWKeXphGefax2hfCVN3m2a8ZwDYGfT44ELHQ9tPZ8T4oDoH3GWCiXF76GF260oLRyWXVDDdiBnBOEO%2BDDGvxClcW6%2Bia6%2BdRLm0PuhyIhiHixz2FCbFkXY7OIvmTU%2F0mvDpN93LIc5YcqQherxQAm5e2IvDnXTuAOPE1jA6Wa7B5j1qOYladA5IyRGDeaXkbilDH7oGCQ%2BjBXzslm3ZSIPSrlRzOzlk2QS0Bj%2BSwzaG7Vc8Dceby6C6EDyX0f6ktF8oFnp6Pra2d56OELJVyhBPV7UB0G8nGK7Ba1Po68I7CKaOkZn8xw4UVegLsA8k%2BVlsdE03gLo%2BmIX5r%2B4CpyV3TgFhToyIBAnOiMrw73Ssmcu%2F3VowzK36tThWh%2FMbcnUHy4sQe0GaZV5Mk%2Bic%2FMzRi2ZC9MJajz80GOqUBnG9%2FpTFFQRJ3%2BTTT3SsSKxdj8wyr8TmDvXLNzIRmYBWiiZQZvAd2Q39PBbtWeuBhpip1c3KAyZG3TXh5XtCfHCEwmd3spF%2BnQCzYIQ4pcTCAHGLH3kLh%2FhIPhxDiB7RqvKmnft2R5xeWdUSQuDbbp2J0jeFV3xMcVO%2Bq8kd2YD4vAWk0to91JO36vArE5QPHdr8sYUgAUvEkTccJtyEmpL3kSFxe&X-Amz-Signature=c63da0de044801b95aa6fa40cf3e3868f1a8e02c5f37e73bff7d1a208bb58997&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665F7JA3F%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFl%2Bohy9Q4uS%2BjUMT65cHvFPXJjtvLUjD5kwSlAKKZt7AiEA4Y84RispaRehIrp5kNGjLykr82o7lHZH18gQa9rL7K0qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG2GpfEhE8wf6IocCSrcA1VB%2F%2BGjy%2BiGWB1ZlVgM%2FgLFj1PFmBOdAefEEpJ2FIqJ6sj1nXPoC4FIBof0gIX3FR%2BEu4vhCqnkkMI3Smrkk5e8zVCgqSfJAPT2MqGK2voq9QsV4vbl8nn8jo3aIv8mDRgsEWQP5A7%2FbnsPzsg8fEmxdW0%2Bgdn0P%2B4ZIV10AKhNJ44%2BRAMorxSV%2B21tvYGtzK1vtlcyQZqFrzZtEqoplyxhx7v3cbvRGWKeXphGefax2hfCVN3m2a8ZwDYGfT44ELHQ9tPZ8T4oDoH3GWCiXF76GF260oLRyWXVDDdiBnBOEO%2BDDGvxClcW6%2Bia6%2BdRLm0PuhyIhiHixz2FCbFkXY7OIvmTU%2F0mvDpN93LIc5YcqQherxQAm5e2IvDnXTuAOPE1jA6Wa7B5j1qOYladA5IyRGDeaXkbilDH7oGCQ%2BjBXzslm3ZSIPSrlRzOzlk2QS0Bj%2BSwzaG7Vc8Dceby6C6EDyX0f6ktF8oFnp6Pra2d56OELJVyhBPV7UB0G8nGK7Ba1Po68I7CKaOkZn8xw4UVegLsA8k%2BVlsdE03gLo%2BmIX5r%2B4CpyV3TgFhToyIBAnOiMrw73Ssmcu%2F3VowzK36tThWh%2FMbcnUHy4sQe0GaZV5Mk%2Bic%2FMzRi2ZC9MJajz80GOqUBnG9%2FpTFFQRJ3%2BTTT3SsSKxdj8wyr8TmDvXLNzIRmYBWiiZQZvAd2Q39PBbtWeuBhpip1c3KAyZG3TXh5XtCfHCEwmd3spF%2BnQCzYIQ4pcTCAHGLH3kLh%2FhIPhxDiB7RqvKmnft2R5xeWdUSQuDbbp2J0jeFV3xMcVO%2Bq8kd2YD4vAWk0to91JO36vArE5QPHdr8sYUgAUvEkTccJtyEmpL3kSFxe&X-Amz-Signature=9826e4aba163b2b0b17abbc9405e02c58327840463c3e586002401f5914312e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRLK3ZQ5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDxRQ%2BKMy%2BQNbGxl4dNJKUTUUidKPMwfGbnrBoYEF6vawIgFtcmjqpZ7iis7HyJMfGnab99kFIGp4uxfnKQ%2B67mkP8qiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNtSDBAgPYfIxREj9ircA%2FdzVe3SyjYcBdOPOCEn%2BFO9AZkDLgKXPDJ7M2F4AxTUThpyvBto%2BYLTHxleNp0k%2BQEwDi5AZGO%2B8iO7xllUBDHhD4eZudcLvD1IaGbTBuFXzQiGluoM3tc%2FaMovu7uXqGsD9a2dUUVe%2FdRC8%2BfP9KCO6dk8MFsUFiFCA4ho1KgChIDcWl2s1IuP6CA2p2Qun%2ByXPOGQ095CSZ8TZuXnmME3i5HDba87IIm7U368mu5fnMN8O8oEJvYsArTF08EVwF8zNiD0WjMTC%2FVM2u7hjdgj3DCjeWwqJRndmjGINDs1jt5Cd2ZCV5rTAn3I9G5YNwuQmBcdqtwm0HEth0TO8CkHUiGq6sSyYVclZigVShNKMUVaCAPf%2BNI9xCi5zJPbHZbeAqN2%2FCXYcXbbqtFSIx2wUu%2BPVI4FswW4mjpm%2FBsHTXdieWnDD1NaL8fAra5%2FKPu8RwTNMVEWy8S9gOSTI%2BNbTj5pE987s4d%2BQva6Ewk9y6eGi41Bo8EEUWhTfgdQJJOK3Mxv77LYi%2BIQB%2BLNQxq6NTQy80GOVzHX85KAU1WDBG32GC0CC%2FCdgH5QOI6eg3TE3XgT9r6mK81lb3B4apF19GeMi1IlFpNkUuol1PwzkUrtZRQNV06AfrqQMNeiz80GOqUB6u%2FrD7X2yW%2FqEROGq3eAkxW%2BKvfB40V1iRQICi8u7SrskjFZ6aXqmOIgIg1W0xX3%2B2k9MbYm%2Bsu9X3g6tA6mvl6yTsQaCm8Y7LItmXf2fDkl0qH%2FjFKOZq22DpikMv%2FuRVacr2LwqIAX%2F4co99HY6mGsVQxsDFjOTJSvD5%2BkK%2BZ6%2BGPevUz%2FPVQn%2B4f3NvlMCCg1nAvSMW%2FU%2F7GySDnnvPAhxqvM&X-Amz-Signature=5ad94616c0dfdef526ba4b64f55d7da06acb6da71ee3d62e0f244a44baf59700&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U52D5FNR%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBLR6%2Bhmoq3Oe682AdDVppequPoU3PGPP4zDDJ0pcHkzAiACfJbxZWEZHu9nEVBqbUE%2BheZ%2FDcwSNpNA7QqLToZ8JSqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7dxam4SodWrfOtXZKtwDf%2FTwaj9t6wmnpA4baa0kypToK2W3OHcnH%2Bmb%2F5B39S3jUJhEWMXpilf2CfyC8BtQVi40KhUoENnfoIf0oFfnwoNUEvfjRJGp1HOWhiJfhf7P9085lsIbC%2BEvsKa5GUhlkfvtiRG9CAfFFR%2BWDOnKL8B1r1TnIRcS47IVmj4rSJ%2FPRUWmfUfsVkP0n2ur4H5JBlF0kGt4FINgZdWGZljp2TpfBt4WheuCOzmSzG6PlDbTcTMxNBRWuTgUYtkJBp4AOnKk3PZo1HcA6L7d8MlVxygA5aD9APhMrezQONYDIE5eOHHCtCgkCA%2BJJrwDbcjK2qbF%2FB9QtAJQF4YgAGCiOkOjNYmsa3BfYb1r5s%2FON6XcUJyX7Bt3S0icMMU1wr7atzZCTuGzsUG9cud9bddBH75mF21SXq9TyEC3rghq65OSq6S18lVg4C8CtmWiCfONM9niCpjt9Dz0IoRWdNDMmn%2BMSh0GlpmF%2FucqnkWqS7wDNlUUyAPbUMqL%2FbLnWBXuQLoSGGwvTa0OroPqufKqn8PajAFhwwxSXz339KCV0XPAFPkMHqGIbqroAg7GvKsy07k1xj0umJOCG0Fv0PY7EfeRypRamIAF%2F5S%2FClseBnhoAQZsQo%2BZ18S2S6kwhKPPzQY6pgGuqMUYezM4%2B4WFZL9pbqTOv8R1V1qfEj4CpYS21Tm3lG0WUq%2BAr7%2FZd%2BaYNqoi4jKk3uhbe0sN8bEirWDg1cYCiafRJkXYS0b16ea4fmSXRAorftUJMpSMF%2BlljttFvOKWFXOExxJ4gNfpMZQAqlgC6X8gSD9fbNDCE9F6UgXlIUhz%2BoOxLH6kMGGHH9kHZYqEUQYez9j3e%2BNusgfUe0HIp%2BydwSRt&X-Amz-Signature=c28d0e573001fd7d06591f8689a5231995062161d5a3c23fddc289e03f78e6d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFTL3NT7%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102220Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHB1a98WOQh1UXVn7VOb5fRWuqk%2Be73mwLb1adG8tPvlAiAR10u8z3AbShDD4P6u7EgnF1Whf%2FNOTrfl0XnGZhA3miqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpLtUuphRugLSBXrYKtwDWL%2F45maE30MmeQ9JzEmBdprPHqFm3UlV5FTNv29AYbwTgYg34ORQOwqgxLCS5CKvBfJmGIvwVkCytKkmmQq3Kc%2FQwnjEd0HG7liQ2%2BsYZcfBygKm9hrwy8160%2BbBnwJ0I7BVaBWUjYn5mrn01lB1mUwis4gp9TE40XkwnVUzKwnE%2F8%2BcYy67iLQAX96pprlRpuVBN0LOB%2BkAb3TBpTqfUn9GvuPS7KAkhtZaz6SfrHn69GsbsflooTenPx4mXUa0WFOdIO7pzsdcL5tpBpHouBdYeMGHlbcQPMnIDQEvYWo5aB7kTw83b52NGXiUp9LG6vI77b9somXxj40CHMyVBklx5iSHIiNHB2vCaRetUIJjBHQK5jk3okeQZMBGAvK2OEm8xCx4NRzwWPLaT15VjPLZeKlxNCyUS6qRVK7jCk9VjRdIVXtgEVZEAhC4OdDjA1xTbp7of68COSw0K7%2Bq90QbqxGP96ggxw3hfq6OiHzYvy8jU%2Bf1KlkKqWxM%2F%2B4xJ3uCepGZlCaSDWrZYEFqlK0z1kLPEFcS9ZUCVycJvGC8orlnzN07Rn%2BcgZcdqPjTUSAZpQZX9T6odvENRCBGyzNG92qJeR6IBdaBDyLiVA0O45DY5A8jCWuSaPkwqaPPzQY6pgGc7VsEDd%2FQ7CzRX7UFPh9DvEwOie%2BZ3B%2FV7dcfIOUnY%2BjgYSIL1ArSsXexqykVwArhLrUbYfsibfh07%2BhL%2FcYFGeNVpdGsNiyPjNFXiC4IX%2F8who4zl67gtcR2rqCIrX3FrNvHsyNcruYoERDot4d%2FDsBwixd2aSC6yc5J9t3bFQ05DQubllW476GQ7ZsdO8Z4SS1VqU2z34ASGL99EnkFUiReyDID&X-Amz-Signature=34341cf80a3c7a67f22e9ea4b9e840c6f8bf27b24686ed617c52f09573b6c123&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRES7UG%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmuZn0%2B%2Fo6Vb%2B6vfZBhO86Rh0myqr4rQbjUbV5LzH6EgIhAKQKBSRchftjD7NYiAwW%2FM2WY2fEiOHRgE6zytN108jTKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJxfXMKN5U6EMkzXAq3ANxfaeicklKSLUy%2B8FroZjiqDbIlwwciKdU3OieDf8kFIhyNiNS4U2Mxr9UH3I%2FRpTurHOeJnzDKDyn%2F403i0snpe2Jk7bkTv2SAC5jC37dhP6ZW%2F7nZC7zQN7%2FfeQU8bLp6Mh80AOqsXmCzX%2BYPpepj6CigJIUFJ4KHNpYgi6t1wvYWc6pOoWwwRHj3eDgflDcURNoc0G4bkkCr9rdsLy8jTCkmj989V6J4TISAX31xHgjBovYVibq0jXOvX%2FVIXxLLyWxttbtdCpXbruODhh56mvkJ4Exv%2Fm887BQ%2Fe2elqO8XArFfl%2Fd3ongVA5ZxxkWLrzQ9XxPsR0PlP4wbe8dlqbuYPpfWrTcfE7OwYPgNCN6jj3IDB9FnJUeDSMW5rFa7ebz9UiqeBjxWTSPU1AniTqHieEfd5an5ffbd3ENBEVyfszQvasM6i%2FuWQOA9omIKv1UAu0XfFtDEZ0r5HYOgb6yY39VjZyqmsQ1H61IvEzu2cdQWRK2Dec8rURNt%2Bqim00hq6u144cfnKAtsISKPo4IqhZWW9IJMFBA495NE6CWKolDvS7IA7QJQujjlKn6Oc577LBXrmyhHJ1avhW7EE8Gspd4J4stK42b9qt6LLGI7nRLpbwvxexDrjDOos%2FNBjqkAf8xKqs2lbmDPxDAGpVnQ0VTQHm%2F3org919QMfSR5SPoHJbsxYoQSUDfvbbtjPn0dF7Y3iQUBnKVKK5FuMTiXT%2FDe4ECjKWEUbVaCZTXbHiVXPYwyvW96A7Es7bjGgk0lPDeZJXOiIrKmdIu9iJHq6S4GdjgWNCasOjYPMTZrT5Wi%2B%2FKSeFlKl%2BKAfRVwLryyxck0CO6teftanGWMPFi8Ala5a7q&X-Amz-Signature=830c5b5244cd05da7c9571edb352779a304a2247064f91ffd77e55fccb3fdf3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HRES7UG%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDmuZn0%2B%2Fo6Vb%2B6vfZBhO86Rh0myqr4rQbjUbV5LzH6EgIhAKQKBSRchftjD7NYiAwW%2FM2WY2fEiOHRgE6zytN108jTKogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxJxfXMKN5U6EMkzXAq3ANxfaeicklKSLUy%2B8FroZjiqDbIlwwciKdU3OieDf8kFIhyNiNS4U2Mxr9UH3I%2FRpTurHOeJnzDKDyn%2F403i0snpe2Jk7bkTv2SAC5jC37dhP6ZW%2F7nZC7zQN7%2FfeQU8bLp6Mh80AOqsXmCzX%2BYPpepj6CigJIUFJ4KHNpYgi6t1wvYWc6pOoWwwRHj3eDgflDcURNoc0G4bkkCr9rdsLy8jTCkmj989V6J4TISAX31xHgjBovYVibq0jXOvX%2FVIXxLLyWxttbtdCpXbruODhh56mvkJ4Exv%2Fm887BQ%2Fe2elqO8XArFfl%2Fd3ongVA5ZxxkWLrzQ9XxPsR0PlP4wbe8dlqbuYPpfWrTcfE7OwYPgNCN6jj3IDB9FnJUeDSMW5rFa7ebz9UiqeBjxWTSPU1AniTqHieEfd5an5ffbd3ENBEVyfszQvasM6i%2FuWQOA9omIKv1UAu0XfFtDEZ0r5HYOgb6yY39VjZyqmsQ1H61IvEzu2cdQWRK2Dec8rURNt%2Bqim00hq6u144cfnKAtsISKPo4IqhZWW9IJMFBA495NE6CWKolDvS7IA7QJQujjlKn6Oc577LBXrmyhHJ1avhW7EE8Gspd4J4stK42b9qt6LLGI7nRLpbwvxexDrjDOos%2FNBjqkAf8xKqs2lbmDPxDAGpVnQ0VTQHm%2F3org919QMfSR5SPoHJbsxYoQSUDfvbbtjPn0dF7Y3iQUBnKVKK5FuMTiXT%2FDe4ECjKWEUbVaCZTXbHiVXPYwyvW96A7Es7bjGgk0lPDeZJXOiIrKmdIu9iJHq6S4GdjgWNCasOjYPMTZrT5Wi%2B%2FKSeFlKl%2BKAfRVwLryyxck0CO6teftanGWMPFi8Ala5a7q&X-Amz-Signature=e13b4e834f36b69b6cf9b6aaeff454775fafcff33d7d0049eddddc4c73e55bce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR7UFP75%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCNoHzC%2BufGpShDgpDpw5e7Ai9%2Btpq5jD%2FwjxS5FYS%2FjAIgBuENBC4zjE1Swkjd1ha%2BbaAC4fxjItW0gJagcagDGbkqiAQIiv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCf5rGe8pJiKcWOAbyrcA3yyhaEtSbDRpCusELZgAT7F%2FpvlpyyCxKGQyhp4Ifyrq8P8MExOg0lx0%2BbLYDPdl9hGQYJGSp6ESpZnZl%2B3u8m9aYSubdd%2B4gWl9KLWVdKdIck4eFp%2F7lL%2BQ42GxvW%2FE1xP1TrRnN%2FRaOMHSw2XbSrR08SQ0LgdEsgrNqsUe8v%2F0anYNXkaWjcMKSlcC66pbcDxZliSDLr5NGJ9Osoqt6rlmNOAjEdwP4uetBqpZ1Ym336XRX8PQBJqbw4XBV3dbNGfLx9pXDu27dlfh2o%2BShqqDFnNtcqMxEax4OWqIEfxW5ihh00tLuYMPBNZNDx49LX572DuZ03%2Bzmr3wFOI2nlnZxWbQYD2NK2Rw7anVztGFnT2LNmxI%2B0oIhkGuPyYQGFDLvenAZZeXPZMMlaJlrzFc99zPcXOlsybJriVJl%2B2vXsamWA1SI5T81OagSBpgsjOgVfrLIkoCuY3iSfzNzII%2F1n6xRQbUE%2BxDaGqslomG9AAU%2FMczpf91hr94vbByF7DohkUkO9xVwnH88vPw8g0TAIHWTXer0MahsnYcvPqDgGcLC1IlG37iTGksQLZiIYU0cEDhZplZGouUJbu8zcRRDD%2BoKeQqANVHJ5%2BHAteeDmbV19Tgi9%2F7nDXMJCiz80GOqUB65LFuLuFRWpUz6N%2FPx2vIncyDhoIAQwxP1a9ijAqRMuJHmM%2F1OZB0XkOWeDRE3f66s3JM1G10WaaT5Pfsih7LNxc4qedO0BSjlXbhi8alMXbKccOBijBahsFNzgOEcip5muLVaWkbAVbSFtIt5SqikK9TmKDvHPC9uzeJB0PwxTqtE84vAwTjn0wkQcYDa8NU%2FVvZnwwQrEdSbEbZWalig5QtP7y&X-Amz-Signature=7f3c7b6009d96b53d4beba7c63c16a6f49e31dfcab0b06f924966f188b475a5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667KVFVUC%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE7F8ub%2F3Km5vtn8cRmwNfAD7Z7mWdzSclRQVPPGGJB%2BAiAfPl8tMRSpucmTy8XqKswk6U0KGgouzTso3lSF%2FrJSuiqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMf9%2BOmr%2FJZ%2F61byljKtwDJmnzcJ2s1B96dj0J5Vkh9T5NU1JNvncGkHwi6HilZQIfjOq%2BeD5DehEMCJwX1RNY2Mt82VUCvAe5V64%2FNbcqSN%2FIbkorz%2BQ9vaWmvvGvp1r21ZfoxRV9U1ntesVTYjg%2F6dFZ8SSiOf7Nbg%2BVWYcuq9JNb1VE%2FEOEudu0RK5ho2kCwVzKaM4I30NdqBBIV0HExhgoAbsCyByZiKxgupOsk0VlJW6ioCpahGhll8wF8XwUJbXzLSsBT7Xs01Aueb7w3CW32FZQ9Ers4HkqVLPM6O5CItQRe0plbFGq2LQfy5gkxYLxw29vsIlcKJ5%2BJOoe%2FoeNFqfDB8WuQ33BYmifXHhEvGzflORyRgWqsz6F6o164NvsVdqYjInQm29y5Xa61LMC7sOHVZ%2B1ojEU2%2BoWd%2BhifqdzU0r0k8VuIXilIEjO9F5vBqG2HYZNdLPykDuDyu88bJnodv%2BQjc1Vpw4IeV92TQ8bvsN0noEnMoXzAPWf6GILJn3tCjA8qjW5Fv9dc2lJXcahQJQ85XgkPNtC502GVBmJz3gr16ufqtUwJNWFO4yW2DwV65UQB1QjfK9f9moXsYWZnevC1GSCIkd5FZcbJjYOPeAigy85oF15T%2Ffu1ISRVn53Dj6uxwswp6PPzQY6pgHElVrEIQRblJ2VV1L7Ph%2FazCqkfn5scZMixnPsEigOnXbqcA0ztv9YsTP1cDcTnn4QsCmXXO5rdb%2FFQ5n0K3hVw0%2B5j%2Fu%2FyPRDoscnEkxfrFq0kTpAmrSL48GB7LY%2F3GF6KHekO4QwtKkdtbjloCHsoxR%2BDl574M0Tvlu%2B54xFD4TYYF%2BV9u7gAtd34rR56EHt0PawPYR1zzCZq0aRCo9%2F142nimKD&X-Amz-Signature=6d7eb43f1e9771ae357702df96975bc5e69cda669a2fe8450418d53b5bec3c5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667KVFVUC%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE7F8ub%2F3Km5vtn8cRmwNfAD7Z7mWdzSclRQVPPGGJB%2BAiAfPl8tMRSpucmTy8XqKswk6U0KGgouzTso3lSF%2FrJSuiqIBAiK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMf9%2BOmr%2FJZ%2F61byljKtwDJmnzcJ2s1B96dj0J5Vkh9T5NU1JNvncGkHwi6HilZQIfjOq%2BeD5DehEMCJwX1RNY2Mt82VUCvAe5V64%2FNbcqSN%2FIbkorz%2BQ9vaWmvvGvp1r21ZfoxRV9U1ntesVTYjg%2F6dFZ8SSiOf7Nbg%2BVWYcuq9JNb1VE%2FEOEudu0RK5ho2kCwVzKaM4I30NdqBBIV0HExhgoAbsCyByZiKxgupOsk0VlJW6ioCpahGhll8wF8XwUJbXzLSsBT7Xs01Aueb7w3CW32FZQ9Ers4HkqVLPM6O5CItQRe0plbFGq2LQfy5gkxYLxw29vsIlcKJ5%2BJOoe%2FoeNFqfDB8WuQ33BYmifXHhEvGzflORyRgWqsz6F6o164NvsVdqYjInQm29y5Xa61LMC7sOHVZ%2B1ojEU2%2BoWd%2BhifqdzU0r0k8VuIXilIEjO9F5vBqG2HYZNdLPykDuDyu88bJnodv%2BQjc1Vpw4IeV92TQ8bvsN0noEnMoXzAPWf6GILJn3tCjA8qjW5Fv9dc2lJXcahQJQ85XgkPNtC502GVBmJz3gr16ufqtUwJNWFO4yW2DwV65UQB1QjfK9f9moXsYWZnevC1GSCIkd5FZcbJjYOPeAigy85oF15T%2Ffu1ISRVn53Dj6uxwswp6PPzQY6pgHElVrEIQRblJ2VV1L7Ph%2FazCqkfn5scZMixnPsEigOnXbqcA0ztv9YsTP1cDcTnn4QsCmXXO5rdb%2FFQ5n0K3hVw0%2B5j%2Fu%2FyPRDoscnEkxfrFq0kTpAmrSL48GB7LY%2F3GF6KHekO4QwtKkdtbjloCHsoxR%2BDl574M0Tvlu%2B54xFD4TYYF%2BV9u7gAtd34rR56EHt0PawPYR1zzCZq0aRCo9%2F142nimKD&X-Amz-Signature=6d7eb43f1e9771ae357702df96975bc5e69cda669a2fe8450418d53b5bec3c5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVY7SKL2%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T102227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCBF%2F4ZASlF36S%2FUOhh644PGA8FkD78%2BNmNFdLFZSFY0wIhALj19HgsJyLj44bOda3S0qDSBpGPQn6pJtnp3ru%2BR661KogECIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxLHN0P9ZhjTsjpyzkq3ANMa9jOgvp7s%2FBaDoYRAg2CQ%2FhmeFd8d3xkJoOnqe2WM09wBNLNQbycUKPrUJM7Mb1crbJ7ExHNY8FXiYn9ZwVlFzJJLsPNyCCvoXTECjIuPA7rpoDp2K%2BcQM98D8iFtURfOogvV6Td5zjXXHhIq%2FsbLsfdgJoiSb%2BL6sMUljyut1tBlBO%2BMVvNO%2FRzRgS3b%2FKFU7OlSw%2BIGI34A6vjkehfLbjJ0RdU7f8hbh2iB1ejz%2F1CIzglAo5azmZ6cH%2FfLl%2Bnpm6F65xT0%2Ffloc7ztkV1m8cgx%2BO%2F9ZMACkZ6DpXb%2BU1q9RfRe5MSpPhN78ErBYNEbPFUTJDFtSBYBQctTOSNAz4tveWBnveAL7zze43F60%2B%2BkPpXwE9hcgtowhUmO28LkVxkAaYPCY%2By4q9KSSiauwjNHBL7JqB6wr0%2BplICnUOtzktZweLknADDNJk7tp87eLubVTdoOT1vSCELWxHTJEXNFKuFp35kb8F1%2BYiyXPcZzwjdIubf%2FW0Dby0tbsPA2DqkOiARwiQdc5F2DKZmqOD%2FRK0OwkcOAatIVXP%2BdZwVq%2FY%2F85L89%2BQpCSwcCVFB4tbTRceYq1KYScdKd1u6EUgiI1VoT%2FOVIgXLpQlBgHhCoU3MpofJz1hOMzDhos%2FNBjqkAYOKe8a77%2FPvNY7kxLynp0CDtezoiH5K1qUrVwS%2BXzh1JKOfM%2F47lRdgYjkVLJznixqBjk5xCoqIooTA9TzNCo9rsoTyOLgTyqtf02MTUhbWikNzUKdpBdnw69M3jr7WpnLfeHhDJXh9Y8GP3G7kv%2BXzSecNAxf%2B4CSsUzaUSTmEu30Zjn%2Bb8y8uSQkoRNwnAs66cFF%2F3JbIF1ngtWMLvKRZWrR4&X-Amz-Signature=7d0331d3ffe8f0ef7b41f951d52789b1bee7c0f54847038af614a760b795d144&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

