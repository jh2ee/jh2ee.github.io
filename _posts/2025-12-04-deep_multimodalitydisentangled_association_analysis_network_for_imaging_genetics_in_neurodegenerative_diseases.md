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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SZGW6EO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDQPtwlQAtPRUkpev15nxdCkImssXVtELMIKbYeX2VwSQIhAPThzevAj6P%2Fl0y60GF2M05zPZb3RL%2BqK5OLW8i%2FrWb2KogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyDGF7yTuuOnIEQx38q3AOdl5Z6am3VmfrY%2F4gXb8g%2FLhy%2Fx87soATqWmFtkr0wsRp%2BxiTItg2U198G8F6yLCNgFzJt%2BIGKeHHARMlb%2FJ0GOYXqgwP1qdwVqJlw57TQV0gukVdosasydtcxbpYUtL8fL0aQ7aWrOXWMqsXtwt4CiOSGKYXNRAhNDbe%2FXAna0AEnNLumV%2BoORdvK%2FI7qWlPVFrfAbWDDAmNp0yVHc7t0%2Bl81AhMQUlXgMQw3g540hGoSd8goQTFaOrLzmPvjei4A4pZBnMA6GmA0a5Kvgp5YMd918OPx%2FdTTxPWZeZqfrQhrNihmteDwu%2BWwM1AFfngsRxBGyuXMriGMfl5OOYIYpzZlKm8gIrqA0%2F%2Fx%2FXte3Ktjc%2BOXTfPerFjGsuEK66kpOiKMH4eP8LE4kruM25oNG42X98Tvh7E8345DwYpbxliiz5gqktPal5zcOlkxUbTLWkcZgKc4%2BuBxi%2FclsLemARlwp%2FV6QMefgmwUZVlWoR6LmP46a3RQMUSkOIXr3Hki8DeoYMvuXfjiUucbRJ%2Bn6gkS0d1dyHs7dMUgqWLjDdVxknWJD%2Fg6xQILhuGCbcVa5JhTnCszySbFg1eLnNoG99IHAT8XMnQe9oh5LXoGos6Md527iTvnud3hDDC3lpbLBjqkAfk%2BUAofNd5Omq%2BxDJGCEovS227FrEvtPyTOlTIBI%2Brc%2BS%2Bd5eQfGsTmTtGvX23AOd9IyN0%2FWDe7%2BzqbwNwFbLPk%2BkbTTbpYrPsM0F3BXfeVrWNW0xQa7ziChz%2Bu%2BpFDIoborMWgUpktp3dF68VizpDWKcJec3lYXB2L4FZvOWs8YnHkEckQY9bUFVXQiex0gctiN1vv6NDUxP7XrdH0bnfxsT5v&X-Amz-Signature=e40caa68aad9421fde6dfec8a848f9442bb3a675889a4708e6fdeceeb2c9988d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SZGW6EO%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDQPtwlQAtPRUkpev15nxdCkImssXVtELMIKbYeX2VwSQIhAPThzevAj6P%2Fl0y60GF2M05zPZb3RL%2BqK5OLW8i%2FrWb2KogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyDGF7yTuuOnIEQx38q3AOdl5Z6am3VmfrY%2F4gXb8g%2FLhy%2Fx87soATqWmFtkr0wsRp%2BxiTItg2U198G8F6yLCNgFzJt%2BIGKeHHARMlb%2FJ0GOYXqgwP1qdwVqJlw57TQV0gukVdosasydtcxbpYUtL8fL0aQ7aWrOXWMqsXtwt4CiOSGKYXNRAhNDbe%2FXAna0AEnNLumV%2BoORdvK%2FI7qWlPVFrfAbWDDAmNp0yVHc7t0%2Bl81AhMQUlXgMQw3g540hGoSd8goQTFaOrLzmPvjei4A4pZBnMA6GmA0a5Kvgp5YMd918OPx%2FdTTxPWZeZqfrQhrNihmteDwu%2BWwM1AFfngsRxBGyuXMriGMfl5OOYIYpzZlKm8gIrqA0%2F%2Fx%2FXte3Ktjc%2BOXTfPerFjGsuEK66kpOiKMH4eP8LE4kruM25oNG42X98Tvh7E8345DwYpbxliiz5gqktPal5zcOlkxUbTLWkcZgKc4%2BuBxi%2FclsLemARlwp%2FV6QMefgmwUZVlWoR6LmP46a3RQMUSkOIXr3Hki8DeoYMvuXfjiUucbRJ%2Bn6gkS0d1dyHs7dMUgqWLjDdVxknWJD%2Fg6xQILhuGCbcVa5JhTnCszySbFg1eLnNoG99IHAT8XMnQe9oh5LXoGos6Md527iTvnud3hDDC3lpbLBjqkAfk%2BUAofNd5Omq%2BxDJGCEovS227FrEvtPyTOlTIBI%2Brc%2BS%2Bd5eQfGsTmTtGvX23AOd9IyN0%2FWDe7%2BzqbwNwFbLPk%2BkbTTbpYrPsM0F3BXfeVrWNW0xQa7ziChz%2Bu%2BpFDIoborMWgUpktp3dF68VizpDWKcJec3lYXB2L4FZvOWs8YnHkEckQY9bUFVXQiex0gctiN1vv6NDUxP7XrdH0bnfxsT5v&X-Amz-Signature=e40caa68aad9421fde6dfec8a848f9442bb3a675889a4708e6fdeceeb2c9988d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QITY6ZJJ%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQDzaB9diX0CqsScIuugZVmTNMQfLF07u29Rf9uVzIvh6QIgD%2FCjUFBmaTgBdW8niWndCaLmymrp%2BsUA9a5JKHOCdisqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIDRiwzF5YiRdTa2IyrcAzRvPFgAfbsccCYC0l2QhY72blnpekbe90vOVGUIz%2FtMee7H68l2VCDCstcG9ofZKBUZv0FJOR9TcMgItdPy7zfcLyPZAHn3UgpK5GzAzJLSifrecKGJBnNk7kOo1y4F%2FWj23qpM0dmnMx0trZDBjH4NVXJ%2FT%2BjxBD56jVQhF%2BeSC%2FgTFuL8NtDb5X4IQuekpFnEjQA8mu5WTI7%2BkonGKZF9VH135ilI9s4GxQxym%2BvOWGhW5u%2BqlBeTSddVwVUwt4Kg2U5lij4LKEIQWRpzCX1yOrIKRVatoil3d7JD9rBqtVSmUY2E5F55XNlXGJjBx0ddVTi%2BygIMzKku8OFNvHg0b1xZqmwJ5LkgZQSGdIAteqjytcrVTAIu17BIJNqOdwQe8Kj9zJijRNvSGCPfry2ZbhZ6oID8zhwVSc6k54%2BhHjg0IrCv7tHvIiFjYpbLZYai9wziaXQp%2FPNk4sJQHK1isCiHeM4F93fMpbNc5lCxI%2FYeYQDXl%2BW6%2BqU%2B8eHXTuthGKDrCtIGoJ%2FLJEYYCM2ltvhRYki5mmyX6Li%2BTVcWrBKi3MMFVQKVPzeHlEh5YjEm7%2FdxMnb03zzzrbT575QI5TpEL6coJKe4TyVbPGH032RtDgbUEpNYXbJUMKqVlssGOqUBEZ%2FrbEsbqXHZ1rPwb2DNfp26%2F89TaV4LLkX%2B6ukTeaG0K7zzkB%2FjrwIhrQ1LUKEEA9HX7pYbN7YZANW%2BAc5XA%2BR7hkcFMcSecRC7Fp2A7X6V5PScZohpYa3PAs5OwSkzIIKPya3FGoYJyIT3vqMZQVX1WhNHp3%2B9xgqu3krZAB96RDUuY%2BUHvZ2QeFVL8vyNeQIpyFqYMY97sJ19vQH2iaICno6K&X-Amz-Signature=f2194c54ce169349ac2493f5622a0a3913c77451988ecd29de62609544c9ce38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WUWWLLC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDW0KZp0h9KNIUiMCAGf6S3wa0p3TUCiwc64WCr0dfDQgIhAMnjkDEpZyATvUSLJ%2BEnsCVb8QDMYuhie0Z7OLnk3cZ4KogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyaBXgMyGi0XtyfDkAq3ANZ%2Fd0%2Bq2l%2BFpMXMIXfSJW1xFMNBrVVkGP41zJ1tgrBIOwL8%2FUuxeo6XsIALVi6bQ5mvWHGirzk%2FW29voUQBwTnrLERGsnbJ9lxETRmZPfLpf2ly9VYE99yzkYcr%2BQrUzKz%2Bjw8dFJNgnujFjG0c8fsI9KLabJgUU%2BOUnl7K3CpF1z8XIsedw2miX6Rwfs6FEPCZizZpBKWgicXQJYIQtIcqoEr1Oa1irJefGpHPcQH89c9rbLmQ%2BfP8rTEBMTQ5kfJimq4cl%2Fqe1m9A8clTrsslapeoCMj75BkltwddLBNloB5STFl4WBs3LdfxN49sed2T46Ki07Vu9Kpqfny3uk99HYosK%2BB3fZtrdUDEAnEHYgaA1Al0D1YKZ0%2Fmb%2Bqwdi0uITNvDcDwWJ3J0NXaX%2Bd0r0sxlIFtHRVQj1s91VINQAqfcp%2FduGTHCfcwb5mXjv82%2FHdxBf3SnYYTNkrvsSYDAHuHwBJq8Uk8iiAMkRked6y0dEN9ywH0jxOT3fp9mzMXpXDDl04oJqNaJtii1ZaV1n8RwH6rlZd9mpB91PJ3m1G4xUqNcgroZO1N9SDEo7nYOpxsamcAfP9dH9915JFP8PpC4x8ZNyCBdxQWb0PX4giuFTorAjvfO29cjDdlZbLBjqkAaElxanf2%2BLFnugOTxyWDEASvWyJElwjZmD0FmzxocSlBUv5Hk37vMzkyXzKUBzkVt19FbQzvYVq8x%2BlElsCsOkjDJ57mrbLWFZsvmV43IDTKpzF2Stm0GKSgyFHm8ePftu89qdAwl8u0LVoaoB%2BEODERS3y%2FSaldXEzJM4sWeXVTznirWR5Cma0GCz7Cb73xTCjg9EagYcvQ6U9TqkenLx8f4JP&X-Amz-Signature=a489e40e2434221cca5996b2a904739dc2655d4999f58703a55c78786255a7de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WUWWLLC%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDW0KZp0h9KNIUiMCAGf6S3wa0p3TUCiwc64WCr0dfDQgIhAMnjkDEpZyATvUSLJ%2BEnsCVb8QDMYuhie0Z7OLnk3cZ4KogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyaBXgMyGi0XtyfDkAq3ANZ%2Fd0%2Bq2l%2BFpMXMIXfSJW1xFMNBrVVkGP41zJ1tgrBIOwL8%2FUuxeo6XsIALVi6bQ5mvWHGirzk%2FW29voUQBwTnrLERGsnbJ9lxETRmZPfLpf2ly9VYE99yzkYcr%2BQrUzKz%2Bjw8dFJNgnujFjG0c8fsI9KLabJgUU%2BOUnl7K3CpF1z8XIsedw2miX6Rwfs6FEPCZizZpBKWgicXQJYIQtIcqoEr1Oa1irJefGpHPcQH89c9rbLmQ%2BfP8rTEBMTQ5kfJimq4cl%2Fqe1m9A8clTrsslapeoCMj75BkltwddLBNloB5STFl4WBs3LdfxN49sed2T46Ki07Vu9Kpqfny3uk99HYosK%2BB3fZtrdUDEAnEHYgaA1Al0D1YKZ0%2Fmb%2Bqwdi0uITNvDcDwWJ3J0NXaX%2Bd0r0sxlIFtHRVQj1s91VINQAqfcp%2FduGTHCfcwb5mXjv82%2FHdxBf3SnYYTNkrvsSYDAHuHwBJq8Uk8iiAMkRked6y0dEN9ywH0jxOT3fp9mzMXpXDDl04oJqNaJtii1ZaV1n8RwH6rlZd9mpB91PJ3m1G4xUqNcgroZO1N9SDEo7nYOpxsamcAfP9dH9915JFP8PpC4x8ZNyCBdxQWb0PX4giuFTorAjvfO29cjDdlZbLBjqkAaElxanf2%2BLFnugOTxyWDEASvWyJElwjZmD0FmzxocSlBUv5Hk37vMzkyXzKUBzkVt19FbQzvYVq8x%2BlElsCsOkjDJ57mrbLWFZsvmV43IDTKpzF2Stm0GKSgyFHm8ePftu89qdAwl8u0LVoaoB%2BEODERS3y%2FSaldXEzJM4sWeXVTznirWR5Cma0GCz7Cb73xTCjg9EagYcvQ6U9TqkenLx8f4JP&X-Amz-Signature=871f57008fcff947476716737a7eb9dfc30bd3643fc70f33b44875ade2ba55d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZNYDXSF%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIF3CC%2FZ%2BrKZ0DJOROc7mf7n%2FHm5K77GylFLpcqOfBn9lAiEA%2FVRIYgTpVY2fKGN3qkhbIJDsDRGREOmudRcZL8oAGEkqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ17TnjRbcGpnc47tyrcA%2BgB6SNR96%2Bfp%2BlUEuXY6uenqvzDr4hVzfKGwPcadtIRoJcyZQaSeV9K8EOhrVygcLpPjx3Ysu8LunbN0DLAOffHs%2BPLYA4Ts0ZUGLD4biz7Hfn713dLgAQEV0D7Y14tAQt%2FWo%2BM0luEdyuPjVHAwEhlR%2FV6wfOBLVFAkyuzEDKA2btX2yYXsGLwCy5%2F3l9sdk861FrpUau8Mgp6Fre2FSUP8Vo8irjUoZVbyzWcdHWQrko0DZ4iJtrOlIl8TRptYqPSecFAW7A%2BPrwS%2F9oCApZMrrhcGTgCdUpcD4pfelD9sqgY65hnzIeVNcfq82GbMpOVQv9EBwkysYJSyCiYjgoOEU%2Fi%2Bk%2B3%2FsTw%2BX%2FJdaKnyM79pk3PsKfBqYWJ54RAaYH9KdxxO0od3qnAWQg1OsrO5qZBj8yDESi8%2Fyjac7DBRm74PWusF%2BW5d%2FFafx5tfi%2BX2xrOMwIe6nwOMaiezRJhlqQ%2BGo%2FaMp%2B6%2FMMd2CZQPrL4%2FIg9rRxiLnQBnPHCV0k7Qcy%2B%2BAYCIHxr5YDe5YzVXj4uvM3FPqtxZ9JoiU3dsHf2PLfcN2EY7NRc2ITOg%2Bh8LK1yTydCFS2n3UpKnz5P2qgBS1PrgilGsRPcBbfulrRTIbLy%2B1OwCw1YMLKVlssGOqUBpJwsZTcuUSdg0hR1FF0vuq6h9mspZYYqklia5JyuWNO0Cs3ZZ%2Bg5IpmoBTmslGzeEiXUIn7WVhTo8xTJuUJFcaBbhkyU9lWvJJEyUonohlLaabYJZQUknVc2H7c00n%2BPxjbH90qMeG0q9taQSB8pEMWKKRji7grIm6rpHQxw8IKaHeZ0mcZyBUEgrSScB7KqvGqTbq6NldPTFiIkvygKSznPngox&X-Amz-Signature=4966d9ec707d1eae546f60b43a23d308db40840866f621ff83635c0381c43a1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXO63D5X%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCmfFUHB0f7%2BhCrys%2BZBc4Dgeo03Hf4bY8hXTCdS9iuCAIgfdCcvK4%2FqEN63RRtKB9PmE00kcNrymFhCrY4lGJvYRsqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNmaAwBkA%2FKdpyz%2FnircA%2BYwuCoJDy4kEd4tfuhrNk8WwsQN3%2FHzWxnY9WfH8rvyq%2BzknGq44Lb%2FJQXmvPcrbazplmYQV0GJW4F8LUMs%2F6pazVygqY06K90Of9ZRTQDu%2B2IK6Y7bWTyKCcpQBmqXebEpulQlWJ5PX574a3CRY8AfPttwLxFDoqznhStuheJexMeUZczpenj20XplCWFU1ouBRymqGRhtpYkgwa3mQ4FlmaaPAC16URm8PUGd2Mj7U5kjttg7pIvdzke8ewyLHaPsLnWD9UZ5Lwb5gwLIkF9jusNGiFNw4IngwU3LWz7GttnNTQkztvBcTsIp34yxVB1lWgp1MNAgXMlWNAezyJAQMF4jmQGXlzQ0frqMDnwyInU8DqkcOGrgyludV8%2B3f1FImmpaT4Y17O4B2TH3vPsdSjlw35%2B%2Fg9jVM%2BE7RYagKDVQ3fCv8WrFqpeonGdiYkdv1qzcIUct2%2FfO%2BcQg%2BvQHRQMV0Z08Qw7jWy%2FgxM7yA5RNSiicoVzT%2F438BbhE%2FyQGmKc4gSeg%2FIpc1gtQU9p4m10xmtSl36bhg7l9pxVl7eaY7d3q%2F13VkpHz82PjGTvWhcnfgVN63f%2BLcwa0aa1FrSWJnI8HaeQKYFPYGeDVSKJ6BtKABqfV6qJ9MJ%2BVlssGOqUBbUIUsMonYUcD4Wq1Ts8L2wj%2F3lAPMCsgABUqPamPlo4OcmaKJ9aY5uee1B%2Bupm1e%2BLYYcXnHycnMOzoUK2vOMcefBPpTSOil8i7ZdVcqarwODHVHrHbtG1nHHQc%2BhhSh7fFxhzFhIqW%2FtURMuJJ1Mj3iVlgjdPZufeubVz%2B39LpkYF1ZwjAOX6v%2FZRsMUESZZ7Xh7rKuKUx39LCw1rHecZNJhEzI&X-Amz-Signature=bc44f2188357a60817a35e2eb58a03a6f1fd72175efbd7c4ee1d24c5c39bbdef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663V2MNP7K%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDdVuSAhpxzZTRX1BGn8OJttg0MbRE6NpNO23eBQ2hP9QIhAMm42a7yon5J%2BXVuvWTKzw9f6oMRvrVYNVyLfy45d5rJKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyYEgHMhWmDC4HsIB8q3AOGwqDP2%2BF2lXAHE8RDvJp8AS7GEM5Vq64Sx7AdbwOLbUVvLBoXqvW7vlpV5otivdQU%2FQpqPGhLM%2FEg6aTW8OmVoyNAsc1Rr0JZ8lKkooLP7HmGauQYNxOv0jkOEgY%2FUaNtU%2FhH9ycxD7TBlvMpodhN0vsDS5YTYfA%2Bw%2FKrlnKHPU2c36vdGBctkV4Lt3n%2FKyhSgtyO5MYNOyQv5TuNju21UiSu4C32ngBT7VmXhCP%2FoJ0gzWxLEjk0aDmtinSg6AvlXJ%2B0Zp2EL7pxUZzTiJ3qM%2FGEYiHfpQ2qdiih%2FdHLoSnzrHrmyi5xY6zNpvqeADxCMVn38f4FzYiCie03G7UjcLeLp%2BkMB1xKOf2G9ZY0yHAofhnFZbonprUbHsv6CozFULkquVK2WfO7oiEKNvj4Fqn4zGHsIWmSo5bsHoQMlGOhm2cK0SwyNossAicisdlCpx1V8XTWfw1TVkJnLxQlMHZg9CU7QEoFf9uPVtbYMXFrJFwvzTpKtbVACUexKWbXRsdFbsfIUM4IDZwtoMCdGzGjhDsr6APLUNcC01R%2B4%2Bar%2B36lgw352IO54p92pNd%2B3ZgT4Css2vru2huRtze7gVdDQ8TmK8i%2BDQUkpxE1hR%2FKSmhSkRzsIxapLzDclZbLBjqkASPteywFVeCZrGwILpk2qdwxl1DvPj3gZwXAC6Vf8wZL7zSvPUwcjgrbzGD1eDLjStJJjPc7KOlik%2FJpxJUItsfdYAzFmKNyHXPzZOeEW7ChoQSUG6sE0hhx%2BD8QJd4qg1cbPAneKPo6RexiaEQQ3DGw9vh1Ia0GxNW0YsnscB0YCBH45%2FDqFm%2Fgmb%2BtLXYP1v3rMDrp%2FwqppYewqrUgHHEEu7e%2F&X-Amz-Signature=acde3154a1a3ddb6d0e9927e12a5efaabc7dda466b69f53d713b03f2cdabbd70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3EI7L43%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCaszlP5rYE%2B3yDpqQ93v602Xm4WbaVWq4kDr1fcUvawwIhALJNYJGpVI8kF6kYbcrEsTEPhLT86b0BFz0KFhNKZ3GNKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgybkDWuAxh%2BCaVCX48q3ANXdOXlt9XQeC1N%2BoZgFT%2BCJPY8EgeQP73J5HPgRolF4d%2F7l40i5B0UInIK4hRnx4Cz8IJrIqsVOzg8m4MkPK2Jj86YDkR%2Bbdp75ohkgaIGFzkkj5GTyafU1JHaOwp0WgBNrjGbh7%2BVhRQ0Iva%2BfMSxXxUkMEkiPAAAd9ZwXPMeO3IymKayPd69cEBmLt8tNmZrEdLql60I2tkmfpuTFR5WeIgqO0dzrWqBYROAK4xLYwYkTMw%2Fq60AUg%2FUd3%2BGU2cIcdCWvNWVsnxttp3XeKjpubXADCiWQBTOq0n5tPQ%2FX09px2z%2BWWOAbFNrR6e6DuwQvkDby76hd4e99vlhUd9mNbPLD3U6pQXcGlGiyB8X6ICUafgd7sKp9uQskp9IPP79Lbg7scUek6QytawrgMtFDxuqzS1axDDm3T88daw%2BSwc69OaJrUHkrmxTp8M9WHSWlyphh6k4UPEUmJki%2F3kLbQI6ZAj1HOOCgiEq0st9EHNC5J8eR13f4xJaYoh23TswqhmCzsFauYlL%2FCXgPznPjYk483ykWkNtvbtMf79FHlgOEp5WNiRkcN4C%2BQyjeBwSfn5K9DbwTDgo7cLnJDuvyatl4AE6wDoGr5A6rHbOJXDTvJkLRsVJe1dI0jDulZbLBjqkAVyyDNV8XKtky5RnPYgH0Tluo5aXhNqyouCSm6KSIAnkG6u79N4NbelpXessVw4deUIWfqPgtm6NO7XazTx7o%2Fma4ZXbCLfkJxEjTP2mTqZH0PihxmsBeaj7DHk7keCTrkmnLrT3oIj51GjiJQCLrVLSwa7dfq58FZRXPRCrATKv8RZZRboiWZh9nvPPEF%2FpjYCP4xL1lTr3SqXiFr3pT8D4yWa0&X-Amz-Signature=627ada49e844df682bc973b2832ff11d4047c726cfdc31873f6c7da7182ae217&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3EI7L43%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCaszlP5rYE%2B3yDpqQ93v602Xm4WbaVWq4kDr1fcUvawwIhALJNYJGpVI8kF6kYbcrEsTEPhLT86b0BFz0KFhNKZ3GNKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgybkDWuAxh%2BCaVCX48q3ANXdOXlt9XQeC1N%2BoZgFT%2BCJPY8EgeQP73J5HPgRolF4d%2F7l40i5B0UInIK4hRnx4Cz8IJrIqsVOzg8m4MkPK2Jj86YDkR%2Bbdp75ohkgaIGFzkkj5GTyafU1JHaOwp0WgBNrjGbh7%2BVhRQ0Iva%2BfMSxXxUkMEkiPAAAd9ZwXPMeO3IymKayPd69cEBmLt8tNmZrEdLql60I2tkmfpuTFR5WeIgqO0dzrWqBYROAK4xLYwYkTMw%2Fq60AUg%2FUd3%2BGU2cIcdCWvNWVsnxttp3XeKjpubXADCiWQBTOq0n5tPQ%2FX09px2z%2BWWOAbFNrR6e6DuwQvkDby76hd4e99vlhUd9mNbPLD3U6pQXcGlGiyB8X6ICUafgd7sKp9uQskp9IPP79Lbg7scUek6QytawrgMtFDxuqzS1axDDm3T88daw%2BSwc69OaJrUHkrmxTp8M9WHSWlyphh6k4UPEUmJki%2F3kLbQI6ZAj1HOOCgiEq0st9EHNC5J8eR13f4xJaYoh23TswqhmCzsFauYlL%2FCXgPznPjYk483ykWkNtvbtMf79FHlgOEp5WNiRkcN4C%2BQyjeBwSfn5K9DbwTDgo7cLnJDuvyatl4AE6wDoGr5A6rHbOJXDTvJkLRsVJe1dI0jDulZbLBjqkAVyyDNV8XKtky5RnPYgH0Tluo5aXhNqyouCSm6KSIAnkG6u79N4NbelpXessVw4deUIWfqPgtm6NO7XazTx7o%2Fma4ZXbCLfkJxEjTP2mTqZH0PihxmsBeaj7DHk7keCTrkmnLrT3oIj51GjiJQCLrVLSwa7dfq58FZRXPRCrATKv8RZZRboiWZh9nvPPEF%2FpjYCP4xL1lTr3SqXiFr3pT8D4yWa0&X-Amz-Signature=5d9dcd60e666d216b44d6b8bb3ac49e53fb086d7ce78c99032285a3dde83a0a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3CEG4FI%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004030Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJGMEQCIFHNxdSanIHhNTUKoVwnIgNvJwmRugpBHgmmpFhmJjAhAiABArmL1MorSLMrgi7gJcqIqY6eR8gvJIbevRKaehWx%2ByqIBAj5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZudp9IcL1KeQHFGtKtwDN6RSEax02QSq8KR7uPO%2FQcsDfWulRBqPKjTVL%2FmYgmR%2F9YmcxwQfxfiKSr3zqQDEFLLc0MRKZ%2Bexh%2B4wDR2fQGg53fee%2BrcxBiB2VRmNF8I%2BypI1I%2BQgMSko6ttOshZQW07AeCHKSFLX%2FAjvHkD4teySusWRf%2FYu857qMGV4G6yJpEmMYG07YPzQcU8BR8MaPGZ%2BSAEL19PDDHIpARJNtSLuogbPzVASMYft5SIbLh3HUWJs%2FbbdzK0L3CMAbPf%2BtDVFn5MmOAh26E%2FRlLZAPmPAYGqiuGsrvnwWNFSES3l2Inl88jlGeD9FKZlg5eNogS1Uneb0AEdiypjWgIHqp8jNkVP5eGNlbst7ObIcj84M4XxJLQRy0dD0Up0tkQ2dHfV1IAwzCz%2F1qeSEIE3sLqcQHLFaWoHiHrg50EBYUiH4KJ%2FF8wVLChahEsa%2Fl8JQUecrHshk9ljHfxAJcHL6NPrE8Ml%2Bz6s2w9fXyplYVcIqTChfx0Oq4aAWVSlO1J6%2Fqlk1kQgSv9Hq7oR%2B%2F8QnTz0qTo%2F5vVsz3fVIwv%2FhNaVLSEo9Qs3iO%2FQtSfdU1OzjzW23eNtHscCGtxFCZeoA0wIVyv1aEhPqsTrWXk5MtSQMJ3%2BpPOki9tENdnsw2pWWywY6pgHCD573vx49v%2Bjt9DaEOXUt9AYrF%2FI9HEFacn5orooNNDpwfKXZdAajAzeUxjIuWZ1m%2F6kIHqMjRWLduY%2BnopT1AP0pcZpO5VyfkJWO2dXEdIaUY%2FcQAPGPvX3dbzrNDoFzgkeSuBAdeZ9l8mkibNmEtMLqpotH2B%2FMFZQeKqj0Xier2vjTd6KYXCpmSEPhrIzCVvrgYElAwpDdJlMY9v83GfUMEIRr&X-Amz-Signature=ac77c975b8ff98f821d3777b3a05f73bb9c981b065854998e7e2fa81a66981b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FKV43OL%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCAGNwwvJy1rfiWOyxh5Dj4qPS3ayY%2FMiFPPUO%2BPh%2B9bgIgF734hK3azv%2Bolx1ApNBtIKSCmGUFuNDp3c%2FoitrIDBUqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLkPCbUoDpRi4cKn9CrcA9r7PnZD1eQP4NF4Z7wkxmhRnEwxJwY5Y%2BNCK0UK8SB9V0U%2BYpoLG2iHvY%2F3mHl4%2FGYfi%2FmiAu%2Fjz5SSCrOuT%2F0GtqJ4Vi%2Bdy9GRRIFlsKfOydvq%2FimoCU07UtrHA4Fj9GFBask6Vein2e4C757PrD5qpQECHbjkV77DzxYtGUEdG362cvnBCnqEGT3VYFDKm3XVjUVahTo84aO%2BlixaJnY7V9zfVzmQZQAuu8K6J46N8xfReAHA3o8dSFUpi2YNx9Jf1BoSjWqtx7qF6yUBwcmLxhiUw2w0yJuuaKsf%2FLWXqTg9RCeoWMimWCoXK9TdHnVTAupgE%2FG9KUNwjXUL8uDXoDa10qLPZ9vdKK9Hx3K3dl29ErGmcUrfBoCBeFPB%2Bep179k0TFORH1K%2FJW9ShwcGfwGJL7l1TppqL8Z2Esn1fk0E%2Btn8HTtp%2FBGuhVihDZMqgzLrdBdu12IoW%2FkojW2X5AAUFbvYCO7ByDc1y7%2B7avZ3H%2F77R8iRU6lwfhzlPzRzhxJrnFkD%2BMxmdPVNy%2B1%2Bd5KP51rAIFQcdG%2BsGWwtkZbZiKxbFPmOwZvQPR5AEygyVgGd%2FgBeXVPLEkwV5AfgrMsFxLqDPIvK%2BVxJ69z%2FNHGpdFs8C6Wvp7FhMLiVlssGOqUBZS0Vg47wICdCuQeBorpy0KZy87QavX7J33qRXUPUuH%2B3hu81%2B%2BVjnPCE7HrwsoMXKt4tqRviywtXbrM2lHEOcFzl0AfM5vvL1h15n7ZfE6QsvRjd2lGR2OcBpwQ6euwl5Vp2IKqXBXu%2BgAqgNStIgWy0RPcr2zjkHykGYwnhImrXVju7iIUltQs4Gk1QRYCzaC2p0fMjeuI6mcv8%2FC4OrJxwsJYi&X-Amz-Signature=20db07dff82870b0ff1b63afcddacd43e8f1876884545a8a6e48068103d744a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663FKV43OL%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCAGNwwvJy1rfiWOyxh5Dj4qPS3ayY%2FMiFPPUO%2BPh%2B9bgIgF734hK3azv%2Bolx1ApNBtIKSCmGUFuNDp3c%2FoitrIDBUqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLkPCbUoDpRi4cKn9CrcA9r7PnZD1eQP4NF4Z7wkxmhRnEwxJwY5Y%2BNCK0UK8SB9V0U%2BYpoLG2iHvY%2F3mHl4%2FGYfi%2FmiAu%2Fjz5SSCrOuT%2F0GtqJ4Vi%2Bdy9GRRIFlsKfOydvq%2FimoCU07UtrHA4Fj9GFBask6Vein2e4C757PrD5qpQECHbjkV77DzxYtGUEdG362cvnBCnqEGT3VYFDKm3XVjUVahTo84aO%2BlixaJnY7V9zfVzmQZQAuu8K6J46N8xfReAHA3o8dSFUpi2YNx9Jf1BoSjWqtx7qF6yUBwcmLxhiUw2w0yJuuaKsf%2FLWXqTg9RCeoWMimWCoXK9TdHnVTAupgE%2FG9KUNwjXUL8uDXoDa10qLPZ9vdKK9Hx3K3dl29ErGmcUrfBoCBeFPB%2Bep179k0TFORH1K%2FJW9ShwcGfwGJL7l1TppqL8Z2Esn1fk0E%2Btn8HTtp%2FBGuhVihDZMqgzLrdBdu12IoW%2FkojW2X5AAUFbvYCO7ByDc1y7%2B7avZ3H%2F77R8iRU6lwfhzlPzRzhxJrnFkD%2BMxmdPVNy%2B1%2Bd5KP51rAIFQcdG%2BsGWwtkZbZiKxbFPmOwZvQPR5AEygyVgGd%2FgBeXVPLEkwV5AfgrMsFxLqDPIvK%2BVxJ69z%2FNHGpdFs8C6Wvp7FhMLiVlssGOqUBZS0Vg47wICdCuQeBorpy0KZy87QavX7J33qRXUPUuH%2B3hu81%2B%2BVjnPCE7HrwsoMXKt4tqRviywtXbrM2lHEOcFzl0AfM5vvL1h15n7ZfE6QsvRjd2lGR2OcBpwQ6euwl5Vp2IKqXBXu%2BgAqgNStIgWy0RPcr2zjkHykGYwnhImrXVju7iIUltQs4Gk1QRYCzaC2p0fMjeuI6mcv8%2FC4OrJxwsJYi&X-Amz-Signature=20db07dff82870b0ff1b63afcddacd43e8f1876884545a8a6e48068103d744a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TM6TZBWY%2F20260113%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260113T004039Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIH9sryNFNYTwSyOwP0E2v87RyZyNHm7r6OkFLYUjEhPZAiEA7NNMXMRShoO8y4%2BXGw4563tBhDq7FNs40zAqz1ypWMsqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFH4KP%2FBXYOAFLdnfircAwJQX0ijmt3KZJZ2Lf4OOliBnsGTWh9XUp24Y41xjKkzb1v9UdM4o62%2B3ol8%2FQBj3oycdIiblMwCJ6f%2F4JsPCYAZeb5L8wmIrcZQ%2BGCxfKNddRa7xmEL4NmkPqjVL5rSo7ZQfSSMszPY75acjh18n09jAXLZ8CUAWNoFmfdqVCA4jJDH2H%2Bz4fVUT2X8YuEdr8xsuC7umhIJQa%2BVIqM5p7%2BtICIzxbSPHay1E7GXpn%2BYKys9U9TiLps6a1NrLtAGUWkPMSkxCeC8bf4nLH6XtxOURNpSZ9eeEjeSZONPN3uweA7jWUkrFF2UihN8qxDyTrS1wqCD1UBX3nkCSKM5%2F%2Fh8SzFHHDidGQtccaf9idtd0n6K%2BMIvWoF6cZVK2d1pikb0ZVuua94POfP65t8Z7B1Tq0GnJwf6eOIZGrpomNfeASJiQy%2BUn6wMyf3t3SrXHQ%2F9o2kGYfCI1H0zhymqsOlHpCTETtdQAooDh542OTs4Y3TgYEP8dfC0P24k%2BHotv2FSImNFht1tnmblGhIZLI9c%2FFoIp18Uk8VPkNIlQDLM5LlUoQUoALa5MSvoWAajo6ylvJQjh0AAbBHGrRG5%2ByKMtqdiQAB8fNYbLxbZ8XJYqTdOUnjj9xefGsmhMJyVlssGOqUB6BhCWo3mEaXTgqW58bwd5acLArkqnBC2Ef%2BixcyS43S%2Bgm8aLtTxgo1sKG4c%2FmHeF6D4D%2BBhWTRqSgBxifcyxate7AX3kEHcSNx4jVXNd9eVUMSy3fctafQevBNtcocPoWOHQJdcy%2F1JTl8Vn%2B8dwAhPGvsGdaXItsGI9ztzFnwfgy5zY%2Fkc%2FqF5ZNkau0WsZhK85zOJfgncKuhpbKUBYxfvoSCw&X-Amz-Signature=e3becd7c98087b41d71ef1a182c74db3b11cf46166d4de9770fd515416f1c6cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

