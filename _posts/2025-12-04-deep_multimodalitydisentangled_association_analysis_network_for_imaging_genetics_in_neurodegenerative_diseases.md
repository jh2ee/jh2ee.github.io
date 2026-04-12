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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CFRC6IK%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCysnNK%2FKmlR9rRrVl3sfiHnwOq9DB22z34HfAz%2Fkp1fAIhAOYBEUyv60t%2FppGDXBW1hVwfaG7osBC0WjLaPrrx8nRXKv8DCGEQABoMNjM3NDIzMTgzODA1Igy%2F8xHO%2B1xReAriIqYq3APIAHGYSYBGYOg%2FGC%2FQwSEp%2BCIhAMU5yNJq4kB01e6ZIfTqHJt5a3y22WRpM4DAhvhU6QF%2BcTuRN605K9nLfSTYmfhosr%2BmmqqgWI8dS5nUnscUaqbRxJqXVXcoZ%2BeYeOLT5l3zc2ibNd2GJ848jyR8e0KwbW2RzPBlrzfVLPyvXSNWpXWitMGHg%2FmTCK%2FLLA6SDSAhs5c74Ocpjyrfl6NJ6QTCbEdj8SwaFPPNbRb28RvdU5k6lTN2eo8bDYoV4gkiLhLicS8nq2LwxkQT7MVd5kuIsSRqKDezORUVg%2BlnnY9A6QsKpsLF0XFD%2BahXxQQRxWBImzpAuFRxJWVTP0JYk0dJbSZPLF3tEGSftu%2BhWS5A9Py3pK9%2B9AEjf04idaVHwQSpDLgVvZLESnNYK5GzGUFu7VOPzHUBRPk0sLkTDwX%2BzBHtSM6Ef6GuUCZpMi2rfVFhQKsXj7c68XltBU7fruk3LcvOjLcZi1EfXGOZ8BZSzKY06BlacwOijb2tBKVUEExJc2eWCVBmWOWF6ix4vbaqbGHMlgGgAb7wfuGHlsMIGgSn%2Bnw7wca%2BUvRbNv83FGPm1Qhowci%2BZqJ1JOtFt%2BxAcORpEn%2BqfFJGzi6%2FT41QvB5LDfKPv1cBkjCe%2Bu7OBjqkAdi%2BLtyKWOAPdXjISvcIlg%2Flk5X371BdUIJYg4su%2B%2BTHw4mos2m7JRD%2BW3SBOYQg%2BlQfywceoQ%2BLjD%2FYSb84Y90KO%2F18za0FDuscD1MIHG225DGxILrJnlRP715acoAB6MMiMYTbjj7RmK5JmZnOOlg%2BM98rJ8aPWUUdHJFvgVa3wrWroE5Xk4BBuL1%2FYg5DP0h0V%2FMDUKT67GSd1QUU7NWhbdYS&X-Amz-Signature=4da8eb8668af3a712fd28705f2c92667de708063aac8dda8ff37abd1b251b405&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CFRC6IK%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCysnNK%2FKmlR9rRrVl3sfiHnwOq9DB22z34HfAz%2Fkp1fAIhAOYBEUyv60t%2FppGDXBW1hVwfaG7osBC0WjLaPrrx8nRXKv8DCGEQABoMNjM3NDIzMTgzODA1Igy%2F8xHO%2B1xReAriIqYq3APIAHGYSYBGYOg%2FGC%2FQwSEp%2BCIhAMU5yNJq4kB01e6ZIfTqHJt5a3y22WRpM4DAhvhU6QF%2BcTuRN605K9nLfSTYmfhosr%2BmmqqgWI8dS5nUnscUaqbRxJqXVXcoZ%2BeYeOLT5l3zc2ibNd2GJ848jyR8e0KwbW2RzPBlrzfVLPyvXSNWpXWitMGHg%2FmTCK%2FLLA6SDSAhs5c74Ocpjyrfl6NJ6QTCbEdj8SwaFPPNbRb28RvdU5k6lTN2eo8bDYoV4gkiLhLicS8nq2LwxkQT7MVd5kuIsSRqKDezORUVg%2BlnnY9A6QsKpsLF0XFD%2BahXxQQRxWBImzpAuFRxJWVTP0JYk0dJbSZPLF3tEGSftu%2BhWS5A9Py3pK9%2B9AEjf04idaVHwQSpDLgVvZLESnNYK5GzGUFu7VOPzHUBRPk0sLkTDwX%2BzBHtSM6Ef6GuUCZpMi2rfVFhQKsXj7c68XltBU7fruk3LcvOjLcZi1EfXGOZ8BZSzKY06BlacwOijb2tBKVUEExJc2eWCVBmWOWF6ix4vbaqbGHMlgGgAb7wfuGHlsMIGgSn%2Bnw7wca%2BUvRbNv83FGPm1Qhowci%2BZqJ1JOtFt%2BxAcORpEn%2BqfFJGzi6%2FT41QvB5LDfKPv1cBkjCe%2Bu7OBjqkAdi%2BLtyKWOAPdXjISvcIlg%2Flk5X371BdUIJYg4su%2B%2BTHw4mos2m7JRD%2BW3SBOYQg%2BlQfywceoQ%2BLjD%2FYSb84Y90KO%2F18za0FDuscD1MIHG225DGxILrJnlRP715acoAB6MMiMYTbjj7RmK5JmZnOOlg%2BM98rJ8aPWUUdHJFvgVa3wrWroE5Xk4BBuL1%2FYg5DP0h0V%2FMDUKT67GSd1QUU7NWhbdYS&X-Amz-Signature=4da8eb8668af3a712fd28705f2c92667de708063aac8dda8ff37abd1b251b405&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTTNIW3S%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDlOe25%2Bl0gBD8q0mADOFOXG0DXNAcK7OCjSy9WHzyWGQIgIKleUPHyY%2BPcxJu8%2BV%2FHZERkD8OE%2BrPRUAqEcZUZWDMq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDN02NrREU9CxjLTL8yrcA1RDlcBVdZ8WlFQYDlhVXS0meZsx0p%2F73LNeKvaAJYf%2F0c5rY28q4rcuOmAzqB6R2kbHTF1YptvE%2FTERHhZxQURk174irrIJ9KoQvNUVYyAOgFlIanfQRV8iZDnVfpE4XXDwYxZskWUTjT0lxjnnNtXPn0bqEy95Tv3azKw2eaY1SBkQFxo8a5%2FNk%2Bz%2B1Hn1t68dnaXVOa1pY1pexwz%2BOTb%2B%2BUYt%2BujYcsXAjxLuo8RaiUcoZcyhRZNbfO6Obx9tXddyzln8ZwCi8lxQs8CHDVhF22vwc844bMLQDWgi6YvaM1PaY5C02lyWzv8Js1lps2LE7u%2B5cZ5G59Sf%2F7SHJb2GirfVig5EJAJ0NsLAkqXH2%2BqK7Ibk5VErsEpRdmVR9IG2alCL%2FrJWPZEKStIISqQQJ8mUnpuZL7kC4BXHISPb2OD%2FcTMGY4ei63%2FNkDsSpY3edndIYl2xtXFPNEDC1ibQ6Q0b9NZAQRbOWoFhLho%2BhHfW6ib63n%2B16exosRevY42qhqufqmHaGVuL5RhCzdp0PjP1l2OvHzXvg0jm8p5SR%2BmX2ccmnrfmxNwHbiQtoJ%2FvNbnZhc0REcUGYKmdNrfOruQEKQCHIwC8H1wW1o84PTvTSV02ri8WV53LMKH67s4GOqUB7h1pFanSYwWykOO9GknASy2kHvOKjulIBgXeZYIPvij7OF%2BDLkB8QUwbmoaSM9CifV%2FyjXlh2AlmUsizH9xTPZr7gmqjv4vRQqcQ3ZuOBx4%2BPak3ZEI6DTMAax6RwBcL5t5JTjLj2xsec%2Fe7S%2B5X8xLuPGdRr0nafIRKSrVEYjFEtk70zV53wDQYSQMzRM8bcC4RKAZiqw0%2FyATD8JfoAh75vN2o&X-Amz-Signature=4c6638f90b372ed28b5e360f435b0df28787e02bfd630d2c433393de037bcd80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOCRIAX4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FPIbv9c73UubMQo0NLfWKdv2Ny66bT5tMK6iZhF7njgIhAOqclSiHfrJ6EUvUbXhUYKLErS3WN7kFaBC8Zp2ADpOnKv8DCGEQABoMNjM3NDIzMTgzODA1IgzmnETGyymWZOb7Gnkq3AMLrWT23V344IjDT83nvEFi6M96upR%2BB68YQybSPJlnw6H3Uz%2FCzhvGfI5Lw9ZIqYo8ZwZLy9v2PKZFF3vML9SDwQ7nCJsAr%2BStrjU0%2FOU2mcm%2FAXJohAfO30k8T%2B6oxa6G%2F4eRjwqNHN7l8GdDk6fQznzA2M44Y6ARTnNBs7XtWRGK0XQ8TZXWjMJqBRtQeAoCTUFOfpN8U%2BLf2NT6FkuOmqpRprjzVbH3Q92AsBTxo8td59ZZEAvI4Ha5M6Ua1rMJFR6iR9SJBjw5a%2F1Z%2Fp3EwUL2bqSEK77i8dkEWZd5iNmy9fvxpt8OmK9OjlElrjMN88PpHeTH7eR7Mr7Y4nSnIriNOzakwNT4ayk14EUr3zAA6QysdLShuQlGxx91%2BbL0bTQq%2BcJjUal0rNxaFZiHIXssq1lm%2BC7z548VAs1r6IKnmZyAXdz5eKikXf3E01%2BQ4uyMMYw%2Bs34tjAjdcl%2BMnhCR46o89gJlGLzdLZOLD1uGRIUVNh%2BstXEWrHH%2Brc%2FZXGrRe0cHO75kiwwVkv0LN2CSBFW6z0ykq5VO%2B93%2FaIGHR8EIX%2FS3mpJ8N9wd3%2FtN%2FwNaj90cP3oXWR%2Fd4rQK0MehBceIJXhn5G2Q5RNFRMHvOSIcbTqX1RwyETCQ%2Be7OBjqkAfhZDTpm%2BzEHQ3UFSntXeQhHsmOBRHlUlEIlCiBPd0Z8Bh%2Bb5lobY4TJcbc8Et01b3ckG3VpX6ch4zuDDlrjuE80SKiYlqKYjhzq%2B4gLQhiwO9VknmbV%2F2QbIeBcx%2BBTRc7pyUudSJ7Xh4b5gYkA%2FsgcWEgtibxpuhDk1yq8PHCYvEI3LObPfWhUSRUT5EO89RW9EZwB0xAex0EA%2Fa%2F4VNmNEQyV&X-Amz-Signature=3abe4b9c57f095e6510cebf561cb14d9d86c567984dbb358193595ca1668fb9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOCRIAX4%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FPIbv9c73UubMQo0NLfWKdv2Ny66bT5tMK6iZhF7njgIhAOqclSiHfrJ6EUvUbXhUYKLErS3WN7kFaBC8Zp2ADpOnKv8DCGEQABoMNjM3NDIzMTgzODA1IgzmnETGyymWZOb7Gnkq3AMLrWT23V344IjDT83nvEFi6M96upR%2BB68YQybSPJlnw6H3Uz%2FCzhvGfI5Lw9ZIqYo8ZwZLy9v2PKZFF3vML9SDwQ7nCJsAr%2BStrjU0%2FOU2mcm%2FAXJohAfO30k8T%2B6oxa6G%2F4eRjwqNHN7l8GdDk6fQznzA2M44Y6ARTnNBs7XtWRGK0XQ8TZXWjMJqBRtQeAoCTUFOfpN8U%2BLf2NT6FkuOmqpRprjzVbH3Q92AsBTxo8td59ZZEAvI4Ha5M6Ua1rMJFR6iR9SJBjw5a%2F1Z%2Fp3EwUL2bqSEK77i8dkEWZd5iNmy9fvxpt8OmK9OjlElrjMN88PpHeTH7eR7Mr7Y4nSnIriNOzakwNT4ayk14EUr3zAA6QysdLShuQlGxx91%2BbL0bTQq%2BcJjUal0rNxaFZiHIXssq1lm%2BC7z548VAs1r6IKnmZyAXdz5eKikXf3E01%2BQ4uyMMYw%2Bs34tjAjdcl%2BMnhCR46o89gJlGLzdLZOLD1uGRIUVNh%2BstXEWrHH%2Brc%2FZXGrRe0cHO75kiwwVkv0LN2CSBFW6z0ykq5VO%2B93%2FaIGHR8EIX%2FS3mpJ8N9wd3%2FtN%2FwNaj90cP3oXWR%2Fd4rQK0MehBceIJXhn5G2Q5RNFRMHvOSIcbTqX1RwyETCQ%2Be7OBjqkAfhZDTpm%2BzEHQ3UFSntXeQhHsmOBRHlUlEIlCiBPd0Z8Bh%2Bb5lobY4TJcbc8Et01b3ckG3VpX6ch4zuDDlrjuE80SKiYlqKYjhzq%2B4gLQhiwO9VknmbV%2F2QbIeBcx%2BBTRc7pyUudSJ7Xh4b5gYkA%2FsgcWEgtibxpuhDk1yq8PHCYvEI3LObPfWhUSRUT5EO89RW9EZwB0xAex0EA%2Fa%2F4VNmNEQyV&X-Amz-Signature=4830c023c62b0cd2ad6f3082dc64c47fa372202fdaec0eb51628c96d822a6402&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2ZANGKA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrqdYX%2BCprjOm%2BtzasVm46qXuuwOh8kxTNO5EeAuWgqgIhAOQ%2BTGG6N8PKdEVFN3y4d0b5hfAQDGlHrNvkB7%2Bpy0RAKv8DCGEQABoMNjM3NDIzMTgzODA1IgzZrfVdR3O%2FWxuqK94q3APArN4EwlY3UZ0I4WbYym79nQ0aalemufNnT8JzjKMs7MC%2BuiWIc%2FTaDzC%2B%2FBv6ljOe7EKNZ7Y5FTFZeh6NeoYSksDcP4nD6CWLP5g0%2FXteISNm5g6T77HkUGPSM1tJO1sVsy4ynBJtA2pkUwSB7YVt05IBWqM%2B6ZJmiHCF5vanzEazCIhfhdrxEnSqsWQfEFOUIATAcvMxRcSyS8hxBqmRcKNUfCUjcnXkmNoK7Bi%2BGjBqrSSO6FTho1f8weGtOVzFNE3%2FY4PLiofNjdMSkIXqbEq1Z8GOO1I8k2eZY8hwI58jhugpufIw%2Bcai5%2BRPSypnu0wM2zcXKCkHARwtjwLvg2CoBbxhnjaJMrZEAeb4h7lCBFBYhG01RBMY5vcC9yPY%2FFR1ZfnqgfAPSb8w7ta%2BAYs60QavwotvIRjEe30tZ32q86Cv0SGY29MHrdD5DL9cKsUuKMcV5rYIsyFRho%2FVA9%2BLMsFuHWDuiYHPCeDx8VY9GTuoSwNJEyGnIahUZbfD0PwTCaHaojJPsOOiWWIBQKcvGCVfVlh1UdifDaBzPtuG%2BkH9mQctrC6XqlmNxPahyIoit1NDgM%2FGBp1EvCsnZOAZwuAQOHGwPaeGI2pTLoRKek5UYH%2FEPWY%2BfjCb%2Be7OBjqkAXJYla4akSCGO7A8ytknawibDrFefXxigQnYBU1xp%2B19hN1S0Z5InoRk4togTs4DjCtvkfaUUVp5ckC%2F6bpdZDdi5ueEQVQKHYASmRTd6WBJt%2BlwZ8xtUusmhZqk%2FpLobKBeKnnk4EyFHe5FTz6KRl5h%2FKKnDrMxKxw3srPW9LM%2FsoBxpfBC1qzHHiPwnyoQiypsN3PLHJMj61Lt8I1Kfwtt3O%2FC&X-Amz-Signature=1a185c8285f6d90f740a3407b455cdc6341d5393f2e98a663a8193bb72380e1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LL647GA%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDPcaVhDfw%2F6c7cflz0F4wwnzWA81gm%2BgylhXlnCu23MAiA%2F6jD7P7HUWuqRRggS9AvCTaaPGHKEtdtiI2JkAk3Xxyr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMl9HJv1yZWuW9R8j4KtwDU%2BHU6wXE2g%2BThyxAmrb8ndCmXQiJv4w4u51stdrfJyHnFL9OXg9eFie7qw%2BGpHjjpYat%2FO7goNEQ%2BOVJhZCGh7BUSBkO9JMf9FXt3aCZq5UeUxpy9Wg21%2BVuVkjQWCmOPergy3YdzwiIZaFcSzliZWxBZaUUXpwAsWtY1o60wa56PA2CPzE3IS4ZoC39%2Ff%2FaAP%2Fzc5s4kSUPaBgalVfzNYBAXN33b8HCXz%2B5TBgCCjo%2FR901p0o6thBenviTxSyM3h%2Fv%2BLS9WhfXxIcJ8TsyZq7BTms86BlgNpVx8E2mbf6lBOeRRJb6KISsYb0Bz38m6B1pqel2bWyLH86PY00RxBseIMS%2Bd6Fe6stIpCNtCDjUaFoKllTAat7aDfJuGjRb%2B791N3s1AiObCqylNbieMhz79EfN8ADirjvMLs5nFujE0h50Rc1sKieUGCZeCUMpzez1QB0lJJigfxPkwyGdZIT6o5HtqEc5Flneve9MGcKGrt2ITT3jS7%2FmxEdkSb%2FYHSCvbc9KNjQ%2BpDmevNpbTM1eoflKiZ5V09mBliNPRgPqmg8X411dY%2F3KrnmEBWKBhz6esLe4SoB8cLq208%2FTDu0mQhH7eM37nq2jtDBtgD7dAyU8uLKFF%2Fvs5egw2PruzgY6pgGdSZkBVONmPP0HpLvjl4VdIjs6U5%2Br5D3F07OD%2BuBYmjDhzu015lOHQM0IMfN7XtwLlNBpGH1bHPeAkfJ%2B3T3maJhkW8fX%2Bx%2FC%2BY%2FEXIxpGFxs5B4foqj1pMzZc4EMP6n2uaygqyGGMsQQB7ogksmmzEycfRWXiI1deAvBBdyagcKt%2BqRqWNDKEQB01mmgEVCUJmRDVVv0fjI94E7ObiUJ8fRsS8Le&X-Amz-Signature=a304b4f65910b5a3386166383b74a556819a9798626972d8b79e6cee062e955d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSXSFUVO%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0Sd%2B57E2A57DPNxfY2DfKTa1mTEZVNlLwvE6z%2B%2FF7kQIhALoGrhJOMtiAXy7auowH5ctBiV8zsQNSx3mExM1GSVA3Kv8DCGEQABoMNjM3NDIzMTgzODA1IgxDMH5R0VsNss9htRgq3ANaBeZJ6OpdRaKOcp2yqrYOdZPkk5HCG2%2BiSUrxVKQoHLiSZgTIqIyWusYPWSbBYaFqWtAFVReY2CXK30Xqh6tgRrP1b3xt%2BsAKAkF24Zim15jLt8vPYimri6baeQNyEFl8PzvFdzgUp9143twTiMEK9cDocz5M0jBsVxKyqPGi4lpyBjzPInktSEozy6dm%2FDi%2FwB9EcPRqFuMGsINljW76GYTN%2B3MBrvmkkXs85D6gyI5t%2FVoClsqGrEqzJPgpw%2BX4oCuCoQPYZEHToJ1ch5wdnLi4oKW1aw23OM%2FMrUDnTrWU7Ka6PTRcdAeL5KsAT7rm20ZJkyxwGgQA33pt2f9WLui7q8vKT%2BUOhGaTL0FyN9kcQHzkoFSnF%2FitgjcEfMt0i%2BiD9CIYPrQSjFhM9VTjUUeHsS8xFP102W25hpWapM%2F9OAq6UCELVf12m1xba3k33zJnunH%2BXBx2H%2FldMOPKEDlS%2Fyvb4IXq%2F%2FyV%2BUmLnORLAX%2FqglQTFaV7sShEDQwT7wHp53sOXrUbIK64uLnXo0HMnoVK4e4Ghg5OEpGhhRSMtJIPjLBnCba1nIROH4ouD0SOMkQV57G%2BBlZdtC4XwqMuBMB0TWu8FWLdpIMWv%2BojfDbKQRgHARdpAzCV%2Be7OBjqkAZJBjFH6yAQhYcwRRt4YFPBsiFDUhbMtEjRvADhZfInHTHFUGxNfvyZYY9n22AKA2ng%2BcPjtxCSjnLi5ym%2B1ZztX8sjOYZEoDW4mjs%2BXpJoS4pc9D8FwBcAHj5%2FkUEHWnVdddDF9HzFwWorQIHplKbg87W3pb4SS2NeI70412%2FeiMnK8yU17yR2r%2BfJCiugXao3NTrFzuck13Rb380a2jD0Ay%2BL1&X-Amz-Signature=27ae233589c3fb438c574f64df43244ed67b1e36926f97ccf3a36c752c39108d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JXSO3JW%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdG6uN%2BAkyGcUHRSqp6fJxz76wqRNYQflHrqsamtzzfwIhAMh0fb8Po5eFkOTZ0%2FGeBjB%2BgHqzPbyVXNiSJpVRts2BKv8DCGEQABoMNjM3NDIzMTgzODA1IgyM860j0QGKRZf5W%2Fwq3AMvRIfnBq1XmEpHJYYK56Mt9xpKjcnFTDxarFsOpg8Xr%2FzG%2BamOhFN5RHGqP6FO0qB1SJcO1IsX2VoAGkMK%2FQPmrW232EYd6cwGPfLzaPmXoo6gCGEPRVr1%2Fkl3FDBDF6F%2FyKxeeuv%2B6JG0wtXr%2BW8ReVDgoLFN%2FfzWgh0VRd%2Bj8J8u7GpCiVNAJ%2F5urv9d1NGlmrrZk%2BoX1eSvTOOnHmMWLJyHKGFczdKSxR73UN4nKovFGKZ65SldMDyC%2BJm6QSjEMQINkukc7RjYeNR8dXyGXz1fakwEUx7vlZ4ZrDBgWthefQKDXWivWOPC7fSIQ1XKoS8%2FCLp7U2FWduP%2FtmoqSHk9pcp7QiTU62l37tN7jP4N7bF8GZ6f0F9%2Bv7h6l8sDUEg%2BvxfCZRErIZtLFrUsgaJIcDUj%2B7qCJ3bj74lMPiTlmSoF0IlSVvG9x%2FcLDVphMfhjvMdPtVSuiFDJtSvUQ0yiqwUDjRo6P9MiGtq4Zd17RHC6REYL6duPh%2BmnkCKmkC9JpvTOQ%2F1g%2FWSxIErxaCiOmcvUY7lGmgAH5jARLK2iVWhMqvoo0mDG%2Bp0ZjHITsu9HRIoYBMi33LCWLi%2F9pNO%2Fccasi59THjJgReVG82nyadTmRLvMwROPkjCe%2Bu7OBjqkAc%2BJ0IBWURRzA4vBGk%2Fkoa2iHln30jGbWuQGojMpK7%2BtgLoB4xnMFOrcFxNqm0AWiEIl7Cvv9guoUJLWv1eKVxFlbpG9DkEqkJ6Ti4OpKPPg9H7wIr%2BLpfZdrcAtEkPuB4cpbQQJUvbiqJZVU9iNKNkz7nBtH6MnTmXWOt2ObaGOBmDzLT9Nqn78W99GqZujrijKY2tVQswqJr63bk%2FkyE9tbZRI&X-Amz-Signature=5f0d9c6755daa3ffc4d159452c684df563cfb99fa5c16db50c4b0809eba46cd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JXSO3JW%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172339Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCdG6uN%2BAkyGcUHRSqp6fJxz76wqRNYQflHrqsamtzzfwIhAMh0fb8Po5eFkOTZ0%2FGeBjB%2BgHqzPbyVXNiSJpVRts2BKv8DCGEQABoMNjM3NDIzMTgzODA1IgyM860j0QGKRZf5W%2Fwq3AMvRIfnBq1XmEpHJYYK56Mt9xpKjcnFTDxarFsOpg8Xr%2FzG%2BamOhFN5RHGqP6FO0qB1SJcO1IsX2VoAGkMK%2FQPmrW232EYd6cwGPfLzaPmXoo6gCGEPRVr1%2Fkl3FDBDF6F%2FyKxeeuv%2B6JG0wtXr%2BW8ReVDgoLFN%2FfzWgh0VRd%2Bj8J8u7GpCiVNAJ%2F5urv9d1NGlmrrZk%2BoX1eSvTOOnHmMWLJyHKGFczdKSxR73UN4nKovFGKZ65SldMDyC%2BJm6QSjEMQINkukc7RjYeNR8dXyGXz1fakwEUx7vlZ4ZrDBgWthefQKDXWivWOPC7fSIQ1XKoS8%2FCLp7U2FWduP%2FtmoqSHk9pcp7QiTU62l37tN7jP4N7bF8GZ6f0F9%2Bv7h6l8sDUEg%2BvxfCZRErIZtLFrUsgaJIcDUj%2B7qCJ3bj74lMPiTlmSoF0IlSVvG9x%2FcLDVphMfhjvMdPtVSuiFDJtSvUQ0yiqwUDjRo6P9MiGtq4Zd17RHC6REYL6duPh%2BmnkCKmkC9JpvTOQ%2F1g%2FWSxIErxaCiOmcvUY7lGmgAH5jARLK2iVWhMqvoo0mDG%2Bp0ZjHITsu9HRIoYBMi33LCWLi%2F9pNO%2Fccasi59THjJgReVG82nyadTmRLvMwROPkjCe%2Bu7OBjqkAc%2BJ0IBWURRzA4vBGk%2Fkoa2iHln30jGbWuQGojMpK7%2BtgLoB4xnMFOrcFxNqm0AWiEIl7Cvv9guoUJLWv1eKVxFlbpG9DkEqkJ6Ti4OpKPPg9H7wIr%2BLpfZdrcAtEkPuB4cpbQQJUvbiqJZVU9iNKNkz7nBtH6MnTmXWOt2ObaGOBmDzLT9Nqn78W99GqZujrijKY2tVQswqJr63bk%2FkyE9tbZRI&X-Amz-Signature=8fa02ce84d44d043d909560169e1ac017e2a3df90f4dcd1df10337f8176ec06d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLZU7AKM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEnOajvjs2Z8M2RYQf6WJQZ7khyywsKtrKu9dgue8SuwAiBv0434ixRWmLMrNoWUc4MRiaFopyXA3bwa7QqrTd%2FLJSr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMN6YMwdTA3a3BBKbmKtwDOq4WhsZdm%2BqG6%2Bkry2oIes7s%2B9qSmpIu4C%2Fma0uuPE7OhHg9zCtmHjy068PKdgh%2Fbm7VhCcch5ZRl5ZTAejIRMG8WOBAdenyDsGPxtZAs8ME1HXKYzPrVjR0bj9feSEA63c2ERRPv3xDfPL%2BiPQKqcaTsgNNhWnRBjnTIittfPLb7go63bUhsnL2WmKDnGpleH6XMOvhNc5WPuM3nLm35YHIyaBZ1Oww9PTNm7RVLL56%2BvGfblFfEy6O%2FtK7QpfsKZAMA%2BwpNyOyohpKkequHTQtVckNOQXy2aIsHvaQMN8Z5tD8atPR9F8n2VS0itWG%2FSzt0xJ3mWPhLlFrn%2F66ktTrH2tP%2B6f21KhgrPB9tzOc7AyquMTlQLiSzyUuzzNxBU0nZExnDXJgOUsvlvC75acayChMr%2FcRxXd5Xp27fn6fB2%2F3o2iRhNPxxs3fPJdCAejdEthawsbqwy59QfBMWA3zKcnv2ck2Mj%2FQ18h5JO%2FGF2xh4Qd0KafwD3wtUMsFifDWb0c1XMmo6IMk1PzPkz4Mospn73LeZxmCFXHThTqLMUir2EPzF68XD%2BOKsHfSAb8nVdr%2BFw72%2FxwMA5FfNkGBVo4iRXNF3Ug%2BmozEomtoWDGv52bjlGtjJ2gw4fvuzgY6pgEUUQPfriHSo5c4%2B1pwbgwUrKItLmDOQZxzGBQYyWp2qCSuyHaXNChRJjkMRP5iYmOQOow5nq%2Fx1m4aQVVZo6Cn%2Bus1YrsIfzWhanmKL%2Bn90LXBhMvFQnc5Aw%2FUjdrNT%2B39BnfjQW8cgM27%2FOMuLRLnZwUBxxmBFhOYdhpnevTDZnJ16kxZq%2FJ9T2waC8FqEBigP9Hjc6a7cqh5VpAUElbBXezdRZJm&X-Amz-Signature=196fa253d9a1b1cab559d850ccf9f9bc6e9ba8b85ac26225358ba3f4b958f73c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CALGMS2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqLcbiBA0eHmyQCQ%2FGRc4xsR9T40pJ58CYywKg6vqw0AIgeKMaRje2NSCVgyXijUTT2MnoS6wPANEHyOYCSFtSGIUq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDCufjqPSEb0fzk0oESrcA7JkAo72Mw35Q7xA2StHKkeDz5SMy3eBpqjW0wz6t%2Fq0hIKUqHu4PZvci6AR0Su3LwbAKcLO1zCMleGT9Z39h5uLN3U%2BGb%2Fgx8MPAXTaTuE9SyRI4IQg7hBX0QwiUwxd7i55na3k%2Bi3s5TtGkOuLG5QaTaIxFnP16rOqwzeZocu5%2FQ2iU57d8mvyCFGm53LWNz9rRlIaVcmBEpJfWwvlINYnl4IEHqxLz%2B5%2B4r3jgSXx47BVVxaf%2FTc19o89pVIgq2Dczhhld0YoUNnu7hFLlODw%2BhWbkwijTXA18Bkdc0PkuQCP97UyPvxZ%2BqvBEoB%2Fg2AnOhpr9tCuHudjj6phL4sXJdKqXmGaK%2BDe7ZaBCq40QKevl9a3RQ320Vx24G3HMjrgrX2d786%2BbwP8%2F6w2VcYXooHnFcFvt1lMtBUHIEYpAi2cplBXekqGPDLzI2jybrFvpoLnpw4mRY5trvJn3i86bDKdFhnTz0gdRKcrSpp76VR1NJXlzKH7p4avmRNmI8qzBomeQlCeZq8NT85tX2eegKaum%2BU1OwHLkXRJKRn5nqXR4%2FRK%2BVfJosf025kjrUf1k1d30Oj3xdNm7gAvrEZlhkYrsNAYFSLUAWnCeTzNejlj8hv9rMF5cKPGMOL57s4GOqUBTuUs%2BBpX5CgkHuWGCL8ej4CJEtcotKqT4oeC9pc21kPBb6VihoeT0U7%2FbnRYW0pCt3A8VPFENucxILZBFzJ9VTQ7BGNydUsXtG1v6%2BWl6JutqXpBuBsIy%2Bn2BkeZea1XH9oeRHV0hJkSiQOtUFPfiLRrwMyQYGOnbJNQH44udPPTSX9uWvC%2BTPd3fXdBqX9%2BKd28nDG33MM5z5oMR0YQj9HSSoOt&X-Amz-Signature=c5b0f72e0c9d010ca21d157a92ffaeb1fee2aaee1b4f0d2b9f6a63e8df8b9cf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664CALGMS2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqLcbiBA0eHmyQCQ%2FGRc4xsR9T40pJ58CYywKg6vqw0AIgeKMaRje2NSCVgyXijUTT2MnoS6wPANEHyOYCSFtSGIUq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDCufjqPSEb0fzk0oESrcA7JkAo72Mw35Q7xA2StHKkeDz5SMy3eBpqjW0wz6t%2Fq0hIKUqHu4PZvci6AR0Su3LwbAKcLO1zCMleGT9Z39h5uLN3U%2BGb%2Fgx8MPAXTaTuE9SyRI4IQg7hBX0QwiUwxd7i55na3k%2Bi3s5TtGkOuLG5QaTaIxFnP16rOqwzeZocu5%2FQ2iU57d8mvyCFGm53LWNz9rRlIaVcmBEpJfWwvlINYnl4IEHqxLz%2B5%2B4r3jgSXx47BVVxaf%2FTc19o89pVIgq2Dczhhld0YoUNnu7hFLlODw%2BhWbkwijTXA18Bkdc0PkuQCP97UyPvxZ%2BqvBEoB%2Fg2AnOhpr9tCuHudjj6phL4sXJdKqXmGaK%2BDe7ZaBCq40QKevl9a3RQ320Vx24G3HMjrgrX2d786%2BbwP8%2F6w2VcYXooHnFcFvt1lMtBUHIEYpAi2cplBXekqGPDLzI2jybrFvpoLnpw4mRY5trvJn3i86bDKdFhnTz0gdRKcrSpp76VR1NJXlzKH7p4avmRNmI8qzBomeQlCeZq8NT85tX2eegKaum%2BU1OwHLkXRJKRn5nqXR4%2FRK%2BVfJosf025kjrUf1k1d30Oj3xdNm7gAvrEZlhkYrsNAYFSLUAWnCeTzNejlj8hv9rMF5cKPGMOL57s4GOqUBTuUs%2BBpX5CgkHuWGCL8ej4CJEtcotKqT4oeC9pc21kPBb6VihoeT0U7%2FbnRYW0pCt3A8VPFENucxILZBFzJ9VTQ7BGNydUsXtG1v6%2BWl6JutqXpBuBsIy%2Bn2BkeZea1XH9oeRHV0hJkSiQOtUFPfiLRrwMyQYGOnbJNQH44udPPTSX9uWvC%2BTPd3fXdBqX9%2BKd28nDG33MM5z5oMR0YQj9HSSoOt&X-Amz-Signature=c5b0f72e0c9d010ca21d157a92ffaeb1fee2aaee1b4f0d2b9f6a63e8df8b9cf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646CVLYZG%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T172340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2B10%2B5fKzmGqgjyx4BmZSvuyoEX2drKXQ6QDr57UwmUgIhANj6HOyrDCCr4WiOYhW0HR4fudpAwfpZgW2p5worYezYKv8DCGEQABoMNjM3NDIzMTgzODA1IgxzGtc4K%2BFsDjwYqk0q3ANPnk4Rx1bRLKsIa9pCcJk0NFQxsJYn7lGcuXHH8oPX6qaLvrz1E33xSw%2Bhnxveav99pq26A7DgnteseRAF1%2Fw%2FhMCnPojSFVvQ0Y2wf%2Ftg%2Fs7jfguTYfU8qW0ifJweUGkHaWf2Jc1lkPvCGFnexgaoJtqN3yFqeFJi3sHUZkU5v8tfuHWs%2BUM7cFVCNwx7fadNJKvE2RH6ZkCb2oU7%2Be2N96fih8gPvSalHnOAmKdaW5LvieQtL5Lze%2BinGO92afGR8IHkn1ZvJ02bqW%2B24QT517SnzzuGnI3YGlXyjwkdyM00eWbR9KglSAI9eYqNB52Ig%2BDTL6O2oGL7Gl4UsdzwcKicZr5QkUFJv9R%2FRseLUFJMzxXXMaSbf3%2FHg8%2BBog6mWLQtaCyDuEnsjlPjnQ3x%2Bd4A%2FWKettZggBQ5QMBsTIzkDoDi1wdUQfRYBegvJnnbRP23QcGSlFAVQVLOcT3TQpzmjlaELKaECEvmOUhoUOmfq4NOuAW%2FjxPTyobNOxzLFVkukq4dmd%2FKfuQZRbIR5bQMxEVPv3R8df5cSzMegKoICw2IKD%2F2yv8tbE6Qffi5u65Jy38wij1iQ07nuLYQmNa6iCCTsdxtvYmjnZTWlSm6%2Fu5PK9Ead0VKWTDc%2Bu7OBjqkAfYZyhTpGWZstb43XwKHZiG8K%2F7WiLL9f6NBhICD%2BAmqx6YRTyQvdckYGKC3wg1tlzAxmvJJ8DB56nxiQJ2Flh%2FFx3BkCIqCZbisaTziD%2FfrrnV1nPz72HihQpkhRSLLH%2F3mOJOKC8C63zLkqHhTwSI%2BYzu7t08JMd9mHt90NMHg4TyMarOUB23TIQH9JNKTCsld8zOOIL3ac3lP2iPE0UEPvufo&X-Amz-Signature=b312d1c7f652dcb761deb8990dd268f476833d98757aa373511fb201ebafb232&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

