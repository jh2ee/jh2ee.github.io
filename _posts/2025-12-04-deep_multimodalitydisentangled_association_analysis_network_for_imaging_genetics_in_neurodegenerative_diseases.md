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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRA6U3B6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIDNKUF9dZFqPTvn58JEk0ACKny8gODfQmsi6fCst6oRMAiEAwiVQ1XKTUb1wyPX9WXpZhebIqd7pXNG61eReQhBehiUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJBjFxMAfDBE1p9bhircAyJtMzMTt4JYZE23ZKB2jlrFX9c2AJPEHUIQUa9xTe031qjhJnzNCp9UiSol9kdd63%2FzDZizQJS8Bt4Bacu2%2F2GZ4gDqRxGU5KmBnS7fuf3ukO2%2FgRuUR7EHnYFE2bQ9h3x8Vka1VP08fFOmcu4bcCpMg009ne0DgvHV%2FL3d53TLp0uTlg6%2BfbOCNiFW1ZIzwEW%2B5k512GCiBImO9DS8oaBLHKtu1V5F28oatrsp8J0owPoxMuPhH9znx0EuvxydiEgb6oQNqVUPirYc3VUKztBtXbV5daRUzO0QT9F2XQuGq2UkjKKY8pEjO2PC4pZDefdLk4klpsie15bibtnYiKP6WvWfb6f%2FyVgJ9IQEvjIMgLlKA404xqUXuV0iR8KXeuvWDk49LoLlnaMsDAIXBP%2F%2FaPOUX7nAVBaMi89xfRL0swzSipXbiOGFKGbdvDl2eOiLlbGnJyYcPzw15V2mt0TFeORsSOxg%2B7YtBTHH64R5kDl1wseE725oYTV%2F4hoX6lclk075OqFnFQ91a%2BErsCkvwHWiEH9O7AxWVJcIczSf8sc75EHml5z9tOglonQAe34XyWfG8wGCknb37RUtRo%2FNVcQexNbps8f0ZyRWW7G3M46XNvY5VtVXY0AGMLPh8c0GOqUB8fTumuSuHXzJe78EziPhU154ltBIJ7Hj%2B%2BI31m5559I1xn8rpR6LLBl7UGXZGrqiW8bk8MFYbkCwd9iYGHV1%2FQKPkNmcvYTTxfPuUakcFrFHhtgSRCV2bHpkYlSPgVea6etyHaWrtTki%2FwTzEbcHmaxcxkBxzO%2B51Q79FumtcJrnJQFTE1qmjPJoJ47pbzw7lT7VXA9ENU9VnU4N5XzoBM0DjAjq&X-Amz-Signature=37eb80d706e959c6b010ab1f9134d58e6388897df1ca811383b273a786178243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRA6U3B6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIDNKUF9dZFqPTvn58JEk0ACKny8gODfQmsi6fCst6oRMAiEAwiVQ1XKTUb1wyPX9WXpZhebIqd7pXNG61eReQhBehiUq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJBjFxMAfDBE1p9bhircAyJtMzMTt4JYZE23ZKB2jlrFX9c2AJPEHUIQUa9xTe031qjhJnzNCp9UiSol9kdd63%2FzDZizQJS8Bt4Bacu2%2F2GZ4gDqRxGU5KmBnS7fuf3ukO2%2FgRuUR7EHnYFE2bQ9h3x8Vka1VP08fFOmcu4bcCpMg009ne0DgvHV%2FL3d53TLp0uTlg6%2BfbOCNiFW1ZIzwEW%2B5k512GCiBImO9DS8oaBLHKtu1V5F28oatrsp8J0owPoxMuPhH9znx0EuvxydiEgb6oQNqVUPirYc3VUKztBtXbV5daRUzO0QT9F2XQuGq2UkjKKY8pEjO2PC4pZDefdLk4klpsie15bibtnYiKP6WvWfb6f%2FyVgJ9IQEvjIMgLlKA404xqUXuV0iR8KXeuvWDk49LoLlnaMsDAIXBP%2F%2FaPOUX7nAVBaMi89xfRL0swzSipXbiOGFKGbdvDl2eOiLlbGnJyYcPzw15V2mt0TFeORsSOxg%2B7YtBTHH64R5kDl1wseE725oYTV%2F4hoX6lclk075OqFnFQ91a%2BErsCkvwHWiEH9O7AxWVJcIczSf8sc75EHml5z9tOglonQAe34XyWfG8wGCknb37RUtRo%2FNVcQexNbps8f0ZyRWW7G3M46XNvY5VtVXY0AGMLPh8c0GOqUB8fTumuSuHXzJe78EziPhU154ltBIJ7Hj%2B%2BI31m5559I1xn8rpR6LLBl7UGXZGrqiW8bk8MFYbkCwd9iYGHV1%2FQKPkNmcvYTTxfPuUakcFrFHhtgSRCV2bHpkYlSPgVea6etyHaWrtTki%2FwTzEbcHmaxcxkBxzO%2B51Q79FumtcJrnJQFTE1qmjPJoJ47pbzw7lT7VXA9ENU9VnU4N5XzoBM0DjAjq&X-Amz-Signature=37eb80d706e959c6b010ab1f9134d58e6388897df1ca811383b273a786178243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3YTQV4Q%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQD9E5YWtHRWYneojga%2FY6kQgHqwYRkyZtfUCTnhikZsuAIgD9Gindz8GLNnqZT1U2nTes8J5o1Wuwe0KO7vzEfGWf8q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDEwWZFsXUIC8ytSvYCrcA1XPq9bEJ%2Fp2acjj3Kwle9dgxoHZ14TrEuW307nLhT1e7D1U5M8DAyqum8k1F%2F%2B3J%2BgrIVXWRMubDVeMOIc%2FOFtEpYfAmM8qDD0KWEZxzjlHlHUVkOA4RywfiI%2F7YSjMzSfOksI8oxbVQ6MBdqW3pONqIxWUX37MEUPIOCMM9S9NmqyLrljm7DSnbzhDMEApkksi%2B2SjJzUBrS5EijlKqEN2yqWM7NYx55NeyrALEx2dJEs9fHrYM5YswRibzqbndMMfv0kQto2TWfYdGhtWmsSAssmmVoT0Kp%2FIjv1pCHo%2BMjpJGdiCioTk4UUNqEDnLBwF4VGdX4YVBqKrNLC1DqxDOp2dvikdC0X9CGdbn2W4plRzo3aUn%2BhSZBSojWodK8DALAgsfPdHKT4oLy6UTxIdqmUHvMgXMKPtOiY71DO827MMpBog%2FOCOHGoLZ2lVQ%2BIZ%2BOdpR5TUAhv%2Bq0%2F4jiNhDgUbPyXqsQ2bVvXg8MN3wnRqVhIWu81Bk33YWscPzaXAdc3AcUsruDkpDfzrTSwz1Qv%2BZvbxE3v9TJ3zegX73LFIzIyH3%2BjpDtMcUAa4K4eo6%2BD3KFyVsQdpyahMf6qhuLAZau5BO6Y8YK7KQpmm1kYXHRhURkttodnpMO3h8c0GOqUB%2BchPmXfUei9N7cBOMQOKGYtfN2P%2F%2Beg%2BbpmkaCgWAP2njUA8uGPOa0xgc9OfHvt28QVsFOrsVopYUFzChWycyUyIFwwFkZ1wBwCUAvVUxXgQvouj5x%2FIYTpnB7YOLcvdQWzSuiGb%2BFSFS%2Bm%2B4tR5ivovz3F9zixbj4xtivWL48L0Yd1XVMHzPPrPBfVnH2xgrbmT%2BQW30mmerG4YLF3Pwfv%2FrQ5%2F&X-Amz-Signature=c194cb21acecf406c9d3b7339f9f8333b1c91cd3b32241e184b24ebe3cdfc211&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RC2FNQC6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIAcNwWnWdm5KuuDOcf%2BAKpvR0u%2BSM8jix9xi%2B7lBPbjYAiEA6tXlvKf0nvn%2FnWhxszQGTEjS54gut%2Bka5ScZappbm5sq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJmqM%2B29jV%2F%2Bo86KWyrcAwpaNkJjz2M6EIW4iolw73h1%2FezRHQ2x7Y0FsvPT0EbBNJqD4Gp80nwX2%2BeVgr%2BtAslWl4oBFoHPgshVP6n6twLfIZR6FpYB%2F0lyMh7pWO1PRmqsts9zUBHw3B6Y750rYgzrGcmJJZvp9aHHxpl6Oa7PlMGhUf709QTQWzcYPMIsW6XhM%2Bw1S%2BHp9u1%2F0i2eNeE6J9F8yt5Xl9h2xAJBiqkrIulTIiIvXzWVsIZ0hCfCkF8fJDyInAf0YVP7YWfiIBHr7BTt%2BvV0etSk1n0AQcHe%2FT1aY6scCYk2ZhP4t%2BbljB9rCjK42JKLGtGpx3lOylPbu4nMUm9ioiZg8JzsqRJtng4Juoz%2BHVQCyhtZPP3%2BbZAvB6LxT4lHQ8Vfb9mEoHq6w%2FKj%2F84lwY6tU4PgUKWfbcxpeAoIQ4o2IAGLc2N3TLw2zwatRXoQ2qBcKId%2B1aDC29B4oOWBm4h7kFadjon9XK%2B62UUgL7Ip1Mu4evjcD0TJMHfYx%2BWcyAoYrQIqYrhe36nE9pZ61eW2emStkI%2BaP8weyb0BxIaEdl3eBwXapPLFcjyM3htuBtmPdKieGHmDBc0qnyxG7o73jtBbW7v8HgNNR9w3Obef0lMCmupvIhO6FEsLJvPDSt58MOXi8c0GOqUBd1obujbmTmbWlE6cIlO6rlgkogEL1jKecceuB4YIgwYppqa%2F42I6CFI2dOpGd7a3OHRIA1DtZAg6ZLBRt5ShXO3SBGg7%2FdF6Kq1zmY2YHH8%2F3PURSRjSnK7ZC9J1R%2ByUks4ZE2ERizG5WMc1SYILnWGXiasVaD6%2BBR6XbD0H1tIrKymXMKWrOi1OvtlWnURW0SfTiwDF1AVNx1JrS0NKdy%2BSrVzq&X-Amz-Signature=e5bff97d73d67a7a3e4fd476e77eedfdc6c27e39deaddb84703a7d7d58324eab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RC2FNQC6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIAcNwWnWdm5KuuDOcf%2BAKpvR0u%2BSM8jix9xi%2B7lBPbjYAiEA6tXlvKf0nvn%2FnWhxszQGTEjS54gut%2Bka5ScZappbm5sq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDJmqM%2B29jV%2F%2Bo86KWyrcAwpaNkJjz2M6EIW4iolw73h1%2FezRHQ2x7Y0FsvPT0EbBNJqD4Gp80nwX2%2BeVgr%2BtAslWl4oBFoHPgshVP6n6twLfIZR6FpYB%2F0lyMh7pWO1PRmqsts9zUBHw3B6Y750rYgzrGcmJJZvp9aHHxpl6Oa7PlMGhUf709QTQWzcYPMIsW6XhM%2Bw1S%2BHp9u1%2F0i2eNeE6J9F8yt5Xl9h2xAJBiqkrIulTIiIvXzWVsIZ0hCfCkF8fJDyInAf0YVP7YWfiIBHr7BTt%2BvV0etSk1n0AQcHe%2FT1aY6scCYk2ZhP4t%2BbljB9rCjK42JKLGtGpx3lOylPbu4nMUm9ioiZg8JzsqRJtng4Juoz%2BHVQCyhtZPP3%2BbZAvB6LxT4lHQ8Vfb9mEoHq6w%2FKj%2F84lwY6tU4PgUKWfbcxpeAoIQ4o2IAGLc2N3TLw2zwatRXoQ2qBcKId%2B1aDC29B4oOWBm4h7kFadjon9XK%2B62UUgL7Ip1Mu4evjcD0TJMHfYx%2BWcyAoYrQIqYrhe36nE9pZ61eW2emStkI%2BaP8weyb0BxIaEdl3eBwXapPLFcjyM3htuBtmPdKieGHmDBc0qnyxG7o73jtBbW7v8HgNNR9w3Obef0lMCmupvIhO6FEsLJvPDSt58MOXi8c0GOqUBd1obujbmTmbWlE6cIlO6rlgkogEL1jKecceuB4YIgwYppqa%2F42I6CFI2dOpGd7a3OHRIA1DtZAg6ZLBRt5ShXO3SBGg7%2FdF6Kq1zmY2YHH8%2F3PURSRjSnK7ZC9J1R%2ByUks4ZE2ERizG5WMc1SYILnWGXiasVaD6%2BBR6XbD0H1tIrKymXMKWrOi1OvtlWnURW0SfTiwDF1AVNx1JrS0NKdy%2BSrVzq&X-Amz-Signature=2bec0abe60e31de5d6448434bf5ecd7ca7e6b119720cce9c481d807763c77a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SONAIPGR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIFYeHwwcZ7yZ1oO8efFz0Xs1dqHyYPQdPqFfKxP37TRFAiEA7tjR2mdjkIOvdaBGxCKr2cS3oWCvvkSz2jtgYNXLMhAq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDPHTPzyljzjbeYbujSrcAw0BoojlHAjmH1X9nG1a28sjRzKDDBo7xPSRQTFIpNwUSQMYsQ6idI0OTtYp7x91AjDEelmxG%2FSX2wIXGnn%2FMwny02ps%2F8lYEKNES3QSTaXopi0YkK7Uaoxw%2Bl9nseLaeTffQHWHky9pnuJCeyMkZ8GjJVACZ5zwnR7rM7aq8okjV4Sm%2FYj9lTK0Te4OPPSJv2y3%2Bmc6AsCFLdEQ5qR%2FtRO57qEDWrHoBP8avvuRlPLrrhw8y%2Bnig3jwu3CDBKNVgptgdCWwUkpKUTXreqV4H5C%2Bu13dVmsdBsQq5rlYgpAxZplkUhyKh5fgKK2dsp7%2Bbvf22M7tHrDC1Ui2U07xIrbir50V3OsWw6WIUYzvaIw7bdrHQ3g8v4OPrJ2njiyBlQnX50%2F2J8nxTuTFLqzcVkdBxAyBTQMjHcYQKRrT6m4RnZsWfmmkhZauGSHg8nzfFWKx5fW56vlbHhvZwKOWepl8nJFQIFu4yhdHJWkSzh0GYRU3hKXE62x88hERFTnn%2BSXXYSfyAK1Jq6LE3flkV4C9PlzV%2BD6WVF0rtqub%2FwHFbNqpKNUdjfQGY8gyDdvks8BopfvPmWHfm5IqOHhO0gucIJqkVWD%2Bfbk%2Fxs9XC0r7gUmdDnrehkKQ83sLMPDg8c0GOqUBx3CYZ1o2%2FNCvPF3AFnMEXLwa0kO6Y6oOEz6k%2Bn0FoLZ%2BkE701DKpulY4e7ROVLg9JliTsy5mSLaqoAna0bhIxpOP5%2F%2BPB9YZuiaPDwQNvbDG6wYAz1edh4FMbmhSU%2FYX%2FQh5Zj%2F4dy5QOgibHV6gCCcG3J6NaYvwXnXyy6akGDBmMImm08ujrFIrC4ZcXveX1J5FASJUavkJbDFGGiyyMCSnW5gm&X-Amz-Signature=d9dee06ba05874a32b0790bad52dc27def154ecf74aac29b129ffd3a4a30a7bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5TDBWJ4%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCYUUvcOShN%2BJIdjUxlKEZc9xKuQhTIO%2FdWVB%2BsBuBE7wIhAJLct56V7MnqrQWFzR9ciJ7yjdZuuDsYqpBjE9JNxtsOKv8DCCcQABoMNjM3NDIzMTgzODA1IgyUWli5mFOzC1%2F0qTgq3APpRL8DiNhp7zvCVGdnl9IDgKbBbFfUqUvnJ%2FBGSSyG9mQx%2B3TdtV8XbtohL18AJFVkKrqlba679jU3M087zanmkQaBiD4MGe1QpBX8om8Aul3kiFMGPiJMS1BdW1OPf9nsMNNms83y3bfWLMJwHfG6eHY5DSeazgLJJpHkEbKvYhmG6EuXzfknr7o%2Buxo%2Btm7TvocXAZTd58zEWpxVheXGm7Vj5WwyPPdxPOFQtCx5tGXEL28VIeLyaRfEErsNCiyAVjXsDxId8VEN0bL59V6BeKhkoUs5yYwokmRFLlOx0oOl%2BbKodxi9vWGWk0xbsmVCYCatAa07zD0cOK3ff3eQBcXe8zMRz3aqT4Q7SfKDgnnej6im3CX%2BZoQCRqjH7Om023UYVnkrX0b0F8CeKQ0hCkPYSNL%2Fzpuq90lh07kNZMRXS3auUIZ8UOJ38xyOvCbxS0nte1Wuio4aubs7OHKUsg4mtMz%2BkxosS8IJHbZiedP7qWZDqtkx93uzsvHuetgH%2F3alCkhHfBHhPoj9XeCK3KwlP9YiiwLh5Osm2NUy7yeMNhqC33NzLFqYrUleSabAvALqE6xI3LDdBOPPvAdMvHPw0onX8Aghsn3uLWXZ13eu6uhh1fAOzoaSDjCy4fHNBjqkAa1KSBz7lQy2Glj%2FA5d%2FOdRQN%2Fs2cm3Zl0e5VJHz9sZhjO78HoN1yklSgzU3BD0vhGjj9516Gw1sYUcWyVa87dtI0kYkZu%2FHU5ZQEIM4Vr%2BPDqugBrMuBNUGdLObMLSRGinIyi3osIKXQn%2F0ECdTNJB%2BH%2BCwn2cJ0pAUu99jaKllrWusqWB7AnIBleaBYefFBzlH1%2FaJOsdL22d8SwJwvDQBoymq&X-Amz-Signature=eb6bc09b58762fd2e4fbe23afbb6b92230fbe6a5ad31d8e9247f000922b9d6c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDFHDLCU%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCFt1nzpko8d3ZP0ZuMX6UvZM0DflwWmmxYn3a3umE05QIhAKyHDklXkJU%2B0PXm3no1Ip%2B%2Bb4HToQtEOED4nmufjqLCKv8DCCcQABoMNjM3NDIzMTgzODA1IgxgwfG4GIE7MJZY2xUq3AOF38Av4Xi3DE46AjFj9VxIMkgd3r41E4SbTtfFXnLIb7koYCItQvR6DX3Hy7pkDBOic%2FzkZutH09DzBVAa3lBN8Uy3XBxTLvvN2t66vGIdM28li2GHzYOR%2BsvbsIitFwRzkWel5CvVz2dj8SYVQ%2FWTmsLhQNskyXwkorDVY8V23a0ONBP2J00zrJlDlRpqq1PmWRrk4%2BfTXQpeSeT1tRmoCzZtSW7wB5KSF4Pmi2YKsVna51mtt37tPbbufvFe0KTKGzGHwjdiiqlTfiFa38z8MF79C3Wybk82oVf%2F5%2BZaDMm6m1E%2BRNBTJZA0S0pZcMQGvl31NloQSaHX6sd6zip60OjGFlEktwkkaDAwzkoSyh9gN%2FASmPVY9tZBIUBFnD6huo5lzIk7wUAreZAMW92sZDF4qDbAy%2BlDVz486xlqAmD6V2GA4BCKvt2RYKykqGEr5yTm4hKJX32fZIDgc9tZYMnmKTilbPeaUlLvxHDa4bevoqxR9twt64R0ZnWal%2BHpJbDEb2ydI%2B9NvXY6NKS99d6Xt5vR5YN8i%2BzLyhyNo3uY5ZgA%2BibqirGAoho92qEODNic4YNuFw45yYFrEsQ46W5Slxn5%2F8nbfp3%2F0KCyri63KlAVL4M3A2yAYDDs4fHNBjqkAUZyxf05DCX5VtyMnec1rNppe7I%2FpJheXnEh6mO677uCbxo0EOGb62ZuE%2FeyR3fizhn4qKXh0G2BPdqlj8OQLNHmus8s4nNNAE3aW1ZHGIMAhyN%2FRymJwKdLceENzjliyIcDZIo8TZc5K%2B0c%2BJ12JxL7fTushZfarFNduwqKmyIKSl%2BOpwvV%2BFmX%2BH4kWCAxJvZn2nlMFb%2FYeU4cRmOJizr9iCJ7&X-Amz-Signature=663c25674a3523803bddf6245c649f639a7eb68a49558d2a8aecf1035c21009a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZKTTZNZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDSg%2BedHilbeFvsWdheceRJ0ANeqBOY9N8kXKyofutJJgIhAJoeqdHisBYA7lcd08CuaOTzWeuWkyfmI907MH%2BRfhrxKv8DCCcQABoMNjM3NDIzMTgzODA1IgzsFXd6RiNChY3rNOwq3AMxHbulByMHiOODnqpJ0lEGsKANFEHbRlFCsT0vyK%2F5JOt8gW1DMYmIYzkgWineA1jbXDPXHrfPujjNWbT7hi3wAzIhwZLr4LJwC1e3KOvrOXOGlM%2FL85N5xtHRMNkBgeyH%2BhTMovPeW80jU9vqnRVfdD2Ck7VObws2K83RBXv%2Fg7qqdts7M3qNwoMfdCZdJRGiTuZlPI9MnD6oAb4YVGAx8SKuiWhHTWJgk7e6yZFaWSwLl1L8SPZ4lWD3Ebe3NlZc23IFeezsy6muGhgS%2FsOYkAuwqHQlb4MtG2%2BxmK6TiKR%2Bt1nWjefpzCTbGywSgJIZrACInoeu7LRXT7SAjfxss11iFAZPKNTnEwLCjU5VyP1hANdqAATWPaOtAQhHShrlCcJIVdQ5o8X527kKKSDddV3Zxq6XrBajW9k6gCe9hoMDBr%2BRK9t2m3bOGByRKhJxDG30WGjR8fjRxDXEB2XPNPhHXdPaQTLL2Uk6RtLWtZRQPwXc2t4M8x9M0OaMYaMFdlbsAJ0tfqMQrceDRh2kcZ%2B1wmXEYVxbyIxzb3T0T8jO%2BYrDpCgnYOkDndAIq5qJ82Mel7pcQ%2F4rC7151bKs5uBczkRj1j1Yi9lnfEzVkSFR85DaV7IMl3jDPzDh4fHNBjqkAbzNT%2FXCTAx%2F9F6qz9cLS9VnCia0fohYWBMegyyHfip51Hwz6smpD0N2h3IET15Ygh5PrIBZI6JbKYbBl3VOMd86C4wEF8O5nyktq3Q%2F0HQy7N6B1ZUcLcmCYzJiG6g6xpRKv3nq5ESaYMFxdyXiGI%2BZoTb42IBjzAT6WTIIfCLYSgmoGthVCg%2F10JFhythdXKj1Od4GtnNEQu7uv1za%2FvyFQ7X9&X-Amz-Signature=5baf02339035ea32a87ae658c27bc3248cbaab9d1c3b8ceec499b4c3dbd67e00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZKTTZNZ%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231726Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDSg%2BedHilbeFvsWdheceRJ0ANeqBOY9N8kXKyofutJJgIhAJoeqdHisBYA7lcd08CuaOTzWeuWkyfmI907MH%2BRfhrxKv8DCCcQABoMNjM3NDIzMTgzODA1IgzsFXd6RiNChY3rNOwq3AMxHbulByMHiOODnqpJ0lEGsKANFEHbRlFCsT0vyK%2F5JOt8gW1DMYmIYzkgWineA1jbXDPXHrfPujjNWbT7hi3wAzIhwZLr4LJwC1e3KOvrOXOGlM%2FL85N5xtHRMNkBgeyH%2BhTMovPeW80jU9vqnRVfdD2Ck7VObws2K83RBXv%2Fg7qqdts7M3qNwoMfdCZdJRGiTuZlPI9MnD6oAb4YVGAx8SKuiWhHTWJgk7e6yZFaWSwLl1L8SPZ4lWD3Ebe3NlZc23IFeezsy6muGhgS%2FsOYkAuwqHQlb4MtG2%2BxmK6TiKR%2Bt1nWjefpzCTbGywSgJIZrACInoeu7LRXT7SAjfxss11iFAZPKNTnEwLCjU5VyP1hANdqAATWPaOtAQhHShrlCcJIVdQ5o8X527kKKSDddV3Zxq6XrBajW9k6gCe9hoMDBr%2BRK9t2m3bOGByRKhJxDG30WGjR8fjRxDXEB2XPNPhHXdPaQTLL2Uk6RtLWtZRQPwXc2t4M8x9M0OaMYaMFdlbsAJ0tfqMQrceDRh2kcZ%2B1wmXEYVxbyIxzb3T0T8jO%2BYrDpCgnYOkDndAIq5qJ82Mel7pcQ%2F4rC7151bKs5uBczkRj1j1Yi9lnfEzVkSFR85DaV7IMl3jDPzDh4fHNBjqkAbzNT%2FXCTAx%2F9F6qz9cLS9VnCia0fohYWBMegyyHfip51Hwz6smpD0N2h3IET15Ygh5PrIBZI6JbKYbBl3VOMd86C4wEF8O5nyktq3Q%2F0HQy7N6B1ZUcLcmCYzJiG6g6xpRKv3nq5ESaYMFxdyXiGI%2BZoTb42IBjzAT6WTIIfCLYSgmoGthVCg%2F10JFhythdXKj1Od4GtnNEQu7uv1za%2FvyFQ7X9&X-Amz-Signature=291a0d28e3678a544bc662153d2c1a740273fc2d7766b7e8b9eb537cc6d42b69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5WGKY4A%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIH7F4L0FNyHnjYGjtjKAfii%2FBYOfJl88r%2FfX%2FRuvQJIzAiBHNRAhfhCdzMTm%2F5GTWqBGG3kNgCjJ%2BBJ2D%2Bqd1bcMVir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMDeAo2jOHH%2F1e1x5DKtwD4ZfbyaabBkF7sXJyEDUHtz6k3GJzBMi60rsaIgaA0nIRw9DqfS8kqY8qO1bgYA4Riq84IGoObDbhyPcxuN1w%2BcfhsidhKUrcMQBiJi2fK1thICLtDZWzbynDacY78aLknt5slpVKMrF0rspBWzFYBCCTs4duv12DprYsX%2Fbi%2FM05Jr0zf1wv6vKlsNMIMFjqno45UAjArcWKK88icnnnUym7J%2F9R29bgVHCt%2FJmSOGq3H597zEH0QT%2BP1F6xctUtRJiGRGk4OHxGCkeNdJuHI49S10%2Fkt4Q5sftBJrYGWkxI0QWq6OP289HMxZIbZj1WlnljqDNiPDBA9zStFZuoYeRRpQEl0w80pn%2BIxCsXDOECnmgr60mYyK3vJ5NMTZ3l7CEnkGCv37%2FuoekcRB81HMoCVilXmQjd71W%2F3KpymD7MfH9Ao1kU%2B9Om833p2J1wiT5%2BKqZm%2FO5UqvR4pj5BpVmjF2HxCg2TxAn%2FJabyHFP3Fia7uaTkJYIx9EQSLAPALqbnfzi%2F9koQbwop7cbIy9FqS83JJPnGp20zmiVvWnlWClZcXV%2FJyeGaL17peH2uGcvI9jI995QV4rQvgYhxvZtZZiYGbbWvOlmO6R8jTS7GuBdpwLhazBvui6EwrOLxzQY6pgFIbH5TsYU%2Fi42SBYmdmvxJZNrE3hp%2BUZWnm8e9cZjyzaPDhpwczhOjhJ39X9%2B7UHZRn9R5VjvKhyNGfG%2F6oBSMHFcdAwwOqBKU3T8Jct5s20pnVlcFsaO8grAUvbrbzdDXNdTpLD6okr8MzJfTUSn8spbzo%2FOaVNPCTLli6Ps05ZOAa%2Bu6j32FaWUxkbphLp8BNrcYjD0EtL8vW9PqZYYdmRRg6zmH&X-Amz-Signature=66ccfed5f4bc7b9765ad55a8a34956e19ff361d72a6e52164fed3247dbe60ebb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YWED3P6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQD8rVdVLHjXItBJ6gCOLgEvgnIFay4yjMabYotCR1CSxwIhAMNo3jwLwcDTs0H%2F2hk221iWxLqmmY5Ywj1zVnH4y%2BDaKv8DCCcQABoMNjM3NDIzMTgzODA1Igw%2F8kteaZGIm5RND74q3ANWEgrrXFw5cvdCq%2FWQBtKlcsSU9QANj02OgPynVvwyOrtwSDq1Cq5x6kvl4DSY1NLbwIHgY4Z46vamk0%2BnSH6yFV03pwOcu2EbLvVBTiNUGC9O%2FlSCU1ENplgoniMbQ0NwxyBHl%2B4kBCDRSFt71BRoUKZsSzCbLTFwHbiiaheYC2mSg7mSNIdyNNJRizF%2Balb3JKLbkRdB67Yc%2ByWra%2FMLF9COYJNyvNhuKBmn0PzcMz4XbV1OhLMT%2BQ%2BPAd9r7RVI9b3EHVUJI3JBOubXWiGahjgpEITshg8PCfdCNN8VG8pjuETxSBr4928SJUkPHN%2Fcpt5g9Zw7XHavKuXfjIHJKji2VDKmBEQEFeAnObYuXGGOn53NyEcl7kwu38fBQMsWoUbuOPaOuOInTxx9qDNjLe0hfiAAXl7XIq3ntAX7NE4MhyJab5VCdCnjrMu9v84U6c8VxyF5dE3gM17z5Vdnjtl%2B8iIo1qzVelJCcF6ZErNlqJ5LoWvU8JtS2X5ILit6MSsQLB%2BwWo2gADTXRBLZYAk1WuijLZKLBAZMgmqFk%2BocTfBGZSLObLvBUwwBMq7e0bVHko%2B8Q4xgtH9Px5GA5MlBMLWKsE2V%2FHA4GTQLUW%2FCLJVZaQ503BywFjCD4fHNBjqkAQfQWv%2FzkozPNNCmmMOTUbwlXW2YKGEegM7TCINcIdX5GXbrkcoJpQkA7m6iZSvlYLfIGQOjJkNHX1CJUZu2hvbT0GtqJKTxHBmHYy95ZLYXP1JfLca1T11vozlp7%2F4SHAVSpaM7k4XjqgvtrgyowXdhcmJXf6cRyK79h58oXMb4HQH5JfEnF0l74lLKGM3sCwgL8W%2BVxxZSBPm4Y8rnHJyWrYFo&X-Amz-Signature=d04a846810a60677a47ac20d6d24c0486dffcbf886d044c95b8e012f875008cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YWED3P6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQD8rVdVLHjXItBJ6gCOLgEvgnIFay4yjMabYotCR1CSxwIhAMNo3jwLwcDTs0H%2F2hk221iWxLqmmY5Ywj1zVnH4y%2BDaKv8DCCcQABoMNjM3NDIzMTgzODA1Igw%2F8kteaZGIm5RND74q3ANWEgrrXFw5cvdCq%2FWQBtKlcsSU9QANj02OgPynVvwyOrtwSDq1Cq5x6kvl4DSY1NLbwIHgY4Z46vamk0%2BnSH6yFV03pwOcu2EbLvVBTiNUGC9O%2FlSCU1ENplgoniMbQ0NwxyBHl%2B4kBCDRSFt71BRoUKZsSzCbLTFwHbiiaheYC2mSg7mSNIdyNNJRizF%2Balb3JKLbkRdB67Yc%2ByWra%2FMLF9COYJNyvNhuKBmn0PzcMz4XbV1OhLMT%2BQ%2BPAd9r7RVI9b3EHVUJI3JBOubXWiGahjgpEITshg8PCfdCNN8VG8pjuETxSBr4928SJUkPHN%2Fcpt5g9Zw7XHavKuXfjIHJKji2VDKmBEQEFeAnObYuXGGOn53NyEcl7kwu38fBQMsWoUbuOPaOuOInTxx9qDNjLe0hfiAAXl7XIq3ntAX7NE4MhyJab5VCdCnjrMu9v84U6c8VxyF5dE3gM17z5Vdnjtl%2B8iIo1qzVelJCcF6ZErNlqJ5LoWvU8JtS2X5ILit6MSsQLB%2BwWo2gADTXRBLZYAk1WuijLZKLBAZMgmqFk%2BocTfBGZSLObLvBUwwBMq7e0bVHko%2B8Q4xgtH9Px5GA5MlBMLWKsE2V%2FHA4GTQLUW%2FCLJVZaQ503BywFjCD4fHNBjqkAQfQWv%2FzkozPNNCmmMOTUbwlXW2YKGEegM7TCINcIdX5GXbrkcoJpQkA7m6iZSvlYLfIGQOjJkNHX1CJUZu2hvbT0GtqJKTxHBmHYy95ZLYXP1JfLca1T11vozlp7%2F4SHAVSpaM7k4XjqgvtrgyowXdhcmJXf6cRyK79h58oXMb4HQH5JfEnF0l74lLKGM3sCwgL8W%2BVxxZSBPm4Y8rnHJyWrYFo&X-Amz-Signature=d04a846810a60677a47ac20d6d24c0486dffcbf886d044c95b8e012f875008cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIM4OXO3%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T231727Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBktZWsbmK%2BHnTfslqxQgl8T45Olf5kfP%2BztpH5hPKGpAiA8ooGgUqXy8yRqBHp0mG25HkI88bw%2BhUfgJg71Tzc0cSr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMrXqRl919kjvCBIdxKtwD1HP6hyI3n6BkqxVKahADA9qnXv3WQORVYf1oY9MDHjyg9fVBu%2FKW7Jq4RiIf%2BYPzkAGWZhPNnFtlT3M%2FcNjzKVGoFFdGIWx9bqa%2BhFcr2gr1FEc6Jz781Ggmyp9E%2FsBbsj2NS2732qZiAedisBld4403ns5j4BZu7PMoucb4x0vbiC4wvlgdw%2FKV43yphOjpFUGBRWG3abm9gHM0u%2Fg4ACghGh97XLJJb4a1irCKNiZTlaA91C%2FWotq78g%2FvYtTneQ9onh0JKzkLZFPkUNy2e5%2B0FKtGzOVgTvfOWBAC61GEP9RlYc1nsBKJzZFrjEXc5DJZh3xUoV2f2WNtDtrh%2BQmyhYvVh6ug0Inx0BKRuhB5TwPZWd9W9lBrefnuy2%2BtsU3u%2B0L9Cr44fUrj6ALJJnwRrn3NjXVwaq5ybif3xD88kAVTYgD8hoEYgFZ91LJho81huO52loUkllkno6qiPzbpEP00xKPTA1hw3Z4N4jGd8DmaLdZ6BqR1m6ermZ4esn7UI8%2Fo2R1zmeQmVdS%2Ffykprbv5oLataJY3Ex2b1AqkLj0DMtDnB3rq2OOx66PaE%2Fuzc3%2BYs%2BJ%2BXAmdNgH5rRPeFAQbMZ1LMNqtyli%2BGCLwJAM9bwfqvgYdmjEw2fbxzQY6pgEVx9Y8waNqNT4m3pYOB0%2F7%2BLgvKG7%2Fv8ovNy4Qa75FKacGiNgIbcNgIa6lKf%2FCQf6iGbaM%2Bq39EBoU5%2B2cKKvcbEzKU%2F0yU9LNki4fEGg5Qu14j6uiSotGl0IiV9vMGW7cKol7RAQQM4sKyYHtAjU50RnAaPv0jEIh8SsrG0BnwhJhuP%2FZkvZVHkZcEpvMybjQ%2FHiEL8GlPyhbFNlllaZfCp40OWDi&X-Amz-Signature=8cd2362c04469f50b4d59433f9e3c755fe1cf44ec3a0451e4a192aa1671e5dcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

