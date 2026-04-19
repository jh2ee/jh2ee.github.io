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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665R33XIYF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDArYE9vd7gKte2B75%2BrbdHFt%2FVIe%2F8S7coMcVk%2FZJSNAIhAI9v8a1Jilxz94AfzBGiq%2FOFg5mvQqz11pemcbwrw5SvKv8DCAEQABoMNjM3NDIzMTgzODA1Igw9VIfa6qkq44TeZNAq3AMi%2B4tkscKrETgU0jOotlghVTmf6DQ%2BIF8ZuejZTQRtaGHXPtxuOFotHszHz7BXc%2BXfoBbpQD5GybFzi68bY%2BgZ296dLeqrJ68pK4yUd8aJluZAIBadkIrlZlMioOSayFj1KrfqOMO0Zq4xtT5nZL7s5nkIjpSQlcQ3Z8x5EFp3vPPybhTVBtzu0mpaZXhVjr0LdpgM%2Fhq2SOW3LFNTmWzeuMN%2F7OajPewtfK%2BIGoQXSUNX3XOsEo%2BxgV8J7kdHSV%2BbNgfp44JDeQNJy0glD8Gj0VN%2F80J%2Bvyl9AovhNp%2FCpIuVWHeb9eVV4Wz3fw19pcIkd6R17UlgCVl6JKS3y8cckjU%2BOVFNkvP7G9aV51qxpZcshADO2tv87TC%2BNWvcKZXo91EO3gmGvtWJRSg%2By0cVivnui2dHok%2BTKVyD%2Be%2FC%2B4lySy%2BBygNkFH3yt%2F5K7nSvH%2FsuBj3YIHV4C%2FzHjtS%2F%2B8Tnz95g4fHKqH8rwq1m4M1lj1w4QkxIGkEwQ8zNNfQalKwUCyp%2Bq%2FPUiScMc3ASvTYRW25Jgnt1CFFw58%2FauLYnJaaeNMZ5e2hTBcrpJKe4x%2BatPr3GVq%2FYMJuFvV6XmZ7xSGw5FsZJDjXMX8Id%2BrYA27NxZ40UazHmeDCCmJLPBjqkAWjmrv6HNUeAQoZZ8jQivn8Vy7e4ry4xhDIThWYWkt6h3E8l7mq4sov1FwwY6uv4ZyKR5LawbsVj%2FWZu3WV41ibDSEAQhhnsOGCd02zLEZCLBjcBzS3LF6TkjIju8u5EDNc9C7Rz8J8h5eGLo%2FVV3iHHposp1Rjgxg%2FxkHTFDo4YE%2FfLDW%2F3NUZiTJxKNANrwyVGgAfFWjOKD2OW20RXbK4Q9I07&X-Amz-Signature=262c8a0e80ce7a652d09301f94dc82b4b5fc80e371b1991b27684931a131e10d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665R33XIYF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQDArYE9vd7gKte2B75%2BrbdHFt%2FVIe%2F8S7coMcVk%2FZJSNAIhAI9v8a1Jilxz94AfzBGiq%2FOFg5mvQqz11pemcbwrw5SvKv8DCAEQABoMNjM3NDIzMTgzODA1Igw9VIfa6qkq44TeZNAq3AMi%2B4tkscKrETgU0jOotlghVTmf6DQ%2BIF8ZuejZTQRtaGHXPtxuOFotHszHz7BXc%2BXfoBbpQD5GybFzi68bY%2BgZ296dLeqrJ68pK4yUd8aJluZAIBadkIrlZlMioOSayFj1KrfqOMO0Zq4xtT5nZL7s5nkIjpSQlcQ3Z8x5EFp3vPPybhTVBtzu0mpaZXhVjr0LdpgM%2Fhq2SOW3LFNTmWzeuMN%2F7OajPewtfK%2BIGoQXSUNX3XOsEo%2BxgV8J7kdHSV%2BbNgfp44JDeQNJy0glD8Gj0VN%2F80J%2Bvyl9AovhNp%2FCpIuVWHeb9eVV4Wz3fw19pcIkd6R17UlgCVl6JKS3y8cckjU%2BOVFNkvP7G9aV51qxpZcshADO2tv87TC%2BNWvcKZXo91EO3gmGvtWJRSg%2By0cVivnui2dHok%2BTKVyD%2Be%2FC%2B4lySy%2BBygNkFH3yt%2F5K7nSvH%2FsuBj3YIHV4C%2FzHjtS%2F%2B8Tnz95g4fHKqH8rwq1m4M1lj1w4QkxIGkEwQ8zNNfQalKwUCyp%2Bq%2FPUiScMc3ASvTYRW25Jgnt1CFFw58%2FauLYnJaaeNMZ5e2hTBcrpJKe4x%2BatPr3GVq%2FYMJuFvV6XmZ7xSGw5FsZJDjXMX8Id%2BrYA27NxZ40UazHmeDCCmJLPBjqkAWjmrv6HNUeAQoZZ8jQivn8Vy7e4ry4xhDIThWYWkt6h3E8l7mq4sov1FwwY6uv4ZyKR5LawbsVj%2FWZu3WV41ibDSEAQhhnsOGCd02zLEZCLBjcBzS3LF6TkjIju8u5EDNc9C7Rz8J8h5eGLo%2FVV3iHHposp1Rjgxg%2FxkHTFDo4YE%2FfLDW%2F3NUZiTJxKNANrwyVGgAfFWjOKD2OW20RXbK4Q9I07&X-Amz-Signature=262c8a0e80ce7a652d09301f94dc82b4b5fc80e371b1991b27684931a131e10d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R47SMYHF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQD%2BapMEGKduXzoFdje1yn%2Fd77vpE74SPvMaxGgr6SMRhgIgLsvAnE3SL2BBRjODMxDq20P9D8jTdMDVXeFw5mBWwWoq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDNQxzJK14kUXFJE9DircA5ajHV08pMEuCadZ5fqs5ewsb7ui256dOFjKwUjUEcJZORuP9lUW1Ex6KO00gQaavqxMt%2FO5G3fS9JEuwUvkzwMcoBYA9Y0vi61IckNzxh5qUIqnwv14rIcLIgu6TTWjdM4FQObJQvr156UXxtPRbEoyDdvvP4ceUsq818f%2Fdu7CoEIZCP%2BJ6i30%2FDZjEdJiGcFXD3J5JQ8gr9qtKz9zlJKCuIcqCntPLSAnkYOnrsQfMX14%2FJ%2FcTAQsEKFpEk%2BMGHkL3iEUcvW1%2B5PL3gnMaJYiuSYAHcUphJgX8AXLLxQc7BjZ9Z281Y73OJftbOhKW712VJw5cJQNPe1ZrijWjyR0xupufh8POZs2OG8DPpHxVppkrpaJXfpU5%2Bx0Q89bVC752v6uEKpt3doAY6HejIrBqqgemKDPs5OU%2F9Kjs9g3yLWYmA%2BWAd1IbSWAFhOxVw2o0qv6kHbQtT1m%2BlYQZ6TPKB8g7HxqPr4LrrHQLyNUq3lgZFBddRgytP6iQk0PnywmfJ1x5oQWNXCO6E%2B9Hs8K%2BH5mraXjt%2B9ddoQVw7sKac%2BWUhJHbaWmUW6qi99nyIG6OzIj%2FYeMXYgRPnO2rn%2BBTPQbCrg1E7LQAZ3y5Dy3znzdgFM0TiE32eg2MO%2BVks8GOqUB%2FcwhwmIDGL4xc%2B4XTKnXmilSrsMCmNZlbZmOoO7baIukCZJ4OkP6XsqAUEatT8h1YFU5AF91ER7eSp5HN0ndfG35Dj5j1CZR1N7oQfjUjumWSEjFtoBHBmkmlfnmK5u1XFj%2F5N78hz4TLYUBxOvqllzIMmZsaz%2Fnjc2p5u1Ue6aHO8pSd4QQeXDxHquhHofdSeV7paw7VsDd6Je9fL0pKwEQYDV4&X-Amz-Signature=48eb6aa7fa76d1fabf3db7e2fc41d49638615c673602b2cead94f10f9aa88d5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4ICLJGJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEQNeMYKEht7NpPO9DKBenrQ6ubhCM2Brs126E6d4PPRAiBRwO2buMdxkqWpRRV99PxkMKl9KDYTv41L1riz5SgD3Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM9uYXHjD5OnT4PHRoKtwDhLLaocXQxORT4mp2OP6oymG8pA7fgCEljFwd59BhP1tbGpKj7ptXHxVF0j7AmC51YfaDH7qiJriA72ek4pj0kviTaBzf8xj7cQN58cuftksk0I8movNszkVhCOhsi%2B%2FWDmhfUo6AeNTzad9616HDSQ5DweKr2OlD8dqt5TC8V93uZQSoqxgbsvfC%2BavTLvb0TiB223nVh3H4F%2F8p5A4%2Fcama4nDDgwMt9pUeSMZ6aTZRNhUsW1R4F1POX0WNnLuD2ikPv%2FKmZuad3iES9FAN3%2FO5P%2BqK1D60IQBpfvxwMjX4EzRrfUWenCRqEnoPFHSqho54LUrK4VGhxrPg4haNVgNCTtsr5gI8YRATz4ulCuxCbmajiF71v4Behdtrmj5zItbuF%2BejkILvLYmXmxxBbK6JFkDw5fdiHaEMPGGNOUb2poHVlObjQ3jo7Qz1PCNTulM0eEI%2BUsrPnH8Ab%2FnDmoYTMFMv54mQUIBitdZcGAvc2d%2BzH6E26TF1G2QSKDWzWla6ackb%2FEnfWImVR%2Fl4hpN07NveORRGXAv%2FfSuqZ1nsTVEBavshXuaL1kR8lliCORb9li8bXl5KS7WU%2FVfPB6P1arLlbf3fblt74BIhI9wCEpOXWL%2F5r%2BsrsmYwrZiSzwY6pgGbF4hsp5mT%2Fuwyd6F5H5B7zf5PUQYNZ4y7GloW9uBEYi3iTzkvRoNUcWt1BBfGxnYOlzXsyIfjLh2CVe2p931PpalLvCU3%2FaT1%2B%2B8y1TTqqP5J2LwLHgD10f6WBkL%2BtgHT2Gxjq3JCeK5NKzor6P8fdGcpzGQa7oQYQL%2BBWyrVVLi2%2BELSb%2BofuT3QMOHOkbsRDAE%2BvTRV5FtMpcGdYFgDP37uaOlh&X-Amz-Signature=fbfe60775b20ec4f84b81d66b40b6876630a45d36b7fc96c4b6deed698bd147a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4ICLJGJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIEQNeMYKEht7NpPO9DKBenrQ6ubhCM2Brs126E6d4PPRAiBRwO2buMdxkqWpRRV99PxkMKl9KDYTv41L1riz5SgD3Sr%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM9uYXHjD5OnT4PHRoKtwDhLLaocXQxORT4mp2OP6oymG8pA7fgCEljFwd59BhP1tbGpKj7ptXHxVF0j7AmC51YfaDH7qiJriA72ek4pj0kviTaBzf8xj7cQN58cuftksk0I8movNszkVhCOhsi%2B%2FWDmhfUo6AeNTzad9616HDSQ5DweKr2OlD8dqt5TC8V93uZQSoqxgbsvfC%2BavTLvb0TiB223nVh3H4F%2F8p5A4%2Fcama4nDDgwMt9pUeSMZ6aTZRNhUsW1R4F1POX0WNnLuD2ikPv%2FKmZuad3iES9FAN3%2FO5P%2BqK1D60IQBpfvxwMjX4EzRrfUWenCRqEnoPFHSqho54LUrK4VGhxrPg4haNVgNCTtsr5gI8YRATz4ulCuxCbmajiF71v4Behdtrmj5zItbuF%2BejkILvLYmXmxxBbK6JFkDw5fdiHaEMPGGNOUb2poHVlObjQ3jo7Qz1PCNTulM0eEI%2BUsrPnH8Ab%2FnDmoYTMFMv54mQUIBitdZcGAvc2d%2BzH6E26TF1G2QSKDWzWla6ackb%2FEnfWImVR%2Fl4hpN07NveORRGXAv%2FfSuqZ1nsTVEBavshXuaL1kR8lliCORb9li8bXl5KS7WU%2FVfPB6P1arLlbf3fblt74BIhI9wCEpOXWL%2F5r%2BsrsmYwrZiSzwY6pgGbF4hsp5mT%2Fuwyd6F5H5B7zf5PUQYNZ4y7GloW9uBEYi3iTzkvRoNUcWt1BBfGxnYOlzXsyIfjLh2CVe2p931PpalLvCU3%2FaT1%2B%2B8y1TTqqP5J2LwLHgD10f6WBkL%2BtgHT2Gxjq3JCeK5NKzor6P8fdGcpzGQa7oQYQL%2BBWyrVVLi2%2BELSb%2BofuT3QMOHOkbsRDAE%2BvTRV5FtMpcGdYFgDP37uaOlh&X-Amz-Signature=00ddbfe245dda48620edf0bebb73ec52b13bc86fdebfd8fd6839e13d26bc3f1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNPJUKQK%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIF0xnGOB7HnyPgl72CxzbSxU7EWC%2BW1%2Fq12sgkiJrNYAAiAhQS6e2Mc%2BTz7JN14f4sNJrSFwiarH2vgiJbpXfla7sir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIM9TyCILE4yS%2BBuyiQKtwDUq604LUhWE%2B9W5ijzqege5mclN1nX2slHljAYF7XlS7hF9gxjHXk3dkl6fBOrxOA6pSJFSf5RcH%2B%2BKCevUN1qtcGEbjt6SLZQeUmIGBHsRlHxTy7D2c4EyCELVJn9N6xdWXwunRGEwIll6hmJ3Toxi2rHrpatva4agBd8vE2pExtkRbrqW8dMO6U5N%2Bwe%2BjRwWUpT9lzqLgWMYH9QgzNs4OOdiVvtA%2BJLs07jWsKyOtuGirPpRBk2AAK0NeGupDt92K2WSKs6BQ7On6S5yii9DtyWNGbOqn4G9uJzaQZms%2Bo15JD5R2MvDvOvwgu8pgvbsi3vNcQTxbQ4aHWv2j9848FGsYcBoJlwg9EmrIhoSPMKqEJtO1tdoBp6jIbEqgJxzX47RMkfnM3lf0YwXXvBMdBAz5csysiyZumkDat643xVmTncshrTNTmBEyRN2e1jVKAE0HgjFhfxdmysiO4bduw6%2Bs3SF4nr2eeNJMJKiaGkzbYhu6mNoTAEtx97Y5rdZ1fbxfqgSZ6s7XriunA1vaLeioM%2B8mOJPpnQWE%2FUxylxiC%2FXuw2h6sG9tOORpJFBvLmaJ%2F1NoX8aZxrPl%2FIflc5qiw0%2BC0esFiMmYRsMS9kq3F%2FODdTMPFbAFEwz5WSzwY6pgGcKkQZcI2b2VElRRWvr03b3v1l%2FOZSUvmFDMHwjisPRZz%2BnLa%2BeYo08EwSmqCdNdRVjUKmHB0dz1wRAmrFzuBjwH3gjMkJUx5PnSV2YvdFWmfFdHnZ80fDz7p59iZ4u9Xtuwt7L5D%2B%2FU2XOz%2F%2BphNEUTzhN7uCJnfQ0pRGQ2yXrtajPnIUDF6TXPhE9HVPlze3ilr3Hfg9tvICwPEVktgwqvIKYiHT&X-Amz-Signature=e97e2e5ba000f3deda639ae9ecc88bedf557911371b8cd92dd88b619222a8db9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZAPGYBV%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093459Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIHH2XI6Yd%2BAXYZPGgk8obNTVR50W%2BzJjt5FFL9zYmNWmAiA%2B76L1O3ClOKD0sylT6j1f5c6ZbL07tfeUY59mrkiy7ir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMcxhzqyKxDv9zntdvKtwDQMGEsMtvjxO%2BtDP8wFryvt6UD%2B%2FEgmUg3CU3BZbkkgeovbN0gxHxlxFHFHBU%2Bu5H%2BMssgpHtNpL62hSXMquY7fwDCFjpVsj09yukhzfGhIm0YnOGyXHqtFHW2YacRgvaD3rAXi%2FJ1KwFo%2FoRlmdt%2FnXhGYjXn9ZfZOH63nlZjqFmrzgevK%2BIOI9WsP3ij7C9l7OTQMabn%2FCqEkEAB05qZmXHu2OYDCgF25RLDx5CCauUOOhwR2jYjboBgqHU2FLlUh8%2BJoIUayXLon%2B%2B%2B6dBWxNMUXgTNAQAvn%2FG2Gg7ElurSp3prI8Nf%2Bj08T3MfS6UqGMB4Do%2BVMuI6Owj76vQKhYpp4N0jrkincznGeX72PE%2BYWJcWUwtr9WArjEukOg0rQ6MRpg4xwPiSLJFxv15vuDXKB%2BKMMFS9rTc%2FFGtvCX65fjQSNkOuIp9J%2F0kQX%2BouJTS%2FvLRP1TTAgkWLszUzC8nTpkMtDHFUY59%2B9TpxvjX7HaMss3FjKt2CLRxWNpqCqVKVpSaWin0f53JuC2%2FTOmAEWpu%2B9VxviWavl7QqFDqOnXDQH2zzaXc0ubr9Ad9E2cs7S7E%2BJQsVvMcGbyc1SjtFL4qKu8GokT93EEB14LwLX1dVCD9%2B6vCZz0w%2BpaSzwY6pgFMWagUCdycq2LOOCIbnqlg7xsxRMV326bVnWMT9NHswkZMOQ0RmKZzJBYwOhrLOy2z%2FlpQtvcIEEtOdDYh1VLE2COpTMzoMtvOfZMISlFCA99yvAj2HrKAliuAp9OCauU4LAvqVaA4O20S1IyRSs%2FLW3Sdq9MR4kEkuE37psEdFrUWZp5E2hcU2DC5vbgPnbrYNzA8GyoUO0VVxSj0c9bHA5hTh3Vm&X-Amz-Signature=53fcc43888ab06ea87ea1e61552eab5746ec24067e9080452a294b722e365628&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667MQMPRJF%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093500Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJIMEYCIQCr15vHBefLUSJZRk%2Bdsa1A8rovOO2K7kW6VUSVcg%2BShAIhAIg4uZLiGPPDyHAgHVyoSXZ9%2FLARD1LplS%2FVLrQLHnuCKv8DCAEQABoMNjM3NDIzMTgzODA1IgxVAdA1dxFkCoF3H0Uq3AMoMmIGJ0cO3Fsjk28%2BCQbJiTzJkLybOhu6KU5qYNfOAmHxyxz9bpf%2B%2BEWYzR4%2FweAj3FfZQxA5HrYNLUpFNOY4v4cIIoYzIdkGPD2WUEvuVZk84WLtYv6LyFDLBT1pq%2B%2B%2Bg%2BER4tdPBoHtJqyOhZDdVtWW7FfFwNOke9eYQu0hGYDGzfp7F2l3kPlOyW8s006kDIxZY3sOHt%2FteoKiW0NaWqnv9S3n9pguJwsSS24GqXqjk%2BPg%2FNy5mP7kbB08aVUY8lJZszkxWZqIIeCT82VzzkjRkVQ5NCDB8sM1QhXis5l3VHwbvjzZbYHhSma2HANntDKdEZSCMNiCJ206%2F5EZOUBspo7MxIN6LY5MWb4QzsFDBBMYxjpW9U3lA9WEydboAzoTqaTcepNrPo%2Fxi%2B9OTxMn9DFBE%2B7FSG%2BiMHNdWaaj9xSsu94TewuhmhyoJxh3dB5WFpLpytvULx1mod9qvLkWBqJTdzYA0yB61WDbi48G7wVo5kXxR9pOxXovWeYR3RUKTu7y9uCb8IkYYwDz33LRaNx04CNTGqKl6ivid7%2Fz3PqQvUn4Gj0o9YAckKsE%2F4PCY8vu%2BiLk2MgHnSPkGfigYY3DrK9v8M0IPdG8%2Byisckl%2BYMg1xDBzQDC%2BlpLPBjqkARJS0Wj3YnUmTlAaO4nJcv%2FR6RxJ7nEW2zgVQOyhbS7RtLulMSLqGnkNGG5Mcy5iHZYP9LpgKoZmaRrsxy6fpduVSEfxKPXIFCMUqQ%2B6Sxz6gmEEe4WJONgB8NcEVeqym4lDbL4U6vbA3zW8l5zjidRC4uYsg4vEulpraN9fPIpGmcmCUrYUbWsqOP%2FTp%2BK93quBOyKKyRhOWaffqf%2Fx537mfxpx&X-Amz-Signature=a3adb6a68de1aca0eabca0e6013e7af27af918fef45e9ff66bac67e032d52f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVS4BCZM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIAF3ASpsWyO%2B2f7%2BLbwPE7JU1HWv4xnTH4p2gtS4JMKEAiBjLhVkUXLjAYnwNk0HSsSQg9QhdCYThkj4SuOSKQWMTir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMOuNPuSioYbCflqrYKtwD2HExVRovPJT%2BO72Z4ytkbw2YImguBYi4y74%2BSagraRZ9lZsAG%2B%2F87Jtzz8A9os%2BtGatWlHC01ZNt6q51%2BmJxOeDzep4bn4E502KmxHThpBL5dV%2BsxSqqNPaLdU77KMpjb%2FVI1ysOcsoTU0PFf2sXj%2FkK8v6GMYCnj%2F4xtSyF8C1vgtCFiw2xcVIT8hfd255etJDmjyxR9LeXFvhluDhsdpBEKT3wVZH%2B7%2Fkt1naVoHDaWXzFKVA%2BF1qzmKVpg0uX%2FfCYnU56IO%2BAjBMFjoeITuR8iufHtzU6AicGa3%2Bq5ai2E5nrSbGFd52tdPA55oPNLqnHGQNdZOHCqWWNmRNde1bT%2BYMHG%2FdisR0OWRLq%2BgNa7qvn%2FCPcjz%2BQ46piOH7V5lNH9TAPeh3MKpFoatACM5UIoh7CyOARo9aMPi%2BYINjzldToIzHwNNpTKyt7zBH0EVR5fznnAcDcoMXzlWWcFcyX%2BUEdWFr1KmtxgK3jfoeXnI67Q6UTvC3AB1Ziqx1lcRMzWH9NMY4%2B%2BWbZu%2Byr4wkb5W3v%2Bn5G7yuwyjnm2yBJj7bkWIqMd5GxJ66CYfiZVdN8RYICFWvEDDYwKOfW7Mfn4RkskKI7vqTlHjPia0j2ewp%2BKhNBMz0mppswgpaSzwY6pgFWsZaCidVFoaUnxlqhtTuIG2vT5zKXpcvIpWdOVd3M5sD%2BFiCeCBX%2FxIfWnAMEOEfjKrfmZhhu4AcSoNqbqQRYVKek8NMDZD8E%2FRXDOQJK19F%2BExCwK8aixlbMOXVXgmEP0ub9C2mDNiIY%2F34QIVKZmuJIfu3oXdlV4VHMvd25%2BMG3bB0ZOFlRsPhUDcO6Hj9V7DIftQTFtFrv7pgEmKnbe%2F%2FkfuuT&X-Amz-Signature=f5d4199a32193f9b22e537a7977377c65485a7b8bd362cd8cc014d89653e7744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVS4BCZM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIAF3ASpsWyO%2B2f7%2BLbwPE7JU1HWv4xnTH4p2gtS4JMKEAiBjLhVkUXLjAYnwNk0HSsSQg9QhdCYThkj4SuOSKQWMTir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMOuNPuSioYbCflqrYKtwD2HExVRovPJT%2BO72Z4ytkbw2YImguBYi4y74%2BSagraRZ9lZsAG%2B%2F87Jtzz8A9os%2BtGatWlHC01ZNt6q51%2BmJxOeDzep4bn4E502KmxHThpBL5dV%2BsxSqqNPaLdU77KMpjb%2FVI1ysOcsoTU0PFf2sXj%2FkK8v6GMYCnj%2F4xtSyF8C1vgtCFiw2xcVIT8hfd255etJDmjyxR9LeXFvhluDhsdpBEKT3wVZH%2B7%2Fkt1naVoHDaWXzFKVA%2BF1qzmKVpg0uX%2FfCYnU56IO%2BAjBMFjoeITuR8iufHtzU6AicGa3%2Bq5ai2E5nrSbGFd52tdPA55oPNLqnHGQNdZOHCqWWNmRNde1bT%2BYMHG%2FdisR0OWRLq%2BgNa7qvn%2FCPcjz%2BQ46piOH7V5lNH9TAPeh3MKpFoatACM5UIoh7CyOARo9aMPi%2BYINjzldToIzHwNNpTKyt7zBH0EVR5fznnAcDcoMXzlWWcFcyX%2BUEdWFr1KmtxgK3jfoeXnI67Q6UTvC3AB1Ziqx1lcRMzWH9NMY4%2B%2BWbZu%2Byr4wkb5W3v%2Bn5G7yuwyjnm2yBJj7bkWIqMd5GxJ66CYfiZVdN8RYICFWvEDDYwKOfW7Mfn4RkskKI7vqTlHjPia0j2ewp%2BKhNBMz0mppswgpaSzwY6pgFWsZaCidVFoaUnxlqhtTuIG2vT5zKXpcvIpWdOVd3M5sD%2BFiCeCBX%2FxIfWnAMEOEfjKrfmZhhu4AcSoNqbqQRYVKek8NMDZD8E%2FRXDOQJK19F%2BExCwK8aixlbMOXVXgmEP0ub9C2mDNiIY%2F34QIVKZmuJIfu3oXdlV4VHMvd25%2BMG3bB0ZOFlRsPhUDcO6Hj9V7DIftQTFtFrv7pgEmKnbe%2F%2FkfuuT&X-Amz-Signature=f5ce4e7b6213aec1af57afe6cb6ed7463893d660b3428ab4497d3328cc1b943e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC57AYIB%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093457Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJGMEQCIAxfnYZlpR0%2Fb0akps4kYiUBtlxQtB3u8Hb9albogeQ%2FAiApyBfHk%2BPBCVstxsWS7FfyZm4RLDXc7ceEL5o0oSkbqir%2FAwgBEAAaDDYzNzQyMzE4MzgwNSIMul2PABuMWPj5QTFOKtwDIbKtt75fex%2BCAE9UFOefW%2B1cMjGXEJU3jfSlurdERAzCQMeChUysjHrAYO25e2z6QwzUlYYKH2%2F1qkiIpr26Ybq3as6UHJj1%2FJFkpUeEWj6cAtleQyeFcxUg7xHyz9LOF2vm1DeFSEPV%2F3s1v5tPMjkpXPOR6H%2FGOjCKci1LjoF6h%2BApYJGx26%2B9L9mCLEciESB1qRq1e0PvP04aJaZ64IW70l%2BqaXT9IEFjcB4rvzBGzZAny4Tu60nZLPQPNf4LK%2FS8GSDLrXNwpw2iVinUL0vQ6EJIeL%2FfnAptbpmsIsN4maNClXfPXzpuGrkbERin6eeCV0fk8FxhsrxDd7fbPJd0QA66Dwvq5g%2FxGXy1zUjpXUXVtQYvRvRvEGZW5UXCWvXFes1R3Nxb85D4f%2Fn2zl%2FMWE7ZAAaEqX63M9FIP9jer88uqLH8ouA%2FBjXaMEDHCrewdk4%2FBBcV1p7x25Bx2c7SKxrL8n%2FdHE1bfToor0b8mvgKl3yCiKfwiknikZaWRk7vupnjgeaMPufbl6ugWVv%2BnRTpebwMZ5OHuRLJ%2FgHqtN3NXSWg5Ph7sS9vleHSh6l5VJMcz3%2BOtKIpEeL5mIqmTh3ANt9%2BiVwOv%2FfK%2Bk8tUs0EQhiiDj0Y8N8w8ZWSzwY6pgGyp3UX8KQ0EiI9Mw2ntpnk2p9paZJrlGLP0SYb6b1K%2BpsDc6b3OIhVKSXOaez%2F3WK2S0r6OvN%2BlM857NNw3Gsan%2BOwjGI0vH1cRc2K4UAG%2BcoSjm9brdxK9hJ8n6j8apEtRwfq%2BO4Z0nOygIUJrdhvsLS7fAwDqtkc%2F2i1OxiHuD3mIu0pijTgYz73PBc%2FEUcjR2g7KkD6L%2FkraajX74dVelNu1dS2&X-Amz-Signature=a82970e210af9d36bc7536e546f3c3b737a2cc86e25c1749e8dfb78d6e3f967d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAJJFEMP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCmZC7Fwy8fnMohPAnMz1rqOm4321qsv0POrsOaVX8OgwIgP2ajKGoH9m8hVFWTM4w3glVcxJYKVveiUUM140GHVhEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDKebNhRDZ4uFWjCfCCrcA2I1bnPYGI7YbQlG5vJJO4bxZ9MWK0cVKvJwNTKomtn5V6pHd5%2F%2Bm0CoTWtFHwMNJJK9svZdLwru44c4UeEqTarwqBQe4s%2FcJ1LhdXfgQ0kXGc731iZpYijXvbvgFIuvqyQXQnbtJ13kyv0YpzNhDJKDki%2F8jjJyXp3f07brlYrrglF5Of5%2BOtJxnurwpBkLlQUYq%2FPH7zt8dhJqsLTVyIBdKbhCCSxKbmeQW%2FdBp8DjQMDa4L6VstHfUAKGCAEqJktqNQMHuT8szJa%2F7OSKVSY4d94mxMCpUC7SH96Qe6kaa78WcwxeSw7JHIfcaquTvuqw%2BnfWAv5xl9sHRiDomjouKo2llDAnBldkTp8LkEgYG3looXDhLhvnCn74nR8yBVdZFSSBJObrQevT57EoUu7wPiDjBdtcI2HnV3KAn%2F0nBK1KrIG2Q4NgT%2Fb97JT%2FjFhDMl1SoUnJnTROvPQgjFRPLbsAAltccgVpr0M3neTjsrX3uFTi3EAlmo4%2FxYZN7Sro5nwcDqNPf%2FXquso8yvhQTsVCIOXS3iICpjzJsVZ2KckWVqDT2kjBQuH7%2BUohlMhmDObEd0mVTniDzJLBKneDCCHJG0uehztpZgiAcEMic7MWIHgCLYMRl15QMOaWks8GOqUBTxd2tbcS4iaOzXHmYF%2Fqph3eaNrV%2F%2BqQ%2B08LagTDlazqBwR46WgEaeZ2c%2B1u2JW%2BnauGKHJFwUGliJAVP%2BnRblUUuq9irZEDDDo5%2BMaxSnaQwKFZHGNmQ4tiZYVOaoYK7Gq0UA7PsT5vY2OXuGMbOsvKPvIEbdy7LFzT6V6qgaSJ3igqHt1uXR8ksqw8kHOajGhUVSmfrspo0vJ5x3KHy%2FldSyNK&X-Amz-Signature=48129e4670e9a678da62e8ac533143dfd1d04b04c73aa2b2e794fc7f23b31e9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAJJFEMP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCIQCmZC7Fwy8fnMohPAnMz1rqOm4321qsv0POrsOaVX8OgwIgP2ajKGoH9m8hVFWTM4w3glVcxJYKVveiUUM140GHVhEq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDKebNhRDZ4uFWjCfCCrcA2I1bnPYGI7YbQlG5vJJO4bxZ9MWK0cVKvJwNTKomtn5V6pHd5%2F%2Bm0CoTWtFHwMNJJK9svZdLwru44c4UeEqTarwqBQe4s%2FcJ1LhdXfgQ0kXGc731iZpYijXvbvgFIuvqyQXQnbtJ13kyv0YpzNhDJKDki%2F8jjJyXp3f07brlYrrglF5Of5%2BOtJxnurwpBkLlQUYq%2FPH7zt8dhJqsLTVyIBdKbhCCSxKbmeQW%2FdBp8DjQMDa4L6VstHfUAKGCAEqJktqNQMHuT8szJa%2F7OSKVSY4d94mxMCpUC7SH96Qe6kaa78WcwxeSw7JHIfcaquTvuqw%2BnfWAv5xl9sHRiDomjouKo2llDAnBldkTp8LkEgYG3looXDhLhvnCn74nR8yBVdZFSSBJObrQevT57EoUu7wPiDjBdtcI2HnV3KAn%2F0nBK1KrIG2Q4NgT%2Fb97JT%2FjFhDMl1SoUnJnTROvPQgjFRPLbsAAltccgVpr0M3neTjsrX3uFTi3EAlmo4%2FxYZN7Sro5nwcDqNPf%2FXquso8yvhQTsVCIOXS3iICpjzJsVZ2KckWVqDT2kjBQuH7%2BUohlMhmDObEd0mVTniDzJLBKneDCCHJG0uehztpZgiAcEMic7MWIHgCLYMRl15QMOaWks8GOqUBTxd2tbcS4iaOzXHmYF%2Fqph3eaNrV%2F%2BqQ%2B08LagTDlazqBwR46WgEaeZ2c%2B1u2JW%2BnauGKHJFwUGliJAVP%2BnRblUUuq9irZEDDDo5%2BMaxSnaQwKFZHGNmQ4tiZYVOaoYK7Gq0UA7PsT5vY2OXuGMbOsvKPvIEbdy7LFzT6V6qgaSJ3igqHt1uXR8ksqw8kHOajGhUVSmfrspo0vJ5x3KHy%2FldSyNK&X-Amz-Signature=48129e4670e9a678da62e8ac533143dfd1d04b04c73aa2b2e794fc7f23b31e9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKAQB5HG%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T093502Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLXdlc3QtMiJHMEUCICcHL7vCC1H30WpRQiwhUZBr6Q256yNo9LFn8eVOImVNAiEAh%2FIQ3rB5p26Pusy9w05lPUSR1VecPGqbse%2B9zgRfUOAq%2FwMIARAAGgw2Mzc0MjMxODM4MDUiDDuO%2B40t6yfQXy6dKyrcA3UAX%2F0kyDxe6WlFO6GKbx3Vj5MP1cqnw74Ozn8UNXSu3K5B6jXJTRTgeTC1ztHQTacksNVBMhGbTDPF6%2FfHyreTrgztW74WCA7f5HfT8fqPnhhmg9j9LdQG1qkKk3pqL1YiU%2FVOJwOfWQphnngL4bPmyqUaqKQ%2BkYhE4Rg6zSrEyYEuEZGTEptF0wEiT4vcssKSdYREF1Rkud5EE9LVJZclRJgsm7NSE%2B%2B2rf0SIrP%2FiDAkcCjr%2F59UEneVXuBzVhdjC7BII9E0LgcfzZkJGP2N76WWW3zdrJSlvi01DP%2FJePqwr27LjhBuKBEt7nBfQX4KVq2Qi1m3HxmQjFw0b2G7t%2FGjwAab4VCTJz7cx5Afo7rJFt1sPLgJ6F1HI4uV72bbjtne0q7kuIRgh2edVEytyDDUS27USSo00swVw63CtsG5On16BKyZM7BXMLVqeL1EFjCWqTW6Irf1haGB0THXZsRYaJQrNNzCiKvjSkli9AnJQfQX0jzbBGBiZF%2FJitv%2BDKoyqOXvMn9M0GnIx7UuCPWDTN%2FGFSJGmCEfMndNhhkKNi08PJzvXCW53AperYQlYvNF5RR6%2F%2BYgoKYysNrF3rSln5Opss2C5LhOSLyLs7qmNzOplAYLNkiWMLCYks8GOqUBKN3ku%2FvlInZwfEzrIRRbVk6wO%2BL27JpR%2Fl6tgaBY0G5KAVoRv0Ktp3DfqI%2ByHvac%2BxVe%2FI8jEvHzYWJueN5a8PPMi3HTAX6pgXzYhz6rXUc53ozxjRdpqF8QTMjYOMV8eBDpMG4gwpTGFhmjWgyDfwaDoBZ2qNAXQD5GZB80IqcYmgulVoQ2wMKC7%2BErYbW7qd%2ByDz0upPYDQMpxWe7gLN4eJs7b&X-Amz-Signature=db95fcfe8e0754b1861be15ff175e09d4ba2c8b252039baf38307e243bacc18f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

