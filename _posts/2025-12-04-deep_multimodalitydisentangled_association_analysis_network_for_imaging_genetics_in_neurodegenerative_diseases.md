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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DITUMFV%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCzEDZp4hC0hhtT1PQsQvxrhUFvpHW2q5IaVuLvmcsbCwIhAPPkIX96fjiabEpbt7ekTGXAOmBT2QC7BLZ1urr71tilKv8DCEMQABoMNjM3NDIzMTgzODA1IgyV7pN68npkBplH9Sgq3AOE3ygu0bCjMAYhSqFfTdKNLNoBatvURuVWl1GCSe5J5ktXn3qZ%2FWvTFvkjs0WqpvWDA9L5aJCrU%2FprUfFrtasIhlXsf9EV8q9awLSrTwCGUsuEpBXBJ%2FDO4nG4lOjA7ZZQevrtW6VyLtyy%2BukyRgJoTHq6%2BLErGSH%2BGz6QyY5jMjMa5FDR6J%2F9J8P36mznsDgVIuT5evroi5z3CK8TXpXVsm8tD1%2BE4HC7IXz3O%2BttJehIGHGiLckG7yguF%2BkN8UjJF9ddnR4vkYQXcaL7RsNxDY%2FItZwPZz0YZNSypIAwYDdDe8h6o7GsVexG5k3UFXB388uyyvPY4RPF1xVw5D%2BxsH%2FOk6PoiJ4lcvTZhuu5cZWs%2FckpOcNrUx69j%2B4kTc0gRh9dXbt8yHAD4geaUTEr%2BcbSx53SWQu7IB%2FZByjeGmSKc1a8q0xQC71W4wMQoD3IUs9WuiwGynXhiEsU0BxYXkgOKN3g1aWlNnVOc%2B3z5xyrVnGJjpxz%2FCsy3MYGZDEaaahN0Rf0woDdZLujJCC3JnB6UCKodT2fPKE3SZruKOEKE1L%2F1u%2BV9jmKdbEFMFEG3HwJhs8FkYQzAZimpLeLw5mnjoynANC9F8NOmgSk%2F9MwF%2FGhD3gUauzqKTDVtcXJBjqkAd3RPjzPqbcXUD%2Bk9eGnSjDd%2FO8qAG9IXAoyWYwCbXI77oMFPtnSHcNm1IiD%2FSw%2FfsXSL%2FajgrN3Kn54auNP3E7ipuHBBM1hHBRRawg%2BPuHvR3Q5qSTCd6CcfkOi38n8uBqTm9iVTPvfBv%2Bmo3%2Bc18%2B1q28WloJKKx8PSJv3CBK3en48PlmPxK5CNMwHjVnNdUWJ86lnDArI%2Bhps%2F5L%2FYjA8QOS%2B&X-Amz-Signature=7b47e49447fe732ce86745a967c2ba3460fc3d6079941f2641fa69c6e456b60c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DITUMFV%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCzEDZp4hC0hhtT1PQsQvxrhUFvpHW2q5IaVuLvmcsbCwIhAPPkIX96fjiabEpbt7ekTGXAOmBT2QC7BLZ1urr71tilKv8DCEMQABoMNjM3NDIzMTgzODA1IgyV7pN68npkBplH9Sgq3AOE3ygu0bCjMAYhSqFfTdKNLNoBatvURuVWl1GCSe5J5ktXn3qZ%2FWvTFvkjs0WqpvWDA9L5aJCrU%2FprUfFrtasIhlXsf9EV8q9awLSrTwCGUsuEpBXBJ%2FDO4nG4lOjA7ZZQevrtW6VyLtyy%2BukyRgJoTHq6%2BLErGSH%2BGz6QyY5jMjMa5FDR6J%2F9J8P36mznsDgVIuT5evroi5z3CK8TXpXVsm8tD1%2BE4HC7IXz3O%2BttJehIGHGiLckG7yguF%2BkN8UjJF9ddnR4vkYQXcaL7RsNxDY%2FItZwPZz0YZNSypIAwYDdDe8h6o7GsVexG5k3UFXB388uyyvPY4RPF1xVw5D%2BxsH%2FOk6PoiJ4lcvTZhuu5cZWs%2FckpOcNrUx69j%2B4kTc0gRh9dXbt8yHAD4geaUTEr%2BcbSx53SWQu7IB%2FZByjeGmSKc1a8q0xQC71W4wMQoD3IUs9WuiwGynXhiEsU0BxYXkgOKN3g1aWlNnVOc%2B3z5xyrVnGJjpxz%2FCsy3MYGZDEaaahN0Rf0woDdZLujJCC3JnB6UCKodT2fPKE3SZruKOEKE1L%2F1u%2BV9jmKdbEFMFEG3HwJhs8FkYQzAZimpLeLw5mnjoynANC9F8NOmgSk%2F9MwF%2FGhD3gUauzqKTDVtcXJBjqkAd3RPjzPqbcXUD%2Bk9eGnSjDd%2FO8qAG9IXAoyWYwCbXI77oMFPtnSHcNm1IiD%2FSw%2FfsXSL%2FajgrN3Kn54auNP3E7ipuHBBM1hHBRRawg%2BPuHvR3Q5qSTCd6CcfkOi38n8uBqTm9iVTPvfBv%2Bmo3%2Bc18%2B1q28WloJKKx8PSJv3CBK3en48PlmPxK5CNMwHjVnNdUWJ86lnDArI%2Bhps%2F5L%2FYjA8QOS%2B&X-Amz-Signature=7b47e49447fe732ce86745a967c2ba3460fc3d6079941f2641fa69c6e456b60c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFEVT2TC%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIQDcvwjI0He5qiX2Qy8EHM5aK5MS2CCLGXuRcYsS3Or29wIgOasvcR3xPWd5BjrMgK%2Brtu34D7nUMOQWQusaZJpWLYYq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDAz%2BsleGGO%2BX9I8hdyrcA1NQQXbAwej2T3HExTmq%2FtwvDHgyZ%2FKwhF3UuVJ%2FL19zQFN1HYRj9NMEDLEBFnUbzrVv23327aseY79ZS969pDS6clLFo0hex3GASlc20OxC0owzX4kWJJ6TdQE15tc8AGRn1WdPWMZBJSO2XMAUmp2LcQkuEGRwMF2Pu9aqeUtQssDvVrkOjC5ZU%2FXkaIfJK4V62aglIY%2Fb%2FNS5479p60K4SddI84lAyPXGornpF%2B8jkMn2fxgyBrzNq6QgVp9iMz4n5rwS2QF%2BDW8IXBy%2Bsuxboa6jfGX9%2BSKYsnzJVV28FANNDnGK9d18ZlVHn2zg66TgqWUwlht8yyWvNzFdlyWkg5AjgyX2fkV3ZCFc6nosU2dJ6VzHVgVK16qPWofjiJCLCZILzlOyWSgDBiG4N8YNYiiKjowRZB%2BYYcz1D2GZ0HewoM%2FznS90wBcDPkt9Yl7WgTAbHdygPOZFnGzUFtrN%2Bmj1ra2yYRUrz5PQ%2BVCdj%2BKQtruLxXn7KAWDUlSvb9tiYjhQFfIfSefzn1R223lQPXQjCqz8QEYT97381nh3SXuI3MzjGktEWDmG4yOd4fA2s0HcJHMgzUKlxyAkNPoH%2FKQ%2FCyIIn4IlauSul23h%2FwlM%2FyVu76bPj6%2BYMKiRxckGOqUB3SbtURRP9ETKER1rCgRgj0ouZY1JNnCN3ObRQC5zXf1YEPbR7CDH0d2nrV%2FjxiuggcCOD3ZRQijr%2BuUVsGep6pPum7vZLz7JOMVsVOUgbj80C1ILwWVIwb4W5jRTipecinP7XSji42mYzUv0yxBuqZcE1Lyb6CAg0UYQ%2BRtsFuDg5qz%2BOtWWT9J1SldrybLsiwefHu656o9PetoxdFDOSlmbTjM%2F&X-Amz-Signature=91f2cc092ebe14fae17febeb830fc81d059206735541534f9e95b9bf901dfebe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666E7ALIBZ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBEXyITW0DwjAEXs8KAjR8kmOjOJKo1ATO%2FCuCDv6lXZAiAzpVG0ku7S4HcCCmL8oN7eBztcaYAylU%2B%2BWm%2FRUgP4PCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMuEx1%2BhfbqX3cpj03KtwD2Cen5%2FJ9wBFZcW%2BskG6E9bns3GWxMq3E71AW3gL0%2FMbJ5awF65R94SxO427ASjIk7C5ilmQ8RZPVyQXhbGmrO%2F0hLmPByjOqETVfg7WXSlw%2F1XiFrk64gUWLpmwsFch2EIhxctwsmBPqwZhkUFPB1IsC%2FTTEHe5sbcV0qahOpwpH29RO7UaiHX4%2Bhb6FK1%2F7wBs7lS%2BhqDI480dZphY4dZ%2B%2FyucSq%2BA0y754%2Bq1yuCz2OIlHsarhWKwIOcCJm0rTIYi4gjRTAvbhiBo1u0izpp0NmG%2FmuLA7%2F3rsgX7Ay0pEpAzuH28Oxn7ZNUsNhu0mY2b1Vu07SWtiq1G8%2B%2Bfuq9AzQnfJbmCAyCZaa0%2F07R71BUKK8akVhMiFENBGmHRlVVtwyRsKdSEvvqtd4jAWIP%2BLvw%2BqlbNRsUWNE4La6W4QnR0x%2B%2BV19RNetkOEcfy39wF0FMuBC1GijVtrN64Rvb2yoE9%2BNBMNe%2BNj2iUT6eAjuSJkNcf09AbpLztA8CQCQLdQ2%2BiiVhcnvxXHq5ydT%2BvUYS6BSnga6UPMqXEHVf2%2BNuN%2FUl6PBar1kxbYm85SBMfCR0YkA3iAVnWd5Ik1CWEmVOIAWWhF2U3Z%2BVtkA4SGSJK6jPHfqFrg%2BFwwv7XFyQY6pgH9AOCtCN4lQih39ieBvouDLAndk7szaKZ3suD%2B%2BZDpp7pChAa8nJLDjhZ2M9QRtks83gcNLhcddL6Zyerh%2FiA0bznt%2BmuztePpWaaBNUx5CopZFHCnra1q1QnAgIZizahWwBFRdUIviNj4n3%2BMxBirLOt44M%2FQZ0ocilOAFDkJqil%2FZN1yq5sdBco%2FtojDJA4gm%2FgpzaZba0FovMIwIyvXQFuw02nH&X-Amz-Signature=dfa687a0d64675dbebc62e9d86c1cf389c66bb016e3f41383f78545210bf44ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666E7ALIBZ%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIBEXyITW0DwjAEXs8KAjR8kmOjOJKo1ATO%2FCuCDv6lXZAiAzpVG0ku7S4HcCCmL8oN7eBztcaYAylU%2B%2BWm%2FRUgP4PCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMuEx1%2BhfbqX3cpj03KtwD2Cen5%2FJ9wBFZcW%2BskG6E9bns3GWxMq3E71AW3gL0%2FMbJ5awF65R94SxO427ASjIk7C5ilmQ8RZPVyQXhbGmrO%2F0hLmPByjOqETVfg7WXSlw%2F1XiFrk64gUWLpmwsFch2EIhxctwsmBPqwZhkUFPB1IsC%2FTTEHe5sbcV0qahOpwpH29RO7UaiHX4%2Bhb6FK1%2F7wBs7lS%2BhqDI480dZphY4dZ%2B%2FyucSq%2BA0y754%2Bq1yuCz2OIlHsarhWKwIOcCJm0rTIYi4gjRTAvbhiBo1u0izpp0NmG%2FmuLA7%2F3rsgX7Ay0pEpAzuH28Oxn7ZNUsNhu0mY2b1Vu07SWtiq1G8%2B%2Bfuq9AzQnfJbmCAyCZaa0%2F07R71BUKK8akVhMiFENBGmHRlVVtwyRsKdSEvvqtd4jAWIP%2BLvw%2BqlbNRsUWNE4La6W4QnR0x%2B%2BV19RNetkOEcfy39wF0FMuBC1GijVtrN64Rvb2yoE9%2BNBMNe%2BNj2iUT6eAjuSJkNcf09AbpLztA8CQCQLdQ2%2BiiVhcnvxXHq5ydT%2BvUYS6BSnga6UPMqXEHVf2%2BNuN%2FUl6PBar1kxbYm85SBMfCR0YkA3iAVnWd5Ik1CWEmVOIAWWhF2U3Z%2BVtkA4SGSJK6jPHfqFrg%2BFwwv7XFyQY6pgH9AOCtCN4lQih39ieBvouDLAndk7szaKZ3suD%2B%2BZDpp7pChAa8nJLDjhZ2M9QRtks83gcNLhcddL6Zyerh%2FiA0bznt%2BmuztePpWaaBNUx5CopZFHCnra1q1QnAgIZizahWwBFRdUIviNj4n3%2BMxBirLOt44M%2FQZ0ocilOAFDkJqil%2FZN1yq5sdBco%2FtojDJA4gm%2FgpzaZba0FovMIwIyvXQFuw02nH&X-Amz-Signature=0950be6651ae993b35aca88f02dc05677602b1810413cced5cd0b23a360955e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKGAZSA3%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCICJvXEAMPQa0%2BPtKwbNrp8hTagNEoaRZ%2BoPtO6IJi2lUAiAKWMjdSZorArXN%2Bg9Xy192Jw3wrNnuWH9sqBKcIBIbjyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMdEMDYjBJ9J1v1Mg%2FKtwDLyJ9b%2FHPyQ3wqNoaFnOrDqyzXL1SpyAqu0mPcSrzi33%2BYsK1%2B683VIDfIC1KF2JuvWSNKPwyKQHvMhfgTyFgxvPPygtb7wCVjwnlwzYYC9erI9h%2FTaNguoksCwaODK8z67OSSQZ44Co07Yx5WUoGMgxpc7N7pwSjw7dWPqrnJdUkQm3of47%2FSDjNL5XJrjBKkkwn%2FDAcxaOE7Tge59wJodVQH9gOH1ub%2FaMiqhwGySulrwHkvwtPVdU4KnZ6jRRGM7J1oE4A2IfqRizI7B6nQScBcTeFXw3exkx%2B9w4XhiafvE9QHEk8Byo51WruBkA3AsTK%2BKTpebY1n42u0a41ETp1MbXpFpCAjDjUF2AmxyX053aw%2FvDiDpbt1lveFCm%2FuOAVFTif0B1OIR1bxwNC%2FeeDFgShL8JidWUiBCmxn7hg%2B6kaOGK4q2yQsulAYV1D0SfnPFUXmsIlMDEpFcojKwATGFJ8sYAMs10M%2BCDhNvlz71NJmf6Yw0xpB2l4sCo%2BjzrnHy5roqb6mUfdLA0vLcFaooP1NgPXz8NRrAQZ%2Fy3X8NPMYLRN%2BCLEQnOe1cMyQtS3mO7FRnV0ez7UmY0hpw5HH6PRZ7ExLl1AmZcnMRO4eyi%2FPelinEiUEjIw0bbFyQY6pgHJxScy1PWi8qEWbGw%2FrLpsVl9lZ5VjsAPyjhmeCGDhGFffYkmpLBGKcj5PukW4yVDvRjAp4Mg00RugZh9Gsi7hg4TDLYEesHcD3AH7L8A21Tc7HoudG%2BR0KbovyI1yVc%2F9NFl2myU%2FzO8IR7nHDl3q90EvOFQOX8SsOPJG%2BtsNec5P1YKrSzzBfUNKzqw%2FOLvLhsZcIu5GkqHHQ4UDmwLFeoMBbpJ2&X-Amz-Signature=d410de83316c869124ab1cca285566019803c73c7dc3218e079d8e6fb3fa8889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662AY2VI7N%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100114Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJHMEUCIG3s9%2BAhzSqd%2FKsmrK7oecm0rVqiwPr8zTqy24MGcAVLAiEAsQMeMjDXmDpR4mo91sSRBrxWf4dh83iPdL33hjiQ%2BOUq%2FwMIQxAAGgw2Mzc0MjMxODM4MDUiDJFfcfiYp1Xg34oMMircA82mQqn0%2F3uGORfuD1YcUC2%2FYpFN1pFGspAoe6XXQ%2BMpnx565qCDmv0vYlS8%2BcKzc4P2KMeA9g3rv%2F54WHleeE46JrvlaKqPJ6SkupRYTPd%2BloQUXCHDDLOwIoeNu00Q3kl3FTTL8VCfMmu6lXf5v56Cx5a7foxOYYnp5lZh7P1B7E7lLREYZDG4X4BRnYm8X8etI9fzddoWSkuOIHlcX8QMfwH%2F2dsLHwAIbvEKEFbpzrJL%2BA260SIn5BZ0UWOrgL7js0G5ZGjlLM5Tk7L8IXbCEtC15yJiCqUO3nkxCPTuP65Ye8oLDPxYIizqDs9kQndGh19m4xqtgOrhNGX7E0kyczNS8BrOBVDBOnktEOtq8aTOPjT70M8vnqcmc5%2FjHixICN9RTlYlvcDbSWW4oUXXGHDZMp5yV%2BgBRJ7ipUadzewHOof8Z55aKi68e30EjYOvuXeT%2BPpW9CV4gO7LcjHHKNbjLOlrI5XbJ%2FZGFlY%2BgdoSXzO485QodpM3pa6QlpIRqm5d%2FVpszO8ztrYFKyg%2BEa1fQQyJzcHKSuyhXWdPB8aod4kIkqvoXbfQs1kGhswm6B1rUsoNR%2Fq6UpitjtAJzHC2wAdHzZwDW0oM4wX1V5%2BSt%2BhGmy5haJbPMMu2xckGOqUBzoKteJvsaTYpJxZA1BsT81zjklZ4dUX9kWMm3hLDl8z4D9oq8U0Y0OYlYvPtDSB9chlLjgXCTX8uk0SbW9rJdIjU8G7IGGVr0WhyHzUTvEyxfAs3NN0WITVKTfLdiVRD1PMKMw35C1GbVpOFNAiRtVdHsKIwhVbqQXSz4gHeU7ZRmAIQGefcbT1AebBwBuLJQ5p0HKKHSbkRrbWCjk8OJlLXT%2BA4&X-Amz-Signature=69343dace6c3d0bf5f9d779ef8114dbe0e3c6210431e468c0595c0cd0e4ad780&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QAAHKRBS%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLXdlc3QtMiJHMEUCIF5u4A89o2xErstvcsomtFfHuwPoOBETSClPUMKuqZi1AiEAyKGeFW0ugVFxncgvG7y%2B%2B5VGzp%2BbvXCA1F2j%2FKdgBkEq%2FwMIQhAAGgw2Mzc0MjMxODM4MDUiDLFvumBCfUV%2FYEv40yrcA1F1nHAazUs4PzCyAVBP2%2BuZECODng5SR%2BCULHcnEEZzLz%2FzmXGbxe5vpOIvSKA0xxKFEIHW7QMjLLMKYHUt2AiNZAtO25lbvfPuxnWnhlzD5IYotJTix92q%2F1DKBLH2W5FJiBQxveqX3JsmitI5SCYkSLspnTeGaXwdufurvK%2BVFSEBUq163f%2FtSB4bCZux386CdBYfTi%2BCqSg2eWq775vWEFlvJ6TLQGJqkm70A8Dcr76vodCzrWQ2jJYRXzw17OXJ0JwTZtL9Ig17BggdAqeXxczvqIo%2BXQdypoetT66Pz%2BYgohXomquiBcyRoyhHUAPHhsq3GhFTTX%2FsRdiNRWNL8s%2BJfuwuYf%2FXQWRDR2%2F8NH31IJp%2FB1KIay2rCOGTqORMERyr37CJ59T1WSBdBdlbMMFzi3T6t%2B42CZEAQJW5Z9dvohyCgunOO7J%2FziK5XKP0gXbNiyhhiLnyoRhs4nXKMngXrfJwHosJcR20%2FAXfvYarpCn9XXYWEod57v7%2FfdtWokNN4qqgX5vU17fjN3UY20tIX3bF0IqhV6TNNP8jc%2FYVt4dYZ9ag9I49ej71oAGE72a2fOXdD6LRgVYXrMD4bJYltOl7cC6bYbBQrStz0OJ%2BcMrDgCUL1cm1MKKRxckGOqUBMt38QJ4CVPvbv5WI858yZjHr745WneiVyH5MCgqp5yFt6OFeYXb2ib66L6eIujisWphTe8Ccr25v4P71ZEjl4ilMoR5RVparbiKv8b71LqG9c31oWSKcjxSDqnN50LJJqL7xtO7DGFcSbevkLKfuNICwE4e%2BtHMi22wEiOosAyXHGVaetqwxOLw1CYGJsvRDspTgUd6dLaXTDIGx6c%2F5s6fO7l8e&X-Amz-Signature=6f6cd25b7fd2945e130984f1eb25bd39ba024367399f71a7c5b368c696e8a323&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VY2GTPM%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIEEdacO8G1Qmro3nhmytSOoUkrlQ7vqweDtH3otSH%2BkRAiAuLHYNA6h%2FnPjELfTjFcMsqXtPQpu9cDi4ly1q%2BYTPcyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM26vYTv7ouIVwAWkbKtwDffHm2vX8LmUjndHaMWVsSQxy6ofJHxtfhw2TKtpZ4sK3DLJX5PU7T7DmnOnzXe%2F8j4Yuv0Pv%2FOoYAOq352O%2BGKqcVzq5RBm%2FLzstKEmc4gffs8RawGn9jzvQqB5BBWNns6kRswU3JlBfY6VBl1%2B%2FJwJrGTmDPLIAiTbYsdjF90vXyTgX7nxD2hXW6MrBpFd8LU4E1vNPlydEOYv12F9LYf2yb7Y9fr5dwYJTyt7STV1pxz0Z6NjXNsTMOcKr1wpgSO9WtjsqG474vyRa4JNsQzMj70jRg3HbQSX9zvbgs4%2FL8nBMWuEiXmRTl1zBB11zySpp4L3g3VlbcsI7BHByFxqaKsF3LygVnmH6eozvANecHoMeGIONtBnIrzYUW9%2FCHn3JF%2F%2Bylq2Y%2ByHCGBCdkcGgjhw8AyPXOcgqlZA1homyJOeBGuTT9Z4bW4f7Ay4T6MikjkyETjr7844%2F22KrKuTOqnKynjK675q2UfcOs%2BpbV86xOqtT%2FyIuLkaSeUYGWfQGhR0jZ0ut2A6axGV84PpUCPVEwdPKsu71cAfznubXy3NNiK%2FkPAO50UfGuydddxnUTu3%2FBbOmpWA%2FOh6O4avz07l0tsm4wFhF97SGkQgiJXnEr0Z%2Bg7IGJdswsLbFyQY6pgEppOGvy5Y18akLjHF1RHiDnXEC0kucgRYChw7deRpzQPPZ9CkQ10yj2SWAABraUXBgvFvlPZalOrgi8UJ3k2She1q%2FnH%2B81ULNNARRd7oXfk9D0r78U9r%2BwWLBNH83o8T1jKmLOp4unyurfBmLEIzpNx3ubf%2Fh58szcGvtlwYRmp7KgRBTdHwDrWs8C13icEWErKHlLYnA8Abf7UzutjRwdKdtb03x&X-Amz-Signature=b546010a081a75c41cb7dd8aa6681b4551087550b6a884c264015ec8df9f19c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VY2GTPM%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIEEdacO8G1Qmro3nhmytSOoUkrlQ7vqweDtH3otSH%2BkRAiAuLHYNA6h%2FnPjELfTjFcMsqXtPQpu9cDi4ly1q%2BYTPcyr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM26vYTv7ouIVwAWkbKtwDffHm2vX8LmUjndHaMWVsSQxy6ofJHxtfhw2TKtpZ4sK3DLJX5PU7T7DmnOnzXe%2F8j4Yuv0Pv%2FOoYAOq352O%2BGKqcVzq5RBm%2FLzstKEmc4gffs8RawGn9jzvQqB5BBWNns6kRswU3JlBfY6VBl1%2B%2FJwJrGTmDPLIAiTbYsdjF90vXyTgX7nxD2hXW6MrBpFd8LU4E1vNPlydEOYv12F9LYf2yb7Y9fr5dwYJTyt7STV1pxz0Z6NjXNsTMOcKr1wpgSO9WtjsqG474vyRa4JNsQzMj70jRg3HbQSX9zvbgs4%2FL8nBMWuEiXmRTl1zBB11zySpp4L3g3VlbcsI7BHByFxqaKsF3LygVnmH6eozvANecHoMeGIONtBnIrzYUW9%2FCHn3JF%2F%2Bylq2Y%2ByHCGBCdkcGgjhw8AyPXOcgqlZA1homyJOeBGuTT9Z4bW4f7Ay4T6MikjkyETjr7844%2F22KrKuTOqnKynjK675q2UfcOs%2BpbV86xOqtT%2FyIuLkaSeUYGWfQGhR0jZ0ut2A6axGV84PpUCPVEwdPKsu71cAfznubXy3NNiK%2FkPAO50UfGuydddxnUTu3%2FBbOmpWA%2FOh6O4avz07l0tsm4wFhF97SGkQgiJXnEr0Z%2Bg7IGJdswsLbFyQY6pgEppOGvy5Y18akLjHF1RHiDnXEC0kucgRYChw7deRpzQPPZ9CkQ10yj2SWAABraUXBgvFvlPZalOrgi8UJ3k2She1q%2FnH%2B81ULNNARRd7oXfk9D0r78U9r%2BwWLBNH83o8T1jKmLOp4unyurfBmLEIzpNx3ubf%2Fh58szcGvtlwYRmp7KgRBTdHwDrWs8C13icEWErKHlLYnA8Abf7UzutjRwdKdtb03x&X-Amz-Signature=5dc0495bab57b56431475b48cd3328adf218972864c40fdd522a9ab133aaf960&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666G75KUX6%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100100Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJIMEYCIQCTFzkkTPLp8Z5yvRwaLVsBBVXjnaDzLAWDyAc%2F1uJWGgIhAJsGvDs3%2FQ%2FDVhhqWkJNMFrYWi1xtYNshQJrNgWCQWVBKv8DCEMQABoMNjM3NDIzMTgzODA1IgwYMM7EqxRGvAeBLU4q3AMSQJOimDiJTZAeRQ3ZuOe%2FbWBb5ADiCL4NemJet%2FH9vbY%2FF22oQp4KqkxgjD9BJIhrzhPjaEC9iy%2BmO0QzwivoTt0pJAc1DNtYI23Ki5S0L5yXdBYpMsvfp2EYHmNGo3RWjxkehxN7lzapYrZI6stnPfof89A%2BERJoE7Zq%2BIdEa175vofOrdKnfzZZ%2B4RelfdxMvv9sbbG1APUkInxppK5jJO3xsSnHt1wo4zzZYrNPbBcJNrpU%2F55SoTmA8ihDtmbOTKeY8iFsxOeoJC9%2F3OzEj2%2FOQzLosxGyNvRRf%2BWUJkZ3f%2BMeoDBtsBbLsI9g%2F2fXbnKCM8oY1AaoxUokTpq1SwGzbM6pmSdB7cWIVN8jCNUqkhl20RRlKe%2BVaMZWnfVnYlU1%2F0s61taIaGDA8JBkAKZxZn8Z9zcpPhD7jBUgAF6dd%2F6BylBNBc%2BijO2LFRpI7IsnWESzVkcvg83UFMHWrzIriVALpvodwSFTUxMziHQ0KrjxAKXtXmTMvpFatF%2FAXa89r3O7SmXXPoCEBMd%2Fb5v7QhDYj7UWe1YTaZLeYdNCAK4b8FH9702MfQVzzKdnV6nx4%2FPIDkF0m2XMwz24Z%2BqYMs4qM%2FO40dduo0ceeQBKyvM0yUqkcdkZzDLtcXJBjqkAf9hkzuXke8LWRuTTebz8qbhP5GSTtPuPZ6K3yq9XlYFQUSRYy3%2BCMoBFRoCGwiNGSmPuonyWEmf2b9ABordDUDZmMWXgJG1%2Fp6LEwCFPwNea5US6uh1dMkp%2FboHQ7SR9E9wRKy2Ch9t%2BLy01pFBvqpiaIzyB%2FV4k1DkFQZDwH2y3WG6NJmrOPJhVu9054oR8eFD9%2Frt%2BOwgDgRS5Ov3PgIYyY32&X-Amz-Signature=033a0cafab0f324c9b2c16c286dcda6ddb451a82d925a7984258cda429eb41f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLPL7C4V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIA%2FZgKWZ7tMgf1gzQ9gepqwfeCIx%2Foi3F%2Bu9ryHyIZCYAiBn9M6ecpzcdelC7Oq7%2Fy2Q108Bg0zkerpBDeh%2BPET8WSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMb0%2FNjnssDPthq%2FLUKtwDWvmBInVbC9m5WLYnXzGEdSIots0Z%2B6i4ips4fdJL6FhIw8%2B38ggMfVD1CQMToUY7vB7FdTyOMVXueDYo4yEFWfz92ATjab56b3NVE1Fsa3SgmAj3Tyh7d48mKT3zm8IlxRSbUz%2FMoj3kd9TtvkNgEZnQ7RlpEKMqCFxbhQg8tgOEiiIGolKXCxELwNhNBWt4c1INECj7mU%2Fgbs%2FvYSlNnSP2IeIj8NOje43H%2FWRxcgeEm5H1jfsfRE9GGHoWb%2BF1xVWRalN9XaXbYw6iqkmYJm4llwfEMAStIeg%2B4LHddBfDXvnQZ9AITt%2BKp6QJUmrQ5Yja7U8nBpw%2BA%2BHJjnHAhvA%2BFBtdxibinXgtAgxoq6wfPe1sU%2F9TdsQK3U6J7mELUWyOiwomyxGiEGe1zrnFe6BXWHjCm5XJxAc6K8eQrkfErho%2BMFKrWRrwO56O8f7CHEVclwGMHuIjz5tdV%2F6%2BiQaeCKm1zUB6VslA17%2Fv%2BywrvUvOF0Qe1RY9ixtZ%2BxgUCmHIpiJltGuk9VRDOuuhgypPXhG1bkT9pzqG%2FT5cNjqbrB2Qq%2BQ%2F9L2mVKkMjwiMjR0F7%2BqF8V39lDklIYXwZXcqpV4zJ9JOCGQJTedl6hFYTtLGEBCDbvYCpnswxrbFyQY6pgHgo7UWnhnBGyaZIrBLx4TE8dK1Gv5EKeD5LZ80GT5zb6%2FtFrAese3a5oUek8ExN09DEC0gPpWWIWd8iN%2FElsUxLZjvzy0FvOTIeXuXguMZRxhn70osoe6WMR3s4efm5NoLtH2vh6y%2Fghw%2BCU1NMqwCIKMLWvy7Ngw%2Fmkr3mb%2FumEIboGKlXS2E9sz0M%2BJ0pcnKPjbAf%2FkPPbGfC%2BA%2BrzybpK0LKi7O&X-Amz-Signature=8e0a71631fed21052fee926a8a40c9921f0d99da02f4ee1ec8bc297ecf336446&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLPL7C4V%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100125Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIA%2FZgKWZ7tMgf1gzQ9gepqwfeCIx%2Foi3F%2Bu9ryHyIZCYAiBn9M6ecpzcdelC7Oq7%2Fy2Q108Bg0zkerpBDeh%2BPET8WSr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIMb0%2FNjnssDPthq%2FLUKtwDWvmBInVbC9m5WLYnXzGEdSIots0Z%2B6i4ips4fdJL6FhIw8%2B38ggMfVD1CQMToUY7vB7FdTyOMVXueDYo4yEFWfz92ATjab56b3NVE1Fsa3SgmAj3Tyh7d48mKT3zm8IlxRSbUz%2FMoj3kd9TtvkNgEZnQ7RlpEKMqCFxbhQg8tgOEiiIGolKXCxELwNhNBWt4c1INECj7mU%2Fgbs%2FvYSlNnSP2IeIj8NOje43H%2FWRxcgeEm5H1jfsfRE9GGHoWb%2BF1xVWRalN9XaXbYw6iqkmYJm4llwfEMAStIeg%2B4LHddBfDXvnQZ9AITt%2BKp6QJUmrQ5Yja7U8nBpw%2BA%2BHJjnHAhvA%2BFBtdxibinXgtAgxoq6wfPe1sU%2F9TdsQK3U6J7mELUWyOiwomyxGiEGe1zrnFe6BXWHjCm5XJxAc6K8eQrkfErho%2BMFKrWRrwO56O8f7CHEVclwGMHuIjz5tdV%2F6%2BiQaeCKm1zUB6VslA17%2Fv%2BywrvUvOF0Qe1RY9ixtZ%2BxgUCmHIpiJltGuk9VRDOuuhgypPXhG1bkT9pzqG%2FT5cNjqbrB2Qq%2BQ%2F9L2mVKkMjwiMjR0F7%2BqF8V39lDklIYXwZXcqpV4zJ9JOCGQJTedl6hFYTtLGEBCDbvYCpnswxrbFyQY6pgHgo7UWnhnBGyaZIrBLx4TE8dK1Gv5EKeD5LZ80GT5zb6%2FtFrAese3a5oUek8ExN09DEC0gPpWWIWd8iN%2FElsUxLZjvzy0FvOTIeXuXguMZRxhn70osoe6WMR3s4efm5NoLtH2vh6y%2Fghw%2BCU1NMqwCIKMLWvy7Ngw%2Fmkr3mb%2FumEIboGKlXS2E9sz0M%2BJ0pcnKPjbAf%2FkPPbGfC%2BA%2BrzybpK0LKi7O&X-Amz-Signature=8e0a71631fed21052fee926a8a40c9921f0d99da02f4ee1ec8bc297ecf336446&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXX56TTP%2F20251204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251204T100126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaCXVzLXdlc3QtMiJGMEQCIAk7WV1GXdCJyDJCTASq7CWk0zpJIpvA2NG%2F2lW75RbgAiBsdj7sNfDZdiyqpJEfnLpv3kgSTLtlJNS1OIyQCzEMuCr%2FAwhDEAAaDDYzNzQyMzE4MzgwNSIM8nKS1GcweXCO%2Bp4oKtwDIFoDi00ukjCJlgLPHFaZSEsoOhHmjMEhwfbxeHjRxfqpTubQGySyvrHbC0MMHLEvmyCCgkVxdiBjUCMzo5%2B0PBwJC4z2R8KKr2rLMOHaK6a8nOJKlmw%2FvPKvJ%2Bd9IoKtKmU8Sk%2FJ%2Bt4vskg5ZP%2FBVjMWm9HjrNtb%2BUV5I9Qf6qNwA5uuQFmupWmOIVEee1g69ob%2FDTUvz1eoLH1eEn4EXxpwfLUPOIOSpcru7FZiQjnBdAjVjh2%2FBmeN4xWvLKK52lh5%2BgCNF8lhzCP77Ogt7itgENQKQHdIUNFfQk0pnNppnLnc0LsE%2FS2xgGSuZAarbvcxO%2FhR8h52eL8WzKgrI%2Fr1Gs%2B8IORZ43kNjxw2wRZ96eC49U66wM154BhYy1nu%2FX9j546SnGD1LASjQ5nr4qUHnHdDJJ5UuF1gPmLcwsGXhHcx1cGjYoDQh08LS9CUeJh03kIcEckvKae8dCn06gKKBJ0nzc9OFZVpS%2FTSAMtGxyTUhfKCMppbmGq8P2htEMsN8s%2BfkGmmwls8R2FCJ2PlJ1UIJjm1NIy40qwHm1KegQxJjUWKq%2BYFpo6hjVfX%2FTylbpSPfqfxfXedwnbDaXQAHPAX%2F%2Fi%2F4cObGKk%2BXXJNivspzJTe8IzhOcYwx7XFyQY6pgF9KLqMUprEsI76wT74%2BOie1SAS%2FsngS%2ByIDFT0tmN88kz5YT7opVw%2B7KKZ%2FvOPvy7%2BeQLQa0AUE5X2UpO%2F1XvpdMvWyVo7wuC9lmpfnKCGcbsxIpwfBfAFK09ieHAhn%2B7qX%2Fpz%2B2Ip4UP0tIey5c4ChijUZNtL4O8MVd1iIS1XbLteuCI305SCzs599%2FFPxH3%2B9LG6QcPGGPrga4eTExpw7CBODdC1&X-Amz-Signature=0ddd404cc123891591445061e53a602d5375bc59c1709285b9fdf29037f63b35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

