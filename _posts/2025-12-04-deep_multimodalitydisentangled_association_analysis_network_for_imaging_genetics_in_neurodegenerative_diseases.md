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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEAWUQXK%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA7i5CvmpadvSLoX%2BE6%2FFHYjLhU5mOFVQZOXQYQP9jwIAiEA9CmhnLDxvM3meyqjXBBhIuXBjMKtQyw0Bb5PESwcB2MqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMGrVHPwbTL%2FtocJfircA1Hy5i0F32qAKk2hJvVhIlpP54uI%2Bs0tdOCB6TjnpYZ6Hw5qEeUnipcn%2FcxjzT2%2BoO4pqGDy66LJb%2BY9Kfo3Rp7Tn7qm5Bj1X6b1nHzF24jN%2Bq9j1KBaIawmXj0aHc3sJvNkW6z0X5i4%2B8ItIG86%2FlbD39QyPQT5ErglFzoT2YYV%2FMf0hSTEq1JKLLETpo23v2%2FirBfhVOUV3uBkMcEboWriTHyjLkmIvy7TwFPK1GEFmpo7yYzUuj56pk9ij972Ufwx9rAv3FtL2GxOMN9R3JhhPuYG6Ew4Z%2FAbpaFPrT5q76O%2FmqSUpoySWDU%2FBkl41H63ESuvBPi%2Frr9KhaZPUDM2E2a6Fp87%2FlXfF61bk52uUdC%2BpNSk5AzsswR3Xtdbpa7%2BZbjB0xCsdszX4FXvKSntRn06VYBcvlt3jPyY5c%2BaDcd%2BKeKQgPP0lETbY8%2B9aU1UpixM5PloIYYDGHH9UKKHHCWEr6uE8T2FgRmKmn90WJa6ZylIq%2BF9%2FLdSqBnR%2Ba411jocxbMkkl5RDl%2BC4mHBBNlxuuBeKmC0PCE0nhwoRQCaW6RIwFbLNnrpUq%2BvqRbnFR5r5a8EOzRj%2FRA43PLjVmIJLggkSlzGRWlJOJoMEvmfM0fy23CZ7kGpMMLC%2F8oGOqUBP83V7nYo9ZGuNARwe8%2FMB9Vuj%2BIsarqj8wrA7l6ZS9Yw%2Fq3zDLWG3p6kAtq4iR04hshHBOBbDAUgGNnNHpy4J%2FKz5IPwO5s0qYVP4zf6iDuhhdn5RKYIZJwNtyMxD0g%2F%2BSizInZJ%2FTaWs43nMzdXO1H%2B2ancgGU2TaNkqiRLjIQq%2BL9jPS6u7OFs3fm4CJu5ab5jvffMDjLBMpaxM82nkH06Zp9%2F&X-Amz-Signature=40e010674c1e56ebc351bba1eb87399a370a3a9f3584bb01da855af30dd91d46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEAWUQXK%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA7i5CvmpadvSLoX%2BE6%2FFHYjLhU5mOFVQZOXQYQP9jwIAiEA9CmhnLDxvM3meyqjXBBhIuXBjMKtQyw0Bb5PESwcB2MqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMGrVHPwbTL%2FtocJfircA1Hy5i0F32qAKk2hJvVhIlpP54uI%2Bs0tdOCB6TjnpYZ6Hw5qEeUnipcn%2FcxjzT2%2BoO4pqGDy66LJb%2BY9Kfo3Rp7Tn7qm5Bj1X6b1nHzF24jN%2Bq9j1KBaIawmXj0aHc3sJvNkW6z0X5i4%2B8ItIG86%2FlbD39QyPQT5ErglFzoT2YYV%2FMf0hSTEq1JKLLETpo23v2%2FirBfhVOUV3uBkMcEboWriTHyjLkmIvy7TwFPK1GEFmpo7yYzUuj56pk9ij972Ufwx9rAv3FtL2GxOMN9R3JhhPuYG6Ew4Z%2FAbpaFPrT5q76O%2FmqSUpoySWDU%2FBkl41H63ESuvBPi%2Frr9KhaZPUDM2E2a6Fp87%2FlXfF61bk52uUdC%2BpNSk5AzsswR3Xtdbpa7%2BZbjB0xCsdszX4FXvKSntRn06VYBcvlt3jPyY5c%2BaDcd%2BKeKQgPP0lETbY8%2B9aU1UpixM5PloIYYDGHH9UKKHHCWEr6uE8T2FgRmKmn90WJa6ZylIq%2BF9%2FLdSqBnR%2Ba411jocxbMkkl5RDl%2BC4mHBBNlxuuBeKmC0PCE0nhwoRQCaW6RIwFbLNnrpUq%2BvqRbnFR5r5a8EOzRj%2FRA43PLjVmIJLggkSlzGRWlJOJoMEvmfM0fy23CZ7kGpMMLC%2F8oGOqUBP83V7nYo9ZGuNARwe8%2FMB9Vuj%2BIsarqj8wrA7l6ZS9Yw%2Fq3zDLWG3p6kAtq4iR04hshHBOBbDAUgGNnNHpy4J%2FKz5IPwO5s0qYVP4zf6iDuhhdn5RKYIZJwNtyMxD0g%2F%2BSizInZJ%2FTaWs43nMzdXO1H%2B2ancgGU2TaNkqiRLjIQq%2BL9jPS6u7OFs3fm4CJu5ab5jvffMDjLBMpaxM82nkH06Zp9%2F&X-Amz-Signature=40e010674c1e56ebc351bba1eb87399a370a3a9f3584bb01da855af30dd91d46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZVKEDWU%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA0XIkNIN9GzwKn7eWEPreorltNiy8nNaZDkHrDdJJBqAiEAw8gsxtmOKcxa7nYx7sy6BjFBbEe9sirVWzjV8yTZhb8qiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFIhtuXdmXQuA4H8JCrcA5Ka9uu3RXVBfLolYgQQaO5TII%2Fr%2FEVBR5Vn4yY3hsP5%2BqJxDswfohEDcir6SqZzB4dRkDpjqGCumYXWlKq7lty9n0%2F3%2BMRB%2F4DDv3E14yTEVUXBHkehgI8%2BIaxmMfJcVyPLdOlVVhTQ%2BFGIB2bUoWPY44ouftfC%2BdNYYPdHgzaxib9AAvVOHPNJPLtKOJLqOTKEMs4phmh%2BVgsa9lqdbilE6XE1vbFuooKDCkYSzj2j8pFVOqH7XR7Wt3jX8zKWKM0oGl06YR4%2B4znW4l2oxLFwmY%2FKQIWMJJgeG75f33F9io5V3XhHogUKDLSrYx1tzx5XgtfmMm4rYrPZbjftnYZT0Tdla2QOBldDlIJZylcy1UYP%2BS3k8eEz2INS7xebwLwDt1IX958F%2FUQ7dBMz92yqpKjW6lsAlP8fAr6uWUvDrlJUbGEy9of7so90RyVJCmHxM%2BReNg1%2Bw4%2BlSKDBQ8vmzfZaVxedV%2BmXZTbJVfIqnjgFEoSm44wRdqiW9gpTj4vjW7q84Zx91JECO38AYGUmny5Xy94otH9xYT9OthZ2pTxMbpiV4uHckRTb4omum9IoexezvSm%2BCXMHEKUarKjXCW3KY5%2BrNtYuxrrEkiDBgyqJQ9z%2Bjjr2GmujMLHB%2F8oGOqUB08z6ebMrJBjeMxVxLMwRNAl9J6cRsvPX5BFv8Z3io4h7qZwWiMuxNCf0Xxe3zf%2F4Rwi1x6E4BAsnqkuxbrEJfjinP%2FbTM1p2QXHi48g9qmiePwWmYd2mE%2F1W5UgbPwAsg9oaR6YSKMLk7pZHyLko2OriNi0bzAaQ%2Bhaty4SlqQNDYmf5mYP%2BiuuUZShYIQysJ8g%2B%2BYAibp8CopCx0ykJDMO97ha3&X-Amz-Signature=de0532b56b7ee9c4155441a6d083ea4b4d61dc5f95b9cf25fd6a7cbab97801ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIX36OHJ%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHgwupBuw6JDhdG8y%2BCUpDBW7m57YQlWzbA%2FWONzKgWwIgBdrpuk8e4pOaPMnfu1IzehSzq%2FyFipmqc5a%2FzMIk954qiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEY7ART%2Bl2%2FZFlmWmircA7rezZXc7TjW9Vt2EUhoANcWOiQKhbcr%2BVleaSgAciKloxKFK2aRK0osaoERp%2Fm1pyHb2dtHdMYIoWRWXlyXozdQ6Hl6hVZR4rw2QMh2Vf16U8YRhaDRfGze%2B%2BbGsli0t%2F9KrW%2FiUMAxf%2FjegbDURqo8%2FziH00t7XyXKOibThGdryOx2isiRIBkfN3KudiKAagIpkDfgbalopsUcAGHnerXM8uWrRWIv2Q5bUHKC64MYT5xaklAQPPkSGGMf0BCj0TK%2BtPqDoEorHIfO4htvFl%2BNnFJM1awYyovcHIPG4djhmG7FqMpAUVC8KXlLIN09WXjp%2B2EUtXhydS%2BaZ6yXelJAekzzQGo8hIR4vkIz0UeaDfyMRRZS6MDXgwx5CBiC2aqnAaNOCL%2FLd9Pt3XghPQR8qKrIXV8gXp%2Fu13%2BYW7%2Be23J0D7xqpUTmResC93j1c6SGxbacSuMshu2fceAmgjrbgzBzI7Iil4vJ1KOPAYcN486l2wHEhXN6zTmHz1u1ecqozou6%2Bbh5CB9lTfz2WLIGkdiZ0EZ4QSoPS%2BHTVxY%2FLCTco0nps4AdR5xZOItiG9YHc1v2y3GfuJ4B%2Fi%2B4%2BiTRRtHTxqKCCLwIhMJYXgVmmTemeocMutg4w8ldMM3C%2F8oGOqUB8FvEczjt%2FoPs4yAALnSKopBRJFM7CTrqpFuFeGpAtdTXnvoKp7vrNX7DX82I7z4bKv9LXudy0NEv86xC4B6GBVLstJ3cH9SLX%2FqpsJx6BS9oji3wGRFBEyO40hkJRfNlV2PrcEF1EQaHFOdxvPlVoPXnB8%2B6CzHFY25nHsAEK23kry5OQRC%2FPc3crBJP5i5mPF0HbMCXcfiBi6dF1GACux7%2F7vjb&X-Amz-Signature=f393711e722b4177cd4fa5411f6216eae39d1474524c4ab34a59f3fb68f1fe84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIX36OHJ%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHgwupBuw6JDhdG8y%2BCUpDBW7m57YQlWzbA%2FWONzKgWwIgBdrpuk8e4pOaPMnfu1IzehSzq%2FyFipmqc5a%2FzMIk954qiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEY7ART%2Bl2%2FZFlmWmircA7rezZXc7TjW9Vt2EUhoANcWOiQKhbcr%2BVleaSgAciKloxKFK2aRK0osaoERp%2Fm1pyHb2dtHdMYIoWRWXlyXozdQ6Hl6hVZR4rw2QMh2Vf16U8YRhaDRfGze%2B%2BbGsli0t%2F9KrW%2FiUMAxf%2FjegbDURqo8%2FziH00t7XyXKOibThGdryOx2isiRIBkfN3KudiKAagIpkDfgbalopsUcAGHnerXM8uWrRWIv2Q5bUHKC64MYT5xaklAQPPkSGGMf0BCj0TK%2BtPqDoEorHIfO4htvFl%2BNnFJM1awYyovcHIPG4djhmG7FqMpAUVC8KXlLIN09WXjp%2B2EUtXhydS%2BaZ6yXelJAekzzQGo8hIR4vkIz0UeaDfyMRRZS6MDXgwx5CBiC2aqnAaNOCL%2FLd9Pt3XghPQR8qKrIXV8gXp%2Fu13%2BYW7%2Be23J0D7xqpUTmResC93j1c6SGxbacSuMshu2fceAmgjrbgzBzI7Iil4vJ1KOPAYcN486l2wHEhXN6zTmHz1u1ecqozou6%2Bbh5CB9lTfz2WLIGkdiZ0EZ4QSoPS%2BHTVxY%2FLCTco0nps4AdR5xZOItiG9YHc1v2y3GfuJ4B%2Fi%2B4%2BiTRRtHTxqKCCLwIhMJYXgVmmTemeocMutg4w8ldMM3C%2F8oGOqUB8FvEczjt%2FoPs4yAALnSKopBRJFM7CTrqpFuFeGpAtdTXnvoKp7vrNX7DX82I7z4bKv9LXudy0NEv86xC4B6GBVLstJ3cH9SLX%2FqpsJx6BS9oji3wGRFBEyO40hkJRfNlV2PrcEF1EQaHFOdxvPlVoPXnB8%2B6CzHFY25nHsAEK23kry5OQRC%2FPc3crBJP5i5mPF0HbMCXcfiBi6dF1GACux7%2F7vjb&X-Amz-Signature=305f44da8de26b9f628a80f698964f45fba855ee937420f6f44135d683f0c610&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCWESTAC%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEJ8unr6rNjp%2BjE%2B0ph0mUXNos1BLkA5kGV09yeXb0VgIhAI4Vd0Fj59iin6mrMN%2BBV%2BslyGh0wZb37RGKqdZ9XvK7KogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxQCvb7IeOPv4z3nS4q3APCXvLKCGloyx5I1qEYnOkbDFnhyEgkf9t%2F5P3To1hWBWuKpMoNaN6JKY8bRO7SCIRj8cMb3f5VgnqZLfJvnrMxlRVcreeTEMpdjPFAWVnCc3nANiRlYOEy3kP49DuaGN3fo7vZ7zml%2FCKAPn3tH6mWXL%2BrFTCN%2FiUI%2FWZKHog%2BKLq5pAcLKKDcL31XTdlKVrh7nPAp8RaululZ9AxEQmxRPJJ3XfXAj9w%2FtKtEHkze7YwBgRJziea535FODj6845JODVjIwvbgWrn3W2djtyXBMWntBx848FeMClVSVximR7smukPDEhYnPfqwrwy5x9yE3ZhLUzO2yt9s6aD63OXQwvedzCwv%2BGhXNTglSch6ANbthkHDHA4HcL1d4TK49wNQX2xS2eKsYLelPtoWxSF60YbwoJmvG8x85NCjsNo6s4RWaEppZph%2Bn8Y4HMcvotSmIK1J7I5nQbhikRJSQOPtFbfcSpGh2OemhfgHTzXO2E9UF12FHnHk9h7jd7IYbYZr%2FnwlVcX2I46D97XS1fq%2FiIwKkf82%2Bqg2YFkfol%2B6uPyNv8tVBX3KU1wCCE%2BhDPfp3kmsyFwUk0oATAXlzBfxVMH3kspsqAaaqsCXyOjMoN5GC9fY75Va8Nwp%2BTCRwv%2FKBjqkAZljXLMC9yiLLl58F%2BSqOIaDhxSwm07xaeiQt0Q%2BJM8J6peO5zOh0%2Bx32STs%2BFZ7s91HMkCj%2FPHzeujWXDKC%2FwokfvDZYJLTs6LtWo9TCtOzcIxAASdq2JjsN%2FytFtL7OwxawvhQn9UFawuMKAm%2BC5fSd5tdVFi22sKzUZyUNn8ELPHEb0YtBaQBHlDrX2IM%2FTGgZD%2FQlB1anHoPAAg2M8bM4Ghk&X-Amz-Signature=8d75c86bf2caa089c8108e35ed1dff381fbae6fe4a39ff768a31b4b8eebf40a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UC7QIEWH%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHMfI9hGDKB2ybUrc9UaZ91fas1FbafrVvw%2Bfd59pWCQIgKCg0iF%2FjvSzqg9nfXZG7E2F8tLjncXzapcY8lm5cSD8qiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBL4WukyOljlPPVyxCrcAwift9sT%2F0D1yqKiSHE4nI5ZKOl73gmtpmbIvQhVS5vRp6Q%2Fd8qcnAy1MbjrFoBKSBT2o0bzwFjnLLFElOjn33x8iBTFqPiioUdNEzeJPzqvcejYigg1E3%2FRKOjkCmRqCVt3mJRaakdC8%2BGSYCFEEjJwyhsdDbJ%2Fxn9TFP0h6v94v9IaUKP5yMGJiMoXSlE35Kue3bEB7WVy1s1NKLpta%2B5sQwwUbW7nsg%2F2Crj85RFqQbc7aORPVDuAGey6Rjqa7kEQLF9CAtG%2Fq1Ri2Vsmq0wdYxnxB2sHaAc3r%2B8TqgtJQS0HD7DZT%2FUfLXjFCces9SgS2w8lFyFH8jvdkC4cjHRFKsXdcW7D36vP4EvLLDICXgF0Np97gEj74VnqklQ5EXcqEkQm1JbCD2nB%2Bnie7QTKegNkTFjGZ0n2bSzqLULtz%2BqndcCd4F3S5EQACCYvQqp5b%2FQgqJ6T3QBwY4XaCazIUnlVeug0eGLMHIfcQEIfLcm10pT2z%2BDMeGGEBxq%2FMF4zuo%2FoVIqfK4LbVyW1SyGUXFyCeSdON%2B%2ByRKo9szGX%2Bz1HjzQhL86xJqWz18d95RFAPeOOCBCi%2Bur4%2FqoDKWHUKQdfQEjq0YQ%2F6l7fZ7SbSO0JDCHcf62UDcSmMLfC%2F8oGOqUBzWk0xQLmJlznXeXIu4TTbIk2APZoanMCucXeevU5xmrXdkLMOA%2B42FUSxJe6JECelPLOFjRK2fso58tbYIHEciBdnBBiseoGdMn7IA6Lw9KiPq%2Be6Apt8WAcBGYw2Oc4vL7hZ8bIPTsQ83VI7p2lKisSK%2BIGxKmZ%2Bq5Iq0Xk7YfiaqPiKWzIs4dFJGv91GdQFJJ4hzwh2mPmrOhSRz89Vn%2Bvtolu&X-Amz-Signature=14918ab4f0c2437e80c4a1915166828ba7f75ecb460e2f86ef5122bf6850895e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667G65B2BR%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBModu%2FkCVdfkSFo6TpSr9jjG8bhL5gx40XgJoJlTrDrAiEAxdRTswU5QpRcjGAFid%2B64VBCdrojpJPfTTsqOKlE8vwqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAWNRatkRz1mg6U5fCrcA6YhWeG%2BNrQg7NrmRrxEGhYYKbMeEJUI9xDui90djWaz4eQ7yx%2BxVvg71GgRmVrehdgL%2BC%2BRH%2B4zne4TDAnB2nfvrBKNhl%2FFjEyO%2BPgHLf5MDUr5enDSAxkED0seh4PqVCw0nEKeqzsoRVephwpxWBk4mVgTfEQZsVepIy46XqKyvhEFo54MDOtgy4SCbBDeymi16foo8RkkbUk%2FzuCtyQ8sfCuS7BF5%2F1od41a6DcGz8dhDSnAO3m9%2BDJsA%2BW1SYaLeX37WRdg0nWilbM2%2F1v1JDSY9qo5Cyw7a1pj3AwPbF0%2FME9KihHi33zo8eDfTnorif%2FuGiXMLJ7k4UQsoYfn5MvGfsI9tAVUGLHynJQYm3u9M4CNUjz%2BhZGfNrnr7VUfvyN8R%2Fm6tWVTVHbBHTBLdQYsicQ2SaAY7z7L676YlchnZqw3QET12NktZ9xSNjRp7%2F3nUU25ojDaIU7P4rcEQm60pVcm03rOuKUT91gsr%2B1VyW53gSGx5eqTb4Sxd4nZ0UbsUPDn7zNUjQCxzV4Y6MEMvTGe5QfUD0VRngD2nZuPW0X4B1k5jkeCTXc3Q7kqOUp8USsEd37k1DpDG9B4eJr9fdirsKQNscasAGNOTPcoXtEQL1SKoNbylMOHC%2F8oGOqUBMCa05vDoQ%2FBnjHCWacxBqhfb22E2ZnRqrzAtW%2BEm3BC14j9EzadullOAQsC%2FNc%2BgpL3PxeUxpDJkGv9Gt8hCGSkQIQ6CZ12wnjqosuZr9x3eM2WvxF70hqwaqGPb4Nf4F5WUa22alTUXyVBybQfRuB%2FQzsJkHHi26YGaM%2B35kTtlVjYy686wRv5GE2ZcTSKVCo%2FZrivhka1QNBkirOiV64Rrc1vJ&X-Amz-Signature=80fcb3ece9a6927f7f2b185e8d2cac67919a6bcb6a1ae5862ce9913376222df4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UBLBHWY%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDFX5pAo625QD8DyszDgnPO%2FiH7g%2BAzFRHZWPFBIiNGOAiEArdJYXXJ32HfPW3MWjJ30KzWicIhmooxtu06o7XA8VLUqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHlr36uIErENeukgkyrcAxSkhoD%2FS2brvfeJXF6VEK9LYOhdEcWc16sAPNsYPw7ekdicFVrrxcmFZNqjIgqz4Quro7jOJdQKDDIEMwhiYa0FIiz5dPw8EdjUFMwrsWrGFF1daMucOxPY1JoNWF30S0lxLmbdXzeDSni4U9u5ofaQeL8bCNmdxnxdBG5jgPV%2B48%2B%2FIIytxgvHPK8WDJQeD1meMDoE4%2F8YIda44DODkbtXmX7KAh1iv6HZLIIOGLCJOhNh1Pm8766q7Z0v6uOmsrH9Lr0l%2FnjspB30IUTT1ROOnfFCMWeJpLMOPSbSNnCqPugP74c4Uj1NVQVYSWf7I1rVvQqWbX779EcWCpPyG4fiY%2BMK%2B2oadgRnWHiopW0MJA2oVAfygQGF6gYCOy3rB8pYbxZKP4UlOYhEawtPkKUP7QbTgWA25Q6A%2BnSppbcNDvCZ5EZru5Wk7TRSoxjMk4GN%2F%2B6I9vCk0rkn5x2p4oiCx29E7fAsYKy8zL0T7TknU%2F2tyiYNgei0IeRJADyyF1axnOkoEAhmBuckKBZVWAnVHfqAuAnNs0J%2FYt%2BdDzj4r%2BywzuybtoojLWUOB50v93Hiw4RYA6KMpKn8ol57LaTqPfw4ietyc9to4l%2FA6YIqdcgDP5uZ9%2FqsLw3hMLfB%2F8oGOqUBEor3nulKLGXly1oKiHQK7qGby3Ynl%2FNkzN689wSysHsbv%2FfYMBUeaFXz7DnvGxzc0xZUtHkJUBGRara0rXdj6uqtHeQgejHodawiquOZ7aLK5N3n%2BXg%2F5VAPZr12M79b7y4%2FJAasS68vyGMN6p2OceNYU%2Bcw9GwKyrMMbr3jFPjeYUiy1ocdeLYXSt8cJnMgKtkRrXQeLnX2K%2BsIrTY1hIMQsMWH&X-Amz-Signature=61d71b00d2bfc28e44d21de3b852f80ae0065c557e8e239e7ebf6d2260548c00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UBLBHWY%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDFX5pAo625QD8DyszDgnPO%2FiH7g%2BAzFRHZWPFBIiNGOAiEArdJYXXJ32HfPW3MWjJ30KzWicIhmooxtu06o7XA8VLUqiAQIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHlr36uIErENeukgkyrcAxSkhoD%2FS2brvfeJXF6VEK9LYOhdEcWc16sAPNsYPw7ekdicFVrrxcmFZNqjIgqz4Quro7jOJdQKDDIEMwhiYa0FIiz5dPw8EdjUFMwrsWrGFF1daMucOxPY1JoNWF30S0lxLmbdXzeDSni4U9u5ofaQeL8bCNmdxnxdBG5jgPV%2B48%2B%2FIIytxgvHPK8WDJQeD1meMDoE4%2F8YIda44DODkbtXmX7KAh1iv6HZLIIOGLCJOhNh1Pm8766q7Z0v6uOmsrH9Lr0l%2FnjspB30IUTT1ROOnfFCMWeJpLMOPSbSNnCqPugP74c4Uj1NVQVYSWf7I1rVvQqWbX779EcWCpPyG4fiY%2BMK%2B2oadgRnWHiopW0MJA2oVAfygQGF6gYCOy3rB8pYbxZKP4UlOYhEawtPkKUP7QbTgWA25Q6A%2BnSppbcNDvCZ5EZru5Wk7TRSoxjMk4GN%2F%2B6I9vCk0rkn5x2p4oiCx29E7fAsYKy8zL0T7TknU%2F2tyiYNgei0IeRJADyyF1axnOkoEAhmBuckKBZVWAnVHfqAuAnNs0J%2FYt%2BdDzj4r%2BywzuybtoojLWUOB50v93Hiw4RYA6KMpKn8ol57LaTqPfw4ietyc9to4l%2FA6YIqdcgDP5uZ9%2FqsLw3hMLfB%2F8oGOqUBEor3nulKLGXly1oKiHQK7qGby3Ynl%2FNkzN689wSysHsbv%2FfYMBUeaFXz7DnvGxzc0xZUtHkJUBGRara0rXdj6uqtHeQgejHodawiquOZ7aLK5N3n%2BXg%2F5VAPZr12M79b7y4%2FJAasS68vyGMN6p2OceNYU%2Bcw9GwKyrMMbr3jFPjeYUiy1ocdeLYXSt8cJnMgKtkRrXQeLnX2K%2BsIrTY1hIMQsMWH&X-Amz-Signature=c06b255a9d32614ebb4cbbf53d0307821ab9fdec76cb576ae68be42d8b73c611&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XENJP2IN%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICUFNar%2FJcwMenLJL%2FCFF0gsCqMks82J1bzZAKRks%2BrGAiA3Xb8DqYlXYlm75GN5XEzQF5i9%2F60H3xH64vVuDw8FNCqIBAiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMQEsupLklRftDrTRKtwDW31dfV1CVaoSclHPBwGS%2BiJDE%2BLlwkuueDPmH6CV8ZWYFB22lj65DrghTvlOGu4TcTc96bTiGfenGDIsh%2BOKfqP5anwvh8JByPUbJpr9qrfUaC6inyobGz7EpHC%2BmPW%2FfiW2iWPI0WE2o6NoVXc%2BSAahPYLX1EtSlOfDQkGsmrhoAUUEJWy5aNBqaeS3K4wQsvWfz73YBz%2F0sgGD2UE3ULxLJRFNTx0WpSTL24rIPgpfDZD5wOF%2BX%2BSkJcGk8UdoguJKxN68SAW9o9BZwTYsf4mkWWnWO3kzTdAYtIfYmhwKifTk9dbGujcVeTJCpf7YNCtJ1jUIQz5K31J6p4r1sUp4JUV9GEG9t5j8dnCvw2w4qTqGUhkwcamtocLkslO9zIqFxoWFx6SUpB5%2FIGCaL1No9z5Qz1BP9NFr%2B5rEc9%2FhHq%2BWZuoHLSbrq3%2B3tGnXILk9mcyDef1uZ%2BdLfPmFEdpweg7UYZ5dopnINuqhrXh7xRW6ZS6565mXBefN7QDiv5k0zpJ4Ij4EXulKEvV5qvfK58zytVOdx%2B1ZDoub2gGmZo9AP5TIqle5HDePdpkBDe30ARoZZ0Kw%2FKk565UdW2WJXTyYEPT75hmFvdkZa6vNrKUnr2XnD17kkJMwysH%2FygY6pgEwdZc%2BsYOtza7xnze2EbcgJeOb8ncyjKcfwLzm%2FSvrmXe1Z2ZyC73rukNFfF7Iai98oiFreBh4r1d5ONc68a3RsxMfg8K09H8KB5EBE5l6jGG9e87ZbYz1t80j3uwd4tTkygJ1EjpSyv%2BrMPttnr%2FFMen9GIlVxr9CZdccEABwyx4XAaQ7Zfd6OXkLXwL%2BPBG5mUWAbfPcyIRQf5McJEm4cVzK5idi&X-Amz-Signature=b4229e1f8e29bbac346e642553584af12e00632f638ac7cd5588ab60fcf9cbb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V6BRAO6%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3stRqK0OikmsUHyWXmGD%2BQZGEJk6JzO49pjN7AHdtuQIhAK4sdjC4kDLkWno1iPkA1vGz0u%2BXxNPA%2B525HJZOwV6GKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzrLhiXLrDg35Zdsxoq3AOTr40lCGqduSS3MBBIvgFpIn4FuWponXjox0yA9tGhbZVEuGIx3O1WmEf9ISY0udT4RdbewLPJH9fWC6R9iXUFphQX64ydK7dJWtBtsxk4Dqr8ovJkMigjzCb4cCT%2FhyGfWHYM8VzfwuaRR5H3jHHa2FcUOKfNz7PadwU5dMxoDNyxulY8i0dVtvsxivCQv5hm%2F7nyjVG4uRTF1bMibSCPV5R1YU3uoB0unZr%2F6CH61ugv8vrZfPVuSigruOyOp5m%2BAZHeQN5WnT%2BXtwXCwqQw%2FHJpfdXu4iVbYivr9FOyy6ZZB19DLXBYhLnFK33jvh5FNvJCbR5YH3JMuktF0xbRBjIcj616D87uYwArxdy6ukyAiOjXo7tPDaTQ%2FyQAVpa6uEp2ObxMuCV%2FC22W1pURPCm8zA69ZmhC8axL0x6QfKC8Giz0CN4hK7hYpAIiRqA5K2ABJCFeltwdrDWGS8QDdeTfl3R8d6lclDNoKxHiGya8U%2FhG%2Fv4ySDyTYj3TEG8RGKhrO%2Fq4OHIXzh%2FgTBCclEI9KjHfl3JpGoy3ewOJyKYq6Lzd7hQFLyEPzFPN7NzEonjA8i7LFG5NZCV6acbGYEq69IgJS8dBZsO5mIOji97FBiOLhe63D27DjTDWwf%2FKBjqkAS5DntbwhUxnGd5Qh0gAnsyKcY3TgMlh6TEWS8xKAkFsj820BzmnKYt3K%2FjXpVbupCIq3%2BdN%2BFsgbx7hqaMSxds1mr7%2BJ3WQfMY2DUFawKzo176A7elh5ZKKD9cg2XgiwR090bIzUI1wtvWReb6FhSL%2FRgn9WfVmCzGl9duI4kQf7QTdRnUUGp3YN%2FXy3Ug2fXbVq4wLc4dNRBvye5pxzhDmiQPR&X-Amz-Signature=58b31016ca13cc1958ab867c17dd643832d7bb173ce0e7c65bda3d5fb9cbd76e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V6BRAO6%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3stRqK0OikmsUHyWXmGD%2BQZGEJk6JzO49pjN7AHdtuQIhAK4sdjC4kDLkWno1iPkA1vGz0u%2BXxNPA%2B525HJZOwV6GKogECJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzrLhiXLrDg35Zdsxoq3AOTr40lCGqduSS3MBBIvgFpIn4FuWponXjox0yA9tGhbZVEuGIx3O1WmEf9ISY0udT4RdbewLPJH9fWC6R9iXUFphQX64ydK7dJWtBtsxk4Dqr8ovJkMigjzCb4cCT%2FhyGfWHYM8VzfwuaRR5H3jHHa2FcUOKfNz7PadwU5dMxoDNyxulY8i0dVtvsxivCQv5hm%2F7nyjVG4uRTF1bMibSCPV5R1YU3uoB0unZr%2F6CH61ugv8vrZfPVuSigruOyOp5m%2BAZHeQN5WnT%2BXtwXCwqQw%2FHJpfdXu4iVbYivr9FOyy6ZZB19DLXBYhLnFK33jvh5FNvJCbR5YH3JMuktF0xbRBjIcj616D87uYwArxdy6ukyAiOjXo7tPDaTQ%2FyQAVpa6uEp2ObxMuCV%2FC22W1pURPCm8zA69ZmhC8axL0x6QfKC8Giz0CN4hK7hYpAIiRqA5K2ABJCFeltwdrDWGS8QDdeTfl3R8d6lclDNoKxHiGya8U%2FhG%2Fv4ySDyTYj3TEG8RGKhrO%2Fq4OHIXzh%2FgTBCclEI9KjHfl3JpGoy3ewOJyKYq6Lzd7hQFLyEPzFPN7NzEonjA8i7LFG5NZCV6acbGYEq69IgJS8dBZsO5mIOji97FBiOLhe63D27DjTDWwf%2FKBjqkAS5DntbwhUxnGd5Qh0gAnsyKcY3TgMlh6TEWS8xKAkFsj820BzmnKYt3K%2FjXpVbupCIq3%2BdN%2BFsgbx7hqaMSxds1mr7%2BJ3WQfMY2DUFawKzo176A7elh5ZKKD9cg2XgiwR090bIzUI1wtvWReb6FhSL%2FRgn9WfVmCzGl9duI4kQf7QTdRnUUGp3YN%2FXy3Ug2fXbVq4wLc4dNRBvye5pxzhDmiQPR&X-Amz-Signature=58b31016ca13cc1958ab867c17dd643832d7bb173ce0e7c65bda3d5fb9cbd76e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U57ZW66N%2F20260108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260108T171638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFO3AfOuGC%2Bi7HrzllfCmcpk5o2X1sff455kkkgmhMDZAiBJ49s9jQ2vIRF9KZcbYo82vWPt0mZSSCTBZljuh7UEHCqIBAiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyzJ%2F0k82nzjrpL14KtwD5WoOyEjCLoKodw5esrMCGjtgT0pP4kO2d6T1PXdfNXavUHD2mLt%2FfR0xNPNKFRFDoO1KKSQOG1mImLNTHH3Q%2B4p3EEtBSIy2Yg6EJxlA%2BA5vwmSsQI0UtCZ%2F4ucDyLhu2EAkgD3Hv0uwAq55jZ60BUlK1Xg2Npn5mQoftM1TOmDeDetWOCXKVCJKmwa9A3ALZHZn2gbvY0K6I3k10Lg%2BM2wHV6c%2FMnBWPoowALoqmiHk8vXoef7byjtLSQ5sqrX5tsL%2BpIL8IefoPGFOq7Q2HH8ZfnxG4q5mH0mjUBqqQKylfII8fddk3QNIwh6GOLkzVbCHQeuKTgdAD%2BHxyNIHUqfAS6sA88FUUtRnU7ZXZVsfi33n2m5yViqTlt1%2FEUrg2wZ6geOBvo0tDT7iMoguh7%2F0NdvRDgrvEX088ar0qk%2FyqOcYImo2h8Nqeo54G7%2F%2BI7o9NmSMxbt4tpRNoxnEDpH7CVdqXP%2F7P9WhyYImCFNVVRQB9k88HroIKTxHCI9IT63oeCm1jGCtOB8Kfv0c0qPcJ397OxuZkrbvQuyUMHsuemUgzCWgWAizAzvj5DcemDjr2rNJLoz4JqHpVla%2FZMiN4Y1jqoqxdTRt9W2jCcjzPwGVg0HoBvUcshQw7MH%2FygY6pgHAQp0dPqtiImPeW4suVcsAi2s9D2rI8XMRhuUw2oW%2BisbCW8ZrxZCYAAx4Xo5EgLGC904El2G%2Bd%2FviffxCVe17ddpJa8wequI%2FUv3AXjcnlVivwZcXgVnaz%2B6hN4hQnz%2FtG9IBcJvas%2B%2B17V%2B236c6Lo%2F0cg%2Fp4P21q8pMPvye%2Bq0VrQ4lWWEVHsEPzKzzQv1ye%2BnS17JxTIaE1AqWONqwGvq9%2FUlf&X-Amz-Signature=a13000e89c4c0ff99100e5d0abd3557c618ca4bdf8ec89190a1e9882bc28241b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

