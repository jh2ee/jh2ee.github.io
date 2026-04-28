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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVQL6VSG%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQCquvwOte0ccKMwwtYK9dp84mwo6QhwWRHREiubiZBTMQIgH3Q8Tas49klg%2Bk8XcZghShhNjLUDv6L4r95BPVv7j6gqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP7TLsUfphRQWq7aXyrcAwNVf40deYsvBWa7jytx2zAGVdQslDFCyS2OJjsII%2F9o20JY5XRuqke5wn0a81pcVoB9CKVGhdunlkOb2E5SBfH3k42UuSQO1orNb5iW%2FzjGVN%2BhRBMnGedM%2FzsDfhJ%2FPelsvYJkF%2Bj0dmp5nUov9skhT0K74ofk0ZzvWif8185g8iiuAhr5pZwR3yUnUBwW0ge%2FdmiBuYejywkfbSwYAB5Ks778MC2p0Ei%2BUrimaCatQuMjSZKy%2FYILQUAWY%2F4S1DeHh9UmEkErjdkd0qEpcLEHJ0FB4VrIpAQt0v3WX%2FDDjXjTynvxaoMBC2bGlKJ2%2FmY218dNdyxqxxP2%2Bh5R43n7zzb9qb1MwXDII0aj22u1KCuP5UDnKKSa%2F2jy6X4ydaCfQti%2FKzEFA7LlKuZSmjBjAMDpEpM%2B3sWuD3kDRPkQogixr7Oqto8oFFqdhG3eqkgjfZTnoAIQgig8s9RsE73Kd9RssTBTmTB%2B4AQ6k88WQ%2B3J%2Bj9XPsUPy5NkplmTan3v3I0%2FiFWNy1lihK1i3IKTySQ%2FQ6EHISSIlF8zydyNlMqgxaHl1J4Bs98Ttliyf%2Fv1DNdPjA9rB03Kdoe78jE%2FKIoViLAqO6e3QdKu%2FOYSi2pbQugSryeGy8H8MPX3wM8GOqUBz2ilWtiasi8vAQiDbvIhebKHUIMahnCfioeusuwPm9ceB%2FKaVirSK60oyDmyITAyAz1NS7652bY64zYCMgDByKNqdhVyiZMhcNaS3FjBgWJL75UCI%2FCpd5zQXQr1eyI9clBBEEXXInGFFRKjJYjjYv45QNEC%2BRhYH0uxMsxOCv%2FRB6f5d3un7aR3SqHzNCxRHNUC0ms5wFZ5RMO7g%2Fwp%2B7qaqgSI&X-Amz-Signature=c5c39b0331277bdc8d0b861476b37d44cd400d3d7b350afbf2dc9c8bb8496651&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVQL6VSG%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQCquvwOte0ccKMwwtYK9dp84mwo6QhwWRHREiubiZBTMQIgH3Q8Tas49klg%2Bk8XcZghShhNjLUDv6L4r95BPVv7j6gqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP7TLsUfphRQWq7aXyrcAwNVf40deYsvBWa7jytx2zAGVdQslDFCyS2OJjsII%2F9o20JY5XRuqke5wn0a81pcVoB9CKVGhdunlkOb2E5SBfH3k42UuSQO1orNb5iW%2FzjGVN%2BhRBMnGedM%2FzsDfhJ%2FPelsvYJkF%2Bj0dmp5nUov9skhT0K74ofk0ZzvWif8185g8iiuAhr5pZwR3yUnUBwW0ge%2FdmiBuYejywkfbSwYAB5Ks778MC2p0Ei%2BUrimaCatQuMjSZKy%2FYILQUAWY%2F4S1DeHh9UmEkErjdkd0qEpcLEHJ0FB4VrIpAQt0v3WX%2FDDjXjTynvxaoMBC2bGlKJ2%2FmY218dNdyxqxxP2%2Bh5R43n7zzb9qb1MwXDII0aj22u1KCuP5UDnKKSa%2F2jy6X4ydaCfQti%2FKzEFA7LlKuZSmjBjAMDpEpM%2B3sWuD3kDRPkQogixr7Oqto8oFFqdhG3eqkgjfZTnoAIQgig8s9RsE73Kd9RssTBTmTB%2B4AQ6k88WQ%2B3J%2Bj9XPsUPy5NkplmTan3v3I0%2FiFWNy1lihK1i3IKTySQ%2FQ6EHISSIlF8zydyNlMqgxaHl1J4Bs98Ttliyf%2Fv1DNdPjA9rB03Kdoe78jE%2FKIoViLAqO6e3QdKu%2FOYSi2pbQugSryeGy8H8MPX3wM8GOqUBz2ilWtiasi8vAQiDbvIhebKHUIMahnCfioeusuwPm9ceB%2FKaVirSK60oyDmyITAyAz1NS7652bY64zYCMgDByKNqdhVyiZMhcNaS3FjBgWJL75UCI%2FCpd5zQXQr1eyI9clBBEEXXInGFFRKjJYjjYv45QNEC%2BRhYH0uxMsxOCv%2FRB6f5d3un7aR3SqHzNCxRHNUC0ms5wFZ5RMO7g%2Fwp%2B7qaqgSI&X-Amz-Signature=c5c39b0331277bdc8d0b861476b37d44cd400d3d7b350afbf2dc9c8bb8496651&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRKFEWUG%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051736Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIHd9Pa7iL9bPA5E2WpquOFlltXEKjiZpmiw%2BwyQEjZweAiEAiBlbUeVmehXvjbQjdZekhGeuVzKKlH7nDFrLo44Kt5wqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIOUTUIacGeEWgXXnCrcA1GjI74pROlktzGjUxZDcKJBGbB3L38UZSeIaG1F2hAibau2vw8vLc1aBcLbdKakIddTGblIgJH3JdTbgWyZt1p9xs%2FzKhUVUmKygz13niV%2Bd3kAUJrWy8Uok9mJnWvIHM%2BOqmLx%2BXq0IccuVUxwkgSM9OMae%2F0HfLtVBKxhdyiShH4F46GGTHg7RqOcWibxqwUgGsAufu3dh7F6jzyKhwtOl6f9%2BzPi%2FbhLKDAfhE%2B%2B%2FsaStiv33grvBlk1IfmFSZ%2FMgffTNPajmfWn1c7AG8AfflugijptdDcrQbqA5JCg%2FUmhwhnDl4kytQgLihEJXVFv6MCS658e%2Fk6p9c0igPxzv4XDVkp17QcWbg7jou3vRE1POO0R5gURTADKavcmhxAfYejJNj9UM2ME%2FuZurW%2FLFRUhgbagX1Oc8MdBCwhLG%2Bl6CVRKPMd7Nh5sS%2FdtoWmeHNAvVHBJrCB%2BQmVqBqn9d70uqFF84gpiKyMBvhmKKNDlJ1Ic8RR%2FnfbKwMP4WIIsmZSX247bODc%2B9fhi7qPVU74XMF3RPPyw24HmcrUqjP7C1aVLHcj4kgGcVf7ImJarhgVHqjZFUFloTte2lwOHDtsoAxOdZGX1MbNhpoDvGqkCCch8MZvWjyRwMMb3wM8GOqUB41V4y%2FiOXyUMHsHecGmjluWvBbvBzA8oRAm83QStPrJePEUoEFcXuuny5RY7minLcLFsJtLHy%2FFvOZfcowwrETuKBB8WEF%2BwE4IPsqCKv%2BGA%2BcL6JVLJhMPeqoFezXnOQ685VQqFFlAZgUQcuroz1HPCSHqqzFgihi6f4STzW1lZDye3XAE9Phvn8dkXBbZc3HW2129UJ5HzuqAKPxImervYId3I&X-Amz-Signature=19ddd3eaec1631663ad18b4c2cc03633d24886357ccdece88c6c9ca3bc455699&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXXNPUEQ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJGMEQCICwH4BjurhZcL3t95GrkNK3RyOLumWhL0Vx17fpZrjGPAiAldLqSBJugGME9lUVUdxL0EECGw6c6OEK2kMbWmiKgoyqIBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9tcyu2Udq3Xb5tozKtwD3QqXu3UogGlEUHFsp1oPWi%2BtMn3fS0%2B2tbWoOJ9Hl9bDJkGN2rAnnIjcwxTuGLR%2BLqdzcZPfDAaTf%2FS2MJgV%2BRafa1DaqN7f1z2aZ4tp0eYpFbOnY7h6YuV7ajN9AlYiXcutx80A4x6zujvG7AJaFyj7RL8daocWLMsAEfEsyGGDjyextTmu3fBY6KV26BO%2FWQeLZek%2B27iffqlMTJyb%2FN5XCw9nz82CkO3PUSZeiTmJgxBOCJWHxXjHx7sI%2FP7qPTCZL5drLu0q%2BKqVW6zhvQrZekgNKjHwg42cM2SfkVU6pBIHz8xfKJK%2F9CmfXa140FXhMSQFz9T0s9XgJGFy0ThuBekmsMtdnDz1cGVuYdAnKi%2Fuwp7ZivT%2BqkVtoqV3FEgOlfJwkeQKkMo9lTvBN3NZTbvjb4oIyOMPA9UA2aERrZ8BKh7QVEB8JDgMz09jMnBLCt%2B%2BOmarDpTmday56DPL%2FiAty7Hs%2BOsCFHw%2B1F990T1mUbMLM2b3ByCwMwcCcadTf5RsA3P9%2FL%2BOIi1Y6duFNnPVp3ZPb7SJam3DsPugNtSU1ywPEM6sZOLWdkm%2FwVnNi157P7gmeAAxdAnjgdQf3jBIX4tm1RWHVIEsKyDYqGYritrfI0%2BCkQswnvjAzwY6pgH6RM4lnF1FsIa1qRD1IOqxkAmy1qzMWCsGholzAhKyXN3KCuia3BJn9PvFX%2BxJgp%2BVi7oh%2BUiK3C4FK5MpP9t2%2FeFsgTiFNWh24YIBrtTr%2BvPbreHuPqfVFf3qunXFdyLc7BqtkfR4WN8XLRlQE9YGbmj2LFp42WFkMXHLBw95y06nasyBMBJ%2FYFfny7NWs%2BhTs6IYlPBD9ZQM2y5ecfvbAlQvJQlJ&X-Amz-Signature=6b6098c6561187cbbc963a22438d17c0957ef57e04a2204193bfb227b9245bd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXXNPUEQ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJGMEQCICwH4BjurhZcL3t95GrkNK3RyOLumWhL0Vx17fpZrjGPAiAldLqSBJugGME9lUVUdxL0EECGw6c6OEK2kMbWmiKgoyqIBAjW%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM9tcyu2Udq3Xb5tozKtwD3QqXu3UogGlEUHFsp1oPWi%2BtMn3fS0%2B2tbWoOJ9Hl9bDJkGN2rAnnIjcwxTuGLR%2BLqdzcZPfDAaTf%2FS2MJgV%2BRafa1DaqN7f1z2aZ4tp0eYpFbOnY7h6YuV7ajN9AlYiXcutx80A4x6zujvG7AJaFyj7RL8daocWLMsAEfEsyGGDjyextTmu3fBY6KV26BO%2FWQeLZek%2B27iffqlMTJyb%2FN5XCw9nz82CkO3PUSZeiTmJgxBOCJWHxXjHx7sI%2FP7qPTCZL5drLu0q%2BKqVW6zhvQrZekgNKjHwg42cM2SfkVU6pBIHz8xfKJK%2F9CmfXa140FXhMSQFz9T0s9XgJGFy0ThuBekmsMtdnDz1cGVuYdAnKi%2Fuwp7ZivT%2BqkVtoqV3FEgOlfJwkeQKkMo9lTvBN3NZTbvjb4oIyOMPA9UA2aERrZ8BKh7QVEB8JDgMz09jMnBLCt%2B%2BOmarDpTmday56DPL%2FiAty7Hs%2BOsCFHw%2B1F990T1mUbMLM2b3ByCwMwcCcadTf5RsA3P9%2FL%2BOIi1Y6duFNnPVp3ZPb7SJam3DsPugNtSU1ywPEM6sZOLWdkm%2FwVnNi157P7gmeAAxdAnjgdQf3jBIX4tm1RWHVIEsKyDYqGYritrfI0%2BCkQswnvjAzwY6pgH6RM4lnF1FsIa1qRD1IOqxkAmy1qzMWCsGholzAhKyXN3KCuia3BJn9PvFX%2BxJgp%2BVi7oh%2BUiK3C4FK5MpP9t2%2FeFsgTiFNWh24YIBrtTr%2BvPbreHuPqfVFf3qunXFdyLc7BqtkfR4WN8XLRlQE9YGbmj2LFp42WFkMXHLBw95y06nasyBMBJ%2FYFfny7NWs%2BhTs6IYlPBD9ZQM2y5ecfvbAlQvJQlJ&X-Amz-Signature=3d8676fc75b535ff32dc17a106347aa6765cac29606035ef49c57c8f993a705f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RHSQSKL%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJIMEYCIQCurZvuDBI6b4%2BqeI64wuC%2F7uRnJN4zKFzCjNgeevJWbgIhAJW%2FPI1EKOUGirxQlp0vTZk%2FccR%2BJJ%2BOhEPPnhcG3wW%2BKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx3iulHxiwppJqm%2B30q3AOntJvJqN8sv0DTiwZrO2%2BjBU%2BBBQeM1yW5fpFJsQA%2FSoQ%2BdBBX%2FpTM4ukOgxstqVgcwowBn%2BJMDTyNS6hn%2FNRpmp0WJB3LBpUMhs3NtZgPTIDnHbufAvG%2F8G2HYo6Z19UwQ2xh2npmccnkOUr3vnpbXQTOUf7zDzCIbw85eVy1cIEV8rAK0Eayh4Druk7Z2raFipnpZ8eVBwKEkxSV6l0zraWCUmT3Ct69OLWWkHfOzL4ATEzgiYz8HOGvt2q%2FNYzLU6gcyv3oxLdg0Nssgv9KEL6JuxKhE0IxIepuu2I4JS0%2BTdtot3Jp30fgbxQnlwR%2FVjaZ6LK3nCXhdkcgqACdAxN3JUFL3vZPNUaVK2nX60BkhA4jqN8%2FdP5DXrHpMEOMJ3Td6GEuuqS3sOmtAaCt%2FKfmy9W7OFPCqD%2FCkQGbjthquJxBnxzvQiipxBEeaSNBdRkLo0vvZkkCEBghzPOV7EbibAeEvLf58qOnvvVLyeIhm7dk%2BbcXL5ZqX4Z467bIjb%2F9huQI4vFZ6%2Fs91iGPLsovDFBuAeTbz72FXC%2BGo67cli5lXmMTZNpelAtzdh1WS5%2FI2iYZH5DvOWL%2FYp9I%2FajSHV8eagBphe1Y4JtkdZQjk6%2BXD%2B5DY7NAWTCF9sDPBjqkAQazQTM2qGLZNNTehWwN80QXhhm0gZd1s%2FDQMclXrUK5OcbytQTch0lSLB4hL%2BymIB7ggu7RF%2BGlad9k3US8dkQ3zRm7zUFJMGPRE2tPpxBBSdOapL9boqlfnP93iV5%2FJCPJC9CBukUhdpS2Ud35dwCvdTgNrhucu3kEBq69XZdY7sedDbzcxOs%2Fmn6wj2BofTZNOeLEDrdvqEClVhSunZBzWAxl&X-Amz-Signature=a8583efa6c1d5fcd992fa557b8b68fb5976f9fce7f2fc95fe55c20e69aa8acd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663F3Z6WV6%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJIMEYCIQDsm4gU1fAh4y83aFNSxfnyruvz3al9PLc%2Fs7R1qq%2FRugIhAM%2BKp8uxjvXLdZ23EVkuMkjTeuNt9KmsEJ3Xa10hxh%2BGKogECNb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw%2B%2F5uLAZsaUXcfK1cq3AOVJNB3YtrHDB29ILSuKFqsOUoHjhq9Wc0sNp2Um0s17v%2FJ%2B0%2BS%2BgS2rKebY0qscN6xKR6Ab5RBJfKbVh7nYtxmg7bXC2dAOQbaxznfBDdR9qcFG5tEspfJyI0%2BBy3Q2hNb82cKSl15S9chN%2FmpRlxg1YyIIxuedYTVE0Nnd7japXcNHYMSnBb4l9YxEboY5tiDNMX3lnDiOlC8TNNUGBbFNR8fyA6NbVzP6VVmXOT9ixhotmuFnw6bhsmhDLtAa5uRZrN8zVKUh9Vanuv4rvuGgGxGB2b49CI%2BGPsZdw8R4bei4wHy8wA18j1HHGmIsXrIyabCGcSjBTlWuEANmN96cNTqTvrac9JdwmtsVbEZ7%2Fh4U8XVXQGW7UYcADheuShJj43uRvVQChxrcvIyD6DEfay4%2BUD%2FEPP2jfVWrGq4XE1YHP%2FzF7zEln6qWdBxslfIakMOtarbpIMDlu2x9s3UTy8Idy1DNIhP0rtD0NOzN94W2IxjNJUgyfhhMsqozZSZxZot30QXAcoRDEYD7iBeMC0n6aIcEoKvAjwOtC2eSMtEPhZ%2B1RVmWlKDZjpOgeNMtmhvVhsRU6V43eQqqPS1Z1KAJZ6udK%2FN7kN4mlCy%2BqfY3srwMCmsFFxZXDCc9sDPBjqkAQes8XB0zKsr6BZgOGjPXV512ghPR3Z40Yu9sdGZqe1fF70uzqkyVGWqghcO4YC834SAA5xSbVb6RC2mE%2Fu76grH%2FDO4OWjH4sdGba4IWTSfifjFR0laj5Ck5CdAWq%2BFqZT9Pfh1we0MKAlPe%2B4wyUMbOaOkQIBJIfFzjItja6dlXZlcKVoIt%2BxwKdAxu%2B5ZVbYqv%2FEgA0uqyKSJXtkaXAeymr6Q&X-Amz-Signature=7cc58538d1500c13a2943c00f762bbb7e6206454faa494ee95542bc06db6e243&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPZUUCED%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIGN0lz8cVuBGID4PpK2VK0XjMY%2FZLOqORnAKLwjx4m%2B8AiEAhesncQ3q5yMttRZ3q54KL6I8lDaNaz%2FyRwm5V8Hx9HIqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMnX9kxZPdQXEnfVhyrcA%2FEGaFwe4SvPEqaqCFoVhA1Cq49h%2Fr5IhkkVxsrVsl21H3kH1AD8a9tXK05xBC2rOgfOzH1LYmVOBhoWybFiAaPPh46m7JgTk9Lhh2pNRTU%2BjNG0pAilUaCsBxY3HCUCTsz%2B5KSfouf7MlS7VZbMhNDrqTWjvplPiTsH63tg1nGo%2F2d3pwXDJdWkMxwqOyfnfk80H6uIWLy%2BPIlITrpn7HD11ilz8qG4K6DdQx2HgDpB7WURJ4s094Z%2FB0ZiJmkRM6axC7IBxGDmqHKFzQ9GT%2BnZu7seUL%2FY502kZFdzrjIg4bv5Gq8ijRdbB6dNmHcQmKRyy5l5%2BA6PvG1xbQJv9GCbLw%2Fbdarkru%2B%2BsCVZvGVqSS6Ats2M%2F1XitR5vBF9Vq36cp73G2DhNwITKI3M5C6oLZCriXP97DN7GkCou24iwQV3zLO4zaTFDMEnlKFbXBpdQcXLU7LUMRn5L%2Frs6fLZL%2BzHT7CD%2Beg%2BHBlb9Kp2n4Cs4FgQnzpgsdhH8yOYtsiuMNwseTlLt8QuGkQoNOF%2FZOYZt0E%2FR3TOzUv%2FEi3o2vMti1vpYm0dIgVKTxFKkmmwqt5Zs7U%2FT4I%2F%2FucViXRie4poWu8xAjLw6oXGrtBj5bb7ieRXi36b9Oy5eMO72wM8GOqUBYdOZTAbETq3T3lQ0JcXQVOPf9%2BNTdqfjGzeb4zFvekkziAV%2BQw7wHcR52ZwAEn8PPkb7nBXmYAHQ%2BedPSBCu5mmBiDz8QQf2%2BLzaeEq6SMmW%2FaaxwbVcOc%2F6OJ6vQe7bc0P%2BH9ie32KOH%2BOrnKfLpVUUB5SodvJiLlv1%2FXmLTYmzT3F1o8CyBb7qNuua%2FY2vMf0xQhXqLqw1YtqUQQw%2BSpnuScrH&X-Amz-Signature=1155f3253d897223c479e145b03601e446c5bd4e58113b2d482e5da4eb4dfc89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YE5HXXA2%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQDZo604GAZSqe%2BIM3jzfRdR9y1cLNnH69muM5QEmEMBfAIgLpBEyVB%2FNLjc4oxbZIXWm%2BElYdosakAG4TNIR5LkpjAqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYlM%2Bex7LrHk%2BQECSrcA921PnSLhC1my6DayIsdoPIWrN7OeBroWpf8Dkyf9GH4ehXCAZd%2Fi5AM5vqHYy2rrwfxk1V%2BrkGJo6fVntO1csH8aBwMcIIF7jRAE9x8rO9mIzUKhrjkXhBjUsP4Dv8JzyE0mXgFJSHwNdivYcK1HGztekzhaqqz50Ww3GTfxtSBlUyrNorsgjcB74Qff3zNZUK9y3vvIRxCE%2BYw08mL13Y40AaY3ap8U%2FWAAJaUPs4RuADdsCmccxRVEQ6zSaPikWxh53Pu1S86eC12zQv%2B4jplmEoeaQLgCJgckVXx1785np4S2w02hMSU9Uvjf03e0UFWSpddx%2Bo05heloRBTrt%2FUgntiovXc5rakqg3TjS5zUGTA9j44chFoeo8xMQ3pjnuwnNHUrjbOd8ooD%2Bjyx4sX64m5TS7sTDCHb1DFkafVwROzroB78IZEQn5xIBeFqsCc5qUJpgAeSsi3g2dC4nZ5q8%2BDwh0cJgPg0XQUYyzHYjRqqrYcNwEz%2ByruWzBd3Q4bwUOqftm58w955aRjNPSszB%2F4aGinwydLbrsHgCLNa4kAM0wqypxluWg4mlwTeQaM%2BiHbDOV4ThqZEnJNnvqACtXFU%2FPspN4kV9miJV8HMHETkxHYfwNcHfZfMPn1wM8GOqUBQoPV6L9yXegINBcdAcOEXOyPhIyDUleOgaEmQk0u%2FWCGXorZClLOWj2VswekITBr%2BZYTej%2F2iX3cR1HysH6qbCmFtizDhxV5r0xgKemxPKdVZLrw%2BQD777a%2FjVpKCeFnUAXPiu8Yskj6Ju91t8K0xymRjjqMGdTM%2FlZEhfaX3YKB5SUyfkQLGOOg%2FAz1OtrDB2hCIYy4AGbaxemCdE1m%2FybbSQLW&X-Amz-Signature=eaf9e9d4f6b358dd0b042a29d8620c4e622a5e605d31aeb8ac800f648ac2e8ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YE5HXXA2%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQDZo604GAZSqe%2BIM3jzfRdR9y1cLNnH69muM5QEmEMBfAIgLpBEyVB%2FNLjc4oxbZIXWm%2BElYdosakAG4TNIR5LkpjAqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLYlM%2Bex7LrHk%2BQECSrcA921PnSLhC1my6DayIsdoPIWrN7OeBroWpf8Dkyf9GH4ehXCAZd%2Fi5AM5vqHYy2rrwfxk1V%2BrkGJo6fVntO1csH8aBwMcIIF7jRAE9x8rO9mIzUKhrjkXhBjUsP4Dv8JzyE0mXgFJSHwNdivYcK1HGztekzhaqqz50Ww3GTfxtSBlUyrNorsgjcB74Qff3zNZUK9y3vvIRxCE%2BYw08mL13Y40AaY3ap8U%2FWAAJaUPs4RuADdsCmccxRVEQ6zSaPikWxh53Pu1S86eC12zQv%2B4jplmEoeaQLgCJgckVXx1785np4S2w02hMSU9Uvjf03e0UFWSpddx%2Bo05heloRBTrt%2FUgntiovXc5rakqg3TjS5zUGTA9j44chFoeo8xMQ3pjnuwnNHUrjbOd8ooD%2Bjyx4sX64m5TS7sTDCHb1DFkafVwROzroB78IZEQn5xIBeFqsCc5qUJpgAeSsi3g2dC4nZ5q8%2BDwh0cJgPg0XQUYyzHYjRqqrYcNwEz%2ByruWzBd3Q4bwUOqftm58w955aRjNPSszB%2F4aGinwydLbrsHgCLNa4kAM0wqypxluWg4mlwTeQaM%2BiHbDOV4ThqZEnJNnvqACtXFU%2FPspN4kV9miJV8HMHETkxHYfwNcHfZfMPn1wM8GOqUBQoPV6L9yXegINBcdAcOEXOyPhIyDUleOgaEmQk0u%2FWCGXorZClLOWj2VswekITBr%2BZYTej%2F2iX3cR1HysH6qbCmFtizDhxV5r0xgKemxPKdVZLrw%2BQD777a%2FjVpKCeFnUAXPiu8Yskj6Ju91t8K0xymRjjqMGdTM%2FlZEhfaX3YKB5SUyfkQLGOOg%2FAz1OtrDB2hCIYy4AGbaxemCdE1m%2FybbSQLW&X-Amz-Signature=a10cfcefcb853753868c7bd4c9b727636bfaa9d14b775cf967f9457e692662c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KA7YVMY%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQCBYBi%2FUSFu%2BuU7pRNYWzdYF2x16Pyco1ViFtlZ1gvXXwIgGH%2FjUswexBMnMEMpso8AeAc6F3FIznoAQwCFVoUOOEoqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH7fdgnmeSkx1FkSICrcAxSuLSfxwFH5wEuBIbX6G50ai%2BNKnhD945KGYHUpOJ2OTsewv7RwbL39fkvjIS0wCRwIaXECW4oNornRRR1MOY8Soa1gCmP%2BZhbB4gYoCll4M4IIZv125kZ3cVPR7iFsxN1IdrHJWMvPTmwNAlKcqUKtJLVTlzIS4M28EwdiisVRmLDSnKVlu%2Bnu56mVHhg2yGk6HB%2FGmyx4pbcbZVT1G98N%2BFaWQwjp4hCt%2F9CY7r03t4FLuiA2bhXsPLyNEbr2F9c7p2BoSlRv6efjT4gC7%2BC2pBxj9vZAE2Gugqrs8tYx%2BZ55yKoI1mA%2BQY3kjYuoBhzPjOgBoIG%2BMuAcPGtu88YT%2FkDJweq0gCMwLCJuuI5AO7qYaxynBYvJhUyhjy0LVWFYxxXD%2FPZRRj6cjGnIG0pB%2FdGwhK7tw%2B%2BzQnTrBbrxxJArl8%2FFryolJM%2FCX20mSyQsnYLI6Q4XqbdIy1U6EoQ81i4qsK35is0ocp7cZApWMxpn7uzOnnJ%2BK4%2BpmF1J%2FKMXVBLu%2BImmJkIHr%2FgIPeW389guXbtF9rjQV0R47UeYQrTqDZ%2BQvDJzMgl4EyNbjmReWecWFt60aUhavXWi71KHGGhc7crCsp06YCUenotTtrgOdax7UF5c8dg4MIj3wM8GOqUBTqCgvCLebBPQb0iYY7XKgvZ%2BuMf8ZyducYLaroQJc04OmPqmwif9u8ibArPz1aVwCO5PGPTxjIVbcAQ8k9ifI632NTTHTAvDj4t4K%2FZH%2F1kRoQNKQnq0OWBJ1LEGg0KlJzFnep8QZrNRT6VDPyUU0yMfJfnpUdbPTRO0Nfry895mI074y8UGi9jJfvGjfBpeywGP%2FVEYsSKsknMWuQFQ4mM7znr6&X-Amz-Signature=c9794708554876ec77ae5c04d82ee02db979c11ce11a7bfa48f171f54b17b77f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EZLWNYQ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQDT6NG9VCMBaleh%2B%2F%2BGMERXs6KR9ObjU6hvXD0TH4Gx8QIgQfD3RPYSfzvIsk5cXHoo7CelMKzbqGfT34J9Hma42hUqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCWmfOJvSReOIQCNkircAzj2ati7eX9IuuMMPRbVf4pNLvzJh0iTFOTdMumyPaWkHLF6xOPIFNR4Mrox%2Fd2zuY9FlGWPDqvA%2FIpW%2FDjoZ8ibG%2Fa822yzVAZbWgoUoj4AHwsbyQytHoQGshJVWB6ya854C5UDORE3mdJrlkz4enzXnqlNeR34MW5Sh3Gafp8oi7QPIPESX%2FgbPUv3uFpZf2OKAW0%2B7nE36oHMLjL9SaApC%2BRlyR0JRt6O4k%2FISdsdMT8GJ5gpjazxSKZHlXOqEzu3L6%2BXKx8IVHleOpJ8%2B3o7UXx8rx33e6LT5QSJoqWOc2aMwDYxnp0FEQuSHbwtHgRvFy2sO7272aiVOrJB32YRZAhYSh0vWWPKe5nte%2F1LxnsF%2BiopZE9A8kmtR%2B0jJgxTE3C3uRBgD1I7vQL6aXIn4jHTb97AHias8m1cihpVMKs0YM3RmCmWnODXAwtr4GnhkFPdHi9u%2BedkxtjMl%2BY2VtLCirxbvJbN9lx0mXjnmEky5WOCvNnuCdBSuB3TztQCp1ZdZsya9rZjbrpn2eSv%2F5GCqKn743G55Dc5yES4uxTwpUvZ7MgZ%2BDNsyENPbgoHzoBWDMUy81r4w1FVmiBNwhEkhvHkvAHv720xeDnhSmuvdfb8HSP654KtMPr1wM8GOqUBTZyfeQ6R2jHzfI%2F9dOdQNDMkeALL9CL%2Be9hSeJs%2BgEZNw5RCNve%2FQdbTylNRIqglG%2BfGc7agCVvoI7XKZzH0OlHMfCMfZcQjKerT%2F9%2BdgQLkXUl%2B2EeQs6EPAE44Fgkxr6Gkhh8fX4Kko1fRAGxswFEiXYq75Ax%2F8A2UXiqUZIPHefLtonQffKmRdEYxp3dJOdkFGmvetlmVyySH%2FDnB1gasvXxt&X-Amz-Signature=37681273eb45c6b68dd17944ef437c1c1677f94535e4fc6bf29ccf374e392074&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EZLWNYQ%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIQDT6NG9VCMBaleh%2B%2F%2BGMERXs6KR9ObjU6hvXD0TH4Gx8QIgQfD3RPYSfzvIsk5cXHoo7CelMKzbqGfT34J9Hma42hUqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCWmfOJvSReOIQCNkircAzj2ati7eX9IuuMMPRbVf4pNLvzJh0iTFOTdMumyPaWkHLF6xOPIFNR4Mrox%2Fd2zuY9FlGWPDqvA%2FIpW%2FDjoZ8ibG%2Fa822yzVAZbWgoUoj4AHwsbyQytHoQGshJVWB6ya854C5UDORE3mdJrlkz4enzXnqlNeR34MW5Sh3Gafp8oi7QPIPESX%2FgbPUv3uFpZf2OKAW0%2B7nE36oHMLjL9SaApC%2BRlyR0JRt6O4k%2FISdsdMT8GJ5gpjazxSKZHlXOqEzu3L6%2BXKx8IVHleOpJ8%2B3o7UXx8rx33e6LT5QSJoqWOc2aMwDYxnp0FEQuSHbwtHgRvFy2sO7272aiVOrJB32YRZAhYSh0vWWPKe5nte%2F1LxnsF%2BiopZE9A8kmtR%2B0jJgxTE3C3uRBgD1I7vQL6aXIn4jHTb97AHias8m1cihpVMKs0YM3RmCmWnODXAwtr4GnhkFPdHi9u%2BedkxtjMl%2BY2VtLCirxbvJbN9lx0mXjnmEky5WOCvNnuCdBSuB3TztQCp1ZdZsya9rZjbrpn2eSv%2F5GCqKn743G55Dc5yES4uxTwpUvZ7MgZ%2BDNsyENPbgoHzoBWDMUy81r4w1FVmiBNwhEkhvHkvAHv720xeDnhSmuvdfb8HSP654KtMPr1wM8GOqUBTZyfeQ6R2jHzfI%2F9dOdQNDMkeALL9CL%2Be9hSeJs%2BgEZNw5RCNve%2FQdbTylNRIqglG%2BfGc7agCVvoI7XKZzH0OlHMfCMfZcQjKerT%2F9%2BdgQLkXUl%2B2EeQs6EPAE44Fgkxr6Gkhh8fX4Kko1fRAGxswFEiXYq75Ax%2F8A2UXiqUZIPHefLtonQffKmRdEYxp3dJOdkFGmvetlmVyySH%2FDnB1gasvXxt&X-Amz-Signature=37681273eb45c6b68dd17944ef437c1c1677f94535e4fc6bf29ccf374e392074&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHQOGAIM%2F20260428%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260428T051744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA0aCXVzLXdlc3QtMiJHMEUCIAaE6w07hcKMYBK4C%2BndSGK5ROQQNUz1tBGcgaqrzjAUAiEA7vs0pZjXcvKTGInRl0L4SfQWY4EIkEapf300G8qCkpgqiAQI1v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDDRPPEEglxiq8ZyJyrcA9IKcp9Ggj%2FV3DN8u335%2BCfdu%2BzeHIe4A%2Fm0WMTltiFI7vr5iuX%2FAsj%2FX2LRsYS%2FqbxNIZNvIOqFCABW7vgs%2FD%2BZgUYBSQt1aLLUYY5UdL9jZlCxOZbBztRGbPo1MtqCYDEfQjD3e%2BZSoCwkl3CX8LaL8SmhCsQeIHueNVlGXo3kDDGztiLz9%2Bm1KWrVV2NQ3yvHH1kWDbWKteRb1S68fM6whgO4b4%2BpvfPo2jsO4XZH%2BpJ0wcW5PsOMOsaBQHSU%2BIZQo6n71JNuw6TKjvaTXVL%2BCHBtWqf6hvKxy7%2Fdykw3BDuZ6VlkE6OdCeowF533NCBj7k0ynedQCopb30Oc6uZ8Ym%2FGJ95UqQrQS8pBp%2BLnXB5mP2%2FXtJcJv%2B3SI4th%2BLge%2Fk9aZlYDi871GNCCmN4TlWA%2B2upNjqX6A7Q6EPo%2FD8%2F0jHethj5Pa0aEdUl%2B5tN4DV26p9UbE7LdaClZEi9kU%2Feqlrwz02HxNPxQtaFyiQfTd3NEUp1JDEykZOMcToTUJyMPaA3Vl3Jw8aaXAOmslXp5iWFu0JGSRTt0wZsomJKvLa3pK%2Btzz%2B9W9njC6Pwyt3lYI31ig5K%2ByEG0OiYFOG4vLIefrD1xysCdwlq3iyXRt5Q06h%2B8bvbbMPL1wM8GOqUBKUcQECeZFYYyjjoK7%2BHWWY75Gbf5JYYQ8pKi3xxApIMPXOqp84KiYnoBHkROO%2BX%2BgU4IMX4pQf5%2FnsCkITTA79cHkVib55RoNLaNmEZAoIGXdhrunQgqLE0gKjHsabbTBzGHi%2Bn90szprhUpsxM%2FyBVjgkKckQIAx1fwQKbP96ZGjodOvqbzX7pZi4z3q%2B5HejUx4wA%2BTF90TpdXX3l0Ri0X3WVM&X-Amz-Signature=963fe6c3db4c8ce6d76d6dd38f91b12414c7581ba59f1e6cf5e7f124fa925fe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

