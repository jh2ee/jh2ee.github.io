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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZJQUZT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDTG%2FU7t321jVtrT7UUhBI9hwtQ%2B7flNEEJFo2BJGIOCAIgRJ16yemW8eUjI7ZOeSGVEl0fddLKtm0X2pDxki1QjWYq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDFWVcuzfeAvtNxjRiSrcA1oI2U9mG51CkJ%2B5oGeuHZFWHznZ8N22ztQCdTL%2Fvmr5KEA%2FxIUOvVZElOgsNsqtA9YbPuw%2Fn2UIbwnt4efbC2AnxetyMntdfC7STrOMS2vooW6P24cgQeXTc7s5UVn7ODpxVnpDyWdiNgW4tKm6xebQSnpPYHwqSHdEeXMy6lBv0%2Foy5GE%2FOfZyvHqpnGuLv13%2BPpvqnkPh8mHLjmtacZUJQ0gAWAQJzPcIvPceqd0zY1sfBFJF3VawQg52h3FMrcCRRD9T9Rn6wVEtWjeoxgvDi52C3ZEel1dQzkRwzVFd9%2F%2BHohXQNOoL6dPtw3RHwPOTuS2lvoGckeUIKBmege%2Bdbfzmn6oAyeiJv%2FFV%2FtRAAymyYIw%2BVjpEFOom7QOtVDz99sKXFatFEivuB4KJG8chGSpfkeY8c05DWrX2ryFJEFv%2BVI73SV9gy58TxgzFOVU%2BNiHbDIdJSHd9AvyzowLxRpfa2Ui%2FR7xr6bOwUnq5MCjWWO9JheAkNKbz3pzinoQcv15Zkj96BSLcLHcshukBICLuAVzwdbLUOUsfPl%2BIvpvR4agkkqbh3idwklK2Y6sNjs8%2FkkaBVTJvmQDHghzWgBvbJ%2B0Upv1WeBND2LCFTahJo0S63PG%2B6gjhMI%2B2k88GOqUB4XziIasNkYHyBlrBus1jHTu%2BQ9VBOEkxrBARuuKp4sYjdoQRwtRgAicLErlyhDAIZDLGOlug9wLzyI5Zw%2FWZZ4X6oapDMbuCS%2FKZRl27dS5Fns2Ncg7%2F3%2BFm7VaOQdZSZMXxEp%2FyRRvt7YmnJFVDPor3OhKFD%2FnYxKm2JhUzectM9GpaocLMhVnfY6re20x92W83uUwaS9rG18aUd1IY449J02bp&X-Amz-Signature=5730b4e583c33204ea0d1b8306d4a463195e2d4a5c4f95f7f9550542b6150331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZJQUZT%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQDTG%2FU7t321jVtrT7UUhBI9hwtQ%2B7flNEEJFo2BJGIOCAIgRJ16yemW8eUjI7ZOeSGVEl0fddLKtm0X2pDxki1QjWYq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDFWVcuzfeAvtNxjRiSrcA1oI2U9mG51CkJ%2B5oGeuHZFWHznZ8N22ztQCdTL%2Fvmr5KEA%2FxIUOvVZElOgsNsqtA9YbPuw%2Fn2UIbwnt4efbC2AnxetyMntdfC7STrOMS2vooW6P24cgQeXTc7s5UVn7ODpxVnpDyWdiNgW4tKm6xebQSnpPYHwqSHdEeXMy6lBv0%2Foy5GE%2FOfZyvHqpnGuLv13%2BPpvqnkPh8mHLjmtacZUJQ0gAWAQJzPcIvPceqd0zY1sfBFJF3VawQg52h3FMrcCRRD9T9Rn6wVEtWjeoxgvDi52C3ZEel1dQzkRwzVFd9%2F%2BHohXQNOoL6dPtw3RHwPOTuS2lvoGckeUIKBmege%2Bdbfzmn6oAyeiJv%2FFV%2FtRAAymyYIw%2BVjpEFOom7QOtVDz99sKXFatFEivuB4KJG8chGSpfkeY8c05DWrX2ryFJEFv%2BVI73SV9gy58TxgzFOVU%2BNiHbDIdJSHd9AvyzowLxRpfa2Ui%2FR7xr6bOwUnq5MCjWWO9JheAkNKbz3pzinoQcv15Zkj96BSLcLHcshukBICLuAVzwdbLUOUsfPl%2BIvpvR4agkkqbh3idwklK2Y6sNjs8%2FkkaBVTJvmQDHghzWgBvbJ%2B0Upv1WeBND2LCFTahJo0S63PG%2B6gjhMI%2B2k88GOqUB4XziIasNkYHyBlrBus1jHTu%2BQ9VBOEkxrBARuuKp4sYjdoQRwtRgAicLErlyhDAIZDLGOlug9wLzyI5Zw%2FWZZ4X6oapDMbuCS%2FKZRl27dS5Fns2Ncg7%2F3%2BFm7VaOQdZSZMXxEp%2FyRRvt7YmnJFVDPor3OhKFD%2FnYxKm2JhUzectM9GpaocLMhVnfY6re20x92W83uUwaS9rG18aUd1IY449J02bp&X-Amz-Signature=5730b4e583c33204ea0d1b8306d4a463195e2d4a5c4f95f7f9550542b6150331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675FP34AX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152537Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQDYsV2upDbUF4%2FZrlGkjxQxmwMZZ3WL3tc4v5fa80reTAIhAPMWF%2Bzze8qKzf4a32QI5hi0wlX3Sj%2FstfJhCsJoaPWHKv8DCAcQABoMNjM3NDIzMTgzODA1Igwduvu2eNQrR92i6coq3APHz8UA%2BRkOXqI26cR%2BaH%2FIKjy3cfy4Q9xIHUB7UphMMupc6PHRyHCwYg3X1pFtWkgOA%2FTW2EcdUx9l4fCidsxFy3nJTqYsb7wxfVetU%2BUzqxil%2BZ%2FlDh4j3aIRch8OeO5vs3kYNK%2FBLuMVf53qGjD3Uy%2Brxxn8Cvb3NlunEMhhhoNg%2F1%2F8P7%2Bo4GTOWhF5dzlmh7FNrCvjA40v1FG9zGlIK377aZDfYaINfEyPkyxVyMtVwa5v6a36Ldo2L4vf7ROpew7vs6Ym06KpOE46p16jHmGUyZrnhJAlfwYnAEplmvtOXXTRrG4nf47t%2BANKh%2Fb19tiEpJ2wutN9yJbceZqKPz6qrv%2FZZ%2BPz5mKOo6kNbafftSpoahWA7rwTkrj6HJ2y813SL44D04rVjoMU7XMQZnVGH8MO1YCJcDECjwrpbeCx%2BaD3D0RzDrIO7PSj6TBXKlv%2BeIw0QT3nBdkVN0GwoIFwT2CGAMmO8I4qXf8dEhrgrkxIBdSfrrIvYdA5tTOJ8WMnvJcuP7vEUvUmwz%2BjlhzFW%2B3eBwtx0%2FazDAYUn5gWnXPgl9jMe%2BRTwf8GmxTpeB8xNmVjW0bRjKTzbZ9gDDfWqme6YE0AX9hIW2kubuBof9la59%2FnIg0t1zDquJPPBjqkAfuL34Joga269fk3zUUSTmZmW92B8qYqiJ91G3309GkvxjCJ97aaJIMp17uYz%2BMdQx8Hs%2BeFp1Apy2DeXiBpDupjamVVIZ57pBHgHbMLbqBtgy6XwFgoOa%2Bhqt0IOZVjP7m3CUsZlVz0tSAqScn1fSSZOl3QpwyPrBIJK%2FQ2nBuK%2FPTJU5OdmOyWm1iULwZBboMEp0888JH4cSeVWHYh7Kshkcwl&X-Amz-Signature=0045a6f130e572009671ec1597ca889119660b7ee426559baa42f74babe02938&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKGT4OZJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFx3cxhy1%2B7IbGdVmqOcpT4y4ylikAdajKYyeMFyQOzOAiEAi1ZBED0cvRJbF9nu6%2FtfV%2FDQEMsrbQn8Aj6mWls82EUq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDBM1LMnLpNdUsI72NircA8TunAmyaxffVxVzjqoLyjtQbTWkeHKe1Yxp0B32v5sf021ibnGR09RjdL5IbTztO9j1xCbVtcxshUFXiwixlFix1BrrXOVAv7yuerH4KZzb7VulomMJXRydEAUHAho3H63eWmzHAw%2BE0wcuLq8BwC96lVn7FkIiUQcuNzEa5eQqRGpdDUj7kMazzoG6rwtOjuemcWVr%2FL0qUL1aX%2FSSVGgLOy70UOzR6LSoOOomwe7l96RT23IhCWwL7Syav2pripaChbzOcKLSdBk5JYGxuQFWy7h0gD1qgKEZJ9J1WUAmqTswH0X%2Fd5RzQUNHXjqzVwzwAwPyTcYsuFVD5J81OjzNtRePuXPpJFhyH1rVMcZxzsPz6e1rQr7DivMl%2BsNSYcEDC%2F10OxUKdVnWykDU%2FA8C0NftSCKCadTLUDsiJTg%2BjzjhtPo3eIVQ0Xst%2BQyfuEhwba%2F6JNp2OieyiR%2Fq%2BZZTlmBec62r8wZyJJN2jfn1ZxMremO%2BwX9KSMzsoT4tQkVb05EapsfYU3rOt%2F1riIx3p4SSEFqmreaRxF13yqRjkVf5O3k%2Fe5DUv066wMbvVXtYnnpwAyljUGoJeS9cI4h%2FCrUjgRkmn8SS3l1OcHf9GyTRei8%2BiGnJgnK0MKK4k88GOqUB2H1tv85tJORsQL%2F3IkZYf4YZQyFPh%2FxzYrrFSaIOdTwT5V8cgLofjgy1L3r%2Bo7beKgUeYWChTt%2F9xM%2BjbmApjU0T5UfXAAPmTjQBuicDSOiTr0hZd9OUDsb5JfGuXsZyQzk%2BkzJLFFcxGog4ZxzHY87PR7pYA%2Bj2c7Ph5WVDCmkvEatm%2BCf1Wc8glz9RI%2BUb7685f1cu%2FR3XyfQJIuU9k9QTMWmf&X-Amz-Signature=d92fca4e15099a2698ff09ec3847094fe61c7e5b8a06417d2d1c87a23ee558d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKGT4OZJ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIFx3cxhy1%2B7IbGdVmqOcpT4y4ylikAdajKYyeMFyQOzOAiEAi1ZBED0cvRJbF9nu6%2FtfV%2FDQEMsrbQn8Aj6mWls82EUq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDBM1LMnLpNdUsI72NircA8TunAmyaxffVxVzjqoLyjtQbTWkeHKe1Yxp0B32v5sf021ibnGR09RjdL5IbTztO9j1xCbVtcxshUFXiwixlFix1BrrXOVAv7yuerH4KZzb7VulomMJXRydEAUHAho3H63eWmzHAw%2BE0wcuLq8BwC96lVn7FkIiUQcuNzEa5eQqRGpdDUj7kMazzoG6rwtOjuemcWVr%2FL0qUL1aX%2FSSVGgLOy70UOzR6LSoOOomwe7l96RT23IhCWwL7Syav2pripaChbzOcKLSdBk5JYGxuQFWy7h0gD1qgKEZJ9J1WUAmqTswH0X%2Fd5RzQUNHXjqzVwzwAwPyTcYsuFVD5J81OjzNtRePuXPpJFhyH1rVMcZxzsPz6e1rQr7DivMl%2BsNSYcEDC%2F10OxUKdVnWykDU%2FA8C0NftSCKCadTLUDsiJTg%2BjzjhtPo3eIVQ0Xst%2BQyfuEhwba%2F6JNp2OieyiR%2Fq%2BZZTlmBec62r8wZyJJN2jfn1ZxMremO%2BwX9KSMzsoT4tQkVb05EapsfYU3rOt%2F1riIx3p4SSEFqmreaRxF13yqRjkVf5O3k%2Fe5DUv066wMbvVXtYnnpwAyljUGoJeS9cI4h%2FCrUjgRkmn8SS3l1OcHf9GyTRei8%2BiGnJgnK0MKK4k88GOqUB2H1tv85tJORsQL%2F3IkZYf4YZQyFPh%2FxzYrrFSaIOdTwT5V8cgLofjgy1L3r%2Bo7beKgUeYWChTt%2F9xM%2BjbmApjU0T5UfXAAPmTjQBuicDSOiTr0hZd9OUDsb5JfGuXsZyQzk%2BkzJLFFcxGog4ZxzHY87PR7pYA%2Bj2c7Ph5WVDCmkvEatm%2BCf1Wc8glz9RI%2BUb7685f1cu%2FR3XyfQJIuU9k9QTMWmf&X-Amz-Signature=2aac6e22d88082efe9920b5eba423c403cab685bb20db773106abe3a1822c876&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UNXBSRSH%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCID9mr5tgi6Aq2dUvi0sbrET%2F7AQkU4fXwxqm7CglCpV6AiEAq4zYlh%2B6L6996HfM0KRpFjIQLBiv09aLf2hXEfGjhWEq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDLKtzMWdNNa8vu6rCyrcA5rMYUce1sC0BA5ZYk20dPPuMkLYhz0CLrKCrB16SrN6urr8V83k3mycO4GTgjn%2F%2F3f3xAHMXvNR6LWvOPY2uZN9o6Tt6bw37RvBoq8x98q9VstPR0%2BrLs%2Bsmpa2XeSV9pbt%2Fmbp6Z%2BpIxvSTTj2DGqdb3A9t%2B0Cv6eIORiGDCNtIWmOwJuYegSc%2F9NZc2Z2PR8N%2BsA65y8KNEmmu3Q3kx%2Br5PCLT6iSPsfWwMxvZwjI60mfQ%2B2MoS0MjG0mrEwPV2KdfowqPLU%2FLTeDJ5ss83%2Bb%2FO7IwKvr8nNU4F63jduVDVuDUiOq6Cdd0tGS0b2t9LGvVH40YW8klldYzbO4gSer7j2NC6zYels4GrEwcUvwpcgQpynaeWzz2zn4vHnH9jebAJO6YUXf36YR431yXcRtKrxV22L7yhf80491B0o%2F5kmklB1tJ3K%2BiYhVAsbFfyapciDVtdZFR5Jm8zsbSt7r2lxa8CsIbtKXFUjRYDvzbSJIy9boeDAwl8WiT6yw17xVx6ljnLqXKzEZNIg6Myub5xb74Mzsnp62T1BzdEM%2FyJDQBROKy5O86OeFJnm0%2FaeJdAa9h0n8RgrwAwlHmdPg5lyfhVR0rw4LGcHEQHLF6hJuOn5Xvt6wktI1MMO4k88GOqUBt7RsQtWAXW9Y9AQMIKglmYC8kUz2sZW8IN8mjB4HM2XRV5xIyyaSvZP1pV0advjI%2FH9AN9nKnXfTqLR7%2Bj38MryrNQScGp67dgPyZZNUELkQWpHXvspXOhCviZWpbwLcic%2F08FW3s5%2FgCCjHbUt6XXH8LpVJAwx6PNN6Y%2F9gkbQVuIiiipnO9pYofPb1elhn6sO3s%2FMJjfvqWsOSzQGTiAy89%2Brd&X-Amz-Signature=8c23bbb02a6373b92154c93ddad24bbb5589d5c9473ee8ad532cb73dad888595&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZTJZE43%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIEIKBO0mkefynR1inenfTbHawEmtG3yJW7mFiTS60LA3AiBQrskH1KqOQ1uelwtplIwrSZRo1UOcS%2FFsb4FtwsR3qCr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMsVz4aS5wYdqDcBY6KtwDSDfC0F6ir6DFy4VZ2pbnzsYVzH7RMm1DHz2UbYT%2B0uSXI59V7nVSYJU5741ACrgiCh%2FcqYJ5hS35JpkNzXJNA%2BnUhLgI2EDS7UFxTLw4VHvFXl%2BV0eI6v%2BWPEeHBGa%2FMAgvTZeU%2F3DdcxNPWVs%2BpSaTy9IW0VMZ6QyuQoSdYxGrwaOCid9fDGfj5%2FqApiGNQtcGAIWHTUl3ICq2sSEwD3kiTuQJmefniH7giabrKZikGqbo%2Fp%2FBAnXIOexRGm6eEod1m9xQTCFLidNWLqNynlDc8uJB1Wf1TJv0rrD22DqPvSAMesdXj3f6b%2Bpo0ugXa%2Fs9KZynY3YBoOzJKprfKd9BKg3BUEMD59F6YZZWU8OJfh9EVEKbernuywTqMD9obHmEY58R8qEwIP%2Fgj%2FyG9Aoyd2WSVPKzVyOkkzZr3TwmHfvV3rGJUWFFnn%2FaT3%2F7zvaw%2FFb%2FzibcUp8i3JJ20d6Oj%2FQ9RO3Qxjg9K30lXrcHLNR4qYzt6m0Mj7ygtYbef%2BF78CPoQtDZ%2BmjkDwWGb2aLDnVp%2BJY5Mt2wWGnQVVeJLhZNZjIl7TSWhJ3eAtCu9Be9MMD33fOSm0AFceC9HqmY2hCOykutre3rBkmf8fsUdzJzY39PrH%2BQqIy8w5rCTzwY6pgFrORGWmXot2X7qcgqXsIGTpbS63qqxIbEWey32RS%2BgADM%2BQjlndHsplUbkxBUFv9e1ftnO1qv%2Fxk7VqomBnOffAKuvasEKrvF%2FvBk%2BXg7O1abEY8iQP0M9%2B83VsHxhBg4Ur9w6PguG0Oi0MLUOxhgNXfwGPmxWKeZOG1ebjY%2Fd8ZDjDUyl3mKyZ8qWOVo7Hgxu2K3zH3i43b7Xa6sxdvY0TxMagFt2&X-Amz-Signature=3c371460be61680d476f998312f074d7218cd41d79ee57bf2456d25f79470e08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VHTSI26%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152551Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJIMEYCIQC4wB7idIy8egTIwTxqjAlByhuReaeeIAyvzhGFYuXllwIhAP7AYSmzmpZVB1RzSTCH0edjY8yAtshBwf7y2Edl6U%2BhKv8DCAcQABoMNjM3NDIzMTgzODA1IgwcIOphEdcHyO9uWi4q3AMA9tPhueNRuQq6CdgjaJLHLQOGqfc82YH%2F3n1szxmFmQkvA7Zw4hOtlVbJq0gPHYuntkYVQZSCN0s0he78euJtbNU61gfO%2B4UZz%2Fk0agN2kqR80TUhGH%2BKkSHkdPyKAjcur7oEacyn70rC9nZ04Rzon303BuXyNnO%2Bl4tRGG%2FbsmjiExeGVehdX2Ty91eeOz7yI1p4GVCwidEkiSL5m0bKAdAQn4X3BmGmarx73GoYK9JXjxW8Ex5Enga2jaiMKSw54Z1hBd3yhLxoWHwRY%2Fh6O5BK7JVqECfQO8HgjPCmVW34mHwW8ExTCSeRjAxqrQOIgqVjRilYQcPz14%2B%2FP3o3OyZMx%2B1urognU%2FnzfviCG7XJshBWIX%2Fv5IorhbyjUM1mhNLIQf4u5r%2F2kA6JHySKjLNjXmdz7AaL6n292eWQxpE%2FAQJ2Y7G1G6sjTgxVNNzEUo%2FRA9nmLOsVrz1voYo4o%2BZxq7NVxJDBVWc5l6f8SH7AgpodGtFgx1Pug8xIA%2F6%2BpwzNPhwVzTZQYjfrt0rFte7iL25KsPQFV0%2BSxCIqVlkEtQ9YF2WoV8sw1WlraAUdVp0CMDK5TldqmWJstrDT7PCqJ%2FTumWOqtzwXbV4%2Fae5V%2FUSGuaLRIst66zCVvJPPBjqkASdoizTiPU9a2Fi9UjMpTisRzwoAQVaV7OJ7PlAjKE9KX6pqR3n0cO329SD%2Fcw7lXRKZWQ78NNobSxXWqQ7NmyckOXEo156ipDTfaIzJlzHrls2hkvmsHV3B3Dky7EBg1HZHhtz4XDiBRo2i4JacsNEjM%2FNnSUwQ2GYzUYiyAVDJHdoMa6ApCBn%2F%2Fd2QySoyoaLjb4CNu88PV2lL1tAG8Kzjzvj1&X-Amz-Signature=69e676b67d90b19efed550caaf056594c78dbb2224a5cf943ad6257fd0193e7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW4YRJBQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIB%2FHwRiO7mvFQzFAci3ByVKetlQFKrdbKBrgODt9yHWlAiEA5Jl0PmHq5wFnd5UdGICwAoRLXIh7X6MjuFQwJWqPy7Qq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDCkPmHVX1XfeaHosoSrcA89wH%2FEA%2BCq%2FyrIorl4JVyV6JNGJUsjRAn9BDH3EuODNolO%2FduZzuO8e9nsGOLaXEN3a2jG8M6OHtJ1Z8b0xAbKXnUqMgKa19ehHTMVvybHocwB1vFajpEWQorkrczarTlj7cyXzr21%2Fx77r%2FBDrU9YpxnKHKhveE%2FjyAPhtx0K8Xm0v5z0ieQDipBj%2B%2FNgVGRPviuiOQHn2Z6gIbGIYcs%2FqXt6QKhqz4o%2FmecJfT7UURPMD2fCh9K3bm8S9Qjz4BTALJo4v5dMlEVX7n%2FCvB6LCAq32M6ZfiSa3XX1S6PqjlaO%2FYkCFVfCQ2BJmRxVsJZSUKk1yLvSMUMueLt0%2FlQmwDb4aqXKxtuZIAnHFkIL7GnV7F0bXFfePyU5x5Ibbtchnbb2sgUMdg2bz6PJnJ6ptQwHbcjiKH1OCald9KC2CCYkVwRDfC2Oxx1mkOLm6HaSgZ1KlenPZ0HiAzChlr9UJhuJAMXHP7sprRhtILsqE0HILVDXUkEpmsv9x0pqKmjnCKFcFNmq3S5y%2Fms4rX%2FQDR4E7HnH8J1eorClNAN4cyTkiH6lGRjP5ooF09B8Bp7%2FQzlb%2BTW0TTOo8SDkqAmCfKS%2FTqUjx7hvBwTbnsgyL5YE0fsILBD1tGUsbMMK8k88GOqUB4hkYzuRa9zugbVAJ%2B6ZEkaNK%2FjdPdkeAZ03v5JygfKNe6rWSsXTFcpy%2B2VW17ZLKnGpHK%2FF8S5drttjYiQyZk1J7uo7ShyUvJWKl3DCsGFnw6Gip0pvnL1AdgIP5yFoMpRw0b6MLvgX83iXL5%2FR4MRMUuuRLlsOI7yNtPSsvjCwpFaR4hDf1rtvGQXBHqmzvW5bWulQqLkc%2FGfRFXFetOlKPEQ%2F4&X-Amz-Signature=4dcd36b421beb50e6e9abd18cced6ad362d607216298797ce31d856ac24b7c70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XW4YRJBQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIB%2FHwRiO7mvFQzFAci3ByVKetlQFKrdbKBrgODt9yHWlAiEA5Jl0PmHq5wFnd5UdGICwAoRLXIh7X6MjuFQwJWqPy7Qq%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDCkPmHVX1XfeaHosoSrcA89wH%2FEA%2BCq%2FyrIorl4JVyV6JNGJUsjRAn9BDH3EuODNolO%2FduZzuO8e9nsGOLaXEN3a2jG8M6OHtJ1Z8b0xAbKXnUqMgKa19ehHTMVvybHocwB1vFajpEWQorkrczarTlj7cyXzr21%2Fx77r%2FBDrU9YpxnKHKhveE%2FjyAPhtx0K8Xm0v5z0ieQDipBj%2B%2FNgVGRPviuiOQHn2Z6gIbGIYcs%2FqXt6QKhqz4o%2FmecJfT7UURPMD2fCh9K3bm8S9Qjz4BTALJo4v5dMlEVX7n%2FCvB6LCAq32M6ZfiSa3XX1S6PqjlaO%2FYkCFVfCQ2BJmRxVsJZSUKk1yLvSMUMueLt0%2FlQmwDb4aqXKxtuZIAnHFkIL7GnV7F0bXFfePyU5x5Ibbtchnbb2sgUMdg2bz6PJnJ6ptQwHbcjiKH1OCald9KC2CCYkVwRDfC2Oxx1mkOLm6HaSgZ1KlenPZ0HiAzChlr9UJhuJAMXHP7sprRhtILsqE0HILVDXUkEpmsv9x0pqKmjnCKFcFNmq3S5y%2Fms4rX%2FQDR4E7HnH8J1eorClNAN4cyTkiH6lGRjP5ooF09B8Bp7%2FQzlb%2BTW0TTOo8SDkqAmCfKS%2FTqUjx7hvBwTbnsgyL5YE0fsILBD1tGUsbMMK8k88GOqUB4hkYzuRa9zugbVAJ%2B6ZEkaNK%2FjdPdkeAZ03v5JygfKNe6rWSsXTFcpy%2B2VW17ZLKnGpHK%2FF8S5drttjYiQyZk1J7uo7ShyUvJWKl3DCsGFnw6Gip0pvnL1AdgIP5yFoMpRw0b6MLvgX83iXL5%2FR4MRMUuuRLlsOI7yNtPSsvjCwpFaR4hDf1rtvGQXBHqmzvW5bWulQqLkc%2FGfRFXFetOlKPEQ%2F4&X-Amz-Signature=73306ac21d2bc98142c23dcb1819e4a9eac90a00086e447765c418550c68073a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ7DBMCM%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152535Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIFFi9aHt%2BR9mOvR3xJKyJ7%2F9oLj3KTjDHIytSt%2FC90DbAiA4OMU5w5S%2FT%2F8GMXRjXnjobdTg6a0Lk8jnTkmzh0EFoSr%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIM9AlTzxoyRuFY9wYPKtwDwsvzt9GptdTALtr1SCkLJFUe6%2BWYLhXK2LQuT8jSnpqa4BHUAU6HLdTl%2F5cqLg7%2FOZWp3xDMVfME5xsSA88FgcCDTachMsTEo9xXiYpboOvktIL3%2Fg5uHXnA6fBNCl9TcnDVxe%2Fgz%2B6COYBn3%2BZ%2BHOceBz1MdtFe9V%2BrOLh%2B66Bif7QZZnsmmQ%2FTWefLiBZkgNAPWPSbSm%2Fuq1RsU2ETumPoNAZBjmtQI23bF6JirOOa%2B%2FGW72i6SGTMFHtnLhbqu42HowrDMA2fh08eaZ7K6bs52uNtj7fswRfQUhru9hWLw0ZsQZiVxi1%2BYuIw3ypPJ5W7g3dgHmHKcHdP2OupWTIaF8YNvS%2B4cth%2FC%2BPZFdXbgphQReaP9LAVZiXWisAUbMYdmIDrTCIuTYWY1bEC2j1O2TS7o4gXUP1%2FPaQmxGxy2b5vOuVzqafx21iFAcDlJuP9zqLRM8IH8d%2FgmkorOxJuD14ZylsS9bhjWJumjxpiB7M1bQp5RtKjvU7oWloSiDWPrqkYFn8r%2B4P64BUEPF6lWkPfNUL8rCmqwm8b6VmnotX%2FA9qM6ICwYnM7hMU2ET%2F7%2B%2F7SxSdLMb%2BJwOD7HpvfEg2UDVCfEKXM%2Fdxvvs6c7lYxkwS43JbQrpcwjLOTzwY6pgH%2Bl4GVmkN0i5%2BVZ1INxxgGxf3ae1MJmmvx1Jw95CLyusEnHGHvJcXe3xEB6E5QTiIQOHuQUP6UXYk8djsVqLyEBS6sTwEjPafn8WIu338gc2%2FEq1zs0Opv3%2BLBi7lk4tkIwCxIoEsC7fSI1%2Bf0MBqBR9aTMuS0GKaGqJFo5o0FDjQIR38gnAnVrVOAD%2Ft%2BkfirxMih159tvhJLUxgdB%2BifAxNSxsj5&X-Amz-Signature=7d47ecd97c3b207ff97732b767ce075ccf8df29bd3c3e1779aeaba2758a8713e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KMQOB4F%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCL1wXooeTkLrskAjJ2LwuJSHe5K2UdWmy4HSTaLMyA9QIgBR2kQjZKNr3KHTRnyjpuJHdDlxQ2dNd3jpMGRPAPnu8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDA9g8p1Ah3Mi9FMk4yrcA28HRsCEXW%2FLJL6w4KradIadSy5S8WwnGXto3uuEc8%2B%2FUiUwKmvL0UiOxu6%2BVA7QNyClfgjGKVPVzWhTqMs31Xq9seifE9YETwi4FdRqWAn9nHoy7LBZVM1bYJP8u%2F7gQiXcRcaeIFEy5zBWUd6T6IJynsGDbQc63faTPqdxlbcAfpxOOFaA%2B16TU6w4JpLq0cwYJPddlAe0fYz%2FB%2B6ykdq5EF1vqv3CKY8%2B7Go9xVir1CYYhJ2%2FBWWeildwKFHkOLxVFn2rnoc3%2BYTVbkVsK0TTqW5pOOzPnnyKhCEKYF5iSqR8d4GhUXvTLbI4%2Bl%2FMTHM%2Fvmeb8YCru1J8P2O8tSn4zdxLPHzE2eFXiBmS8YUnEGKO53Mc7Tu%2BJvDT6XJKQLI9fC0aAfGdkaDSaQCMeA5UhKIj1oBYw4tJggATUpioFD3tyJaqvAgC6rpOIzD5zJyZ5B1zZouCbohPuOsSReZ3%2F%2BxA98EEYWfsjKo72Oav5KmSPmV%2Fog1L1c5wxGsdTJCfrxjNZdHaXinbAclOqtKP1eagHuyaHQmkv%2BZOTaTa6VRzBLH98uSVkyYzR7g7rqfafPsOuPzKYQ4dyn2o%2BASuiN2SiLbVToSv3J%2BrL8Gr6vI%2FDtwmOj2qNrwXMKS6k88GOqUByYE1V2a%2FodrMlxuT3FEsHIa52B8xhGrpKXzRUB9WA2RzSH8n%2BPA%2FutDy8g%2BTLDr2gIXbKcc5F6NirSUlBAS9zOufD8uU52ZzndM6usIyJ6rM0rX%2BmfdHxwrwAQ%2BTqsBcQnlIIg%2FnYBSj7EmXUpi3ZcASPkCaCUCnmBZPGu2TVxM7oRIMSocT%2BfoD8IXyM2pktaB4vvnWFqxwn%2FZu88aioO1XXZkj&X-Amz-Signature=f006edeb8f4cbf66811f5eeb5442c7beddeb4b97ec8f19b44fa53e2d800c3480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KMQOB4F%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCIQCL1wXooeTkLrskAjJ2LwuJSHe5K2UdWmy4HSTaLMyA9QIgBR2kQjZKNr3KHTRnyjpuJHdDlxQ2dNd3jpMGRPAPnu8q%2FwMIBxAAGgw2Mzc0MjMxODM4MDUiDA9g8p1Ah3Mi9FMk4yrcA28HRsCEXW%2FLJL6w4KradIadSy5S8WwnGXto3uuEc8%2B%2FUiUwKmvL0UiOxu6%2BVA7QNyClfgjGKVPVzWhTqMs31Xq9seifE9YETwi4FdRqWAn9nHoy7LBZVM1bYJP8u%2F7gQiXcRcaeIFEy5zBWUd6T6IJynsGDbQc63faTPqdxlbcAfpxOOFaA%2B16TU6w4JpLq0cwYJPddlAe0fYz%2FB%2B6ykdq5EF1vqv3CKY8%2B7Go9xVir1CYYhJ2%2FBWWeildwKFHkOLxVFn2rnoc3%2BYTVbkVsK0TTqW5pOOzPnnyKhCEKYF5iSqR8d4GhUXvTLbI4%2Bl%2FMTHM%2Fvmeb8YCru1J8P2O8tSn4zdxLPHzE2eFXiBmS8YUnEGKO53Mc7Tu%2BJvDT6XJKQLI9fC0aAfGdkaDSaQCMeA5UhKIj1oBYw4tJggATUpioFD3tyJaqvAgC6rpOIzD5zJyZ5B1zZouCbohPuOsSReZ3%2F%2BxA98EEYWfsjKo72Oav5KmSPmV%2Fog1L1c5wxGsdTJCfrxjNZdHaXinbAclOqtKP1eagHuyaHQmkv%2BZOTaTa6VRzBLH98uSVkyYzR7g7rqfafPsOuPzKYQ4dyn2o%2BASuiN2SiLbVToSv3J%2BrL8Gr6vI%2FDtwmOj2qNrwXMKS6k88GOqUByYE1V2a%2FodrMlxuT3FEsHIa52B8xhGrpKXzRUB9WA2RzSH8n%2BPA%2FutDy8g%2BTLDr2gIXbKcc5F6NirSUlBAS9zOufD8uU52ZzndM6usIyJ6rM0rX%2BmfdHxwrwAQ%2BTqsBcQnlIIg%2FnYBSj7EmXUpi3ZcASPkCaCUCnmBZPGu2TVxM7oRIMSocT%2BfoD8IXyM2pktaB4vvnWFqxwn%2FZu88aioO1XXZkj&X-Amz-Signature=f006edeb8f4cbf66811f5eeb5442c7beddeb4b97ec8f19b44fa53e2d800c3480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEEYJUQZ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T152553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIHojpu726qoy0melBbCg1fi1DBqzYP77LChH92tUIgFIAiBbK1qgX0OV2ymnAMN4nCaWgm8EWO4JRiSOBTB8xc9Biir%2FAwgHEAAaDDYzNzQyMzE4MzgwNSIMW%2Fk1yZFprcxYcv%2FfKtwDNVFxfaSJxxATnYFozi%2Bfuu6cg6zlMfEV2rsPiFlM1Bta4XuW2a5ex8gxsUaP0vZd9jy7XTaMXoPdYocRzvjXXI3cCbdEs9QDEF4K1Q%2Bp2KIoCfY0rqC8uNvBVn1DomgehpL6ebWym2Czc%2BCZ0AgYSwWiZNegFTMV9zzFzoRZs%2BsNRvmgGONkxZVTFde1jvga%2FoxQkXcnAoLdVbY%2FYIYWpioEct0i6fqfOJi%2BcFGU5aJd%2BOp%2F6BzbU7SGKjLI%2BgVB3%2B9j7YwWxdJ1PJF2KMBRxwbR9Y5iy5fHeBcZFE5LUvxTEY6csauAfHZ1w3oBiDrxmXPtpos3nu7Ksr3e8T3IZ803KZx9Lh1vRXFgoS5r4%2BNFhYOyviaai7nXwNNcZujerDW9moEI2YQQsksLt%2FdHlUaFsxfsWuWXibNKd%2BdLrD2M2Hnqkur3Dr9zUyBsh4htKgnkKjU3hzxfXRuPb11uXyx43BgkylYW6Cek2I%2BewLf6PGbxsNUPrIONUD8xx%2BV8fwvY%2BiIThhyhUvoKUanWAjJZ%2BZb%2BKlq5rQ1vC08Ff7mJ6eEeKKEiR48n%2Bnp3stz9hBWfZI9nSSeYY%2BFjaEQKU03%2BsTfkE%2FCGBxWe5PKcHJ1uCGMWt%2BsdlmzjCGUw9bKTzwY6pgG%2BZWkmJmGEDmePyBD89vLtbgaS4KXFeCB5ixGHEjHHxhub%2F55X%2B9xdPneLreTjKvDO1HtKYWIQouF8bo%2FFj%2FwC5o1Itc2udlldT0wTAQlvOz4eERUovuCulycMow27zkHJLoQ3XmXDdrt4WK6EK%2BNkKjj%2FkeoFCFdE2%2Ff5iwrKNJzq2zI7WLPpUGzHodSSvsZz%2F0fF%2BmUNa0gGIwA6zzv35H1nu5H0&X-Amz-Signature=6b660caf21b0cb971dc7d42ae53e84cac22618ad47fda0774e7dd0f4ea9054b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

