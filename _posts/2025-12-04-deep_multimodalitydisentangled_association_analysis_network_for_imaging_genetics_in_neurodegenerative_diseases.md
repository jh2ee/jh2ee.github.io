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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S74GVOAE%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIFaagSDqsFDQ%2BhqCproSfyUfZg4hllnJANwkK9bAcEmlAiEAq39RewMdYeMLMw%2BkBtd7%2FEo5ejBuBQqnFy42gZQ5%2B9EqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBV5FUj7RuFDl3zmOircA1gjumZTnW0Ri7iOcZy7ilfWJX1Jkqv9457XqcZpKoyrLs646PiFLxsLyINKO41yf6Mcq6642fNiZsr%2BT7YtzNc0U6euKLh6%2FzWOYNzN%2FVw%2FAk94W0bESiBCd7Mg0XSEuT2HCbZtVQwmZqeuUbjq1fGbQbPIpDQJaQpZ0vbYCokIj0FQ2SIG62j%2BAl5BhP7Jr0Qguy5XATcBNwmcEUWtBU0LPzF5lyyQ30Q8b35B4PEyuzbtr1E31SM%2Be6l48OC%2Ba91f4rAJvTQw%2F68j6ugoqiwsG%2B8yhtegLDA%2BP1kOVrtRoucnPBl7WHxo19mL8ZZpGQV0fyLIhQQHgSPuvx0j%2BQ7KZvhySZJWF39yfbkYB8pgkWq7QlY6BZ5%2Bz3jemikPzon%2B5UmO7YUDdV9vUixCNpLHYqLhNDE7OkIiddvlr%2FYAimK%2FoURhqX616NimpCJkiEek8fzezK4gmvH7qZx334z8%2BlLk%2BepdDiI9W3smN3BGxNslpFzlukwrNSMMaH7MIJ35XtD288xuTJPJLISLmDCBhOs2EWBUoQGMHUdmuBWiKtOl1VIW4VdO89m6gC6JG1WxB9%2FUb7e%2BvlP59IZzUj3Dq0qHus%2BPdUioQkzGSMIw7y28dxIFoQWEeIb5MN6FgswGOqUBc2fwgml4DT7xWQCLInYLJKjfvlEyyKhbUO9BDZtrI3m2%2BMrAIVhmde%2BVSXbaYW61CN9yBxkIJEO9eVOdRgPsqXxdZwSGKC0YJ7bMgnyD3ygkOMYlZpaL197ZESjnXnweK1n%2BizwQAwSy37on%2FJAIKmydTJRax5w1fh5AKWiRAeyBX51NW50ia4uF6EF0kwWgG6fTS5wSJT0Co%2FUgomo7Cm2xCwoF&X-Amz-Signature=fa66ad85c48323bf0d383bcbb00af0fd57af1c9aa171a57f71562fc0596603ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S74GVOAE%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIFaagSDqsFDQ%2BhqCproSfyUfZg4hllnJANwkK9bAcEmlAiEAq39RewMdYeMLMw%2BkBtd7%2FEo5ejBuBQqnFy42gZQ5%2B9EqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBV5FUj7RuFDl3zmOircA1gjumZTnW0Ri7iOcZy7ilfWJX1Jkqv9457XqcZpKoyrLs646PiFLxsLyINKO41yf6Mcq6642fNiZsr%2BT7YtzNc0U6euKLh6%2FzWOYNzN%2FVw%2FAk94W0bESiBCd7Mg0XSEuT2HCbZtVQwmZqeuUbjq1fGbQbPIpDQJaQpZ0vbYCokIj0FQ2SIG62j%2BAl5BhP7Jr0Qguy5XATcBNwmcEUWtBU0LPzF5lyyQ30Q8b35B4PEyuzbtr1E31SM%2Be6l48OC%2Ba91f4rAJvTQw%2F68j6ugoqiwsG%2B8yhtegLDA%2BP1kOVrtRoucnPBl7WHxo19mL8ZZpGQV0fyLIhQQHgSPuvx0j%2BQ7KZvhySZJWF39yfbkYB8pgkWq7QlY6BZ5%2Bz3jemikPzon%2B5UmO7YUDdV9vUixCNpLHYqLhNDE7OkIiddvlr%2FYAimK%2FoURhqX616NimpCJkiEek8fzezK4gmvH7qZx334z8%2BlLk%2BepdDiI9W3smN3BGxNslpFzlukwrNSMMaH7MIJ35XtD288xuTJPJLISLmDCBhOs2EWBUoQGMHUdmuBWiKtOl1VIW4VdO89m6gC6JG1WxB9%2FUb7e%2BvlP59IZzUj3Dq0qHus%2BPdUioQkzGSMIw7y28dxIFoQWEeIb5MN6FgswGOqUBc2fwgml4DT7xWQCLInYLJKjfvlEyyKhbUO9BDZtrI3m2%2BMrAIVhmde%2BVSXbaYW61CN9yBxkIJEO9eVOdRgPsqXxdZwSGKC0YJ7bMgnyD3ygkOMYlZpaL197ZESjnXnweK1n%2BizwQAwSy37on%2FJAIKmydTJRax5w1fh5AKWiRAeyBX51NW50ia4uF6EF0kwWgG6fTS5wSJT0Co%2FUgomo7Cm2xCwoF&X-Amz-Signature=fa66ad85c48323bf0d383bcbb00af0fd57af1c9aa171a57f71562fc0596603ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCO4YBX2%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIGirVRwzxL38b4%2FQR4T%2FYJYqyEqhxRZpelEvAPHbu4Q4AiEA9tPEi7Id0b0FK2h%2FgJ3qRfFFcGs9p6dWyNHvwKBBBxEqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIck%2FbojIitszmcioyrcA5XgGftzGvsm3tWFsNfy2vX%2FuAr3tEfLIEeGTPDsz6thufFKEnKGENPnZq9sj%2FK2Baey9Xc219IKbWb%2FjN9MaE6Zy%2B26m6ZRjNag0WP9J4nJAdnWFZHBekS3CoCDfx1COMQl%2BP7BTqrCD1SX84%2FP0CONqycZRAeuQAwTwKdOBpWkoJlLQdACY1d4ngW8LmYRj%2BoXBLsrvFOX6%2BcbzELqJ2LscxQ37InnxxADSoKTDI6anq35nmnNBR4ewE6IoeMIpV%2FODwRou6aQjZetnEFci6fefY4irusNtHJ7bBJX87Yg8ErVGBMTzzHjc7QfZ5YKJ8gJiKxGuMI3Jvzdhwhojx89Sck0jW2GovYxxYQV1tzXq3IHpYH4WlGn%2FvJCToBrwoV2Rk%2FlJR%2FdL9WEmhpKm9eEuWEyY6Bm6lpm7t0qH%2FqGSYSRmNhOh08YqOcLFoS%2B8IekNmtPmCvgsuqHrrjvZXxTbehUkkMnmlwgVhNic%2BcnZl8BezcPyv7PdCFV7IGm6ViyYoYLu%2FjOaZIw6QRSZpYpwdrqWJp5mqDE4Kp5KbUZWNZtcwIyyoVKvEKZtxrvIv7U3Qub4juopvgoHyLtHvJVUhI5N%2FQD7SAZkH380uWfv2ZN%2FtHSx5s4288fMKSHgswGOqUBbcfVV%2BvojZxjDsGFrveiv8Zbra8TjQbive%2FTn5MyKFO%2BrC%2BX4BRHUCeFrgUHWvdnxSvn0mdLOQUEIVfQzi%2BzBQluCyUJlsWp%2B%2BxeakHYHftXwZI4N%2FC53JdfnY1lxH3HmqWFnkv0tfUl%2FPbjDxbZvFy2lmjWx%2BH2SW%2F1g%2B1L4N1AhuVlekZxgLaGlsHC50zuPMdMgxqsZrpmRC15ZRmBRuxnsHVl&X-Amz-Signature=707ed0d03965d8b54a1a50d2946800b77b3d93b12c110a175a1fd766c656cee6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DMBGAZH%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCOGKdXIqj4OQ%2FsTJPkQpURq0O1ebOKc43BKWiYoHoVpwIhANpDBRUd4ddYv2vL76HozIbkHnwotzkkNKD5fJzEJ%2FtmKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwmlqBoOKbco5dYB%2Boq3ANeZ5dYypOEu2GIR0zYYETbtEN2u7GD3q7y9j1ig799eoVcL66LxZ1ysMP8kJgQbMWHH6hmSXEUwRC%2ByaAOcNe4PbImVhaHdIaPUua4SMLTB7rokMpUGVhLwJ0im%2BIiBXrw5IlogzkTPVLEQg82iz6Q5mCjsJFdZRzSN0NUC%2FVTUv7nge9JzR%2Fvbba9Eyv04cFqPmid8epkbhXUqlPv4q4y97gbN%2FNMq8B9iv2ccWxqopKUOPVEk4Uaz8CpASFFSc0Q12mgFkz6QU1Fx7ue0EopPEqVaDKmL3TmZySR5gnSHe5RtEtB2zCd4%2BiI2y5kqRQWpW%2FMljEa1GjqhoMwMCsVk5OXbeIPBpfQBcHk6qKAyw81LTsnBIVlb%2B9Vi5wzykeum9C%2BDrQog7Roa%2FonRd28%2BmTu7KyC8066aBNhzfK%2F3R4Jq1Hj0Z8uyk2KGBnFDGJdBMS7dSyI7tNp1%2FjRMbR0R0c5mFuNONBjffQ4n%2FLy2GDdOQxnyEMpJ%2FnHeUAKqG7%2BTqZoApua6lpykn3pzNK8sXO1pWe8baLUaQCpybxEqspHfgBpD4ilz1Oi51Ced9EMIKAPB3FRCGsfBXS1%2FePoLgP973m%2BbAhEXt384PQHTD0fU%2F4tOoX1wGigdTDFhoLMBjqkAaG49pAt3ouNZfk32t2rsUZExT5w1pRnb0IQYe8ncQxpaNRfRn3NEQ2184eNTKD3BPaF3v2JkjINkkBvu8oD4t0JfMWDt70ZeQpI41KjbYOaxMEMBjssY%2FnckXrjIwDTNPi9clVIV5TVjPSMzdHlIYWZmv0aiG99JXB9ROn0MztyVbq7iVHVwFTicE02XcSX1Q7%2FmYpj%2FHE%2FcO2Ae3fUbIDZfIEB&X-Amz-Signature=cf4870d44e989dcde70185e85a627ba1ae3049d8913ff2332d53479c287c7a87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DMBGAZH%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCOGKdXIqj4OQ%2FsTJPkQpURq0O1ebOKc43BKWiYoHoVpwIhANpDBRUd4ddYv2vL76HozIbkHnwotzkkNKD5fJzEJ%2FtmKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwmlqBoOKbco5dYB%2Boq3ANeZ5dYypOEu2GIR0zYYETbtEN2u7GD3q7y9j1ig799eoVcL66LxZ1ysMP8kJgQbMWHH6hmSXEUwRC%2ByaAOcNe4PbImVhaHdIaPUua4SMLTB7rokMpUGVhLwJ0im%2BIiBXrw5IlogzkTPVLEQg82iz6Q5mCjsJFdZRzSN0NUC%2FVTUv7nge9JzR%2Fvbba9Eyv04cFqPmid8epkbhXUqlPv4q4y97gbN%2FNMq8B9iv2ccWxqopKUOPVEk4Uaz8CpASFFSc0Q12mgFkz6QU1Fx7ue0EopPEqVaDKmL3TmZySR5gnSHe5RtEtB2zCd4%2BiI2y5kqRQWpW%2FMljEa1GjqhoMwMCsVk5OXbeIPBpfQBcHk6qKAyw81LTsnBIVlb%2B9Vi5wzykeum9C%2BDrQog7Roa%2FonRd28%2BmTu7KyC8066aBNhzfK%2F3R4Jq1Hj0Z8uyk2KGBnFDGJdBMS7dSyI7tNp1%2FjRMbR0R0c5mFuNONBjffQ4n%2FLy2GDdOQxnyEMpJ%2FnHeUAKqG7%2BTqZoApua6lpykn3pzNK8sXO1pWe8baLUaQCpybxEqspHfgBpD4ilz1Oi51Ced9EMIKAPB3FRCGsfBXS1%2FePoLgP973m%2BbAhEXt384PQHTD0fU%2F4tOoX1wGigdTDFhoLMBjqkAaG49pAt3ouNZfk32t2rsUZExT5w1pRnb0IQYe8ncQxpaNRfRn3NEQ2184eNTKD3BPaF3v2JkjINkkBvu8oD4t0JfMWDt70ZeQpI41KjbYOaxMEMBjssY%2FnckXrjIwDTNPi9clVIV5TVjPSMzdHlIYWZmv0aiG99JXB9ROn0MztyVbq7iVHVwFTicE02XcSX1Q7%2FmYpj%2FHE%2FcO2Ae3fUbIDZfIEB&X-Amz-Signature=a0af39d67be6592d4ad495348b805df355cb000bbee6e68423bdf255c6a176c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46665AX34MW%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIHEfDXlwcdDSO9d7smVfVB2gPks9nHqzJfdvkxAqgXzIAiEAybnn3nfcAoLdysypp8A%2FvE0wPFFjyvNJlPkKoGMtufIqiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA874f9mjsf2cuC4jircA9lzOHeRSiFRg784bzBUkvaJEaO4CFT9y%2Fubl19NyMBDMwPmcWNeNrYs%2Fxt0sqxbpxq6ImxOXi657Kbk5ZxIju1vYOuhbhPxs%2BnGZlSW16rZcx1cW2TOO3t5WHuoe3P99fSW5Hjm178kJP8griillm7%2FS5EnYBtId6dJ1SZwtlnsB1Mhj7FFHzrPI7IPLyvkEiqO%2F3Tv76NL8Jf9DLt7R1bkpYucVLwXWYIDsGb%2Bhb0hON2MrAvDjoT7tWAKfZ6uMF%2BSkGbYbHpg4eXcvjpPjPcz4MGZPhVHE5JxtFLZUfVvufcuAb7fU5UxFbq86fVrMrow8I%2BbZN2hqOOzZEOtqaSDDukwZO5jf9PdDScF4YQZejm2KduSnRKelEWWnisr%2F0qg9AcGuwFnA%2FgxO1xZoJrYl41pGamEfNC2tazLeqEUe4e7tSPoP%2FyhL6fZNg7EYwinXzbdlxsoU59guKtYiHAggK1gO5XsNNbwFjBvvsmDNwu8ewlaX0sBxvZifw5t4eq9yYkE1Viv9w6tauCeXkBaOZnoyuXyDOMg8UcqLcz0o4yZqe6QX7N1VhKNVVuGLZavLehs2sCDz0ci82oeG%2FeD6QCIJo2n4MdgKklxJWOByBEyvRdjiOSg2ATwMKSGgswGOqUBUG6%2FtJ7AJx5T9ZbGREoPFZkzQCsw2MOLM2CSvScTqEjxDgpbFC5fxURj8%2FMlVWm4jrl96rNqPHTgchPuLZMo0LHR3mfQHl9%2BPD5bNCKZt0SO2em9Ycm0M8KSwTg4wGxq0UAeAOuS4SZ62VUcihK33C%2BnZP1c6WW8hc7%2FMYQ92TcUSHSM%2BBoqDhx9yXnsHB35Cig4lzCouB6JDSxaHvSUqBNvH5qW&X-Amz-Signature=a0199aa3e6451d660cafb5c6c10053eb6711045a6805132cfb54e72102025a06&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SAC5B2TI%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIEMw69wnD%2BJU9lpo3EfbYf%2Buqzavzi59yCz9bDDjKcmCAiBhB8rSU8ICKkno1uqAnk4yKTyb%2BpOezLQmCZbUCfbVwyqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMikPh6N7B1qzs%2BbaAKtwD1mbD9mta1p8Z8ySsk%2BThvGRmHRkvybZO%2B8knXwtO0CVt0FfFgRljJKlcGuon6bu%2F5THSzp3VHCtm0yBfHAW0wtnQDzPNeUubr6IPX2MrvTulPRRq3BDIJo5A32i54k%2F%2BSQi2BGH8yNbkShNOP7uUYgmM3gFU1gCPkXm7dG3q7XJUywB51IxbV1HsfTbwnJuYJgO7AA2ZVAWyuNyOBalT959m20U4qPK5ZPL%2Fx1PHfDxFIMI%2BoBc15uHWYmfEG6ZRZEX1JXZXVZltALiIQi%2FkIutvk7SlhvsC9BROAXXgR4pk7ItugUbb3lpOiHc4T3mgyNqZHO5qarYPQ0a9P6FfnZNn1GR7c%2B9iIppsyqMiwqGQeAxQ21nDsu5AfdAU8i3HeL5Lk6Csy5yXuT3kNM5qEZh1%2BLEkOOR1JtovCOK4KClVG0JWipo6Ny6m13QqMDjxjNV9lce6XlRZ2ku%2FXp6QsRdz0eRSGyhSreH%2BxiX%2BQ5e0MWd2b36PKQrkhhcLYzgKhJnKWABepQIerEpXXA7LbzQNj5KOcTswdtPpERS2zwtul1EpIWOTlyux4RIFlhOOQgRQGW9IbHKrHC2XT%2B6MmIYLY3p%2Fpny8PgI3LzyqE%2B6X82CxDWaIVaULEx8wxIeCzAY6pgFJ9GthkhP0tRGU6MytZWdfqvNXTwo2cRIwangh3AIgvk5%2BvRjuYxfVaRwlHZYC5Emv2TsUnl8R3vQiNgavozoHiQCclSr%2F5uIb9PuVACTGl3wJnMON%2BzEWko2XiWgxt89jViwCa5%2B7txxPPemT9JNimi3j1wvKZr0dv8a13RDJOiu%2FmCd%2FIq84LGyqYvNYvfaktAUhg%2FrIsV6EfL2whn2hTzTEbRzA&X-Amz-Signature=308a19d6d4017d22650f9e6448a68b6b75b2a95e703fb0079758e2fd07376009&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ4CLZPI%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIBRp5%2BSAiPmIJXPnlu%2F5aKMST8oNAQG9mjxyyba10CwyAiEAr7fNTnxM0PelyUUn%2BD0pVfSZQ5k39f0fXQGNT%2BsRiJ0qiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBXXiMlSbs%2BHr1thEyrcA4oe68SRCpTia1C%2BJPi18Ib3XmeguNcK5Q615JIZPngoKZK1gudm%2FSJLZ4Vsbz8ppjRJZ6sjulfUO5G8ybNyWADj%2FpqxaDes7qvf7OlD%2BB1c5WWT%2FOvYdoayAL6D1Fwk%2BH1FQNkWvIrcY4lV26MdMI4JCJwzDJw2Pe9R0s8HPeFt6meY0oVBDKA8Y1B8zIWj1Kvl8yUNCvg3mOyXa4pzUaMXigdC3EaxYt9WzZI%2B3m7jVFB%2BJexIMxzl1NRL%2FcyDbzR0GfUnhWpSuf4Kf2JEw5%2FKqVmM04qA9P4m0DYhBnXWShqsHlkTxq9eIpS8SomYtP5zj%2F5F7xaDFnwRkz%2FnfhG05E0wlbuAg61baO7zeQzfmNb3FqqqqO3eeSOwSWKEq3XQ4VY%2FUZYYzeANJO6egQ9zx5nsaD%2F3CF1cIyrw%2Bz%2FXZqpg05kK48KQdJjxfWyJcBk4DxF0Zmr9PQdzqWQzKvS4%2F6%2BqtTKAaveElvK82QtiykeE0Kivz%2FxMtdVOw4hVTBhZTi23fxU6QFRpycTiAl4PQxsJPh34GDFmclflhsNPrQuRY2L2wg%2FwL0Mchc8IpO9yI18dzsULfro%2BhB%2F9z%2F8vGqv0Bn3IoHc7KC3SD305wMci14MOTpCmmaSZMKWGgswGOqUBHXl6l5jVjAc1Pkha7KD1%2FQ37ef2AxQRH7fprHQZBh6HK1pLNCcaeyBaRp89Rs9kp3Thr9iLDp00UU5l8WvFpSJBTlAZNnQN7hYhK4Mf8ZodGuo3sZ2PDoXpo7gNgo8GojlLuMpenc8MHTcHy4OAJ4PcA7egUqRCowKCXh38HzRt1j4IGz4XZUJtz3zUU7twcK0EEYZhoOxHEktR%2BzoP4VI%2Fx%2BJ9W&X-Amz-Signature=d3ebd9e0e4fe02638db81a8232cbe0516a4395dd1f3757110ea79fef74293f30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WO7EKB4Z%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCS9ICfFmvTMrDrs7%2FNR2xJ7C6mQgO8ioEuuOp%2FBfVmEQIhAPZAH9eLIHAxXqQdYSq%2F4v%2FoMQJSR3rPPEc%2FiU2xIMqKKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwm85IJ5E4Bfa2RcxYq3APze%2BvdILVeLXJA4SPKPt6adBtVUnItTYc6qnqW7f4q84ZsT1XZiH5%2FmktbVdahg2fs8CgDtVNL7vLsRgIfQ6Clz1eUe%2F7Dg2iXB87Eu3zdD1q4SwPP9W1GIDwEaPOYM0myCfHmkFuHXigCWtItXO5ASCMAyLnyjZSPrFJQT9Fp5BGHEU%2FJh2QE1Oh9AdNI2nWyzEixZsls%2BfswltWfGBGAhu7PTS220HBalwyWeZnJGYt6i8895HUjmeVcPhRChTrIRQyO7KLJmbIBFfykfFz6d0PYMxiaK4BY%2FFQB7EE%2FEvIs85ZsLJgMLz9gq6iGTuQsUnAEDeblmYPYe8bs8TbL8ZvS1Ja8k1yW7PcfrBDn3MTwOSf2%2By4kK02UTeQWIP%2FGIpq9PCVzsSuLIcd77VkSBMVNSpKZlxnb%2BOP6jlcHj9m%2FrXl43e%2Bl0Xb5IC%2Bmdz8QsEQFBU%2FlN0iQfK%2Bp0NTZ2YazCRyvHBCJIfFXLFxFctA8u5GtcGLduwbvjEG%2BK35LeN4%2FaXvXsW0xBnIrYEEdK%2FnaBkPgONccrxa%2FjHKRituLqcHxn094Q8SBfHCIcUxyPOVn81bYBKgkHvNeYUIm7mjoAflqSOiUD8odwhyWYHxp9XeGL7Ch%2Fie2PzDphYLMBjqkAfZ4B546bCs0nT3xihdELqiv74r9WICoz9E%2F77KWyYAteNv2JRwI6tDCgZ22RuDAuC4sTuGddPTJg%2F6W1VR9IhXXJXmuT5r9o2BOv2Le1GSisDfz%2B2EWtIDtf%2FWMXpliVAhFV4nxk%2F%2FgkGI8dww5g4gE%2BMCyNSHX4QvRNT%2BYARCFZeG8POy%2BU%2FyoMW3TE1RzS3QNiLlI2E869IeiEDJYYvN7BUWe&X-Amz-Signature=431b409e92ab20cf3a9af2aa5643f83f22ee46ca2c5f96d8d300dcdc493cadcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WO7EKB4Z%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQCS9ICfFmvTMrDrs7%2FNR2xJ7C6mQgO8ioEuuOp%2FBfVmEQIhAPZAH9eLIHAxXqQdYSq%2F4v%2FoMQJSR3rPPEc%2FiU2xIMqKKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwm85IJ5E4Bfa2RcxYq3APze%2BvdILVeLXJA4SPKPt6adBtVUnItTYc6qnqW7f4q84ZsT1XZiH5%2FmktbVdahg2fs8CgDtVNL7vLsRgIfQ6Clz1eUe%2F7Dg2iXB87Eu3zdD1q4SwPP9W1GIDwEaPOYM0myCfHmkFuHXigCWtItXO5ASCMAyLnyjZSPrFJQT9Fp5BGHEU%2FJh2QE1Oh9AdNI2nWyzEixZsls%2BfswltWfGBGAhu7PTS220HBalwyWeZnJGYt6i8895HUjmeVcPhRChTrIRQyO7KLJmbIBFfykfFz6d0PYMxiaK4BY%2FFQB7EE%2FEvIs85ZsLJgMLz9gq6iGTuQsUnAEDeblmYPYe8bs8TbL8ZvS1Ja8k1yW7PcfrBDn3MTwOSf2%2By4kK02UTeQWIP%2FGIpq9PCVzsSuLIcd77VkSBMVNSpKZlxnb%2BOP6jlcHj9m%2FrXl43e%2Bl0Xb5IC%2Bmdz8QsEQFBU%2FlN0iQfK%2Bp0NTZ2YazCRyvHBCJIfFXLFxFctA8u5GtcGLduwbvjEG%2BK35LeN4%2FaXvXsW0xBnIrYEEdK%2FnaBkPgONccrxa%2FjHKRituLqcHxn094Q8SBfHCIcUxyPOVn81bYBKgkHvNeYUIm7mjoAflqSOiUD8odwhyWYHxp9XeGL7Ch%2Fie2PzDphYLMBjqkAfZ4B546bCs0nT3xihdELqiv74r9WICoz9E%2F77KWyYAteNv2JRwI6tDCgZ22RuDAuC4sTuGddPTJg%2F6W1VR9IhXXJXmuT5r9o2BOv2Le1GSisDfz%2B2EWtIDtf%2FWMXpliVAhFV4nxk%2F%2FgkGI8dww5g4gE%2BMCyNSHX4QvRNT%2BYARCFZeG8POy%2BU%2FyoMW3TE1RzS3QNiLlI2E869IeiEDJYYvN7BUWe&X-Amz-Signature=278f4a51c4c2cb111bcbcf835cca0182919559aeb5b8f0e3f281e2f009589c41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGGV3ZEY%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112612Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJGMEQCIAjlgHQDtzbOUjb%2BDArvp4b74r3ge47x7VMIg7s55NspAiBGf2tcB5p9XL0DEG48y2Eb7tWeOrX5utdXarMvbpEpDCqIBAjk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRhcQRfJrbc8gG91nKtwDhY5UtqFHeO%2Ff1E4DUEluVNDeLjY7YF8sJ46krt7fhkjuPRXgNsG5g5xmV6L2um73mAG7GZSoT%2FaUDw7RMxUJn93%2FGxwzRW3PBOe6S%2BtoBIX%2BQvdodDIrWflnpv6ZiVEByJGgQgkCglfFwWldGhUvCWAvEOYWfJBL%2B%2BYlk4ZhuMjYUBiSVtKHmGY4sEgIWZukBLrVe2LDBfjjgc%2Bj09e09qQhRTcD%2FoVua%2FzAqrKR47SatT%2BzsDMnBqaV1qxW7kw%2F9cIgd3Xk3tLLqsT2M21S5KUHw9GUdT%2BJ32dvw%2BSzc9mHfBHStAHxzoq2ndCRmaHzZIBlw%2BQPu54yUs%2FmEulygF0E2CWLbv6g2duaWhl%2FhbWHuBYnxTjtfh4qJVWw44XUEFVZ0pOxHKUlubWOza5ll55OO%2FAuVe5ZxddvemEW49ttk8VQxGAKdJZMG2nlXq%2Bri9yXUO0XCIqy51%2FKwqtJ4P5Ap%2FYNIlUOkxft6EG7SamxxWJ14R9nV4GX0Cx2h6yhLdt5LJnimTsuAnJ4Ysw5P4J2k1qer8TzBVhZNqxQKlJNUL%2Btk4x647YbngJP5pAOLrw9GVXQDmqKwGJn7%2F0HZJbCcIEgAfckUJyGzyfgJGeHlMBevcuZnekpj9Mws4eCzAY6pgHc42uLXQ3SSE0iLBvAIIQMdGqrCZ%2FM1WjWSwfK6tWr8Pyx6wXr5IFlL9KgAFFavtM2AI%2BtOEyOcWC4ZhRxJjNy1EyvhewOMPafGv%2BCJi9KtAEQK5uMtI0%2FdBjSY8QXrFVEhdpXx8pCD0PXTJYFgAq3is0%2F9BI11ArCJ%2FpPdYeMAXAMN%2Fr2sPRhtWD6RLZuwtfZEXBrks%2BDefOGg9rdIJGieGjiMqc6&X-Amz-Signature=922b2502f5278106c8f629e22f7892e81fea61a3ced1bbe74137672c059d8c99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5JMRE3Q%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIGHsauTXf%2BulrPakE250rWRuLlmObmwSkY9abam3wBu3AiEA0zsU%2F3yE7NjGwafg7M1ZulP9vaYXu4Jh4XPkZIVkZ88qiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAV7XYyktHT7B%2FAOXircA8Xsy89t1meqCuGO07cGb9fs79sfN1etB%2FTSesfrsM61Xb0LhSYyRycuVf0bZjIpDRo5vReft2EogFnsr4i%2F1%2FMaXWjg8%2FORyY2KtR%2F1ikv9LnayTLRBf0NdoJZvB03olmSobQs9n081W4slZsa13bv6WsRrG1l9YuVHgq%2ByPLeMF8nirJsMxm%2BiramgK3LIGaPYNHUuEE%2BW1lcYLmwVEpEnq6EMbogeG4B%2B%2B%2FjdRuUB5iT7R%2F1WBHwTWaTrRxCRusi4wIy08WU%2BwUncKkNOw%2BYz7drsps7dlOLXNYBOIJjQzmrEVF4ps969i9Y569V1Q1x6z%2BDj8LLXMHepV1Tt%2BqZL2XGYXjyeRK6QfipWbrlz7GXC18WvbU9Ca7uxg22rPMWmEuBHGndKdRYFowv6DIdtIMH8gF8vHKs9DNA7cLHOBmogPjgMSn2RfgFmZYEGbmWWH06JwKzClP6WNmecoW2ObLw8rluX7e3nGkmvzcvJxHmeZa%2FKAJnqWB9gbtZU6vwitIBdPmgwU%2BdvYmbPugSVq2A5q8d7eKkj3YBh5O5rm8i8HhB3Kz7E%2BmUYWRsf%2FBNp32MuZ0vtDRhdxvQw6EtQ0A68BQ98UorJzTdAFUN5Jy%2FSd%2BNNLd2qCsw3MPKFgswGOqUBSTHewbMgUWntpntyzring4FfAvtsEQErddAW11EYWDFgIpy7U9zn8FvC15dIv044RjkRVl9tsqqCgJlRKVmpiSohM1dEKqDnaJFpPsuWcw9dPI52Ng7xcmYXA2tEays2cElgqR8qkZ0V0w0X9y5OMoRDjpG01Q0E9AdnsMv7jDAq%2F7YU%2FjY6U5NbsB4GUkXZfwPP4jbZ4JqSkii9FkRLhrqGP4n7&X-Amz-Signature=03683fb01d0046b85001dcfe5298d23ef09e7dd386e89203aa756f604c799913&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5JMRE3Q%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJHMEUCIGHsauTXf%2BulrPakE250rWRuLlmObmwSkY9abam3wBu3AiEA0zsU%2F3yE7NjGwafg7M1ZulP9vaYXu4Jh4XPkZIVkZ88qiAQI5P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAV7XYyktHT7B%2FAOXircA8Xsy89t1meqCuGO07cGb9fs79sfN1etB%2FTSesfrsM61Xb0LhSYyRycuVf0bZjIpDRo5vReft2EogFnsr4i%2F1%2FMaXWjg8%2FORyY2KtR%2F1ikv9LnayTLRBf0NdoJZvB03olmSobQs9n081W4slZsa13bv6WsRrG1l9YuVHgq%2ByPLeMF8nirJsMxm%2BiramgK3LIGaPYNHUuEE%2BW1lcYLmwVEpEnq6EMbogeG4B%2B%2B%2FjdRuUB5iT7R%2F1WBHwTWaTrRxCRusi4wIy08WU%2BwUncKkNOw%2BYz7drsps7dlOLXNYBOIJjQzmrEVF4ps969i9Y569V1Q1x6z%2BDj8LLXMHepV1Tt%2BqZL2XGYXjyeRK6QfipWbrlz7GXC18WvbU9Ca7uxg22rPMWmEuBHGndKdRYFowv6DIdtIMH8gF8vHKs9DNA7cLHOBmogPjgMSn2RfgFmZYEGbmWWH06JwKzClP6WNmecoW2ObLw8rluX7e3nGkmvzcvJxHmeZa%2FKAJnqWB9gbtZU6vwitIBdPmgwU%2BdvYmbPugSVq2A5q8d7eKkj3YBh5O5rm8i8HhB3Kz7E%2BmUYWRsf%2FBNp32MuZ0vtDRhdxvQw6EtQ0A68BQ98UorJzTdAFUN5Jy%2FSd%2BNNLd2qCsw3MPKFgswGOqUBSTHewbMgUWntpntyzring4FfAvtsEQErddAW11EYWDFgIpy7U9zn8FvC15dIv044RjkRVl9tsqqCgJlRKVmpiSohM1dEKqDnaJFpPsuWcw9dPI52Ng7xcmYXA2tEays2cElgqR8qkZ0V0w0X9y5OMoRDjpG01Q0E9AdnsMv7jDAq%2F7YU%2FjY6U5NbsB4GUkXZfwPP4jbZ4JqSkii9FkRLhrqGP4n7&X-Amz-Signature=03683fb01d0046b85001dcfe5298d23ef09e7dd386e89203aa756f604c799913&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WJJB5FYD%2F20260202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260202T112625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBsaCXVzLXdlc3QtMiJIMEYCIQDa77eCccan%2BlBERB0ealGnwaSzkw%2B4OeeNZofY%2FOcoQAIhAJ2u24tQ6M2rMw81mApxKgZhsDX56FfFlGendvnzGKhvKogECOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzSW6mJBbE0u0fZRRoq3AM%2BjBpMPV51krCqbP4blNRJdxpiP2fHgu9pqIiRSFIyyylahiWKjcPslnJNvBMDznO2SA9aZTXYJTkXi8Zrf1KvnXpPGbYNmSJsGFM%2FmSeBDNESkrD1uEGVzzMLBj4zUDIBE8tLdItW%2BBORM%2FVmHHtY8Kv7MWdOLoosg4OVa40DuF3keJue4L1Ss%2BKWrOQGNauqEXPOABun2dljZBAAHiewcMFG2bWKFOC0ARxaCALe7ezpBQpVduMLI8OLCXR5xMmMsU%2FudXngSVcT8TFZU41CWfNwuy1a1b2kcsI199q4G60PLH4IEaoVNDRfEtQXqX5ixLS%2FXg2jNt3Qc3ftR%2Fm6147lYVSflJ54U1f9YDXdvS%2BPAOjCCfliBfAffgyqSYVchTWCc697K1puerakRHDP4vXzE6S49pr02nOv8hvbxCiDuzB5Yq9sRIlrKVwjKoVhJMmgf5NU1DFsYxhKGlepYaGSVTsqaw8T7tVuZhH432JPudFnivO8OMAVSfj5OmQ2%2Fx%2FaSs69gt3zjCLCCCnRjgH6utq0or%2FTIOvKbX4T7%2Fs6K2Ayy6GZBXIjmpaOhMJLCI1fGnRAKoqsmlo6aZDIZYlglRuURMRHoFJwgrXT99VYl1Tsuz2E8xNz6zD2hoLMBjqkARUuAxvXM4VB6RcXFVgc3viPdntELHp76XnMYuo4xga90jbjIJ9DaZCu5ShizXu2RJeDRfVHA7OLxMnyGG2g1UvuKR3%2B6%2Bkr8KdyfOiISFapG8eQQ1icsiSK2UZ5GlaYdU2EcdwH892nwxB2DbHqpMdgd4DFjNyOWT7N0tsLOHoMEZ2N1UralgoP47B4PO6qcgZ1DStGdqRLB1fhgsPQCPUGnfIH&X-Amz-Signature=74f5342ca2c16334ae6bebb52e06a65194ad7677705a166f6779022ea3c81d53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

