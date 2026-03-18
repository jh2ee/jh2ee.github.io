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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7ZSXUDP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIGR0aE%2B4BJN4zhaU0CE%2F8DeVBU0svF1FrzwEMsZIs2zuAiBLjpAPC690gNireXB1PMmPn%2FTPbtpSBVMxhBRB5B5gASr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMxoQRJiCZcEWUPTPmKtwDteeqW1VLXN3o%2F3cnTC6c095oGil3%2FgpPGgih4MdPaJJCLNQSr%2BILJ5gCowPmGoSuPuZz1ZAN1poxl%2BO%2Fwvet10aj9n0jDrivzQ9KWhVJRH2E26Atqa72fJW5ZmExGPoa%2FOiIbNKoSZLp9EOAv42EYhlzyU0bDSUFBp1d0%2BP1JO9YBxLel2kQMNQUz7BZd20yKRUpnfWmgjVEm1wijXoODDq7sZBlpRuplfI0zEqZNKwEe4CJjuixqUPJBy9RkSA6oqGLIL%2FzSn5vkDy7gdxOijEWiLCEXPeXIwodDP3%2BnlwDLYCzhiI16P%2B4ytzTSMZ8w1kZ1NvUfjg1m5T1BwkLCSscI%2F%2FLD4eoq9Rvu9IXKmRYEHVSAsQFPuRwo3P6Q9CZIQNC5wrF2k3Bb12r67V3Uw4hGF%2BTsAijfNTgy0lXsAI1ID1xKdLXu3qt1jpA2YX1LKueOWP%2F9txTbYmxDhM36cWguXuQIpZXz4Wg9H0XlY7Skv%2BpS5uF4gVJmJA9zDOCe8TogzgK8VX4xf49d7xFIp9v%2BdMcnbY%2F8H3OhJITcxGOnKJapD8p8c%2Bn8lS113xSmmbKhFagjFwaLChPO9ezx5xs99%2BkcTVwGH1NS%2FFKL89QQDAmLpF%2BxsbXK8wwiLTszQY6pgFW7pby1aer%2FpgM%2BmI9Qx7DuCf83Jj20YEasPw9%2BVuXPmYto%2Fq58oZMlz29C%2F2F4y923IHSKO61PkX4LomCR80qSVVxrzrhaUw3GNFerA9OiNbq8%2FJz958oCxh4tFhzTIQnfSQR6UxiK0H9d1ZTHAnMPgAmK0MW82gjJd0nr16oRwIuXAcUzQyhLOD7LCrh9f4eFsUIV39kPU32622k4V6jUFzmD0Pi&X-Amz-Signature=805f418a738c3fa5d9fc40ed1ffb0345ae7bbbf67f9fd41e91f90eea12d1d87c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7ZSXUDP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIGR0aE%2B4BJN4zhaU0CE%2F8DeVBU0svF1FrzwEMsZIs2zuAiBLjpAPC690gNireXB1PMmPn%2FTPbtpSBVMxhBRB5B5gASr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMxoQRJiCZcEWUPTPmKtwDteeqW1VLXN3o%2F3cnTC6c095oGil3%2FgpPGgih4MdPaJJCLNQSr%2BILJ5gCowPmGoSuPuZz1ZAN1poxl%2BO%2Fwvet10aj9n0jDrivzQ9KWhVJRH2E26Atqa72fJW5ZmExGPoa%2FOiIbNKoSZLp9EOAv42EYhlzyU0bDSUFBp1d0%2BP1JO9YBxLel2kQMNQUz7BZd20yKRUpnfWmgjVEm1wijXoODDq7sZBlpRuplfI0zEqZNKwEe4CJjuixqUPJBy9RkSA6oqGLIL%2FzSn5vkDy7gdxOijEWiLCEXPeXIwodDP3%2BnlwDLYCzhiI16P%2B4ytzTSMZ8w1kZ1NvUfjg1m5T1BwkLCSscI%2F%2FLD4eoq9Rvu9IXKmRYEHVSAsQFPuRwo3P6Q9CZIQNC5wrF2k3Bb12r67V3Uw4hGF%2BTsAijfNTgy0lXsAI1ID1xKdLXu3qt1jpA2YX1LKueOWP%2F9txTbYmxDhM36cWguXuQIpZXz4Wg9H0XlY7Skv%2BpS5uF4gVJmJA9zDOCe8TogzgK8VX4xf49d7xFIp9v%2BdMcnbY%2F8H3OhJITcxGOnKJapD8p8c%2Bn8lS113xSmmbKhFagjFwaLChPO9ezx5xs99%2BkcTVwGH1NS%2FFKL89QQDAmLpF%2BxsbXK8wwiLTszQY6pgFW7pby1aer%2FpgM%2BmI9Qx7DuCf83Jj20YEasPw9%2BVuXPmYto%2Fq58oZMlz29C%2F2F4y923IHSKO61PkX4LomCR80qSVVxrzrhaUw3GNFerA9OiNbq8%2FJz958oCxh4tFhzTIQnfSQR6UxiK0H9d1ZTHAnMPgAmK0MW82gjJd0nr16oRwIuXAcUzQyhLOD7LCrh9f4eFsUIV39kPU32622k4V6jUFzmD0Pi&X-Amz-Signature=805f418a738c3fa5d9fc40ed1ffb0345ae7bbbf67f9fd41e91f90eea12d1d87c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG4KY5H7%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQD0Gezz8ek2GkhvDP%2Fgzu3mBdysMGMNZH82m8Qno5H4ggIgfQ8rNp68iAzgybSXEHV2%2F85QEOhR9Uvo3prJbqAeXzgq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDEQ45KjQV5opvC3zxCrcA73xKJmEZzb5lFpc7ax9p6eQ%2BNvbjsZXmF8YRjJx70%2FRcs7h4uGr%2FJ5xA6o1iatP09egPgtRBbGFniq3kE9XacP96R9OCAPS%2F0epNmmr0QAm9%2Fl0w5q5iujobaDOHPUTew0Rc4b5dMJv%2FqB6ZfxtGTXNp25hi%2F0PVeFflylW64Qdo56WpfUsN%2BJ1LlOjbionQ4CjLaz1CzI%2Bp7rlJjn8nMcLCNRSgsUVvqBIwl4uTR4JMP8Uy%2Bqvu9Xvk3kbhBLDVwASZWePrGDxCGXVVzPZSbNQ4%2BpZ9ywRTav52pRuL%2F5Jc4chFzuFBi0584F5cIWfZQvZYrEI6%2BhYgYHBS4LoCLF0N5ydUmwfaVnOZ%2BS5ydxxw9MmnpqpCY92PRcWIUUi2pcYR7643GWvDycJeDUfVAlRGf8BvlBaExDqsH9bwzgYAec%2F1SVz3PZ7685z0M8llqqi0EFW6vCTroXroPQyEDr6RdJDkqD%2BuculsZv1gXNNLdnwyGdWYGNMJAnjJwyA5ELQkVfcwt5fshdR8S0MaaeWZKC7mQoBr%2Bt9kqYU1KXAB%2BCy%2BVwg99vdQbPva6UAd1ZJgD4VIshvNDoInGDxPXSAL0GYtTyE3XMRZyZ%2F9eLCvEAziUTjJQnMDvnyMI2z7M0GOqUBGf3ckpymhhju1bXCuea5cfCyFJ5hFNf1jZLM2YUB7GrbTLzW83z5dTKRRMUlsJjM5%2F%2F9PkT7zUrok6gIaldJtncTZJEWYipUD3qDoW%2B49wFLqnG%2FDgjv5TNp0nutux8uPQebD2HYXj%2Fei%2FbaGvwpkBNahYwFZv8opE5u663scKHHVpSa%2B5mCN6vnJW69GTtUrNuyUuwBvBwBTRgMWZjUXCKYNIwT&X-Amz-Signature=78426984f851aaaef6aae1fe29ca4906290e0f8165f5bf9dd6b32085c7b107af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y37P3C53%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIHpi6qCYkznxcqfm%2FXVeP7PJxkMopN88EXL74We7PpgdAiAFy4ixqD89EuyoaN2TlNeB37HrLowp%2FdPuwHShkkZP3ir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMVob6ucEGbTo0SCgPKtwD9J4el6Lso0Ertnww%2FBGq5MRGapoDHG9VT2Q7OL%2BHXd%2FZhFzwpp7csEgl%2FagQHBx4aHx3mSDzKGJFRJVlBnZ%2F9CiAv4oDI2Msmgghr84%2FARhCzOjOS7P2ohAePxuKSMwPAsTcUIhWdQ6HAAsQ3wijhHY9tmgWhxvJWvleNsegthUnYabbm%2FLmmpscq452h5CfTRg2fnCmxQENpNnB6rHIpMg0lZs8RpurNI2A0I2ySHFVJM7czOGNz5pcMuwAkuP%2Bb8cofPvdb3RWk6qw8MwMp9Vul%2FbW9iPzJasqYb8g60FAMaSpMNrIEkJAcvMmO2ZbKwnD%2F4PznJwwKgl19l7gmNCG2yJE5rw43k7s5WX1Q47qUlUtGfIs74cHTRWlNp7QKcvs%2FE1oDBsLxvyWuysEMNSUi4fou%2FMnLCVXw88wTSAG9SIXv6xzdDcJ6tM%2F5h%2Bp3HNtPz1RMqMt4JWGwrH7yzU7VJDWS8GEx7liMiqQY55sY7aJVyX4ZvgKGnLUgdk6HInFyc7mg98m4wib6IZZias8H3VvjnjTxCqwmaAQ%2FmI60ByOPpSeLlemCwdz9TAlMpKYsc%2BQkrGQZ0ZVb9Bi8humD%2BD5r4pSnYnVYy2H3dSJJ5Ix4cTKIH4YadEwqbPszQY6pgGtH3h7gQEWD7ihwhKZTw9QZs3ewKElx1h4C6hUk6hhBSLbb7BDfyFEM%2BQoZlaCc4bAHt2BYG9i0SEs05WcW3sCN5rqBIRRU9TFq6Gx9fmBN%2B2KtzJk9R8adqRQmp2hMHSBOfTRc%2BjPuGWX5jlk1qGsH2CUUU3YEhfP2hvmr9216pp4f0NIKaljt6mXJYoFNjS%2B3pgv7MQylJkNLxCnpZV0v%2F9taiKc&X-Amz-Signature=b3fa7e2b0568e982c93212f4e16e5eb924c927a39dff86f697f03863512c547b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y37P3C53%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIHpi6qCYkznxcqfm%2FXVeP7PJxkMopN88EXL74We7PpgdAiAFy4ixqD89EuyoaN2TlNeB37HrLowp%2FdPuwHShkkZP3ir%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIMVob6ucEGbTo0SCgPKtwD9J4el6Lso0Ertnww%2FBGq5MRGapoDHG9VT2Q7OL%2BHXd%2FZhFzwpp7csEgl%2FagQHBx4aHx3mSDzKGJFRJVlBnZ%2F9CiAv4oDI2Msmgghr84%2FARhCzOjOS7P2ohAePxuKSMwPAsTcUIhWdQ6HAAsQ3wijhHY9tmgWhxvJWvleNsegthUnYabbm%2FLmmpscq452h5CfTRg2fnCmxQENpNnB6rHIpMg0lZs8RpurNI2A0I2ySHFVJM7czOGNz5pcMuwAkuP%2Bb8cofPvdb3RWk6qw8MwMp9Vul%2FbW9iPzJasqYb8g60FAMaSpMNrIEkJAcvMmO2ZbKwnD%2F4PznJwwKgl19l7gmNCG2yJE5rw43k7s5WX1Q47qUlUtGfIs74cHTRWlNp7QKcvs%2FE1oDBsLxvyWuysEMNSUi4fou%2FMnLCVXw88wTSAG9SIXv6xzdDcJ6tM%2F5h%2Bp3HNtPz1RMqMt4JWGwrH7yzU7VJDWS8GEx7liMiqQY55sY7aJVyX4ZvgKGnLUgdk6HInFyc7mg98m4wib6IZZias8H3VvjnjTxCqwmaAQ%2FmI60ByOPpSeLlemCwdz9TAlMpKYsc%2BQkrGQZ0ZVb9Bi8humD%2BD5r4pSnYnVYy2H3dSJJ5Ix4cTKIH4YadEwqbPszQY6pgGtH3h7gQEWD7ihwhKZTw9QZs3ewKElx1h4C6hUk6hhBSLbb7BDfyFEM%2BQoZlaCc4bAHt2BYG9i0SEs05WcW3sCN5rqBIRRU9TFq6Gx9fmBN%2B2KtzJk9R8adqRQmp2hMHSBOfTRc%2BjPuGWX5jlk1qGsH2CUUU3YEhfP2hvmr9216pp4f0NIKaljt6mXJYoFNjS%2B3pgv7MQylJkNLxCnpZV0v%2F9taiKc&X-Amz-Signature=b2f68b23bedc5cc3dc03d11924337306e2ba9f64b924bb448ecfdc5fa82d9315&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XZLRPRU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIFzrcVgNbXA2F4rhOvD2a6EjNv8Edu%2FVyJ8MvB4wa4svAiEAlvGcfX7xxROxndA1ltAtDqBqg9GUFMprO%2FTcG9816ycq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDJ90CF5siqHknnqOxCrcA913qcxqbX0Yd3Z9DsHk%2BPaY7PAZX%2FzjQqLAz1v7pCFpwJQS%2FGdtWNbCQAFe3dmGFQXy5eG1lVEf9%2B25HX155CXSFHxAkcBuwiD9ANtgTNV1Im3CpeuZRM1J08tUF8iiZgZm5kgKs7zLmoTQuYNJa17HINhJ9KaUsiHpo96XIuf6t0aZDeXzE%2F0PBSwHaMtVsrrZuE6zzQq4EeOJHE3lSHa7be%2BNNDRMkL1KjUUo6TjbL0kzgcSnwATfPyjTB2DurB5wt7fy4k01BPGggk5Jt4TRT1Vh4Vr8zzpWzG6OdDdYzNdKBUrUNyjIZlg3EXgzlis9l%2FhsY%2BhNADunutSmZZAcjI0CSkEzBCmvPuVcx3VBWwuWAyhty%2BHMZwGCZFpfdXwhmylihhWXaGr5fNlYdN1bWAy6%2BSsdgJkhlx7w7BfbkNS3j2jSL5SCcro%2ByWv0%2BLcBt75Ew84kt214xSfovFJJdGoREJ1ECHE0rfDfmH4vn0hr5dvaNwxGw%2F1bgdPTE2YanV523CEBLF3kzCp2x%2B3lcjA2tjxG7V%2BikU906BSUTZv%2Ff2dngJ35F33GzIcdTpQir%2BnTrpXh36r0L1KrJwpJv%2BiD4SDUV6Vr5%2FwSuEDixVu6TswwwL8Gh7F8MKqz7M0GOqUBqEOM7JSbnxOj4hQYWcXsU9Oe6eZo9OMkOs1uwrmR25DNd37xjKmWmNsOHzxPmqvpwxyUVmseKqC%2Fy9NhsQuRPcOR7QKps9JoNcbx1dVpeiMJfvmWb4vN8hKtb%2FP21NVkRYD8puw8JTvWACRCtu2yHhfbr29adSQeGxfC7L9YWBOwpf%2FgBl5D1P6kwV3qohVP6Q%2BStLHtWjtDHeUVJHWZiPJxsgxn&X-Amz-Signature=81764ce35a9c5a5f2a6ca47e368630ec90e3f0d6777e1b5dbc37745f0781bcf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LNUU3HP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIFLTqVCYggWpXe%2BzFwN%2FOLpQQiuH8HX0gyE97%2FKYnBR2AiBOnO73Ap55riFS%2Bqeu4AHVBXF8i4QEtxpyFNf%2FjxuSLyr%2FAwgPEAAaDDYzNzQyMzE4MzgwNSIM5F2ZOy727QoRO3XqKtwDgTbhC1h9GwJAXOrkoWk1Y1bcCB5ZGKgqlmRNUfm7sGOJMMOSaXfbI%2BPnbQQfugCu0x8PT6FbwUIK0eThvuhwO8XCga9FcwI45batC2u4LWXOH2K0f6ROGCEzEJ8r0uQ4Nb0%2FFDu6zfc5eTanhOYuY4L8VHrep62VNoqNjSNNNYeAq36wtsnQcJP6fq%2BHHh9jhmzSlyklbjobetS%2FkXvwwxspors6sI2%2Ftf2zy7gK95yKDUtkDZdau2VXV33SJ7uYOnaq8BGXQE83vekTqf5Dr1DQnOOMdqE6VO20cT7ARGeHQH7wRvfectkJwvP786pASb1P9JxpxFteI01rYFRIQijQldmuHUev1L0a%2BP6RpBxX8imu3qqsxADO8YKmo5mw6Gm2WkzjJYKYnMfYyfjNTzt1%2FaLD99LEiiAh2rOIHFkm3RbCLKFk4YGUfgbdp5mGEDN2tl8DpQE0Ud5SftT9IlBgOKybX2JOc5wLRHhU9FKYKax9B%2F0P0qAGVr50Zg0fHtC0D45d0Vh4Borzgw%2B7dG7%2Fbb%2BVdLKxCCbNZmZdSBGWnP0yjRNf029pfiQVcPAGNXZ2SakQqfw4VxqjjFVBjkfR5IbupzJaPZW7vBFRl8Hb39p4CGjlBVFvACEwtbPszQY6pgGFeOxJPZiUh6Nhs%2FN5vrJ%2BvT%2BNHnexF8vWhZMe9z%2B%2FDuzJg2z5Vehotu2u6RGs7HCWNa8HpK8HqrnPCa9qzPKviuvRo12SNQa9rIIidxeiSkyVQ9opl4U9QkOfGLX42e324%2BfQr1BPGkqxYP2DhuDWDgsHSYGmFo9bxzLJ4GWZ0OLEW42t%2BebofbHgQjsguG%2B8p77OfcCZ2Vf5wcrY%2F2YgNYq%2B%2BrJg&X-Amz-Signature=22337f7c9e72d9fd46a25ed6ffbcb28a0a02dc537025e8c5d98d75fa7e89ce8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y27OK35U%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQC2BrAJkGsmMvx3EJa%2BPdqwxibEp7Xe0t08fLXdUv5eywIgKnDZeiLxzv1%2FWE4sO%2FEvGzqGrnSsSyIis9MmCi8VW7Mq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDCLJ7mlvSp4TUSlL%2ByrcA89rzxxmQ4bXo8X9x%2FAbfGNUYk1NEBqArwcS9Q%2BftOOzc24nRz0qe1eHFXMFgvx%2B%2FaKU26khF11ftk9pjbsClgLZb3HFN4eplHhB%2F9YG7nt6cNtSmlLG4Kez7dwWbZofbjcDu0xnFulaF%2F%2Fu1v2ZvXTpY39ksxf3gzzfj%2FWhy5aXqBS1yn6uPsMtBeWCG78Zcx9VjX%2BosS8BiwDzjlgB5ny0%2BkEAEfPT8AtEmlZ8UJgVuP3WvZqnmUqWEDUOYzooMa%2Fof3XT8bXe5QXnlcTSWrf0PhBxNkxoQ4FCB32aasa5UDkrwVrL1M0zsdF6YoN%2F8Oq1uxNWIP8sgkG2%2Bhnh6ZuNXnuer%2Fdx6E67fsgMGtYUm%2FOd9NlCMopj9NEdv0uHpF%2BIzVylS8x3m%2B6FN4keQ3GzUm1eRcop6nuFQbCbN6ZKGNLdDfYBSLta2R2GiX1M4weqFNA%2Fw2WKG3yA38mTtZ7K5jPbgt2rob8h3nfhqHBRkSj%2BbUZEGSMiONRQ3BgqoKaZzXmO0%2BVtwyr29MnAOdrbqO0%2F2ZsCOjnyQMQjSBAj1NSCKUTi%2BY1U6HTX%2F63IOcNW5vz5%2Fj5qHpcBDRvks9c5yVUkyzEndB267TV4QKAmH%2BLRo8sUIfm9DglSMJWz7M0GOqUBfBmy0Gv5lX1BM1WMQBECdNyM9ZEXdbJ%2BEztOiIHqcf501L%2BSjMftC7gyB8U9LRaQGf9TrPvEp0nD3EpOWS6WMnqrZO8KxCNm0JnKW357KxmKWG2Sy5ZuxcwuUAjGXHzsvd3%2B6bMKl6iuvv7ws2oOWhI9KSzQvfFko6pJ9R88Wf5hpdg9kOQqpKKNDGGbpcq5KZnMss6LSJ9zWjZtxWu8s5xXQYRz&X-Amz-Signature=6cac9bcb7a978ce830fcaa29017540b9334f4a4fbf6748e53a24703dba1396a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z73WKDDH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDtnko1CfMw%2BxE8Co2HWzzcmkLvx8jCZutwHuBnTgFoagIgb87%2BbG%2FfLgRygMh5ITJP56s3IWG71WtA7Dn79HGu8u0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDC7jUxug6D9HcQgfkSrcA5hHN5SyOiyZqQABJNHobd2lC1Ozt8%2B3XMleZr1CZwo81fdahU4Shks%2FC4rTQ1uynhhAI2HmDcXHeSaUMGHmL%2BLvvXRJfrVph5dbhaUhT95cl0t8sT%2B6tPMJDX3oIrgnwBVvMog1MfWp3U%2FNKlyIGPXsrqRqo%2FV7DZgeDtJmeNHXcPxPNXjfc%2BvMXpO21msChF3iAe%2B8CQosB8pzv3S0ZP%2BT0n8iryBezqJoQaQLwucI6mqixx3sZoI5mhBsyQgtnFRF0h6bjgoqE5LcxXtqgD9j7Um7nVtiCKmEPIq3EYj7dhYE47HfgpHyRPnMB7JsCPWlTXf%2B1lTjh7sCtip95Tw97nk8pzS%2B5Zz2GCsBl2QOclNkphQI5gZlyn7CUcS9BbvcjxOT%2BHSYtaZTBFSHHUpCY%2BHwaV3p4QfpxlDvlwRvBgzQbe0S%2Fjb%2B7lGk5GlOdPzH6NmAr1NHSK7V7Sz1YgIShMe63NCVILQQ3EiOA5l9%2BAITorx8zrnKo%2F4Ng%2FUKH%2Fl2uQKMVYDnkQHyzr6%2FGw5McXaA6uVUgEB4arQPc3BU5WgNlk2i1UvN1M979qOBJOpT6%2FiQIkGdjev6jbFi%2FEDP7QHceQAJL%2FyFGu5ECJhi1C8o0LJuAzGQGj%2BNMIy07M0GOqUBgCtTvo6QEECKy03PIonPZ01ejTtxisi3Ed7o15FrLN1QYyhzmeKqqUGPvpn%2F3Uj9iFj11J%2FYgxJjfZpPryByArBur%2BcImkaBi7CeC1mD4%2BzPxjREPl1nu9eOHQ%2FXWg6FZW701KY4r5fjSJ2fIenFsytQcSMilSYDyRK1ntW4ECQqhWuNcVnuBvgkQ5he5mhUCSiSFUFIIq61Q5N18NS2PoCDKxc0&X-Amz-Signature=40a589af265976077cc46b493281be06154ee30caf3c2dbce86fcbfa72ec3aff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z73WKDDH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQDtnko1CfMw%2BxE8Co2HWzzcmkLvx8jCZutwHuBnTgFoagIgb87%2BbG%2FfLgRygMh5ITJP56s3IWG71WtA7Dn79HGu8u0q%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDC7jUxug6D9HcQgfkSrcA5hHN5SyOiyZqQABJNHobd2lC1Ozt8%2B3XMleZr1CZwo81fdahU4Shks%2FC4rTQ1uynhhAI2HmDcXHeSaUMGHmL%2BLvvXRJfrVph5dbhaUhT95cl0t8sT%2B6tPMJDX3oIrgnwBVvMog1MfWp3U%2FNKlyIGPXsrqRqo%2FV7DZgeDtJmeNHXcPxPNXjfc%2BvMXpO21msChF3iAe%2B8CQosB8pzv3S0ZP%2BT0n8iryBezqJoQaQLwucI6mqixx3sZoI5mhBsyQgtnFRF0h6bjgoqE5LcxXtqgD9j7Um7nVtiCKmEPIq3EYj7dhYE47HfgpHyRPnMB7JsCPWlTXf%2B1lTjh7sCtip95Tw97nk8pzS%2B5Zz2GCsBl2QOclNkphQI5gZlyn7CUcS9BbvcjxOT%2BHSYtaZTBFSHHUpCY%2BHwaV3p4QfpxlDvlwRvBgzQbe0S%2Fjb%2B7lGk5GlOdPzH6NmAr1NHSK7V7Sz1YgIShMe63NCVILQQ3EiOA5l9%2BAITorx8zrnKo%2F4Ng%2FUKH%2Fl2uQKMVYDnkQHyzr6%2FGw5McXaA6uVUgEB4arQPc3BU5WgNlk2i1UvN1M979qOBJOpT6%2FiQIkGdjev6jbFi%2FEDP7QHceQAJL%2FyFGu5ECJhi1C8o0LJuAzGQGj%2BNMIy07M0GOqUBgCtTvo6QEECKy03PIonPZ01ejTtxisi3Ed7o15FrLN1QYyhzmeKqqUGPvpn%2F3Uj9iFj11J%2FYgxJjfZpPryByArBur%2BcImkaBi7CeC1mD4%2BzPxjREPl1nu9eOHQ%2FXWg6FZW701KY4r5fjSJ2fIenFsytQcSMilSYDyRK1ntW4ECQqhWuNcVnuBvgkQ5he5mhUCSiSFUFIIq61Q5N18NS2PoCDKxc0&X-Amz-Signature=a8f56d0148a913c53efd0cedb7d4d84a6f572f22601ccfd122fb12c007996891&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHHRM5GG%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231906Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCl0HoWZLwX0vl65EfOEmr%2B7R5jo5vu%2FJzp3qbDIsdWqAIgdq%2FywmwZLzOB0ffsHo0d7V9BzEpmpPfGES6ldh%2BfW5Uq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDOiVxL6%2BqOpLqiyVlyrcA%2FBU3qeBZVRfb7iAO419P48D9yYzGKibkAegW%2BAwvFyTQ2uFpU29CbM19%2FpEKdN%2BIHcRblMc%2B0b43unj44wa8JDDH1qLwaPtxstDHXZPbxnmPQ1fTxja7wyVQMGkLq%2FZls2PTvdGaFQplNu1hkDEjbWr6Gr%2BZVP4cm89GuoXxIr%2BxDbY8qZmSFsVigS2gnF1pwTck3A5ul947RxtYD9TR1yW7bXseDmz%2Fz%2FsStmZioa4ZYgyg6jnZdRg5QNDi%2FHmcoiNpaS8%2B8iW5Ff%2FfEf%2BgdaiUbFL2HClNTjwMqgOoTwQUqvSOjeuRLNfDp7NzJ8pMs%2BUErCzN5tsQyCobYwOY7yZJMg5Zh5Uf059BNOJdup4%2F6ghorJiHohV5hBS7ybUJ3EbiPfqt8T0iWUzuwPW7HS6I4%2Fa23ZnUhIyEsmoZ8EfB8VUkCWYGXWacFZIkqUAZ1ExhPEEVZ30KEQ%2FZ1oLmeOv8pS8GfJvIPb6gfciTUkAFfoJCwWBEfq%2FftUMWiyWtyULUxQ%2BbqjX2Bctr73O5G13Y%2Fe7PKNN2vNHYQYKC1n1yFpTbMiTLlUxt1Pt8THoQCKmFDkBIarCwkJB0jVKerGCjK7Llm%2FhzgV9WF5yQPmqNU%2BPic0ZrTSZ8NF%2BMJOz7M0GOqUBl%2FiSXHDCDOpan2yFkTLNk4OKihibd1lYbhZoD076rGrpk81uHy28lfjLDbZhLb8MBTVqr6J1TPQRG%2FPHVcUZ3SBAnwHfEcMKid4443m5yBSsSNYxawmJDhK3FiPdTq41MWJ%2BkK5hPmwqtz3LyJr04hqbjHtPa%2FEcixKg8wgfHS3oyrFaqDa9S3sTk5jDOKj1SimzwuiO7H19Z4tIqUNK3j%2FPCmpy&X-Amz-Signature=091459f6a3946161a575b6eb424f7ab5c1a4ea30c23a53151d36e2c9703d23c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGUDXK2F%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIApPxTUFc5Q4odQiVtBj%2F9EJmVc%2B5F3zMWj3LqXiqNoYAiEAyPBpBdVYBqr58HohipemrelqR%2Fpg%2FnfZKFqlL%2Fqj%2B%2FMq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDsNzR3Mv%2Boh9aLLwCrcA4ARjNCAwCDl4WPt9EasMa5ZI5OMZ8jdyKpLIQXiv7XC5i9CE%2BF62EopghsA6FalkAdBY3rLo32e5rHFWgW01d1QIzHpMTdAjuOiIyp6a%2Fw6mSiHaM7zjqd9sxpHG7Bu3gdEoKGSpd107BhAfbjzy0A48r7wXXnGcFoWn%2BooV7lgXoEiWhORMxXlLKTgxMWYAOWaIMZB32EyP9beXRiG2GQ%2FZapTT8zQt3YSu%2BlAu7Zl8m6mld41QR4vyUwGRxslTWcLaceGvWOjPmfSrIOOD5%2BiKjhur7bXC0z2l64ZgjpWvXUHYd6CaBK6uQjd9qoRgrgPTP430xNmoqYi8ZymVrpbkfYeh1vc%2FR3j2m%2BdrUpIEvPjXvIhTKUzcnfqPOl8OiQlJ4PYIgSQU0qh5Hf1Ym5Rz6KkrjJitR%2B3oBnBHa3JuvgAh0fmQmfQpFOEfy8g0BdQkV5pxi6FrpAAE3Gof2v2VVKmSwg1oED7k4YwM1VMSQRKLGq4Z9kHbMaSawbjLX7bchpwFx8Y2hmups31tW346CYwm1rXAskKxAquQBYR9PRgHfdfTuRE6OqdObT1i3g%2B%2BZVkBLjZCKFA68j0nVxtBtMVqbkjgyBQ2L4KR56A5xDTvAVxh6U8E1X5MPWy7M0GOqUBbnScDGLfriKzoM5xmogHM0Uq8bryDUucB9Jtx7EThsDumzUURO8o8U%2FfiCa8TQmtaLZbekNWdQ7iEWSFoqHuncK6RPcMZqVrQ5uMGK4ADRzvJOQUGoAOvYHyVpkuF4slpmPk%2BFwok0r6hOfv6Jlq8h3d1gvH4BWVZ5vSsvJGPSVRexv846WhMN3S5X5VMQxQLl%2F%2Fm6z%2BQ9%2FRc7ZaCNUAThM2sodz&X-Amz-Signature=01f127403856bf2347d279faf8b42411f5532084015d87ec992e5333da700192&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGUDXK2F%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIApPxTUFc5Q4odQiVtBj%2F9EJmVc%2B5F3zMWj3LqXiqNoYAiEAyPBpBdVYBqr58HohipemrelqR%2Fpg%2FnfZKFqlL%2Fqj%2B%2FMq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDDsNzR3Mv%2Boh9aLLwCrcA4ARjNCAwCDl4WPt9EasMa5ZI5OMZ8jdyKpLIQXiv7XC5i9CE%2BF62EopghsA6FalkAdBY3rLo32e5rHFWgW01d1QIzHpMTdAjuOiIyp6a%2Fw6mSiHaM7zjqd9sxpHG7Bu3gdEoKGSpd107BhAfbjzy0A48r7wXXnGcFoWn%2BooV7lgXoEiWhORMxXlLKTgxMWYAOWaIMZB32EyP9beXRiG2GQ%2FZapTT8zQt3YSu%2BlAu7Zl8m6mld41QR4vyUwGRxslTWcLaceGvWOjPmfSrIOOD5%2BiKjhur7bXC0z2l64ZgjpWvXUHYd6CaBK6uQjd9qoRgrgPTP430xNmoqYi8ZymVrpbkfYeh1vc%2FR3j2m%2BdrUpIEvPjXvIhTKUzcnfqPOl8OiQlJ4PYIgSQU0qh5Hf1Ym5Rz6KkrjJitR%2B3oBnBHa3JuvgAh0fmQmfQpFOEfy8g0BdQkV5pxi6FrpAAE3Gof2v2VVKmSwg1oED7k4YwM1VMSQRKLGq4Z9kHbMaSawbjLX7bchpwFx8Y2hmups31tW346CYwm1rXAskKxAquQBYR9PRgHfdfTuRE6OqdObT1i3g%2B%2BZVkBLjZCKFA68j0nVxtBtMVqbkjgyBQ2L4KR56A5xDTvAVxh6U8E1X5MPWy7M0GOqUBbnScDGLfriKzoM5xmogHM0Uq8bryDUucB9Jtx7EThsDumzUURO8o8U%2FfiCa8TQmtaLZbekNWdQ7iEWSFoqHuncK6RPcMZqVrQ5uMGK4ADRzvJOQUGoAOvYHyVpkuF4slpmPk%2BFwok0r6hOfv6Jlq8h3d1gvH4BWVZ5vSsvJGPSVRexv846WhMN3S5X5VMQxQLl%2F%2Fm6z%2BQ9%2FRc7ZaCNUAThM2sodz&X-Amz-Signature=01f127403856bf2347d279faf8b42411f5532084015d87ec992e5333da700192&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLHRPFHB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T231927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQC0%2FKpjHk43rcIWnzg%2FoFj5Jc6NWL%2F%2B2vHVnEJXiX9ZPQIgD1BBiBlGzonL3Zfmx9V6DkpNNk2i1aAdzBfiO%2FF2qcYq%2FwMIDxAAGgw2Mzc0MjMxODM4MDUiDI%2FHmG0qZiss5jR14yrcA%2FS9e6QIcq7WozMFh2zQtjyyp2EYiHbdzCiACnh9K9P91AoX8r4ZQKK%2B%2BKWl3Qe6gwtGyN92a0B6mmR9QcNJPjoPcDr9Ul9w3OkR15tjAeChTGRHrioexslY59a9yQdj81G6XvRczuDXSavXErR9fhfI7EPzUno9VbBNyqeP9l6t%2Fz25ameC1JRe13H%2BuSpzyEgVz6tazBKCqsoiRZt1Fhl6F99tZjkiPSBxb1scu5ksGVKSXGsEswhv2TIMcc1GUFKx0CwzC%2F36qly9vbizJtX%2B6pAvTKzzcJ73QbtuCv%2FmDUk3haweDK9JrJ7p4skG9sEc2nzyAewEgphec2Fi9ruZBsopHVuHIrBE1dj9eSkIAdaEMeJgXaluxCXAT1nORKsrLY37OwP%2B%2BtmWpShIX9B9t%2BMjmGHvYkIF6zwBk7uvpnDF8%2BmeeDRQW9scvu3KDZVCzQ9HTmdZ3DH2ILShdu2WzZpGGlx0DigliYKByBaQhbc%2FZ1LQ3YxZQveQpLrK%2B3KB0shykPoQCeCEAkw6tFOsSI6sx5deCLd9CbsCDusM0kNWcFbSRSnMYCQUmZFEdg%2BE3Rhxwj1dbt7oC9IDT0Zpb%2B8UrjBj6UBeLmSOxNlVqZgsGNDtsWRtbSnmMNWz7M0GOqUBB%2F0IbpeavdB%2FG5Xsp%2BynxotVvVRTFq8WBYL2AAXuNLLWQrgTWP1Wqk%2FGjlp7tl8xs3mWzITgfgFIhjkEss4YDDsr7ySZdobN1096Lzhrj7b%2BOdAfUdXNmuCJz%2FcfcyCmqKVFg2OJUMspLUS2ZVZfLXxIE8M7O7nmu34rWKs%2FXa3dNc9QAoOZvHuEoArqgG7IgsJUlk2zvD8azNvYd%2Bpt5NdPG%2BYN&X-Amz-Signature=7e44a15c5e80b06041a505769203629f5f9338772fc1c0511c50cff4dfa18f9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

