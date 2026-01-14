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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YZGJMYA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIFd%2B1VguYx4VBsiCRTtW%2FKo%2FyM637gZij7qTYVapG4w%2FAiEA%2F%2BUQnSNtcw0ga7Ee5SvYfiZD6ARvf9gGe4vsQemm0MMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDBMeMYoSMPOUZKj1AircA6ktDbfsK53vkgOUJ7ADigBOY0mh504pQvTmsYt1fjvR30WByLqlLwpkBU%2B3W2c63jDeVXWC8chLU3GHsuVd1bHZJhpAHZtw6gvBpvO%2B2x6akeJJTOdQX9eh4Xd5uvAawq0pfUquKZliQY4yJR5JWesKO9kl60ou4sDlSEs1%2F323w3OVLhFS%2FlO7RUnizHCpQkaiV7OnXFMXY6xx2SMmUXl4HYn2ZbdN9oCPzyPvRQPF0BKI%2FKwLucH2k5O5VvZ0%2F1gHAzWygcL2DCO5q5ZcqpusutXppB5c3Ih1bAehALLtZxFYnGknm%2BBOujQSTlPaMKGjFaftq2iEepfbyrnFTF4hGfE%2BV408BjxjEGNkjMDSXCAXVGBsDtpou7s8EkoyYa%2F0FkldGbCxpmsMihxIfWXm94LLqcy0qNHPjTVHDLzK9Yvb%2FRjHkcxwKXrbVjGgvXjNkJeS%2BzjNScXo6SLaOL4ZeD0W7YwVrSuEWlGNSqQgHs6AU5syF3xB5FLzWQeKgdw2En8bzc3V58M2tiU25cCGrj2dY9lOpOG2lGtQmO%2FWJYDn4baEyGPugxE0T7aDgcdQLprXb%2Ft9jIBN4K4YZsOvICPOhDzOlEdFciniRh7hHh85VkJ9tUE5q%2F8bMJq7ncsGOqUBYXZl%2FudaojF8djoT703ManWAO2BR76wwJWztkBgZTxCTMtYYyaXa0owSWUEKL%2F0XjHrvpyn4nFKPN%2FliZbV4WXq35yWb4AGTCw8NuWc0cWerQtkIFhArshncYZgVA6sp48sNf4AvgIiBSL2GkNLcAUP1TjW3wUYDgC1LsU62QN3P4Hk0QD98sO%2F26HVqh9SWDf2KWINsdhnwUNjLKY8HQH511NEx&X-Amz-Signature=df956a0af3646769ae46441ed1237a9c9dca527bfe584428a0530e0033823c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YZGJMYA%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIFd%2B1VguYx4VBsiCRTtW%2FKo%2FyM637gZij7qTYVapG4w%2FAiEA%2F%2BUQnSNtcw0ga7Ee5SvYfiZD6ARvf9gGe4vsQemm0MMq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDBMeMYoSMPOUZKj1AircA6ktDbfsK53vkgOUJ7ADigBOY0mh504pQvTmsYt1fjvR30WByLqlLwpkBU%2B3W2c63jDeVXWC8chLU3GHsuVd1bHZJhpAHZtw6gvBpvO%2B2x6akeJJTOdQX9eh4Xd5uvAawq0pfUquKZliQY4yJR5JWesKO9kl60ou4sDlSEs1%2F323w3OVLhFS%2FlO7RUnizHCpQkaiV7OnXFMXY6xx2SMmUXl4HYn2ZbdN9oCPzyPvRQPF0BKI%2FKwLucH2k5O5VvZ0%2F1gHAzWygcL2DCO5q5ZcqpusutXppB5c3Ih1bAehALLtZxFYnGknm%2BBOujQSTlPaMKGjFaftq2iEepfbyrnFTF4hGfE%2BV408BjxjEGNkjMDSXCAXVGBsDtpou7s8EkoyYa%2F0FkldGbCxpmsMihxIfWXm94LLqcy0qNHPjTVHDLzK9Yvb%2FRjHkcxwKXrbVjGgvXjNkJeS%2BzjNScXo6SLaOL4ZeD0W7YwVrSuEWlGNSqQgHs6AU5syF3xB5FLzWQeKgdw2En8bzc3V58M2tiU25cCGrj2dY9lOpOG2lGtQmO%2FWJYDn4baEyGPugxE0T7aDgcdQLprXb%2Ft9jIBN4K4YZsOvICPOhDzOlEdFciniRh7hHh85VkJ9tUE5q%2F8bMJq7ncsGOqUBYXZl%2FudaojF8djoT703ManWAO2BR76wwJWztkBgZTxCTMtYYyaXa0owSWUEKL%2F0XjHrvpyn4nFKPN%2FliZbV4WXq35yWb4AGTCw8NuWc0cWerQtkIFhArshncYZgVA6sp48sNf4AvgIiBSL2GkNLcAUP1TjW3wUYDgC1LsU62QN3P4Hk0QD98sO%2F26HVqh9SWDf2KWINsdhnwUNjLKY8HQH511NEx&X-Amz-Signature=df956a0af3646769ae46441ed1237a9c9dca527bfe584428a0530e0033823c47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3BGQQ45%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQD8w8PcP4TcCdyYK07nzTk8xSb%2BkNe0ONQ2yQsCpWcQGgIhAJkY%2BKuonVM%2BofVSA1MBUYQh8df6keXB608LAC4oHyVHKv8DCBoQABoMNjM3NDIzMTgzODA1IgzBhlb%2FGOlYsJIvEpIq3ANREvNxUdEirMU%2B6OxKKZuK%2Bvx3KFmf351f%2Bwsro%2FH25WMpK8yHH8S5bRmidYTtdSqK%2Bb9Fv4OX78K9%2F%2BkCs29QcawmNPr6L3MrLJUiPmIfISdh3LL1exlpdLCKiFunRznwfRBQq0ilKuj7s9xTOnBjpGC5mstyYr1u3%2FqyCkf0AItyO4HDDC6YwwP%2Fm%2BvQPL7Xosi7L5iaaxMr2CrReI7%2Bxzj2xMV%2BqRmqCWb0jHHTwwWd9m89KQIOo7SuiuwPUW6vwANgEx3p0kq5CIX3TzQ1l0aClH3hsUwqov%2FWFfaH34X%2FzpPaFaxMettmb0XTNnoLewZcGVopMhzcaGUqcVtWOMVXOmmLSrkNZWs3g%2BHJU4RDIrQRFth00YGPqfCxBPF1VgDDrEUJcKQyq3%2BX4mSB%2BpypLdwwKzYXGno7psd4KsuuHn7YEqyqgG%2Ff1K5hD%2B18kHm6A0ZfBW684gRQo67v8kmzdaTcpi7vvDD91e1p9owKmbv3%2B1nflN3VWSmSE4MjCWnJoNZJT9dhzUmdYHWTnEb82Z6U84Q7kCWNt5pECGE%2BquKVo52q6NH9pyWHynM%2Fp10A1X89UNLNhDB4P7BmnrSdJiRJTM%2Fr870g8dMnCP2AMR7E9OpHY7v0rDD0up3LBjqkAdXeSOUfW%2BWFQ9a%2Bcxl5EEBnoxA9lvWnRAYJLnvORSBHIKEHT7pzbDKcxg2NpIlQmNho6NgNh3sWIhCKpd1FCIZYivyzd3OzrEAxbVeYcdWBharf0w7LKbf7HnewbtPnt7lkfXYyNdJ2py1EhMdlKrHQ0EdGaaYEZUrNVe5xI8UemtZIblinjWHEzdq1qEOv2PoiZCMc%2BRuRDz0CZ9JeTEzxNelS&X-Amz-Signature=ff25d53bbd5f7e40c0d368e5dd78374d54357efea12ae8a5430dddb178be4505&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646PAUS3F%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCBhceO9aqo0iflMeXYog9ApHbtHF1eJO09VZG7BEIH%2FwIgTSg%2Bw2FZLdB1sLKLd1rO7Dn4J4%2Be4R%2BPk9Q4vylopDcq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDJ4qTZFp3ytHmKdcASrcA0DNkprqMtsYSeXG89ScSIPRREPUUJvZOnRhGV8pO2MIEC6hXSJHBLWtgWcqLmi3BW5UBJ2M88ni2vnDr8a5MV0vShsqJdbotage0%2Fl6YEg4lD1Zzdf0N5xClpBZs4tC0lvliznErSHvLNjfNTIpkK0CCFnXmgHaN7YKpTnHDM%2FOyafoLMFguxfMMFgcXKilyvqjJElWG5zLD1Tow%2B9Twpp1Az4utm3E%2FxajhjeWYipKPwS70oSD%2Fb3OLaqYE6TeHakBrG8Xh8ogOW5CRRC2I%2FWd2IqnALjrWa9SFhNa51W%2BA0bwHzAUrCAMF2Hgv9XQGwiQsKkTtRRUHflmIdSkBxQmXqYT180EulgCbMSA8CZgr4B%2FubIEJM8z3pzE83mLpkB9ScZiWS4JEjhxuAc835VvaKqeodDRgpYZO20c5EXeK%2FaLML8lDuNjUcbWmrKZUblVbWZo2jCzDU%2FngJLnJmQT%2B16d3Jf5mO%2B04VfKIxzhSTLjahzmfoT9jAigwdK8EzJIt7IVwzfqPHaumu8KdoBM43wJLsL9FglhPoc9C0HqbImojGZh%2B4Hd5mCWR9HrCpU7tWH6J9Ur0kQb2drKsmCDmiawd6geEcpmYzqxOlVjMaTl0H5XqvtbL92wMIe5ncsGOqUBuV9DrcwBxV1KyiGZL8bcaCvdlcQiWe1PexrdVXf%2BJFlc%2B10lFd%2FYXKPKwh9Ow62uRLI%2F%2BH6R%2FsX31U4lIoo65T021lQUMJIMY61F%2FGWGcpryVqrneC4TaqTbReu6jZGRXlR5TAjLNd8kzHTdQdwjaklAKA3e4ytT6cPxAJZI0DglFbDJ4fAZQ%2F4hjd9XUuk%2FqvGgBlZZEfc2najbRfRrn6013TLU&X-Amz-Signature=65decb67a7d59bed6cdd57e1b989fdab2be96aebdbfbeacda804d4c235db25ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646PAUS3F%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCBhceO9aqo0iflMeXYog9ApHbtHF1eJO09VZG7BEIH%2FwIgTSg%2Bw2FZLdB1sLKLd1rO7Dn4J4%2Be4R%2BPk9Q4vylopDcq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDJ4qTZFp3ytHmKdcASrcA0DNkprqMtsYSeXG89ScSIPRREPUUJvZOnRhGV8pO2MIEC6hXSJHBLWtgWcqLmi3BW5UBJ2M88ni2vnDr8a5MV0vShsqJdbotage0%2Fl6YEg4lD1Zzdf0N5xClpBZs4tC0lvliznErSHvLNjfNTIpkK0CCFnXmgHaN7YKpTnHDM%2FOyafoLMFguxfMMFgcXKilyvqjJElWG5zLD1Tow%2B9Twpp1Az4utm3E%2FxajhjeWYipKPwS70oSD%2Fb3OLaqYE6TeHakBrG8Xh8ogOW5CRRC2I%2FWd2IqnALjrWa9SFhNa51W%2BA0bwHzAUrCAMF2Hgv9XQGwiQsKkTtRRUHflmIdSkBxQmXqYT180EulgCbMSA8CZgr4B%2FubIEJM8z3pzE83mLpkB9ScZiWS4JEjhxuAc835VvaKqeodDRgpYZO20c5EXeK%2FaLML8lDuNjUcbWmrKZUblVbWZo2jCzDU%2FngJLnJmQT%2B16d3Jf5mO%2B04VfKIxzhSTLjahzmfoT9jAigwdK8EzJIt7IVwzfqPHaumu8KdoBM43wJLsL9FglhPoc9C0HqbImojGZh%2B4Hd5mCWR9HrCpU7tWH6J9Ur0kQb2drKsmCDmiawd6geEcpmYzqxOlVjMaTl0H5XqvtbL92wMIe5ncsGOqUBuV9DrcwBxV1KyiGZL8bcaCvdlcQiWe1PexrdVXf%2BJFlc%2B10lFd%2FYXKPKwh9Ow62uRLI%2F%2BH6R%2FsX31U4lIoo65T021lQUMJIMY61F%2FGWGcpryVqrneC4TaqTbReu6jZGRXlR5TAjLNd8kzHTdQdwjaklAKA3e4ytT6cPxAJZI0DglFbDJ4fAZQ%2F4hjd9XUuk%2FqvGgBlZZEfc2najbRfRrn6013TLU&X-Amz-Signature=79f82b62c4a8efe82e01726f4001624b29a74600cf1b9d907b01ebe864e99af2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZYLHPOT7%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101212Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDgXEFOo5BrHfA%2B89vyC1xA9BlWRQoN0qhVsZsEr0I%2FSAIgUMHnQ1tjVQ%2BzRDHyxyQ60oXwbRpB%2B9Shc7rx6NpDeHAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDBtPBRVOIlRC3nsPPCrcA7s%2Ft1hbXAG%2Bt8HTPKJFj04sraTKw9OTppVgOwNmvxyXCjCVF%2BriGHt6C1lCI1XZC6zOYKCt0KhMLCR921QFpVtSVTMIvPVQ3rDbAQVAETMgKWbtC8qTwJM686Owpussh9OdPBrkMpbvcuDOeOozfbcc6NuhsDFHadVQz1ojbVR3M94pMr6O%2B1ML5mDlqX0cKQye6fLvEa%2BiyqWily3AkrP1ORMKR2YkTMe9jx%2BZSM1k8PVfXQs0d0aESPPWNCBs2OK5rkEeMavxhJ1LHyIU467NykkKABsS5K099CtDchvye4kVspbNjYjUVslObmwgI9uzIvygH2eUv9pz7VyPGUYQQvHuj00ldql9qTavmHVKCdBqX1hmqad%2F1%2F8LJU%2B6mjoGb2hnSUzgxRHtkP0N7kjPGsD1EaMNNzdo%2F7PQVaqtSJvK70lO7x%2BSY3xXYxSUeqK%2F694ULXsQZei6Ybu05jy4iuIYWKzvXmIF5gvhg49pJljI%2FDb8t4PkTeqUJSZhUlt6K7kUezc2FjTzLT52uphbfR9ajWfxXC9Zpol%2B8fPN0kGvImRMgtvdWP23kEVEailTblOoI741cKREca7J4oCp%2B9pRl%2BDYtMKJswKntzywjGbS56QTcEyLSJXKMI%2B8ncsGOqUBPogrW%2B3%2Fl0W1IOczrgMSitTf4183E%2B4HukEVDq2G1ZOx2%2F3Hh7hZdHkSaOeeOakJ94pPInQtiG7Ppx3mK5k83K2ayyzBxaAN4nDeK6R2g8rM0oQcfgW33TBzBM9gaDBXYnPjan%2FTjJJ1g0WtpHHWKCuh7Xe0MUYNdpIJXTaWVfQrqNNZR06VdV%2BheOSr%2FP9GuEZPadZByXuT88wAYKeyGhyT3RL3&X-Amz-Signature=9f98b8b3befdaec5a8d0b6ff57d08570faa1abfa54c72ae91f1dd4f70fbaf279&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVPMRC73%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDcVMkN8cCkYqCxhYaK6PzQ11Pv5LqgTYm7SvKs70cmEQIhAPK7bMLKkCEY04JnKMRgSBzCZkgmdOBnm43ZMQ67fRltKv8DCBoQABoMNjM3NDIzMTgzODA1IgzFLS728sH5xiA12xEq3AOt19Q8q5FnvLQDCI1HVaDxbWGc8cjZcLKlXz7nfIWFYpZ5TKWKRFgdWyO%2F49lfUr0HBhHwMYXqsQ9DoQ9y3%2BXXI0kCbeSkSNZy8A%2BpUcqduA2Sa3iMxl6TTvLcyID7UbPK4xVLLYBU2Okrod9wXAnO4%2B7U3CcT4vXpVI24A3tPMqj5G89LSDN3fG4%2Bl3PjsrXa%2Fe94tEQwzT6kl8t0WqmifP4pNa0iQxwt6%2FmhEMhXgw3fIR7BeAGgPZwHRx6Q6oo10ZBxUKiVOx30lK4Dk30tp8X0F39clk6H8H6LstAN7o5n14v8pyf7kAk7iPzMc0i%2BiePqaNBIAWebsCEqhka%2Fk59RU2BoTUPL4Eyotv6nuxC2amzLBTGf%2FeTYRAPGGD3oCbe8FSiaULT90gil1z9kX50jhbTvfE0L7YwTIdjjaj63pfF%2Fimy%2BaeE2LckedrqQ5QC12TsHSGvHBmA%2FlAixv58sKKkd0LUkeHp6ski5gIaumzLhkvwC3uisDbIHJQ8ByKvSNTv4vAeafpD45BvyTgAuqhhdlwC4rivSKYh5Z%2F7IQfjLbrxX9pzfKgWvIlNgB8EkFV7jemCNdx1J6%2FDfWnpzKkQrJGZ9l1%2F7k7w%2F0CCbLlvMIp8sSHVy3TCOup3LBjqkAUztqNbiroREza9uhtyXnWiJpHirwsZRCYr8FjhPYAW6VgMDh7Vkd56crhTBnJb2OJds%2FgXlK%2Fi4rcEaEzThZcQKmvLPLkFM4%2F0x99RmmmRM8B4V3wEX0q24nQpM48xbcGEZOHaFkFZ3vKn7OllI57IVVotYWgDv83HNbazy1vN7bXcAJ5dN%2FoH%2B7yFMiheY16rryhbHw82oXPVASpAOlO3KHmD8&X-Amz-Signature=695ba285bb7a300ba3eef2095134667079242d31bc9090ff07fa8cd1c935ae88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYNVPCYQ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101215Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIHq2KfaFE3wLG7HdvTne0BiB%2B9qTFQGkapzZH7UO%2Bm1eAiEA3ZvQXzvcap8a2%2FMQDOl8U8O7461QtdRTkBbj5KoGwtIq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDNu3ViUxD2u2SM2J7ircA9hSdd9tjSK61RJ6ix8PbqNGfbjPWqNcCiIS7fI3sqwFnRIkpYpyT4Dok41FtrstWcbKlcd8rLpBoJomFhyd%2Bzys%2BVREwZmYlyPFlXTm76vnJaCllKro9U8u8XrSnZ9YpsPJ%2B4yZOyt0WlhBKHUQWyW6taeDYXrkdm%2FNNbGp1ZXYsFU2rU4Je3E3aRvne3gVUNVKANFT6G96syle5PifggvnGUPpVnyBhzM4dRhFmHUl7akUO8ok4K5HbITDVQzGfobg%2Fa6ZMqn%2FBalYXVVy3YfuyS0ileb6V83Rby5VZjgWmiWbY4%2BiDQF2cUQc%2B1sHXTjVyEUD0EPndDRdX6%2FPDKT5vSoMDuKWY2YWBDwoqTUYuV%2BOJrJWj9qUuGli0gaFbL%2FNfgfxrWLX9WXmVhwEuUFDxlj8alDPLxcEAO7wyp%2Bi2JDHGXG2kLnt0W8rRrDcLG3W6rrYcDnOMZq9Lq0oJVgt5VFs4xkK%2F35EVbNupjn%2B3qwQYFSo4V%2FNJmozi7GFstALlmk5m4j3bxse5av%2FhU9zxm26BhF4VhmWO7UkCZxfTJ%2F3fLuLtpeNiXoX0TMyag0RDi2bS6kkh0f8uREuMGwR9eeRdUpcUjdPdDqfS%2FhM3ewrOAZvOQuCIh%2BWMNm5ncsGOqUB3JOetN3VJYRfPruHgLUWZIXOSFhnGKTNrR2xB2wYdV7rG2RRcD5hucUY0TbTrF6XqT4ye2wfxZqp6uE1YzC0V1%2B19Q8f0a4SENRKylQTipUWMoXWBP1aBcRyRxPPmHnwFJ6uBpX%2B00doSbZ7nPNKXOtJ6rRZbMMTY56AmI9LmPJFWJmw%2F3WFgCnG1RXDHH%2FP1SKrfOLw%2B25yWRdx5j0149EYyRIC&X-Amz-Signature=9b5b6d28af1b8835867b5f4378d5daa9c4cee83f1e093b08c62293fe766027e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYSZAD7L%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDiATSGEWBrLUWXrMbb0kaYx4iYHBXJLllY9NRSa9rtKQIgVX%2FPNu3z1HyjFyOtL%2FkQEZ8HHoavIXvgtwlE1tDjSuAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKrl0P3s4Zjun6c6NircA4gAgjhoD3qeHPAEKG1B7F%2BAe4szucHKazq%2BKXMpe9frA%2FLxOThtRQDLaTx7CsogIPeTKn%2FzJ4ir5gJF0T8nkl%2BDSnSHsrox8dw8%2BAYmhG3qdwykKMu2LuipqUKVhO7oc%2BGl6L9WOg%2FonzCxef0y4eDvbRuOKkVE7lTMNUEKxvp9Bk1U2pnSbWoRP%2FZKDCFHnPjvkZ%2BMIACfBTM6RK6hiQ4dFMwyXl%2BXXuKJ35tW18FtfPSDGsMqQL0WCUznsoSoEpm2%2FrDG1GmcC5dwSbY9Z6uRIP1LqvFfHQDQgcftIqPEvnX4MpCtbupfEDCivqgjbEbgM9nMssoFrWd2yTF9d8fjgWkTP2lG2jTkBMU8QvZsfeopsJN4kOrPsLvWIfY%2FdjRd68i9ZX8hh3rPK0wrVUuyilllacGjLFeAGS13zCBm9YRem%2FKUO2KCNaPDg6cnWezL7n%2BwXolHICLZMGNVMUKnO%2BPsc8uSKlNmv1CZmmS8L9ON2dL9i%2BGEEMVUYCuOnjhjtmdDAuKEgff5OJ8v9HEOVCYi24OFWQKuWaby0P2CH2jGrLYHjvpsjXh7Sy%2Fnu%2BU5d8hB1CtUB5JFwg1ZfXTFxBqDNVm2IU0gw20nJzdp4wysppf37Hmy5tDOMI68ncsGOqUB%2F1wB1tlKZI%2FxS22iNshYPBuQj7J90VsPqn78uMo8oFaYnTb7fAsX3YxIOo7qFYdx2Wmse%2F%2Bknm4zbZxlEt8YEcXWxQ8cjeHqFLs2SD120BKesQzab5RXo%2FGw0xOaY3yzkpsVc4SMnvWJ%2F8%2BnGhTDYjzpLp5GmacqNg6ceg1egW78tjgH1dAGceUN5mxaER2XkXlI3Y8ITIqhE12rktHoAgKtENK7&X-Amz-Signature=a4b67e97a5024c11364d78cb3af25f312600c92a643adb3c5ca206b33f03c03a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYSZAD7L%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101216Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDiATSGEWBrLUWXrMbb0kaYx4iYHBXJLllY9NRSa9rtKQIgVX%2FPNu3z1HyjFyOtL%2FkQEZ8HHoavIXvgtwlE1tDjSuAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKrl0P3s4Zjun6c6NircA4gAgjhoD3qeHPAEKG1B7F%2BAe4szucHKazq%2BKXMpe9frA%2FLxOThtRQDLaTx7CsogIPeTKn%2FzJ4ir5gJF0T8nkl%2BDSnSHsrox8dw8%2BAYmhG3qdwykKMu2LuipqUKVhO7oc%2BGl6L9WOg%2FonzCxef0y4eDvbRuOKkVE7lTMNUEKxvp9Bk1U2pnSbWoRP%2FZKDCFHnPjvkZ%2BMIACfBTM6RK6hiQ4dFMwyXl%2BXXuKJ35tW18FtfPSDGsMqQL0WCUznsoSoEpm2%2FrDG1GmcC5dwSbY9Z6uRIP1LqvFfHQDQgcftIqPEvnX4MpCtbupfEDCivqgjbEbgM9nMssoFrWd2yTF9d8fjgWkTP2lG2jTkBMU8QvZsfeopsJN4kOrPsLvWIfY%2FdjRd68i9ZX8hh3rPK0wrVUuyilllacGjLFeAGS13zCBm9YRem%2FKUO2KCNaPDg6cnWezL7n%2BwXolHICLZMGNVMUKnO%2BPsc8uSKlNmv1CZmmS8L9ON2dL9i%2BGEEMVUYCuOnjhjtmdDAuKEgff5OJ8v9HEOVCYi24OFWQKuWaby0P2CH2jGrLYHjvpsjXh7Sy%2Fnu%2BU5d8hB1CtUB5JFwg1ZfXTFxBqDNVm2IU0gw20nJzdp4wysppf37Hmy5tDOMI68ncsGOqUB%2F1wB1tlKZI%2FxS22iNshYPBuQj7J90VsPqn78uMo8oFaYnTb7fAsX3YxIOo7qFYdx2Wmse%2F%2Bknm4zbZxlEt8YEcXWxQ8cjeHqFLs2SD120BKesQzab5RXo%2FGw0xOaY3yzkpsVc4SMnvWJ%2F8%2BnGhTDYjzpLp5GmacqNg6ceg1egW78tjgH1dAGceUN5mxaER2XkXlI3Y8ITIqhE12rktHoAgKtENK7&X-Amz-Signature=6a28ad11c448b5119de14dc5f0bcf3b403dec2cd0ba8befb7fa73ec9ba55ac56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDC5VRIF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101201Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDeVeqfvbvsJmgiUhNiVdeE%2FJC5u1qnT170GHq2wXBzXgIgbaHxyj0f2WJ3oRHLocCIKiqR2RacjES90KYHGtps%2Bacq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDEh9pmRiX9UwyCa9MCrcA%2F74hd23PGWU30O0ij9VQUEfD6dFOVP3tvbdN9DGpk2gKtSn6TaTpDhfE0nkQYS7oM04eDfshnmQjzuqmiQ4kAK7wjNYAV0YBnDiNI151HZGh%2Fu%2FlmimVmUnxASvoYKVMGk%2FAV6r5bEqlulj729bTGrOIrYmts9Whbq%2BjE95mXRr80F%2FajZsh4MWOa%2BBkKhkwz%2FYym0VHTp4k1iEkeUL04H%2FR4TRHRbq9O6CW5tw%2FHfvhiGL3NLxYqF46kEEE0lYQqqAbE0pEUjAxPUs10hQ0%2Fwzwc9HrfZZVkdv%2FhK7u4Xizhi%2FA2jhaUTRY8C6Yya8EQ4tUD0He0wJRIXTeR4oOFU2fCvOA9YPxiOZqg6xrfSelpd%2FsJZat6KTxx8s2CMr6hNkJHH22zjVi8TQVMV8jwhW2NGClN1QMFCuAocYNK%2BuYjR3nA4bYY5uPUU%2FE%2FpVzNn30ENvbX8kROuxxQEM1bMoIXJanGH2RYqbvvzEF3AVkPAIHxYQyeErwjbsKCtp2zrBXTBvHMVGcqLBWnuC4WgHJeGLlmweQsuz3Qua7JnKiY1QoDIgurBEqI9xG80zoPtbefSFOta%2FL6QCPbdqa8FhXeqMveEz5j2Edh4WYOniiSKX457JUJitSPGPMJy7ncsGOqUBh5GVGu2hs5PAN4LoL1lZhVAW%2Fkc5i8qQYljX3IbI1vyckqlbY%2BtwLEggez9VDeZPNUHDHBwH%2FnRpy2eiaxKQ%2FLQTC60QgXQkT%2BYKg9p3%2FPkdKJNVUGGQBpDpwVCeTmgc3v0hc7sYd0YcZBXtZvY8YDKZaGQtpfJS9SqtIvULT%2BD4%2FvFNwc7PZ9KqPco7UEXfvGVhX3qEZq3kgNBeCARi5hZBDE0V&X-Amz-Signature=e6c0e70346bde61277cc4679f0830eb15568e9eaf58b3f22c688db78c8b57729&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JPZEVRK%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIHE39CdJNaP3jz47rk66LfxWhSi7CXfS%2F97VQ9eAAK%2BPAiEAgmEIi850WTckretqt5dFOaRrMVmFQs3NL36OSqqpUuYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDAC%2BekaRHyACStN7BSrcA19txGuA04VmGqHXhJxPMx%2BxM3quxKLvTPlo7p8o0AYZgV0wbDcfpC5l53PdN3eDhFyDxNcDax0lnxbass8JQnMKLNWGlwbk8a0Xut8s2pclxKhAnav%2BIKrS4ojYsVYNh5DPpFDiC9cyGluaasj4qOykPkmVdmWIxDEsN0NZajrlKFToj6gyq%2FVU%2FAcnNsd%2BjwAowceJpoywe7RpmCS83g4wAOS9BkrjRuEgTvm%2Fmtk%2BGi0Vz%2BkajhmKnL9m0qest%2F0SXP9%2FNe%2BnD4BVWwncsDtzDETV3o1Wb9BK8VEiyIp0QSSPQ0Qbo3tv4FY4J2iK5gBkW1t6bzsApeaashMAhr3lXMub8k2nuSN8J0UCKmGAaQr4GAQd247cwTn1UPaeElsL0zkCTpqvkuDEXnmfZiq9EB4UsKeNK9GcdcO9KbWR%2FE7oxpBVw4hz%2BBHW6eJZIi0fiJb27NC10mPsTGD5mLgoutaJKftO4ZRuGaXBzE%2BLl2Qs4togtU0Isl6OpgHyrcujlOh9bGykglyYh3sUB%2FyxSAOFpsSeog%2Fpok4ODXp27QHhWDe9gVcIEBPzs%2Bozl3kNwrvwvC0fMcPF4h74QDYkbM2A0ZlT0jb8Z0NwsYKJL4Fu%2B08QLFJ1%2ByDzMM26ncsGOqUBDjuHSJlWA%2Br%2BvCaVLgFaxnSCzAcHWIDGFBSXy%2F04TxoRsT5VgwdmNPvzu2%2FwjRqaswPixDs6BCSatjPtkfVJ9n0lXVpQDRe6vz%2B9r0QuwwAC9PnaKf28isooYP7k2zQEsHnVj6snZXlhYpHb7Ob9ThE4tx5uRBKVhuLmhD%2Brw4%2FCdJPwRxYPuu%2B5LfIWBNCu0pstnLdVXPBpv5slxSgnOso9HSUR&X-Amz-Signature=aa933d0f535cb67ed0115ad34af671f634315755f9d486d517aadf1261c2a4ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663JPZEVRK%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIHE39CdJNaP3jz47rk66LfxWhSi7CXfS%2F97VQ9eAAK%2BPAiEAgmEIi850WTckretqt5dFOaRrMVmFQs3NL36OSqqpUuYq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDAC%2BekaRHyACStN7BSrcA19txGuA04VmGqHXhJxPMx%2BxM3quxKLvTPlo7p8o0AYZgV0wbDcfpC5l53PdN3eDhFyDxNcDax0lnxbass8JQnMKLNWGlwbk8a0Xut8s2pclxKhAnav%2BIKrS4ojYsVYNh5DPpFDiC9cyGluaasj4qOykPkmVdmWIxDEsN0NZajrlKFToj6gyq%2FVU%2FAcnNsd%2BjwAowceJpoywe7RpmCS83g4wAOS9BkrjRuEgTvm%2Fmtk%2BGi0Vz%2BkajhmKnL9m0qest%2F0SXP9%2FNe%2BnD4BVWwncsDtzDETV3o1Wb9BK8VEiyIp0QSSPQ0Qbo3tv4FY4J2iK5gBkW1t6bzsApeaashMAhr3lXMub8k2nuSN8J0UCKmGAaQr4GAQd247cwTn1UPaeElsL0zkCTpqvkuDEXnmfZiq9EB4UsKeNK9GcdcO9KbWR%2FE7oxpBVw4hz%2BBHW6eJZIi0fiJb27NC10mPsTGD5mLgoutaJKftO4ZRuGaXBzE%2BLl2Qs4togtU0Isl6OpgHyrcujlOh9bGykglyYh3sUB%2FyxSAOFpsSeog%2Fpok4ODXp27QHhWDe9gVcIEBPzs%2Bozl3kNwrvwvC0fMcPF4h74QDYkbM2A0ZlT0jb8Z0NwsYKJL4Fu%2B08QLFJ1%2ByDzMM26ncsGOqUBDjuHSJlWA%2Br%2BvCaVLgFaxnSCzAcHWIDGFBSXy%2F04TxoRsT5VgwdmNPvzu2%2FwjRqaswPixDs6BCSatjPtkfVJ9n0lXVpQDRe6vz%2B9r0QuwwAC9PnaKf28isooYP7k2zQEsHnVj6snZXlhYpHb7Ob9ThE4tx5uRBKVhuLmhD%2Brw4%2FCdJPwRxYPuu%2B5LfIWBNCu0pstnLdVXPBpv5slxSgnOso9HSUR&X-Amz-Signature=aa933d0f535cb67ed0115ad34af671f634315755f9d486d517aadf1261c2a4ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFAHZWTF%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T101217Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIE7M5kX1ZAl8pCTRl3eoiiaOzAJAVmPRm8TJSREHx40cAiAGXVHM0rT3Vsu8mczE1iFamE%2FQ1RBYyaP4wQgtmjrT5Sr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMWQegugdaCu2RyZb6KtwDZENbUjeEKWYQgrbjKqko923Rq3DgAfWWIIWeL%2FPnmbYQMUxJ2EOXYWieRuX3YX%2FDN805isKgHPNYRax2DDp6OrGpayHveuAMwRFBuoYuPxBXsHBarQBvi2sbcZ26h7Z67FXoyNfMMKnc0rP9ThHxt2pfnQX%2Fv6%2BhRuGycSIIeERF%2FGR1Qz64D3tUoJS2U6BK4YlHw3fYEp1dNjbgiINnW2uOI8XCg55of7RcW%2Bz0u7ZTCsk9t4g56B68Wl3o3TEp83cfZnjIVS299Lc065Z1TNSp73jOyd8VPDvH3316wVxi5B3zVfSJwD2YPLeqPuhWxFotIZ1Y6yLKvko%2BF%2FRDgZdWDzM8Cpisif%2BhUX0%2FlmUPUK0uQYR%2FpSb%2B3PDiqxdSMZVGliHNllNM3%2FSxYohccu3fpnfQAZ0Ob7fJC10WEMeYvFJz3lb4HZqJYTUpk7IqbFoyQKn48unPUO2QoS1il4IcJdwnqS934i2WTb36FiPsx%2BllA%2Fh3GTr4R%2Fq%2FwdA94ZapMWseLbjQtBfgeOejBZQfFkpfLa%2FHPIq%2BqnFZhkRV7NC6vTkKNV5mzoDcb49tM3xiYxZe8T3ZbHavaRDptGpdq%2FF4dAoE%2BDul6LbqtyqCe3IT5kiTUyYHBhwwhrqdywY6pgHX%2F3uT%2Bhe0m5Y186L2FdX78Q0zRSBhHBP0u9XyoZW3EUGt9cvEPxIO9f73X2%2FO650%2BcrdbUABsBZ7GPEN8zWbpwgJNbgOumNoIIXgH9nxKVzQ3AMPwiyX0M%2B9RJHZyrrFLM%2Bk%2FNcr2v6r3AA9DnYSlG0Jo%2FnFdeg0OzUjWZ4ZOtc2d%2BX%2BNVFYWGRjNiUMMV6B0TwgeuYC8%2BDKVTg0%2Fv4WwiSi2LOVe&X-Amz-Signature=7a6ccd9d1c99c63922afcec28b9410f374586b01719a3fc9a493d292a369cacb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

