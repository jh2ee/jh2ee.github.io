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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XUZ37SV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIDhmA4PhUcka2yBV3l1wRa7%2FeFp5Ha5cvOkt2i7au9PiAiEA%2Fmw%2FOq%2BRE9JHxXa0zNiYP3a3nJyhqDx2%2F2M1TenX0%2FAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIK3xKev%2B9hxRddbuCrcA%2BxTSF3bBBWVbM6lDM%2B61P323vpI8nN57wpXnxHySGvj2j2ftkv62c0q88H2oCh%2F5Wb1MZSo7Qt1fAkTrx2fW4FFtolSAZmBijlHIfXJkbGDBSMMGdVYMEOJGr43fEyWxGM2qc8JVEVhWDdc7JUIR1y1FdlyY4IvZx3HorCUAvKMmvy4HSyiPURkaTHEFBIIyKvs%2B5VeIpAjD8ixLNEuMcweH5sZb7yrLCwmhQ6kEmW1F%2FD%2Bx15KnY%2Fy4maFIUF%2BGyVLpFm%2FPgTFfVvA%2BPJWnyJC63hfKhhnaLku3MRr7BY7sNIbGE0LhZohk2GHGdtiU9VxP9qKdE3wkRARWpPnSUJ9gpmp7PT3GF%2Bqyany2XqyZRAswsINGnMZ7FX3PS03ZAgAe3GFQruESn7c5QbhHl%2FbkOV9UOG9sr1T1yu1LFGM%2Bo7ix%2FhPe0A9r92Nkihn%2B2R%2F%2BC7Xlx1W2wxfMo2uSO8HkIQ0UytxTDECD7GYlfU98sYnAJbW2WFU%2B%2FX1AjBOnuM3xoX5hKdkcrZJPeONyr5gQLAFq0m4k7PsqaLX0bPG5CyQtDcxizKI11y4SndOax0Hc8N7HKCCRaIfhQ18jx0tABE2shfcC6DkBSa2lnqfPKa43eLwkVBplhTuMJqgh80GOqUBgN8htzMAYiEEIbp431%2Bwe0TqoXW8hav2eNyYDy8NJPZ5isdFvd%2BvezhnPhfaITcFJIAJ0Uzz4KlRS1CfiQsO%2BeLpIyqEPXG4mOg1h6QtEc6ktMjaxUFUfXhGSUnbdGGPdV8qVG9zqsSajF3lzImsriDvHG%2BqxDwqKf3ZEgdGVMfgetQYMtNGuHlOZ6rYNEJUSP%2BEnpL09JE9a7%2Fz9BoVaXLozX1X&X-Amz-Signature=fba5cba435768ea910bc3acf899266c6134cae03f4d2dde62f3050112875e516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XUZ37SV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIDhmA4PhUcka2yBV3l1wRa7%2FeFp5Ha5cvOkt2i7au9PiAiEA%2Fmw%2FOq%2BRE9JHxXa0zNiYP3a3nJyhqDx2%2F2M1TenX0%2FAq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDIK3xKev%2B9hxRddbuCrcA%2BxTSF3bBBWVbM6lDM%2B61P323vpI8nN57wpXnxHySGvj2j2ftkv62c0q88H2oCh%2F5Wb1MZSo7Qt1fAkTrx2fW4FFtolSAZmBijlHIfXJkbGDBSMMGdVYMEOJGr43fEyWxGM2qc8JVEVhWDdc7JUIR1y1FdlyY4IvZx3HorCUAvKMmvy4HSyiPURkaTHEFBIIyKvs%2B5VeIpAjD8ixLNEuMcweH5sZb7yrLCwmhQ6kEmW1F%2FD%2Bx15KnY%2Fy4maFIUF%2BGyVLpFm%2FPgTFfVvA%2BPJWnyJC63hfKhhnaLku3MRr7BY7sNIbGE0LhZohk2GHGdtiU9VxP9qKdE3wkRARWpPnSUJ9gpmp7PT3GF%2Bqyany2XqyZRAswsINGnMZ7FX3PS03ZAgAe3GFQruESn7c5QbhHl%2FbkOV9UOG9sr1T1yu1LFGM%2Bo7ix%2FhPe0A9r92Nkihn%2B2R%2F%2BC7Xlx1W2wxfMo2uSO8HkIQ0UytxTDECD7GYlfU98sYnAJbW2WFU%2B%2FX1AjBOnuM3xoX5hKdkcrZJPeONyr5gQLAFq0m4k7PsqaLX0bPG5CyQtDcxizKI11y4SndOax0Hc8N7HKCCRaIfhQ18jx0tABE2shfcC6DkBSa2lnqfPKa43eLwkVBplhTuMJqgh80GOqUBgN8htzMAYiEEIbp431%2Bwe0TqoXW8hav2eNyYDy8NJPZ5isdFvd%2BvezhnPhfaITcFJIAJ0Uzz4KlRS1CfiQsO%2BeLpIyqEPXG4mOg1h6QtEc6ktMjaxUFUfXhGSUnbdGGPdV8qVG9zqsSajF3lzImsriDvHG%2BqxDwqKf3ZEgdGVMfgetQYMtNGuHlOZ6rYNEJUSP%2BEnpL09JE9a7%2Fz9BoVaXLozX1X&X-Amz-Signature=fba5cba435768ea910bc3acf899266c6134cae03f4d2dde62f3050112875e516&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MEIOQYL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCzyG2MJtNKPzvVllbUfFMClvSYOt7CPQMYYWTb1Lfa2QIhAMOHHMw2KF6BlGR1V2rW5xX1SN2YHnyGtoNjngNVQ0y3Kv8DCEIQABoMNjM3NDIzMTgzODA1Igx96g7Db4vfLkSMp7oq3ANrsmXr0YhRnkJxevD8pzU0PwCGQcvDCxn1qY%2FJPArKXHLN4kCYzogv%2BYEw9bTeo56NaosO%2FzOnXh9f1yW59nnuFZdZX8fzpii8vIxgZS2dZdQiGCXR55tFZhEYLVWD%2FdQwbCJsRdYvsiww%2BNPJNoaJiGjxpWr2rvdY846gMVQeL9Vd14Pqp1SfNhD8pdeIr4haxIX2yY0645BSyRqBCqJBJ55VAh7jWJEZP1OTM1I2zoFBrrVTV8T%2BjVGJCFvKycOEK13qq3NQiF%2F51oghbcU2O8FOeQutOHnsSeLtmWjNMNUV1fk%2BMZo19OHe7IIOZLgK1cLSlTZCUCBc8uhw3sIvc1W1tThZII72KNCRZf5P63aNOjdnrwVQoqrgujkbPHvkI%2F%2B7KWI4xRBqOQ2iCJkJvtRBFKhg1TOnY66EAohw%2BTrn89w6uOALvBJ5wXZ2gat3jD8XJHi88rNPYoFoi%2BFB%2Fq1R4ynR%2B4IzJC4Cx4lruvmeQXq%2BIK85OBpsw%2F%2FWVYGfIVcPQAsaRHuYykpdJT7qXFZf%2FZy1NUdKRBc5nFoupbCoiT4U%2FFjsDt1QoIr6kB5kDgG8wnUzqaBwLWg2H3vmy1YYENsSy%2FJJiUr%2F0KJNTUeCYw0PdaHLakE7%2BDCVoofNBjqkAVJAE0x518vhFMUAu%2Fyu1eH%2BJai0QavmMwMdfa1nxWPflJv1hACCsgo9pNmOmdBB1GyeKM91EISW4GP5v%2BA%2BlxN98IGQRbO1p2KvBYSCeSP6I4NlEnVs3G%2BIcmMoJI5qjzuY3vvNtpkisk6MNt4mB4Z2A7LJ7arMDyy4EkwnZ7VCf3Q8vCzUrMRXE15aFxXZlkkq8IipG39bxE67avKA2y%2B6eAZT&X-Amz-Signature=bbbef935023d3ca3314fd749446b83db253d0946642e8f81edf9d44124f9786a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3XTH46N%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIFqCBD2qIGBvmL0XvdT34d1V8oIgB88fzj%2BFPtkOdTxSAiBJdWnBXBeKCMHnP8ekL0BxviV3ahrc6zlUxRdTwjVUxCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMc%2B%2FJHmZXeSw0U%2F1tKtwD3Lv4WV3v8oHYmXytEhOjn%2FR0Vc5O3KHf9mUGC3GIXZeHIHGckgt9od%2BELMvKoD8tAiLpNmwFL0yov4HmGs%2FN0Z9n%2B3IGH%2B7Tk9z5GY17xZ%2FYIHGZTQRxzX06mkHwpG6suPfX4xRnn14Bp7B8lFdGmN9yjdssapasCbQy3w4VuiPos752bIgHhEPG9q%2FD0Lf9lB955UqfI4DsdbIjukcwLg8BCrAsaQF1gSEDPwwZf7sEncqMNzq%2Fatc1wjnCvIK5DU4gir8%2FObxDi4K%2Fs%2FVGwhe0vSFuCM%2Bz3F6B2FFLIa3Ixn6VEyLocTrN4qRTMSGBM6vBNWdlbenUbwnZ6kLncYkKrmRplbk3A5N1d8vQKP43Qm0hJDx8HnV0YC7HhieFtgyBu15WnGbOE0B0ddN1nBMJUn4LL7zG5m0Mszw9qXHWUP7lbpSuLLL9iSXeQCBwB28B4STXprhxwgUhpsyL6iQkP4QkT4jvWOAv8ZeDgKwLMoT4aW6LtnQKI7WIR8yEZ6i%2B5mp%2BxKpJLYsULbzsPJC7nzX1tcsilNCraXeiNE%2BSzziHztlUhl3lH4HIoLPkhuObqiCleWLLNNibL5dQgezdoEyQQOGlkqrUYsC6%2FQ7pbLh8I%2F1i25toGTAwv6CHzQY6pgHBxsoLTqcvCLukgr723UsnIzBv8Ctf9xOx9Sd7pnKLIp44f0I9kf%2F6PGqfLlr8VsC94LpZ%2F8PA9TA%2BU1SYm%2BVd%2BJkPJExzHKj2YbWPLCuNRErflMO%2FRwMDldU0lSt%2BqnP4PEnsniU95oS5FiZW3PyiyTk5FI26bmf1LX8PQOc0nO%2FUXnpJltwuISL3ym3zRwJxfoTPUAXmAnKsTomr7IlF9nyecdAG&X-Amz-Signature=62aa03af6e80d887905b54f2cdd550d96dddeb60c31c147ea00ab1183ab5ba3b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3XTH46N%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCIFqCBD2qIGBvmL0XvdT34d1V8oIgB88fzj%2BFPtkOdTxSAiBJdWnBXBeKCMHnP8ekL0BxviV3ahrc6zlUxRdTwjVUxCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMc%2B%2FJHmZXeSw0U%2F1tKtwD3Lv4WV3v8oHYmXytEhOjn%2FR0Vc5O3KHf9mUGC3GIXZeHIHGckgt9od%2BELMvKoD8tAiLpNmwFL0yov4HmGs%2FN0Z9n%2B3IGH%2B7Tk9z5GY17xZ%2FYIHGZTQRxzX06mkHwpG6suPfX4xRnn14Bp7B8lFdGmN9yjdssapasCbQy3w4VuiPos752bIgHhEPG9q%2FD0Lf9lB955UqfI4DsdbIjukcwLg8BCrAsaQF1gSEDPwwZf7sEncqMNzq%2Fatc1wjnCvIK5DU4gir8%2FObxDi4K%2Fs%2FVGwhe0vSFuCM%2Bz3F6B2FFLIa3Ixn6VEyLocTrN4qRTMSGBM6vBNWdlbenUbwnZ6kLncYkKrmRplbk3A5N1d8vQKP43Qm0hJDx8HnV0YC7HhieFtgyBu15WnGbOE0B0ddN1nBMJUn4LL7zG5m0Mszw9qXHWUP7lbpSuLLL9iSXeQCBwB28B4STXprhxwgUhpsyL6iQkP4QkT4jvWOAv8ZeDgKwLMoT4aW6LtnQKI7WIR8yEZ6i%2B5mp%2BxKpJLYsULbzsPJC7nzX1tcsilNCraXeiNE%2BSzziHztlUhl3lH4HIoLPkhuObqiCleWLLNNibL5dQgezdoEyQQOGlkqrUYsC6%2FQ7pbLh8I%2F1i25toGTAwv6CHzQY6pgHBxsoLTqcvCLukgr723UsnIzBv8Ctf9xOx9Sd7pnKLIp44f0I9kf%2F6PGqfLlr8VsC94LpZ%2F8PA9TA%2BU1SYm%2BVd%2BJkPJExzHKj2YbWPLCuNRErflMO%2FRwMDldU0lSt%2BqnP4PEnsniU95oS5FiZW3PyiyTk5FI26bmf1LX8PQOc0nO%2FUXnpJltwuISL3ym3zRwJxfoTPUAXmAnKsTomr7IlF9nyecdAG&X-Amz-Signature=89eb2317198b26b291578f13df039b84a6e577a728f18273f3932df74201ec9d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AVCLU4A%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCgrany3kf1JLp1W0A%2B1so4toOj6GxWBLoPucasOUmGmgIhAIzClY1jcWbVEIlCWVgKg9zBlgYokrYZWNpNcjZdQOTBKv8DCEIQABoMNjM3NDIzMTgzODA1Igz%2B7V6ak7W6LQJn030q3ANZQFol4yW6fhsgv0Zk2YGJWqQ7YqUtsfV27BzMeMFRBFrOHDLLEnPAo%2FJLNKx%2B5M5oYar7tIkGOHtastEQQXPFi1x%2Bf0gub0qB%2FOSqZCSZykUerrXW8Dhh%2FAyeQRe1%2F5T3zrkDF9I1VSJj1sgn%2Fd8zuyGvw0%2Bk%2FUubC25U3bnl5bI09IzR%2F5SVViea7uR4FMtWKNgM4K97EcktIsG4TpVqisnvF4YPg4Ddl0Jh7t5SdQWrTDU8w6bGRYCm4fE9BQd7z%2FxW%2Fw3EeJUIlIByBSmF9b%2BOTAExiUB44lXvXMPjU5BisOOz85hvHUE4G77J763qlQBrVr3Ll0PMZRwoFMPmeGV%2BLoNnEaK3qLYwckRLCqump5mJ%2B%2FIOC1H04ELjN7J7Llc%2FCtcg%2FYe0iu5F0m2U0Lxkk2zX6hezdxFuHcXQxctAbFKsySxGtYCXIEWWFJukx9WOGXC7It8yjdaDVFbz5emHs30c3O2EkPsAaXPk26HEUaC7g3kackVVnHYK2lwOv1F8h9NMrY7JOgDUo14g9hfXQjJPHphaneGt571zaWdBSQveZbROXFzFPbNJrKjk1nO2PjY6h4yGi2nyBcrHgGo3sbgmFupglVONz3fBmMlDaY2WHVwAM2MrjTCooYfNBjqkAbK64eCefhg74kApCCb8RyaPfpHwi1dvo7hgj0LhGowN7AOsmYRza77nx%2BSKD%2B0cgQ3QGAd3F9IP7eeCkPAqAPIyQ5F2jl5XEhpa92WK0OdUbNLO5wRdOXyrxqK1mbuwfV1oJev%2Bi8t%2Fr7uaJ58fWSMLfLdb9KpOhY43bdXf4OVH%2B0ikI4xji2VRnMYRbY8iN6sRtbDiwc%2BTuK0nGThSIWRkOJ%2FE&X-Amz-Signature=dc973636a977b2589f9e2064871b6f5139a0d448081b3089d9a02c90aa6e76d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWOLUZG7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182319Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDpykrSxbrTAUBLzkfmMmNAvEiCfPGc0vnWxhxi7850wQIhAOaBwt1f7pnfodZcRLD1Qqh4D8Llr6E7RC9I2B3w61OBKv8DCEIQABoMNjM3NDIzMTgzODA1IgwUBkGZnVjPdHuqvHsq3AOMXSJzvIbNvxzFDC4tqXjhUVwDetHsAp8JzmQlgOJQvFlEhVaFuBsmENziWFSmsY3GpzhEBg3LN4uu48%2FO05gEBU4Pdya10n5XqXsnwRN0uSFL3Ng9NPVh5FwZ5D2jj6ArCW5fpTxXQ1k2kTBVdzSmMw8vX6dzEvPUCP2NC%2Bik5PhAlGlrowVuPfOArvHZ3G93ulZ%2FlHeoHE8hmrXThPhXNKLXPLV%2BoeofjDVEi8qyn7Rq6UPYcJaRTroi%2Fx5bf%2FxRLojhWSuQiU3p6c%2B9YbAVztxavGij6fCVGCF4xISecG5wH8D0rqeyKECgkkUTZJ2XwwS%2FhN9L%2FkxuTX6jmANKoL8sBZG2YO6dxbA2Cpc9L1wrbrupV1c62KXRCPxq%2FzLB5WROLvqTQqxTZvNEwp%2FCPyWW9pVn2qbBvxdz%2BrgQPmDIsyHJwiP11Bx1E4gEHNC7%2FFt7RruqU1sqJ%2BksE%2FcWBsv3FMfzrNoXjt8c6E6vu3fgY6DqvlmCMlGrTb%2ByVKsK3%2B40A0r1U5U81U6bEOmptnwr1%2FugJCS45f9d%2FlxkH%2F2dEiPuqpwZf9DtjUYeYgXESvSbKWov1SWDAaXprH%2FutrnS3Ia0WBNFy9qZZ1JsVtIbJ6npZR22XNIUnTDGoYfNBjqkAfHuonceIiKorKOKmPkpGqgSYHw%2BR7gatRzLsUJgZAqhb8ErGuGoZ8eQ%2FornHjR0htziX7hjemRMPcBl8Qv79%2B5kCi8eKP8iMpt07ANwcAXoRTWcHHqMCZnsDpM9ecUGGounSs4x3Lw%2BL7a1f9IyruMKbJyzS3z2HAWEd%2FDVrA9Vg9cJhoXZQIEaOWrpV6OShIhtoPZ10MItYjbvvXPTBTdsCeym&X-Amz-Signature=30ccd920fc6dfde73d8317857815fd954cad4a269bcf642c751ec88307726adf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CDQHKR7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182335Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQCzq7R19NR%2FVjDy9ZsXbziB8w3B5E4fMkgk2qMCEsAXZQIgf8k9MQYrlTA%2Bfc%2Fm2Owr3MuFqxwfhV0OgIQAu3CKR5Uq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDKZXMSY3HXmPNmA7hyrcA6y5dNuXu2%2BMpkUqu84jzGnhwW%2BJCMYcuNL32Asfy4bdzVeuSD98Q9qp9xShOWS4XPwozb%2Bmr8f4%2FepKVIPEBpqqWh7vudVUn6dkp7u4ruDiTzycGfznWoveQmra2avbEe32XuHAI31p72SJm3sBOLeGKCQDs73zA9TrTFtZKXgOmF0HCfnSd%2FzS9rXjRJBBauvO%2F3C4hbVJoBFmRkSX5dlNiUeCQNviC%2FAT9FBE8xuswjKuSw6yo7velw8sX02cfCSTx1LszLBVi9HB7rH9BcHT%2Bc1DY1gKU6JvXOnWOJz5RXJ2Q0HbAhFScxljItgSTUjZw4yYSZoaTkYn%2FM%2FcJCee4aSj7lczwKz0xTU%2F1tzIui%2BvoMeix7xA%2BtqlgjLpLcIUyY2K4j7WRDF1WxEfXUj2AyvYOWqM1mm%2B2rsuI4Q6bleq1NeS24g5RvuZVcSzqXA69ynYY29xhHYuDYkacyy7ZbeDPzeBdPhD8UdHwaLiFzDaqfPxumsMSHdejA8r%2FeEIwo3GnFFim0YMTkSW63Tcl9tMc8gtpkVyzWvtt3arBRxH9YFd0Nu1%2F3TTHrrnmvtoWFVQ4H9SwuXqJquPgMQigCLlRzmIVSdAWDQkXH9%2Fjn723Jtu1G7yW3wHMOGgh80GOqUBIA4hLnLdBkXuYb%2BbFUCH0IW2sqAz6H0faqUwcSu7lzvI6eZFGVzdnm00XJeYBQYbIZ2KxzMz6RvsMLBjZnjfF5lh31vQgnmgc0EsAf%2FPvSiXv%2Bo7%2FuZBLn79mnvrask6PEvdp76esNAcr2wf1yLVUiz1b%2BJLWLRh8x85Yq3VfU9ifEHAnqYP45AvjNJxdQafD3PrQA2RvzSLuUy4KGAEYAws1fKJ&X-Amz-Signature=14369c215a25becf92dd16d791951993367920ae1520ed89b7f7979aaefb5849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVHMO6XD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQC5eTzamlFsK4WzelFURzwUhL6nR5qjN9CamXGok6Q1sAIhAM0UuxoGD0py8OlM1icuxgttQURqvv%2F0sLoPqEQxh0GxKv8DCEIQABoMNjM3NDIzMTgzODA1Igwac%2FodYJo1dQAjIWkq3ANveLvx6dZLUDpOJ5pCIwEgB8a5ld8mSc2Kwg7TH6X07otDFlJb8vzeGrur96HJRuZgYz6ZqreqDeqTYO2YK8MK5PlR9lI64HlqGO46tNcte05UYjWPDFIlzQNvVAW0Uj9ObG4iUiuoiS072Cotixc1nPIKJTKQYKAB2O1%2FlQttGPhdBZLizwSpN6nC0mGR2y3XFplh8fSPrnln29%2BaPs26cIw0PKb%2BmDbIl2MELsB5UGMT81vY8xOZ9c1t7aHDIrYwQhmlefkHaic6kGUb9K3G%2BAxphks%2FQBAgXK2mBXoYHg3uDUqzC%2BjQvTzRwQM7vQ8nmvdbPZIRpTHzvGETP98zTgj%2F3Mbr4mL8X8qy0l7%2BiRRZ%2BfGFesPssbGtngMgzE1kaGveYqENwUhSqkK3ITK90Tu7eWS69VaKySv%2FqoltjX%2Farrl6lPtsnd1PbDjOFuPgAM%2Bnohv9nJ5UsGVD%2Fvaa4pMdlRA%2FVp1Dl123jbFAzjIYsczKc%2BeQiL3oYxTjsiTz1hi%2B0ovlH6q7GTrlVCVBNM%2Bcezu4vbiiVYG4dNc%2FyOKM5QYCUfit5iUyj7PhPK1EFpQ9PdwVL0%2BpcYiL9N%2BAx9H9MHAp1dV6Az133fgTjI8etbmWKiq3MxTihzCUoYfNBjqkAbnJzEq%2B7OlRTgqJtU92%2FbGL31F1SM1XHGfidgsHVj%2BQ159gzdSUQc7myjgbY5mGytEruKE0D6kt71yefP1eTpSnQkukXcrlCOxa8vwDqc7ZJdNAkAMNrKEj%2BjjYYDkg51I8fY6SP8UeJMz7SsNcrWx53obMBVrYl9mtq5psdi77%2FjZ%2F%2B4BBDipt3GOrPcHZR%2FNvGZV17uoU3E4Vf9jcXowL0gws&X-Amz-Signature=562547185d06d4dccf4fe693ec68e7fd6e0a86f40711752948dcf057f6e037f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVHMO6XD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQC5eTzamlFsK4WzelFURzwUhL6nR5qjN9CamXGok6Q1sAIhAM0UuxoGD0py8OlM1icuxgttQURqvv%2F0sLoPqEQxh0GxKv8DCEIQABoMNjM3NDIzMTgzODA1Igwac%2FodYJo1dQAjIWkq3ANveLvx6dZLUDpOJ5pCIwEgB8a5ld8mSc2Kwg7TH6X07otDFlJb8vzeGrur96HJRuZgYz6ZqreqDeqTYO2YK8MK5PlR9lI64HlqGO46tNcte05UYjWPDFIlzQNvVAW0Uj9ObG4iUiuoiS072Cotixc1nPIKJTKQYKAB2O1%2FlQttGPhdBZLizwSpN6nC0mGR2y3XFplh8fSPrnln29%2BaPs26cIw0PKb%2BmDbIl2MELsB5UGMT81vY8xOZ9c1t7aHDIrYwQhmlefkHaic6kGUb9K3G%2BAxphks%2FQBAgXK2mBXoYHg3uDUqzC%2BjQvTzRwQM7vQ8nmvdbPZIRpTHzvGETP98zTgj%2F3Mbr4mL8X8qy0l7%2BiRRZ%2BfGFesPssbGtngMgzE1kaGveYqENwUhSqkK3ITK90Tu7eWS69VaKySv%2FqoltjX%2Farrl6lPtsnd1PbDjOFuPgAM%2Bnohv9nJ5UsGVD%2Fvaa4pMdlRA%2FVp1Dl123jbFAzjIYsczKc%2BeQiL3oYxTjsiTz1hi%2B0ovlH6q7GTrlVCVBNM%2Bcezu4vbiiVYG4dNc%2FyOKM5QYCUfit5iUyj7PhPK1EFpQ9PdwVL0%2BpcYiL9N%2BAx9H9MHAp1dV6Az133fgTjI8etbmWKiq3MxTihzCUoYfNBjqkAbnJzEq%2B7OlRTgqJtU92%2FbGL31F1SM1XHGfidgsHVj%2BQ159gzdSUQc7myjgbY5mGytEruKE0D6kt71yefP1eTpSnQkukXcrlCOxa8vwDqc7ZJdNAkAMNrKEj%2BjjYYDkg51I8fY6SP8UeJMz7SsNcrWx53obMBVrYl9mtq5psdi77%2FjZ%2F%2B4BBDipt3GOrPcHZR%2FNvGZV17uoU3E4Vf9jcXowL0gws&X-Amz-Signature=8406a88274e8033d6e626d78165d5affad1ffc6ec69657d0883abc454603b7ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2IAKUO2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQCawPwh6iYx%2FqvJdrVNez9nYLYIGQGJdsab8VK%2FvWjMPgIhANLH9FFZIdbHm79WWV6vtQwBDTJ0YdH6MVjNotpsdQfMKv8DCEIQABoMNjM3NDIzMTgzODA1IgzlnJp1z8PX5d%2FyN%2BUq3AN%2F8BiXDt94MDu4fd5UpBuk%2FuDZTEwoR4IJMyfxmrA55DpxUssA045kdjoTcpe9J6NeU2bEefj3R6JgVXh0vdhxOhRJGxCUU0KejVb1G1k3tpWu1YZ5WxHtL4JGQrUmYVeDjALQy2453P8j68C9c6GXRwnGj59ic6knErvWd%2BNUGYJySv0qWTiT6xQRq0UwDkXPEWZYKOzUnjN8HinLqhykQH%2F3l0vAw%2FYyvT71vsaoiB7Fl6ccWuEfauSk3A1ywfpQkQ0JYkTr%2BxViwKEcKdpJsDf%2B6PYV8b4fP%2BzqWnhRDcnu0C3rwFxLlTjS%2Bw7fzFd5KqDI6tuOXNf2QN%2BstfR7rt3%2FPsJPCxrInx8TyaqlkKBaz002Cqi4Brd8VaaTkYP%2B2J8c9%2FIQ%2Br0vkmSZgV5rf9OaG1zu1h99m4NKn42qKOhCFVjjLH0ZrJvyAyArdDHJYyh5aTgLLxTWxdpQ9L07QDlcf4m1ytOiSSK3QbPFSKSmBJuy0Sq3INtIgUKZorjSg7ypO0wd7tjTI33%2F%2Fs9CzzZggVwT3atQnkYLQTzdeO6eBeptj3p3AOEnldQ9pzLskeI7RfaxArlU8F2VVR%2BxME9847rycFyx6Y5LgGATvGEdT%2FHc%2F8XuDOcPsDDnoIfNBjqkAWV3MfpyOW7KhiW1Wd8UaNFMCTQmRkGAN3Fg56eOL7NczSRUivcgrLm66blNwgUe4Slh4YMcWBzH3JJYOtL5St7dMPUvtQ1BWQ9A8RHIkxDbydkUYl0iYsoGVImikvwbUVWAIL6ZOzvW71yuH4bF%2BV9Vbtgam8MajZ2f%2BQ40VMw9yIPNKVUfyrnWmYkwTlN07GuWlORmGEpDyBJCjU7Bt5gFjslH&X-Amz-Signature=3ddf927eb682237a909dfdbdaff4bba09526330df94495b875a0338d7510d897&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETHKCJX%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDQA1hI08ODLMC%2F0JM8rCHH0I3Rs6sZoI07h%2Bi10lof6QIhAInbe4TY5Z0qpRwMsFKyfZQUXZpNAjbfSJPOzEvTgSFZKv8DCEIQABoMNjM3NDIzMTgzODA1IgzqVS6mztOQ3%2Bk%2FvWIq3AOn891PFwVS01DW7eBcjdb37Xmnmvidql3rXqzxvp7LmqCEPbncTRuujpO44XzueSQDMlgGXjOiCrbkRvkl%2BIoXE3wl4nTRKruGqk%2FLRmQA6nj8yWEldaQFD5emJeKsWl3%2BDNXkqUumVxIfFXFNfwcQIlEuDP3qx4aV2nP%2BUXruogTAnU7jzK%2BQDKpfGNYS0efb9Mw0mSCy5MAbvp%2B%2Fl%2BMRu0xtbzc3eQQUNafWmVJYQ%2Bywcw6A8vxc5g7InT4fIVAui7qiEBe%2FcgSTRyT0t%2F9rpssp1zhJ%2BIR52zSuo0Lw81AMBCqF1XiguwWwOO5dLjaC1mG118WLIi4oAoTMZxrb84r2svYU9EIB7zKuAnh2J6pKKHZmA6tW6NEipQsMzVUwvRaiucU2paChiusBFXOwNSva9vxIleJg3Q8n0kdUu2bRKNaaUOXQizQo9G2wgnQ%2BF%2BQqig3XX9VYlLXVS8%2F5UwNI0hGxSfzv%2F%2B53WZLOYiDq2qJnUmEekxlTNhU8CSSjCJzhF4H9F5hmgaVoDacCS1jIaATqoKWlYrFaBPrb2mixzMna25tlrgCzWB2xNB1TAbhzUBCEUCI7FAErizptCXD63xHXCpUYFxf2XGEG94hlAQUmIv46fXcY5jDSoIfNBjqkAbfPR5U5cbCkmmfljpxN%2B%2FPW4ncC4ahU4AIboIv5fn22HqWC8ju3%2B%2FHjTcIP7cGHyZ2j3ik6RU05Fbc0ij%2Fsi1WK5FLyf60pFC%2BGUT%2B99psod01VAkEMcfGYwF4frLz75l2w7ZJgobxYSsTxCQktjqMMVfvQCZTLXLWiPmKMfhM7E5sPQPbdMo9AiIeqWaD9V6UvC6l3kgUVJZZOqGRsCE9WLr98&X-Amz-Signature=a07237fe54d39779d7c2af3f7080e678c0f20718f05158209c35db3d233a1a4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ETHKCJX%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182340Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJIMEYCIQDQA1hI08ODLMC%2F0JM8rCHH0I3Rs6sZoI07h%2Bi10lof6QIhAInbe4TY5Z0qpRwMsFKyfZQUXZpNAjbfSJPOzEvTgSFZKv8DCEIQABoMNjM3NDIzMTgzODA1IgzqVS6mztOQ3%2Bk%2FvWIq3AOn891PFwVS01DW7eBcjdb37Xmnmvidql3rXqzxvp7LmqCEPbncTRuujpO44XzueSQDMlgGXjOiCrbkRvkl%2BIoXE3wl4nTRKruGqk%2FLRmQA6nj8yWEldaQFD5emJeKsWl3%2BDNXkqUumVxIfFXFNfwcQIlEuDP3qx4aV2nP%2BUXruogTAnU7jzK%2BQDKpfGNYS0efb9Mw0mSCy5MAbvp%2B%2Fl%2BMRu0xtbzc3eQQUNafWmVJYQ%2Bywcw6A8vxc5g7InT4fIVAui7qiEBe%2FcgSTRyT0t%2F9rpssp1zhJ%2BIR52zSuo0Lw81AMBCqF1XiguwWwOO5dLjaC1mG118WLIi4oAoTMZxrb84r2svYU9EIB7zKuAnh2J6pKKHZmA6tW6NEipQsMzVUwvRaiucU2paChiusBFXOwNSva9vxIleJg3Q8n0kdUu2bRKNaaUOXQizQo9G2wgnQ%2BF%2BQqig3XX9VYlLXVS8%2F5UwNI0hGxSfzv%2F%2B53WZLOYiDq2qJnUmEekxlTNhU8CSSjCJzhF4H9F5hmgaVoDacCS1jIaATqoKWlYrFaBPrb2mixzMna25tlrgCzWB2xNB1TAbhzUBCEUCI7FAErizptCXD63xHXCpUYFxf2XGEG94hlAQUmIv46fXcY5jDSoIfNBjqkAbfPR5U5cbCkmmfljpxN%2B%2FPW4ncC4ahU4AIboIv5fn22HqWC8ju3%2B%2FHjTcIP7cGHyZ2j3ik6RU05Fbc0ij%2Fsi1WK5FLyf60pFC%2BGUT%2B99psod01VAkEMcfGYwF4frLz75l2w7ZJgobxYSsTxCQktjqMMVfvQCZTLXLWiPmKMfhM7E5sPQPbdMo9AiIeqWaD9V6UvC6l3kgUVJZZOqGRsCE9WLr98&X-Amz-Signature=a07237fe54d39779d7c2af3f7080e678c0f20718f05158209c35db3d233a1a4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663SEOVNRF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T182341Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJGMEQCID3caU9XVn9pWrZPUEz0453vFeDIlH9uag6xDZbsfiGRAiBhFnIcIsHNJhcVgaRazZ0UQrePdVeizov02KUATVVfCCr%2FAwhCEAAaDDYzNzQyMzE4MzgwNSIMdYa%2F5Ca3bIs65gPUKtwDVmuvqEhg%2BE0l1Vqxdqkv03zaShAN%2FUrUZ6AuMrOAzodoyP0TiIzQBBHEN5DCcdmrSy8BEjchoTjWVCod53lQy1ixQvKSVPCvwfbeskUUNiGbCWZdE6bhtqidsTWtcMwBZk%2BKRydSxxzMenAKPkI2Gxr4ge1z5EFhlW9eHt%2FQqq4INNelsJvkY7LJBFOTihgy0qq2B9DgquAmx8qZiRSySv5vVB0GT0Yzy%2BVs9j83X7Xs4TEHtYE2u0nPnTZbglG1jkWJbtMshH7NXzSgeFFUtCgx3Jygs%2B%2FAbJMykW5RQjssRsRx%2F35WXJnjBeB5Fqd6dIcKCvaZyKAUyJ40gzbBN%2BHhYuLGvx8eKdSUx0WkikA8JYIOyveIOPf4WW4XNIhqxDu0gJOUw1Jps8pR7qxkQMdevDYWCDMfUoIxkC1eVR0BjWMqTOfGxbgYrsrkxFhXvvCGKOcikBOc7rPmCPu7NabBHGpRVxsoMYVW6HCZoIYEgtIifIkqx1ZQCawqO5PKcU9U8drm0v33jUyBMxAWgkFIA2cAGJjXVebm2MqZ5YETnk82n2fjUg2t8Ee2rYVLOdfXrwKh%2BIKKhf50%2FnigBTne3GUarO2D3IW%2F6lpin6i6ryIk3fAhWloGKCkw86CHzQY6pgEMHDdtlVC2VhctPpYxGDIoQaz2ow6IijYXadK%2F3f0HITFXbzJ4TX7o1Mf32NJnRIclEXOngZoWoSDF3Mmoq%2B6kywIvDmdZT%2BCty0LBw7tlYjU6Or759zwQ8IsJYGSBtkYLMN7UHXbRWOhIthgk7FYnCu4geIVerEe4bejh4nPKavjIe80nNJFIlsPRXGX%2B8X6Ao9StKxZkCwuFjW4sM8%2Bw95k%2Fjao9&X-Amz-Signature=462326d8a5a451da72917d13f8f4db115f5239d051e205a9d4160940e328502a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

