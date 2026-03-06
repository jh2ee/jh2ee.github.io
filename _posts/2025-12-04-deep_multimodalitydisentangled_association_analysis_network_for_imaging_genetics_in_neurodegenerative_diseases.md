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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGJOUFLV%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQDaEuNuEOR1wfYiOOK%2B60V2TTFZV9yIz45offgCpvtFUAIgMnvczFPH8qKbaQXbqL0JsXxKE7XT25NsdXooaGgTGzkqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJf%2BO%2BKLRTdOI5HyCircA4%2BuhAO%2BvlENY%2BFJDwgAQECXtXIXfUteuvMmohIXRcCMO%2FNSZG9pe3x%2B7rQibOhh75Py7HlISaCc7VnB5o9YqBLc0OnTyonlI8GOVrsb%2Bxe%2F4LcPgRa5%2F9MgQ2glwTxiz0CAp2z8g9Xe02wW7q3gNzOVevWyubhS9Xx7fbS6t3taJTLZ%2FLUTtgzUaiz95CyaemfT%2BMuCy29KsIExRhSqOkbTlB89nI23DzAUwipP%2Fti%2B%2FZjhwxl093x7qhrnKHmlvRoMtWEeIF2BckyelfyS3yk%2Fe1jyeJR7yi%2BBbGiqE3AHoS7%2BixyaG5yk%2BJDFEgMqYBGWyPZb2DG3od%2B%2Fy4Tx%2B21INMPRH2IiO7wOPAsB7ukwLB8yqFb9FQXveEErtfvmjuyMMgpsZXmb4e7hlQR0pUf07S50HhsZOYetI7SWpm9zZvljRVB9wJ%2Ff8amglOVMW0u51DTqe7QIyPpnbF5U67QU5ITWZiP87BoQ%2BC%2B0ONPjs%2FRb%2FBpq2s7hBJYv3qVSVy9U3iydtMJRRiWjnx4pc9mWbCcRdpi3Thoy9noymb8ph9UgCxcEOv42XN5kS%2FVep7W67VemTN3QOIQ2Bsf%2BGGHgF1uyMcXb%2BvbXMNn8ixqW%2Bgf95UrLM4%2ByldxbMI%2FOqs0GOqUBW6qTzjjFI2OtaSOwyiqounBwX%2B34yO5HVMAFraNWXMfC0wWY%2FgddUSgTy3FSN6lpX0DFirdgjE7rfjlyNoZ4UFJUu2H6vy7g4BIR054s8brR9bNExMzWjF5uXn2tDeYVUnH5eG257JV36TXSQiIykKa6gz6%2FON9fVVE%2FdB2uCopIMNoQCr6aq%2FWu7kO8JNzMmKPtNdxCiQpsU91ThQ77ChisHUZl&X-Amz-Signature=592569fd1609aac764e8e326f6cd84a1b1a3889f61659387b60c6f0aab53a90b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RGJOUFLV%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQDaEuNuEOR1wfYiOOK%2B60V2TTFZV9yIz45offgCpvtFUAIgMnvczFPH8qKbaQXbqL0JsXxKE7XT25NsdXooaGgTGzkqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJf%2BO%2BKLRTdOI5HyCircA4%2BuhAO%2BvlENY%2BFJDwgAQECXtXIXfUteuvMmohIXRcCMO%2FNSZG9pe3x%2B7rQibOhh75Py7HlISaCc7VnB5o9YqBLc0OnTyonlI8GOVrsb%2Bxe%2F4LcPgRa5%2F9MgQ2glwTxiz0CAp2z8g9Xe02wW7q3gNzOVevWyubhS9Xx7fbS6t3taJTLZ%2FLUTtgzUaiz95CyaemfT%2BMuCy29KsIExRhSqOkbTlB89nI23DzAUwipP%2Fti%2B%2FZjhwxl093x7qhrnKHmlvRoMtWEeIF2BckyelfyS3yk%2Fe1jyeJR7yi%2BBbGiqE3AHoS7%2BixyaG5yk%2BJDFEgMqYBGWyPZb2DG3od%2B%2Fy4Tx%2B21INMPRH2IiO7wOPAsB7ukwLB8yqFb9FQXveEErtfvmjuyMMgpsZXmb4e7hlQR0pUf07S50HhsZOYetI7SWpm9zZvljRVB9wJ%2Ff8amglOVMW0u51DTqe7QIyPpnbF5U67QU5ITWZiP87BoQ%2BC%2B0ONPjs%2FRb%2FBpq2s7hBJYv3qVSVy9U3iydtMJRRiWjnx4pc9mWbCcRdpi3Thoy9noymb8ph9UgCxcEOv42XN5kS%2FVep7W67VemTN3QOIQ2Bsf%2BGGHgF1uyMcXb%2BvbXMNn8ixqW%2Bgf95UrLM4%2ByldxbMI%2FOqs0GOqUBW6qTzjjFI2OtaSOwyiqounBwX%2B34yO5HVMAFraNWXMfC0wWY%2FgddUSgTy3FSN6lpX0DFirdgjE7rfjlyNoZ4UFJUu2H6vy7g4BIR054s8brR9bNExMzWjF5uXn2tDeYVUnH5eG257JV36TXSQiIykKa6gz6%2FON9fVVE%2FdB2uCopIMNoQCr6aq%2FWu7kO8JNzMmKPtNdxCiQpsU91ThQ77ChisHUZl&X-Amz-Signature=592569fd1609aac764e8e326f6cd84a1b1a3889f61659387b60c6f0aab53a90b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UXAJOPDW%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCICUKFNCzYO4vOoiyOFOsde13zWWG%2BG6rTYbeCfWtylPmAiALyZk0ZqI3TCNrszMihJU4e5rO5jE6jk1uV12SX0FttSqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvp8oA4Sr6uhr6aNkKtwDYAEskmEuGBkdRea7OCNJJY9tSehO%2FbFtS2MU7hy4vc7xmD%2Fhuz5cMwJzJSC2PtbWFgHC4uIQxc%2FvzD5d1tZ22MzZmFkafhTK%2Bjs4zbF4fviMx1Q83Yp0cp9oMfvgde1NKJEjlz5JEkCaSdk25olnCsq2jE%2BqCr57nXGvamN7%2BAtBw%2Fv0qeQgpPcAQf3kVYIRXlYxGMXS7EiJjPx57dHHEMdMbzYAjfxehAZIgQefNOMqj4CRQS9bptIo3wDQyKbdiayVXJBdPjGuY5o91hxtkZ0KVRP%2F%2FClmMmh3bLph0AyoYupyz%2Bxt9wYu9HTmhSC9tsDPtaJcMLge2IV3CeTgdvE3inqQGMGBQYWTNjyywTY%2BU99Y9X68eAUapfZQKnPuuhtT9kYpomKJL%2B2YaH%2FA2gHBNgyvcjkQj1QCS4WAMx6k0uzyTEX30SrnB9Or6r5xbrxnnsLcFRSN33VoMdb4PNPNC%2FR0SirnK982rSejDonZYMCxi3h%2Fh5LDuxvZtrbFk4o5mAtcMwV9W64%2F%2BgW14C9PJquCBUx%2F%2BycZ%2BlDW9q84VQ7Bf0N0k3nRI45rlrBxPxgBMnOukUmYmMXX6HWtLc5bM0R9Tt0TksCNegVEpDuv2Apy%2BzBEntGuxdQw%2FsyqzQY6pgFCtHKPnLrensd0igNHp3kkWloOKqERojHEVmcysRTN7rdWuq9FY%2F6uiiccswTMcnFc8aFHKQSi8DWa7Zutpw6zoI7Aom7lrY6akLM2n9SP8ENDRyTG1h2CM%2BdMydA3IXYBgoyMzVBjVRZbG%2Fg4b2i5s2G3J%2B9IVkxsWDi0PWOT7UTfQhvw%2FBofJCtF2xH7Z%2BYBpJw69S7j5WBykSxkeE1I6bVa0CFU&X-Amz-Signature=c6b5d130c6499fea40e54fe3438301fee07ed88197efc0ff7bf8f7aab012d23b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGTZHNZQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIAWl3nONXm%2BaQAPGfr9QrwHTDU0d5p4boCY5wiANePi%2FAiB1gPgXnYkCCi4Nw%2FlNXZtnyfZYp9KsrUsq1vV9%2FEMmbiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM38B2%2Fdv5BtZhVZHwKtwDolQE6BetBur9AcgGd7a0Z2%2FyAZ5oYTBkGTNKdOQesVHX%2F9YvgnThN6s9eD4wrRPfH0i71SxFfbWReopsyLi6XlOQbJepgYJWeS7WJvo58hr1ukhenJOImJFENWRDC9IwlszTmAO2MCH7DLwsoN5eYhi1YGfrUJ1RkhQoaq7OhUHPMDe1i%2Fmv9XFep9I4ownGxWbA36NfLlSRC1ohts0CZayM2H8ToYxHVOIk6sh8IXvziotv1A8jtloXrNSACZxkUqF1Q3z8fDd973kpFVA30iCyUIE9Zlikxc1kq0Ry4vDvv%2FxNoK8Y%2BRu0j6HCKW5998ZtLxCsNgzutg4hKd5qDRT5lYOGBcR3cAVgRd2S4YM8eYu2jd7%2BpxM7Yl5pdUiMt32CVlmWhhBMlRdqPoemP6NMsJwcAAkkCZHP1D33y63A%2FylhQcKmIqueG4BYMdPkwglQCKm1PWSA9f5YbZYToEL2srgjIOvf2xRWZtzj3kMYnCfVtrTnYuosOolTyxljp%2BOkN9W9kbDcoaePc3mQwSufX5Ty4DWwe2Bn10op%2F3FTQ0nqhENcR%2FVxS3Xhx6TEs4robvxILaAulrqdUQbqXR6apxUIsU7XsPHU8e7DnW86xbi34zDKfKL1lP4wsM2qzQY6pgGao4NfqFpcxCpUeAU%2B%2FvQs2ghzGUqLVPEuVfQlbnhrtTvL7wnKNlrVfNStUNiIzk%2BO3jeckmFjTrY4hj%2FUwGadf2kHiVQobJsM2FLIjH5LGH%2Fg%2F5WU0A0mUfHOfbSG8ZkYs0v7frOjOD2qYkcjGuHwa%2FLHMd114CkfGW%2FKkQ%2FBfNszKOE93CycX7UKHnKxnamScEdW4JOhbNJgUfJIgu9FkBgX7xZT&X-Amz-Signature=9eae689aa719fa926530b018f2cf57cc7890e12f3e0ffede301159cf3483312e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGTZHNZQ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIAWl3nONXm%2BaQAPGfr9QrwHTDU0d5p4boCY5wiANePi%2FAiB1gPgXnYkCCi4Nw%2FlNXZtnyfZYp9KsrUsq1vV9%2FEMmbiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM38B2%2Fdv5BtZhVZHwKtwDolQE6BetBur9AcgGd7a0Z2%2FyAZ5oYTBkGTNKdOQesVHX%2F9YvgnThN6s9eD4wrRPfH0i71SxFfbWReopsyLi6XlOQbJepgYJWeS7WJvo58hr1ukhenJOImJFENWRDC9IwlszTmAO2MCH7DLwsoN5eYhi1YGfrUJ1RkhQoaq7OhUHPMDe1i%2Fmv9XFep9I4ownGxWbA36NfLlSRC1ohts0CZayM2H8ToYxHVOIk6sh8IXvziotv1A8jtloXrNSACZxkUqF1Q3z8fDd973kpFVA30iCyUIE9Zlikxc1kq0Ry4vDvv%2FxNoK8Y%2BRu0j6HCKW5998ZtLxCsNgzutg4hKd5qDRT5lYOGBcR3cAVgRd2S4YM8eYu2jd7%2BpxM7Yl5pdUiMt32CVlmWhhBMlRdqPoemP6NMsJwcAAkkCZHP1D33y63A%2FylhQcKmIqueG4BYMdPkwglQCKm1PWSA9f5YbZYToEL2srgjIOvf2xRWZtzj3kMYnCfVtrTnYuosOolTyxljp%2BOkN9W9kbDcoaePc3mQwSufX5Ty4DWwe2Bn10op%2F3FTQ0nqhENcR%2FVxS3Xhx6TEs4robvxILaAulrqdUQbqXR6apxUIsU7XsPHU8e7DnW86xbi34zDKfKL1lP4wsM2qzQY6pgGao4NfqFpcxCpUeAU%2B%2FvQs2ghzGUqLVPEuVfQlbnhrtTvL7wnKNlrVfNStUNiIzk%2BO3jeckmFjTrY4hj%2FUwGadf2kHiVQobJsM2FLIjH5LGH%2Fg%2F5WU0A0mUfHOfbSG8ZkYs0v7frOjOD2qYkcjGuHwa%2FLHMd114CkfGW%2FKkQ%2FBfNszKOE93CycX7UKHnKxnamScEdW4JOhbNJgUfJIgu9FkBgX7xZT&X-Amz-Signature=45ef087a848a059f1a3d38327e693b82d82af3afb9b82c0762474eb5a44172fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTTWS5GH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIG9BirBlpqqj8MtexxfaELK0uRjooil6LPJ1fGzUSawMAiEA2SJRHj7vBj7lKSD8ChLOur33mDh%2BUzZpvne3syy%2BYggqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDMqGO0fcQVPQWB%2B%2ByrcA6Xmr5Sve4wN0cHmde4zOivMF1GlsMobpTYyMl7bBlNwdN0UAj%2BISN7RQn2cbPRSvfAKt%2FF0EpBLeJuUfVc%2BV7%2B%2BH67fa%2B8VsJI6dUB%2BK%2BnhqrDfbzf6Wtsl2Ia%2FL%2FIZUwAmv7AbwL9XHErIY7hY8jJC%2FtV%2BDUdYbm%2BbzTx2%2FcTJkPp3T5EaejWx7LfqRKqOsAq%2FhR1AesybibjKZ4e5Kd2An%2BSzlcBK2DEfHP%2FklL4vDaWFo9oQHmxG1vOOgGRfTwl%2FsRjKX6tlW%2BkSu9ecjN7FdNP8QJoH%2BqvEJ8ok%2BGDd47lzEIxDcpTNiSMyke0mZR4ou9nFrCcg868pvO7ySy0XeKDhji1nDaely7ofRVwOLS9XVqRjaEv4f%2FdPcsbLiedmAhDPCjMdrx5zxABMYzGylBGXANRbg6US4lnybxYI35De3oizdOS5kAiKtwTm%2FbVwX3vax4dxlNhhDya4Xmcg6wkqqznvsKd%2BMhmbpG6vLuMsfDD7izI0ZtB9tEqSCnSVLOu90XPvdp6gR9OWNd7lNkyJUA8b%2BX9EkLeTJ%2BKl1xsnGTDiRkIgiVuiOrGSv%2FhaHo5c3HXyBw%2FtVaClRSNnr3WNAYtbvtzTWePcFJnjWfyp0JvZmXtRkypRMOHNqs0GOqUB2gcKDOjDS1T6oyH471okAmGEymml92%2BR8s3b4061e9m9Wx2uWv9bU51nPlZo1uxCOohl043Y%2BHFQIAIjMI26CIn9ZSd13S7V1qpgx6E3lO8lFeHpFW4yT71wXSSdAsF3YbpMpDu4ZVrpwfFNs1rDvWUKpAV%2BHtHY3Qafd0RrZTM40GG1Zx4RpgD5WWYujm1TGJMqZAjle1GRh9K4op6gDMSvP%2F9C&X-Amz-Signature=d5ab6c2b882d5d0f759fc7ff9768cd9cf9a558e0b72994b788a769e2b7f9d232&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGQBJE6C%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIF4GqTv4%2BNxGBYMfglpP1mSnN9gQGTtWgFiPyfWRG2VcAiEAr3STYZnVDfJBKBsJnFom%2FoUPJ52Z75HqYkb9jfPTMiMqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKE2XpmLtyZSugSt3CrcA7JkdMtZnDdrJogPsr1A9XNntAOhMtiWsu8yuKK2KY9pu8Q0Q%2BAuhxRhfZZjBjPJej5pReY5RFhBfqQypLvQj9ipKd%2FMJ%2B3vescwIyL3a4HgHLUtk1VLbLWi7JRC7ZAlUjdykDuunz9dFimT%2FQDXbVIQIfwr5uvc%2F7ucdjNEic3Sy9kQ6Cz0cL7kt3O0XjjRL6xBo5YjpiCtLjsRT0PlTWSX0Jbpd5MB%2BCL5WvSIEUa4JZR46pyvPNFdMHBkmpUfbXdvjMvYMPrWsF64tS74cnzjFJrTcWWY3YM5%2Fs11EyTqjDByvcCXmghYkY5LkdndtEN2%2FwX0bV51le2mGfdrLswI1qnU30ZnU9vxT9AsAfS7kjCY9rc0EVed%2BGBibwEIV8jSc4vyoEVIhJH5ZPpYdlo%2BnoHOXlPPYoK4mVfgRDYHGr8L2nYIOd4w%2B0c6JHEfEx3kOd3Rc7m4zUoxMXb4G2jJtTxSJqNs0zAU%2FZYk%2B%2B6f0BiJfagrxkGo604CYklAX5sZDv%2Bj%2F6DxYDTCda3AVf4hnnZlyyz8P7jKlWdWPgmiVVZ%2FNO0%2F6l8hacW544%2FHyAiCzKYDYPDsAF5HRW%2FRzcB5E%2FgTxWw%2BYgBhik4IZ7oMfdziVbJcvkgVXwqWMNTNqs0GOqUBGjLZfNEDBe%2BUiuzMlR4K3tlWwPgUj%2BHAH%2F7Rzmp5HD9yYfSb7SUN5OdslZkVv2%2BTpvar9UNgcDreTUoRgiA2zr401lPpvyxZF1IlmzjELd6yteRCFzWg12ePhkNwQ0Oy4JNtxcEIMnArIhq5L3fSEgiQuskxKuu0EEQ9wnqRiT6EMHXP%2Bbhkov8GZkkPgVKiHJUQWYbwUWtb0EoVRi4bCdUuwKLk&X-Amz-Signature=860f5fa2a6ead4441a2dcf64546056cebf7acbd498b021da4952d2b2e99ce069&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZJ7YDTZ%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102133Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIEAuhjgZaM5%2Be5ll95rJUDtUoEOQvm91pd3lyzGX38YlAiEAqyBBRxIus2ONsvheuK8%2BauAVUTOAKtH3CQAbrsnU6NMqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2BcCzctsqORut2QAircA8cbxpueCH7TeMtOJ%2BxNL%2FP18JwVRll8N6oFATY%2FBaUYj1undccFRYmekgqI8iFIxOK4NvJEe0Slll4dX9t1gmtJ2sDT51zD0QuozCBRCmrerW0Ld66cjzWRu%2FQgU5pAioUdY9bZo47AiytgTQdj%2Bv5tRi5cXruE%2BmWjXbQbDzeDrqFgNnn9jcjB%2BVR48JQyt6kXMBIVqSnGO8ap3iwZ%2BI3VEtCl3bIdnhSvnLQB8ZuptdwBmWczbm9GHOIOo%2Beobutq7HTGKNRTEJovZgiAslR5HQY%2B9qRzes5IIOK3CG62gE%2Bugs45UPwlI%2B79J97C6Ghwfkqqb%2BlZrxf3sMPKVLEOIcbSi%2BxOIgCoHXqW8sXK6%2FSnbvgvi3tn176XwwjCgVLexsfiGjIeiAwZAjSfgQ1MhC9zAt9zzN9YlKA3s73SOlUuHbU7SA56uh6hhB6qV%2FM4u7SvWmnfYWTPDcfFTzMdRu3t589XqGgbKGPEGiuYYrzVgia5SVFv4jlwBCG63mBZcTfm1o2N8vHsk47EOs2ifdWYAwoY3lspmQi0h6Ghqt2cpVJLMDiRiiMYOueZqQZBBQ3wwv%2B%2F3MAfWhLn71ktYpq6kqOXH%2FyuaS8yxD0n%2FPyHcf8S%2BjsbnWD%2BMJ7Oqs0GOqUBBF1k%2FhZxoL6w%2B61eIGQTZBnXwA%2FeCdVEFanEDHlM4eBlJzz5s9F6rmSdY9L8u0KP1l6srTOuKtKvfF2uz%2BaZCH7%2BW063xACAVG8lElSY2rfxLkZBdXm0owtQobGWvbdTUOKvi2fcOmFwxVSF1fFn%2BqxJKRVRyHSALwCm39lDiBNzouDdEW1vxzxhL5rq%2FApxbCbSihEOzCM5K7JwNaapvOeGXaKh&X-Amz-Signature=167d74a13420760bf929e15a14e3c08cc34a3c68f089c19cc34e307f022108b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635YIJKNT%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQDcZyOqrYlh8OHX7tV7f7%2BjVDX9j5MhqxZ2HEoFJvHJbAIhAJF%2FLhwDnBv%2BE%2Ba%2BFsw0fnFL8d7jOvsxJk37sDgtIHEfKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyI6Pdpm%2BjTQjFISJAq3AM3luqOCn4AUVPXqKZfTNdlf7hFD8F7%2FTeva%2B8uFngOR3QSaFyGqmjl%2BaqzKEgDmdOVzgJNrbxR7oAUt4FXNsoEnrEgmVsiGJ1WAa742noj1xQH%2FiHEFaXAcAcykkms5d2%2BhJ5lGlLNUEyXaln7w6PvOlV0Gf8Hgguiwc%2FklTI7YfizXP9%2FzmRG5bR0YMKKNyzlWnZyF%2Fi9O%2FMH1aOOCF2JfD7hfAWGx8pupJcHzHzQxlyUHD9oEpbG7a9D6SNPFURUloSp%2F8pP%2BYWhgM8cq2bQSfkdjQN8F3EL0tbbv06EwnXwRf1nBI3ye3kNJ%2BLA%2FVgm1t%2FJE7ceFOU7xoRICk8cchKYyQ%2B%2FZAQO2ekGExL%2B0qAe8eqSUqLzm8q4JcfXyG54pq4K1o91dVBeo9xD8FB%2BwLZUYabX5nhJOfj5INzAMcdmg5gLL9cvctx4ndT9AAYSzSLSogA1sl8HWEvs%2Fo0uFVYLj%2F%2Bg0KpoEAKQ7Ys3qHoZ6KkRY0vw5MNUJnVD2bpzw4fKaIzqZoZ20D5RJw7D%2BZEJVicLZV860W2n5SoYnuNmGoAKNpvCjZ2elszh5eUVBI3BAxYLJOlDArtaKtYESOj3adX73yVKLMZ%2FG%2FWhKHCSL1cjQqKQtyGkdDCLzarNBjqkAcVTXBKKVYdCMDmmc4PM4dTYiEF155TdnepeEakCl4ZRhsioZ8%2BSIpspb%2FX233ddLgRtXJdqt5GI2yFZaKhLeIcJbq8U2mfX0um2dY9rEnX9off6mryhnM1iWANH23AQo8AVoCLEhjS4pmc8aJasMuRsB54ojm8dVrcZ7JlTLCHmv3a6y96WgfCV4uObnkq1%2BDGDWTy3xxDActE%2BR2G6I8i19wxm&X-Amz-Signature=d3e1bb87e69ff29221ad486fdefee1ea4e707986deb290f5457ac4df179ddd3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635YIJKNT%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102139Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQDcZyOqrYlh8OHX7tV7f7%2BjVDX9j5MhqxZ2HEoFJvHJbAIhAJF%2FLhwDnBv%2BE%2Ba%2BFsw0fnFL8d7jOvsxJk37sDgtIHEfKogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyI6Pdpm%2BjTQjFISJAq3AM3luqOCn4AUVPXqKZfTNdlf7hFD8F7%2FTeva%2B8uFngOR3QSaFyGqmjl%2BaqzKEgDmdOVzgJNrbxR7oAUt4FXNsoEnrEgmVsiGJ1WAa742noj1xQH%2FiHEFaXAcAcykkms5d2%2BhJ5lGlLNUEyXaln7w6PvOlV0Gf8Hgguiwc%2FklTI7YfizXP9%2FzmRG5bR0YMKKNyzlWnZyF%2Fi9O%2FMH1aOOCF2JfD7hfAWGx8pupJcHzHzQxlyUHD9oEpbG7a9D6SNPFURUloSp%2F8pP%2BYWhgM8cq2bQSfkdjQN8F3EL0tbbv06EwnXwRf1nBI3ye3kNJ%2BLA%2FVgm1t%2FJE7ceFOU7xoRICk8cchKYyQ%2B%2FZAQO2ekGExL%2B0qAe8eqSUqLzm8q4JcfXyG54pq4K1o91dVBeo9xD8FB%2BwLZUYabX5nhJOfj5INzAMcdmg5gLL9cvctx4ndT9AAYSzSLSogA1sl8HWEvs%2Fo0uFVYLj%2F%2Bg0KpoEAKQ7Ys3qHoZ6KkRY0vw5MNUJnVD2bpzw4fKaIzqZoZ20D5RJw7D%2BZEJVicLZV860W2n5SoYnuNmGoAKNpvCjZ2elszh5eUVBI3BAxYLJOlDArtaKtYESOj3adX73yVKLMZ%2FG%2FWhKHCSL1cjQqKQtyGkdDCLzarNBjqkAcVTXBKKVYdCMDmmc4PM4dTYiEF155TdnepeEakCl4ZRhsioZ8%2BSIpspb%2FX233ddLgRtXJdqt5GI2yFZaKhLeIcJbq8U2mfX0um2dY9rEnX9off6mryhnM1iWANH23AQo8AVoCLEhjS4pmc8aJasMuRsB54ojm8dVrcZ7JlTLCHmv3a6y96WgfCV4uObnkq1%2BDGDWTy3xxDActE%2BR2G6I8i19wxm&X-Amz-Signature=9f453ae363476f6baad86888da6ee5298e48209f68f17dfd224cb5d68b7cbc19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RAZ2IWA%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJIMEYCIQDNjbODkUpUBaaG3kUArfpTvaAjCUghaqkIdzSw3bdKugIhANNMGOL2zS408RKznKumuP427rGk4oZf7GzeAlLwR9i1KogECOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwncgt1ASDI9hpLnKAq3AOJyJQrrZDgaIb5F9lxtjUHs9gjv4Y3elnI4lSMmbT26%2BGvW84GR0aWLJAyJl%2BLuE%2BmpYAX8UD4xZ4rpWgSe0aHC3DvFsJfpm%2Bs5Smu9YwJNkx1M%2BSFkLh3Hc%2FssIvZQO3U%2BSc4raIXDKtWc4r8SFWUDorP%2BshEWoTeeLRRlO2%2BiOG5ly7Iy0ehgEWs4m4PzzzsDUfhW3HiBuI5Hr1N3na2%2BhQcJDZV7PylJrmm%2FBAuOClh8usgEnW3MJwPj95vmSFp0SvS4KR75NfqxGt5eQEZG6NzmU9qWdeP6HLXKjyiZRhnCaHvz95nvGhsxbbZJOBN2tmjuIZ45G2NLNIRj1V1Qed0lmEo9xqnSdwwqBuydcb3OzP1xeZxzODEE%2BS4YgsY0Fou%2FTp5dsQTJgnRUeJXGbFwnMOhvPQTQ0ipqHz%2FBGtgKKoR%2FwluHwJJAq0K4LZjQt4fVSsc569KQFA8jUsreXM6CtbQCqAEbri1vJzIv9uz2NcnASh7hvKroQKZ7MwXaCmBSM4NvjA6VOFSrvx6YnNSo8OlSREfW3cIposatHBQOvwD2dwd8ilS6fqahwbOLLQNGhgCKnSr7UYfGCDGHplUAhM4eUBy50WkkLWz0v1HcMv06XqgHnIklDDLzarNBjqkAbc9%2B1c%2Bdm3gq8k%2FAEPMP2YMtVLJeY%2FaMDxGRcjzWxluWx0hkPSSTiYRBzNd43ZYZ8k6YESaZ0cM9DBaRm1COoiSRZsku2ly57pny91nU0nPPLUga%2F0BkqSB6LLjmyyvdF6cKT9NWw0Qf4svsf%2BszEzkd71olK6%2FPjlOlffvbynFbTVxWYU8Am8EmTph5bOv09B4ISQ6sFBQyX8NC7a7sMqqrfmv&X-Amz-Signature=3d956898069d2d8f3788da5df8e8d5f76332f0fc3a467ee7204bf4bec682df4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPSK2AJ6%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIHa3unm%2BIMvxTvnBP%2BmpRvsdw6R0JMzxqKJ6IZmo%2B0hTAiA3De8Tq8%2BI%2Fe7gzrdWPJFYp1FkucKtrko9djFRSIzJsiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9mPGButC3wi1G88hKtwDWuWKCa6qQZMnx9LHgl86V3rT62hCmWUSbJXwADHkuH%2Fqi6lloKq8ntXbVLzU%2Fw6NSxZFNgN9Jk6%2BqpINHqtQ%2BrYd5T6OW7JGUDcebEIzan28jWgHTVeFd26Ep%2BOI4Rw6%2F5kxzLJTtPsEhIXI%2FnQSrY%2BaM89JdthLapjPfnqLr34UKJJmpE4HgB1aWxIo1ZWsVXr8Ige09r8OmiSOPmSjElulTBQrhmM14mYWSYtPB7lw8oEinzxBYVmKss1TgeuzGQxH2ZlDGUYd%2FVzW109AATQjNJYbKAAtDUddBkeIDuLJotLGOZ5N8%2Bpa5JHqjIYRz4Hx1BVhsY899eQjkgoAYSYWFP3LbF%2FDM1Pc3BHM8bc4ku6Q6J3ufrqy4a9Dv3q25FyqRlYsH%2FtafBKBJ9IPDWSQZQvItjvS79STm97TQGXhhV9p6l1dPeuoB4s0K11jV6ybX%2FsAg9KOkoIspTOPoXBqy2Ep%2BmNE2AVPyaDqDatwvGNc73eAH%2BlwVaqNXsgLWwMu5agtepcvRnmbGWFiBtdinF08BZWZ3DIboKO0gXeQOjF86u3vHVW5GGfHhBz74RTF1Ym28Mt%2FBLEbcB6nZ8NHbZFa4vyjMqG4RLy5WVgyeu8GBV2tD7qSf2UwgM6qzQY6pgF20vwZlD6sDU7PQ7Mfv2uzfLRVxMn3d1g8eZSB2UNvqr6Hlw7MR0mjQVs49HuyPFNbZWx8ehpR0gr%2BzzlQ6676aD9X9wZMQrNJzTBq%2Bm4A4n%2FdIBjpaCLtYuWgHy0UZoilz3BhBrd9%2FCL3IxWvzeqQXI1Kg9zihm3VmOLeEp77mdGwThyZORoRuha3WVyYunSoW3%2FBKor8T8jxi7t96gf%2F4kh2eCGF&X-Amz-Signature=361f897b0d2ba9acce94b469c2e15145420612a6a48d8bc7c71f51e746e0953b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPSK2AJ6%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJGMEQCIHa3unm%2BIMvxTvnBP%2BmpRvsdw6R0JMzxqKJ6IZmo%2B0hTAiA3De8Tq8%2BI%2Fe7gzrdWPJFYp1FkucKtrko9djFRSIzJsiqIBAjj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9mPGButC3wi1G88hKtwDWuWKCa6qQZMnx9LHgl86V3rT62hCmWUSbJXwADHkuH%2Fqi6lloKq8ntXbVLzU%2Fw6NSxZFNgN9Jk6%2BqpINHqtQ%2BrYd5T6OW7JGUDcebEIzan28jWgHTVeFd26Ep%2BOI4Rw6%2F5kxzLJTtPsEhIXI%2FnQSrY%2BaM89JdthLapjPfnqLr34UKJJmpE4HgB1aWxIo1ZWsVXr8Ige09r8OmiSOPmSjElulTBQrhmM14mYWSYtPB7lw8oEinzxBYVmKss1TgeuzGQxH2ZlDGUYd%2FVzW109AATQjNJYbKAAtDUddBkeIDuLJotLGOZ5N8%2Bpa5JHqjIYRz4Hx1BVhsY899eQjkgoAYSYWFP3LbF%2FDM1Pc3BHM8bc4ku6Q6J3ufrqy4a9Dv3q25FyqRlYsH%2FtafBKBJ9IPDWSQZQvItjvS79STm97TQGXhhV9p6l1dPeuoB4s0K11jV6ybX%2FsAg9KOkoIspTOPoXBqy2Ep%2BmNE2AVPyaDqDatwvGNc73eAH%2BlwVaqNXsgLWwMu5agtepcvRnmbGWFiBtdinF08BZWZ3DIboKO0gXeQOjF86u3vHVW5GGfHhBz74RTF1Ym28Mt%2FBLEbcB6nZ8NHbZFa4vyjMqG4RLy5WVgyeu8GBV2tD7qSf2UwgM6qzQY6pgF20vwZlD6sDU7PQ7Mfv2uzfLRVxMn3d1g8eZSB2UNvqr6Hlw7MR0mjQVs49HuyPFNbZWx8ehpR0gr%2BzzlQ6676aD9X9wZMQrNJzTBq%2Bm4A4n%2FdIBjpaCLtYuWgHy0UZoilz3BhBrd9%2FCL3IxWvzeqQXI1Kg9zihm3VmOLeEp77mdGwThyZORoRuha3WVyYunSoW3%2FBKor8T8jxi7t96gf%2F4kh2eCGF&X-Amz-Signature=361f897b0d2ba9acce94b469c2e15145420612a6a48d8bc7c71f51e746e0953b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWLNN2PF%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T102141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBoaCXVzLXdlc3QtMiJHMEUCIQD1ZPOBu%2B4MgBmTatQqTFRVseas5SSu2XoxjoBBL7kcBgIgdFJERH5qbgrKrbFYKWNduqlFv%2BFyS7xYuVJZkZHdlGcqiAQI4%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOKjsq67hwBIL%2F3%2FJircA3tg1oI%2FGwv0eozjwBlFASETZ%2Bna273%2BH8T13uOJwI2GIrv9oyAMWLe14GXDOG2J9xY52aBG7V7bGE8E%2BAAxkBJpxTwRLE3AURADMSgTtU90lF1SQZTEypxy2EjP%2FQR%2BwvKW4Ckuw%2BfS75gUI6Uapu4zgVts4tMpTB4EfT6GUnr3x7T8XkMvVfZI2bUitkEjPEBkdeYb8XPJshOgS4ENIWxcfLgdZHchwVDi%2Fg%2BDmpqEFaqfULJIA03l4j2n5wmNkPzLOoFzdcldHsaYIKEic0BlGP3J1YjaOByNV5eQgdpX8LWQHM29JpeTha%2BA2ik5vr1nI4JuL%2Fmfav10GUm8ARl8QumDA3dOstFDoALknfY91DdZq8IETVI0xLcumH9UHlrn4Ipta%2F%2FUmhwmyYAxJg9XWYs7dPyRiUzwMadPQoOsjrh1ejaexTb1l3g0Fc5hoaaHBrGSfVBJf4KFUUzpzlldc%2Bn5K3Y52cWSWzCm1DrWp5kGdkk0yORPFIUzqr8h3Lm061S%2FQar%2FCPXdNhwYA1nXZzBAKNcyUDmo8SsrypxhgZSkRVCz%2BE3WlGSX1X6C2W0sY86Lr4XqGnTtnK3rEPr4cH8g80LsdBWbcmtL2LOsR%2B5Tylw0eVBYyPOKMOzNqs0GOqUB8KlpKAAijiQfhHLnn5TX0k5MxLSPX9pxHJ4AgmP5wDpyf32KybRIJe2lV%2F7P95Xwh8nbmMS8B9Tci5OG%2FU0oR3tavk8TbSQOUGZ6D4OPrG9lvQ1atbBulMD4H5BmX0xMcj5c0qAi9gvR%2BKXArMJmXOi80%2BYR%2Big7Cq3Kjs3ZBZxSaLzZJ17gLyYYygiO5YGGmXU9DscAUszdFQggW6XWFA5RMu3x&X-Amz-Signature=87853484025ff483506c6029980a8643706fdbc16f4370bd33afbba6f234e6d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

