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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NFCY5BZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQDWrWyVl4oNeKWl8%2FO9b1b%2BpAI1XtVtWpp7K3IXObrUowIhAJDcE3DTuAhgkEQsJzP%2BYdDEcptFkHOVv643D4KyHMJnKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxv9vdHQn0erpo7FdYq3ANy76OavW7pM5OQCClzH%2BwrSh3medubyKC5TVZmB5V1OG8tuZNhZw2jskRgutKDE8%2Fgj3oq9MNKtv4XPtz3z7Xe8Kb6oV1dIzJlNdfRHLWzgKIQiV9QaBHnE6fn7S%2Bu%2FzndBvV4KLUBkqIh6zQq5FV3dyIe4T3XjxZI2BO%2FVUZ%2F50LE2eZ9UUSWXHB6xP%2B%2BzXzND0NPb0cDfcsT49njJ2DXYS8JRijg9IlqTMBCNMYX%2F34dTIdoWv%2F%2BvAp%2FqFDc1Ql%2FV9XVC8wGWtWjWNuo5Ss6NNfJULN6KV%2FND85CYUW7laVAcs292adnCpQVei9vsr%2B%2BArikQTxYTXytukt82Kt2o34Z0v80Uuuxshe5q2FqUIQsvuerscGsOSBQgMB2m%2FR2kVHOJ81Ls1thLcrVK3Ft33DBDLZp0P2J%2F07cqy7tzw0Xsk5TUaSTbCqTFoh5ga9XY1HqqQaAo6iYBO3u3hDVT%2F9z8WN6RdGrdYVKED3T6zhkT1qXyXP7fFeMIMAElHgHTSOfF5GGNSad%2Bx2L13D0WnUF5ZWLjbgF5YD5iUBDrTYtGX%2B%2BqlaNYaEDsbBhVwIE9LaK6G0gMT4nbbiw9ffxcCdg3uUZFuhoj%2BShSn%2BJKL6L1mpY6fA1FPrElzCa1tLOBjqkASSpN5kEyU0gr5BXX3eIv%2FD00SVv82NDeWLLOjmDPsltk3y6VR31LhVuzT6wsSJu0QbD6dqdzAbaBXan%2BDC%2BiX2%2B1uzw2rSmNKSoAVLDJqYnKhp0uiAOy4fzhY9s4GEyZObrSn9PyDTA7gto7jNr7WO5WDleBlHfky0aEJH6QS8ZGPEDD5SJyNzhILtt1TV682nAZjsR268gpnxQWx0LrSfYiIWo&X-Amz-Signature=1e6acca3dec12babdfe12cdf9641ed03a3a781559ff98f6dad52efeb92bdde84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666NFCY5BZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQDWrWyVl4oNeKWl8%2FO9b1b%2BpAI1XtVtWpp7K3IXObrUowIhAJDcE3DTuAhgkEQsJzP%2BYdDEcptFkHOVv643D4KyHMJnKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxv9vdHQn0erpo7FdYq3ANy76OavW7pM5OQCClzH%2BwrSh3medubyKC5TVZmB5V1OG8tuZNhZw2jskRgutKDE8%2Fgj3oq9MNKtv4XPtz3z7Xe8Kb6oV1dIzJlNdfRHLWzgKIQiV9QaBHnE6fn7S%2Bu%2FzndBvV4KLUBkqIh6zQq5FV3dyIe4T3XjxZI2BO%2FVUZ%2F50LE2eZ9UUSWXHB6xP%2B%2BzXzND0NPb0cDfcsT49njJ2DXYS8JRijg9IlqTMBCNMYX%2F34dTIdoWv%2F%2BvAp%2FqFDc1Ql%2FV9XVC8wGWtWjWNuo5Ss6NNfJULN6KV%2FND85CYUW7laVAcs292adnCpQVei9vsr%2B%2BArikQTxYTXytukt82Kt2o34Z0v80Uuuxshe5q2FqUIQsvuerscGsOSBQgMB2m%2FR2kVHOJ81Ls1thLcrVK3Ft33DBDLZp0P2J%2F07cqy7tzw0Xsk5TUaSTbCqTFoh5ga9XY1HqqQaAo6iYBO3u3hDVT%2F9z8WN6RdGrdYVKED3T6zhkT1qXyXP7fFeMIMAElHgHTSOfF5GGNSad%2Bx2L13D0WnUF5ZWLjbgF5YD5iUBDrTYtGX%2B%2BqlaNYaEDsbBhVwIE9LaK6G0gMT4nbbiw9ffxcCdg3uUZFuhoj%2BShSn%2BJKL6L1mpY6fA1FPrElzCa1tLOBjqkASSpN5kEyU0gr5BXX3eIv%2FD00SVv82NDeWLLOjmDPsltk3y6VR31LhVuzT6wsSJu0QbD6dqdzAbaBXan%2BDC%2BiX2%2B1uzw2rSmNKSoAVLDJqYnKhp0uiAOy4fzhY9s4GEyZObrSn9PyDTA7gto7jNr7WO5WDleBlHfky0aEJH6QS8ZGPEDD5SJyNzhILtt1TV682nAZjsR268gpnxQWx0LrSfYiIWo&X-Amz-Signature=1e6acca3dec12babdfe12cdf9641ed03a3a781559ff98f6dad52efeb92bdde84&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQB4HNB4%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080204Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDodxgoMWTDWPqAvNN%2B7W8nH4IT8EMm6IRJ4WcIr%2B6GQAIgWCjZH%2BvkwWXp3sBzh84%2BFcTak5xSn%2Bok56LG744XclAqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLUdy0MQndNYG3jIPircA6qhr4KqASpvjS%2B41c%2F7IEA4MPa42UT6MkaVZ0urleCP2m23nmKwdS3hFzTGD1GXp9680NcF8lDaskelMlozGI%2FYhzJcJl9C%2FlyK87mAdC0%2Fd3SV2wv7i3tVKPn36uPU4hP2JNFZj2lzBELFhYA6XTmn8xEJzW%2Bq7BPhdTUOvk5u2UZcvO13hZc6%2BfBb%2B4UY5B6d3vp8fr5uMCRJXw1KmCmqjMOyKZLNErtyFnDibBOy9jtiPQIfkZw4hyBJl95f6dSQlU8F7%2BhhCpsVnVFnGPXTUv1XSwm5Lljs6LQG1cOF5b38wExCQClcVCrJlrUHamvFmh03g4DzoJKJzae%2Fj7zAp0tHH7zLEsMEDDUDtfNmiGebA%2BXUd7iO%2BYWWD7yNHqX9Ss68EsQDUdWHcAaEe91CeFq%2FzbF3GXnOP0WeUJuqyDKUui5EdkiTOKTCq154zvT4XQXVhb9Rk%2B8M8G4v5%2BBCdIO49QPYK9Vfc%2FeEQG48RI%2B0FLaJnAhWJJ2WDaB9e3B67XQs%2FHa92An2NAHu%2F9KLV39a%2Fbz48YRa9nEWb1S7ySVwj96trRem754Eqv9hYo6EGiS0p77yd%2F%2B8F%2FOv9ZCRKqKWVyGNCHFLE5qn%2BqJFvqpkW05DwlaPaEaMMOTU0s4GOqUBF9Ya9%2FITZLLbQj9x%2Fw3zwIwq4MAD8XnUFHrisb4U6i7PgrAB41DHPfZsGQswO1OkNLrkJuwh0bezM2i50%2BQILLTJ3OXUQSrOAkuKR2Y2DTFTYw39dVz5V0EvTYdk8l0rvnLal4vZeOjY1C8yNxBJGke%2BV%2FkMhTUctfFatpb80Kp2040USj78tIa3UyHXdAmjzu4p1D94h6zkEQsNpDXpe3YrW24a&X-Amz-Signature=407f596a58bda11d495ccdcf97a8e57118046bed75995163435bd0fd13ad7c25&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGGMPZSJ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDyegN8mHPF%2FqkxT1%2FVzYpnnKMm3CS%2Feux%2FhkV42%2B9RDQIgTyPuRFjRnCbhNa3VwA2Qttfzxd6IQYFzBt7mfD%2BqKA8qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJsXYdqSpUGw2RtCYSrcA9ma%2BfGjyuJaboA9FQIH%2FERt5kWZm9HbY4coz5lIVjlpCq5cTUvbHz3cu%2FBILGYwBlcI72etW5J55leH%2BlULS2%2Fqv46KTcer%2FwUh3wLpaCtXiuBa3ikT5D7HDkGAKewf%2FXChExRymbforTkiKiTmIDsYJaNyRB6jgaSiaS0vqBF5rgrJKPrb4DhhgB944MozLH1a95fwcnbLCt%2Bt0GTHGoZKm5lE%2BpzTK175zXYa1HcEcyJ4WL4NWQ8SHpIlCECljgAODiWTn1akCbnfA1Nvr0Rt0cQhnydiE80w3MrSfQLR2ZGsRMQlHSrXjiC5AlyxNF%2FI2NKohrbb%2Bn0%2BhBnKdc0HKFYHYQmqrGnH6%2B5qFIwTVy6rnb64OpOpbGqxgCCPNQ9Z3VCxEy36ZZyq9e8zvE0D%2F%2FaOR%2FG92DzPnrExWGPg975xtbsi4Vb2dtQZ%2BcqllnP6l7NuNKNZFrNLa8Ir5Hy7i6DQ2swxnzG4T4o1vpxwJeRrY3J5bJ3gYxyWZVGZhCYWT4ZDThjRGrYxHc6vsl3G%2FSFLhULyzV1yMFYqoQj%2F6cPZJvo2gmHUkAUE6EDagZTOmBJvh0QK1zu1plzJvzZt%2FSqoaJZl%2FNKDkXSvx7KpPUK1rf5fam8hgV40MNXU0s4GOqUBAA7lydd60g02qODDCzDhDdJg%2B2ozWXG9yNSZ2qTjOz4BmSqbhBXXfdwkrgmVsTipbf4Kkd6rOpkmyi7DXRO%2BYheZXAAV%2FybYN%2BvBv8f%2FS9neliW%2FwM%2BjfGcjn5sKKhySJaETJziTuL%2BAIvd6Mnl91QGPkGkxhk7IFt3qgxXOw8UqWx6%2F3i6X0AzQhDVmTmEliRcluU4NcWr360HEw%2F9kdUZWVrTk&X-Amz-Signature=c2c0ec178fb4e91142388b60ef1e50dd790b88f40c55e8ba428ed402a0373920&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGGMPZSJ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDyegN8mHPF%2FqkxT1%2FVzYpnnKMm3CS%2Feux%2FhkV42%2B9RDQIgTyPuRFjRnCbhNa3VwA2Qttfzxd6IQYFzBt7mfD%2BqKA8qiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJsXYdqSpUGw2RtCYSrcA9ma%2BfGjyuJaboA9FQIH%2FERt5kWZm9HbY4coz5lIVjlpCq5cTUvbHz3cu%2FBILGYwBlcI72etW5J55leH%2BlULS2%2Fqv46KTcer%2FwUh3wLpaCtXiuBa3ikT5D7HDkGAKewf%2FXChExRymbforTkiKiTmIDsYJaNyRB6jgaSiaS0vqBF5rgrJKPrb4DhhgB944MozLH1a95fwcnbLCt%2Bt0GTHGoZKm5lE%2BpzTK175zXYa1HcEcyJ4WL4NWQ8SHpIlCECljgAODiWTn1akCbnfA1Nvr0Rt0cQhnydiE80w3MrSfQLR2ZGsRMQlHSrXjiC5AlyxNF%2FI2NKohrbb%2Bn0%2BhBnKdc0HKFYHYQmqrGnH6%2B5qFIwTVy6rnb64OpOpbGqxgCCPNQ9Z3VCxEy36ZZyq9e8zvE0D%2F%2FaOR%2FG92DzPnrExWGPg975xtbsi4Vb2dtQZ%2BcqllnP6l7NuNKNZFrNLa8Ir5Hy7i6DQ2swxnzG4T4o1vpxwJeRrY3J5bJ3gYxyWZVGZhCYWT4ZDThjRGrYxHc6vsl3G%2FSFLhULyzV1yMFYqoQj%2F6cPZJvo2gmHUkAUE6EDagZTOmBJvh0QK1zu1plzJvzZt%2FSqoaJZl%2FNKDkXSvx7KpPUK1rf5fam8hgV40MNXU0s4GOqUBAA7lydd60g02qODDCzDhDdJg%2B2ozWXG9yNSZ2qTjOz4BmSqbhBXXfdwkrgmVsTipbf4Kkd6rOpkmyi7DXRO%2BYheZXAAV%2FybYN%2BvBv8f%2FS9neliW%2FwM%2BjfGcjn5sKKhySJaETJziTuL%2BAIvd6Mnl91QGPkGkxhk7IFt3qgxXOw8UqWx6%2F3i6X0AzQhDVmTmEliRcluU4NcWr360HEw%2F9kdUZWVrTk&X-Amz-Signature=37658c07ef0afd7736d9f694373b1bead87ecab93454b75a4a490835bd99cf7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMFPWB5Q%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJIMEYCIQDL91xItj123VvDJ5Wj4ztOLUvhvhT9%2FjX%2BCxFhzDoeGgIhAJ0%2BlOw6Tflb%2BZUkJMj9tcaY4AhrGPFmr%2Fv1yGqpToGEKogECOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy8AcYx4dQMqFveAN0q3ANjhEb8PU0roLhXmj3%2F7IXMs%2FDGGAt8fElH7lmJVuLBobREF2mTxrsJFhMeWAM9D8CZ4gmdr4HKTKxXY97lpcSULQiOPbH2oe1KGSI16MKzF03D4AR%2FkGVrtVYeiFbnRW2FUJV7Tq97kNLCwF6NzbGCLSszQgTO2JVD%2BBF%2Fa8%2FiVXbWP%2BVgTebJAZDs7HWqqKtmUxVCqLyL7R7PZ%2BmlCtmhgrIlkdJ0c8gn%2Beh4Ucwxxe76KaqnG5M3xcbsbtrtLS1Bg8wax%2FA%2BHXBVcOhg%2BjO2UBrKRAXT%2F%2BGBGV9wGNAiSBqypeClhYlR0Qu9XtAmFd0j59L4QQ%2FflExwEdA3ChcTXV7OiuY0cEckcImjD3%2FoJyNsN9svoT60LYGPKhnLq2DfAlb%2FaJ3b8ohZ%2Bsfb77eqA0Kjvd1kL9JCrb5efwX4wHa3l%2Bj7plJEWCB0Cc4ucN4JxxL7YntPkE64lZq%2FupNqek2jtNkzfd1x%2BvGaMVm22lSENYqj%2BnPcGgtB3o544yHXOTPwiU0%2FtD4iCPpTq71g4Ci2UEqfWbVCQAZDlwRDrEzcuTs4eDdgQFTN3aJlOPClIoyVqa3%2F%2B3tv%2Fan%2FHTW%2F44pfoYdUhfUE7rEoGfCly38okiZTZRYC37wwFzDM1tLOBjqkAW6ZmztxKGmYLlZ4gfWNrFZhNBJAcRlkCqzRo9lwCPaj%2BixIM3CvwRbC7RzMFRYalNqo1Jmh8c%2FDWy9tyrWcOpwnKIsFEG8b4%2FIFirf%2FZfniVtajEuyELpu%2FZYD51Ji0jZf%2F8BtOfuUHWzkOW611xcMyWh663clZRFrWc%2F2Rmc1d9x1y3khFapn2dqj5MxJZsNPOgS%2ByzEh7mc30SzZytN5LEA%2BW&X-Amz-Signature=1bb80689b768cd98ae78e9b4e384ccb8cc32b42892396119b16be027b96250db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPFQTSOH%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080205Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDl8F16Amh0uxOR5gdJRQrMihHHHzclYU52STpCMq1qvwIgWnfHCnPvRQcuDvWQToXQusUmkwfSt43ilsFhMogS2PAqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL8iRRIelv6ynu3ghircAzkc9YAsAvm%2FJu5KpgIcMbqopelfA8Z6KGWhDkEW228JbyRdcXtIyxhUoLqyibTb9AjIJH6hdMla2dxEdRtUEIYZgjvuGbeG1eel681%2BBd0dCdk4%2Fd7Uzt473R3BNm%2F4KsSmA41j4ONOaQJaRDKHQN6aURGrNwe5cr9%2B5PBX%2Buz%2F24l%2BFF7VwXGGhuFBQC61%2BF4bR7cy6wnoRXmfvwHYMv4ljACp87Tns%2FnfU3y60GoFbyKyKp6OnT82A3FTfRkxiF25fUPDGB9npTf0RUY1KzDPZgQM9hmiUuZtRcplthOSC7EmxVXZ6AaU3WhW2S7gH%2ByAG2JrU%2F7Vm%2B52mmKCDj2aVO8VjkqTk9fcGxJ81EM9Y03QCfO6lgGY8rpldVNMQF3ZULdhoHAOcuIDAxh6Jt2%2F1dJRNmiowJRWiSr3gFC62ovUPXl%2BQyyDeIRiDh8%2BptRFB%2BrhKre6GAcaw8c0lbZBvo1D7U5vjT5eD%2Ff81isb03nL8uqKKSkftVlbmkJquXQ65SPyLvGpD5kO%2BqXLLM6DOChXnLCynZpr0qXf7%2FcKn8ghypPe6bYD2nslV%2B%2FhGQmOlTo39mTU3iEvwGcGEuZspOyEii78vpaXoTAxO%2Fi73E0XNBYT0MuZ5pU7MJnW0s4GOqUBCJnKLdisW83DocleEs1WBsCxIA3fenLZMSk1DQRpE6vWtS4TUWpFQqzkPHlnTlyK3Hq4fHXBuZMGYihPAIkrLOg%2BQo63SgL1aM7BvgJM3AWm73B92V3RH3%2Fksf69vv8QGHWl4UBHBYxodvgmTD6hmAUiC6ImnZ32FumL%2FySAQYVKaevRax3lJ%2B0jGVo4lnf9%2BSfG1CfdVUBIcb3qc20LbhHR81AW&X-Amz-Signature=ffe0661fd6fbaa1c15061aa3f33f2a4fb7369be09cdb4a77fb9ab0c8f97c14a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH6FCO4I%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080207Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCID26iQ9lY6UqVPa9%2BNO4zqD1pnP7RV6CyheZcKUFlwCdAiEA4QI8fE5YybpWS9a%2BauQYqLQxS7faPvCjN%2BU2Opo%2Bd3sqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM0tVoDCRma%2BwRZtWSrcA6Vbxuv0rIelgvbA7fVFYdABy0yfqfbasG6HZfySFLN9Xo4QmMTRto1VipS7OUP98WHzNis17Z1hhPi%2BBvfM2plawd8biVFx0YP07LePPH0WDgI6uYVHrZ2%2F8HuzlZYaba6dpbMrN03z46GDFRUtnLXDfBMkid2mJr6JDWN1%2Bf3CyruwGt%2BAq%2BaEu5R6UGj3a8%2BIJgkHm%2FZzKlDhJZCJyP0nXX8O9rCfshn47ZKutreyJQaEo%2BYIvDKZbFninGhIZMT4qSGorTJrsdiiLWA68%2F0G3UCkbNRM3FL5xRtYb%2BsAoPPpHKDnNF5yrfvNEA29P4D%2FdHO7EQ5Ht%2BhuIw7qD512Uu0wA8Br38CIjGYM3Zz8lGMzetiXE9qmSGsNfYqjLz81AiqLOxu4MmwvnYWbKRdB6CKFOKwGYI7cQ6ssW89nC8sCZradd14zvhlWtvfBNG7LHepNXg4GBn4g1mRE1wAcXtP9f%2BF8yZQ1Q5btlP8yaWuXCQvV%2FFHN%2FCs%2Fc6issa7FUXZweecEE3pR9eV5i0RQ%2BDXU3uJQ98y0P2p3bYJx1Ahnu0ICEvtzGSAVrNC0S%2Fixp5%2FXWIewNJ8BkkP%2F8VsYD3mMShTQUym0rTQftQbRq6bZDVzaBZ6RBAHLMNHV0s4GOqUBI5bbKwOUqT5WLv3ApBwS7YVWX4mAtGy0KrSh5UJTfyYzzHLhoyZFIVCPDwWLEMTPzfe1wwoiyOy7fRlY4eS%2BtGgNc0xpIFYG647UhKt5zhGjUgWeMznnKSpII54FlMK3DOV4ivm7DYXKpVDFSSpd%2FbXOnKJ4g9pmNq3n8IVUg%2F7Dy2K%2FqaXkrw6GHJBRRxQyArG4%2BN3tQU1JxX%2FRlp85mbx8VxYE&X-Amz-Signature=19d9246a111ffeeffdab1964bfb544edc6b6ec90a45f8f8c856f9a560e8c50ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV4MCI5J%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQCCH344fHYn7DUrH4p20oPShKcN7m1uZejznF%2BuTZYSbwIgLVzJVn%2B879BCWhw9RAt%2BB7k1GaBbAp2UstmPQLTZU3IqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB5xETqBgf89kVLtxCrcA3zisKwFoFh4sx%2BwrEVgv0fGFobG%2FsdQDnfi3MBx%2FcP1UIXsG4qx6ynJ5nCEv8L%2Brt0Nym01VPNhw8dsLWaoxYG8NfQGqkAYlH%2FFaWa5WVjGt9BbY6Gk35a1pFunKznTakbf0UzW%2BJ%2B4tn%2FrBPqDsO3nG39SeWd6TycrNyMxo5KvEPG6pb1Pn3fGpVcnZo31tYbVXcKZ%2FzQ%2BI08B4ndKh6tMdyAQ%2BN1DhjQ7bbOuFO1FDhtKH1ZKPjGrG7ayuJBL%2BMwdgNX3T3p2Dyy6nIs7Puss4zKqDz9bYEvI3pCOk%2BUDaONUeSIDPfsM6FTSgOVAGEjl5DskxRe%2F9Orwlx4PaMWW4I363AODIBWGZ4KX4t8h5uD03EDQKbaKkCSONe2oXyWMatzxwUuE40R92%2FUt53150v2BPKvZmYRTsy%2BySmCIqoFZ34sQCR%2BY9EoLGw7KvF%2FsKFaXBCYdyqJrxUUoXBDAwTRhNGneRDFOdHVsDZqIL0seTij5%2BUIqdZTK4EpaNebAcECaEGCMcY5dOqupel3Ot2LxtXU36zxIGKii86EVKWsxN95w1DPSaKrDsHani%2FPqw06IdrxwR%2B81CobjFFAFoY3jX0jueBuhSCINnN4cym7K0Ll3%2F7ZQ3MnYMOTU0s4GOqUBlPCscfSWS47koogs4WXiFXC1t%2B%2BVhpbsulNvG%2FBt6tN2RTkAWedJmYdLq5qyLRK4pCpnLlohGIiZlv0YqJA83nxki%2F7YDDJDOrOlQYTA26kX1X6OSoks7pHJUTznXoSPH1pHkoXsKOvuQFKJtmqLAjUElcksvoDygPgyI62n2dYfSuZ6v1YPVODzJb%2FSUvWszt6qFyaWuXw2hT3chNT4pJ4ol%2Bm%2B&X-Amz-Signature=71b2cb3574858c805b2998afe4c6ed1f4f90d8c7f0ada8f841847a519d479ab6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV4MCI5J%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080208Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQCCH344fHYn7DUrH4p20oPShKcN7m1uZejznF%2BuTZYSbwIgLVzJVn%2B879BCWhw9RAt%2BB7k1GaBbAp2UstmPQLTZU3IqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB5xETqBgf89kVLtxCrcA3zisKwFoFh4sx%2BwrEVgv0fGFobG%2FsdQDnfi3MBx%2FcP1UIXsG4qx6ynJ5nCEv8L%2Brt0Nym01VPNhw8dsLWaoxYG8NfQGqkAYlH%2FFaWa5WVjGt9BbY6Gk35a1pFunKznTakbf0UzW%2BJ%2B4tn%2FrBPqDsO3nG39SeWd6TycrNyMxo5KvEPG6pb1Pn3fGpVcnZo31tYbVXcKZ%2FzQ%2BI08B4ndKh6tMdyAQ%2BN1DhjQ7bbOuFO1FDhtKH1ZKPjGrG7ayuJBL%2BMwdgNX3T3p2Dyy6nIs7Puss4zKqDz9bYEvI3pCOk%2BUDaONUeSIDPfsM6FTSgOVAGEjl5DskxRe%2F9Orwlx4PaMWW4I363AODIBWGZ4KX4t8h5uD03EDQKbaKkCSONe2oXyWMatzxwUuE40R92%2FUt53150v2BPKvZmYRTsy%2BySmCIqoFZ34sQCR%2BY9EoLGw7KvF%2FsKFaXBCYdyqJrxUUoXBDAwTRhNGneRDFOdHVsDZqIL0seTij5%2BUIqdZTK4EpaNebAcECaEGCMcY5dOqupel3Ot2LxtXU36zxIGKii86EVKWsxN95w1DPSaKrDsHani%2FPqw06IdrxwR%2B81CobjFFAFoY3jX0jueBuhSCINnN4cym7K0Ll3%2F7ZQ3MnYMOTU0s4GOqUBlPCscfSWS47koogs4WXiFXC1t%2B%2BVhpbsulNvG%2FBt6tN2RTkAWedJmYdLq5qyLRK4pCpnLlohGIiZlv0YqJA83nxki%2F7YDDJDOrOlQYTA26kX1X6OSoks7pHJUTznXoSPH1pHkoXsKOvuQFKJtmqLAjUElcksvoDygPgyI62n2dYfSuZ6v1YPVODzJb%2FSUvWszt6qFyaWuXw2hT3chNT4pJ4ol%2Bm%2B&X-Amz-Signature=af51a50ec9e2a1814e615b1e1d3ee851b0e4388d6bbca65487e078c323571e78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XHKTYGZ%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T080200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIQDYvPDsmXDODOK0sWLdHsaKcyVE1HNTdWsWaSNnoRjpBQIgfi%2BHAYichsakF0CfBLa8gUKVOhIrLhjdaGjC9VJWj7MqiAQI4P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOx3%2BM%2FznFiG4%2BLrTCrcA8au7oUHlVFRQez%2B082GcFBc0OjbA%2FN7akspV8TxZZCyerfcprrPqHY%2BDymGaetoFvofRGZG9%2FcsSMn1V24bj7D%2B%2BlSHQ2SWS%2FE3lYG1e9M4mBWzjj2ZBZ9w7e9oMrrN%2Bcf5VqMDHwCSs0sTlI5qjKqsXPgdQlL9wxYjEjJafjg5x5jXkqCFHhK7uMF3G4tTX%2F%2B8D0MUpKeeN9I7wm2mUHGSZuNimuriBlTqsA5rv8T4dLoQsgwm4YIOVTgRtBi%2FN1cmDxOypGlcy9Ttj0KpSCrUUnBnhW%2Fe8DCexbv7tVJiQJ9dk4S7EDTRhHxunvmU35uEHo7StNvrOj%2BhpgivXNuzgAG5kmyLrVflq9AqDJRjzbTwD7iG9yPxY%2BSsmS3LVyRruEnE5p0lb22pKh0lKKD1Zqlc0ATtbpct7qInzty8vL3mR86YDgIlyuoYjUYOqX4nsBaLqWZi7D6T9AkypjLcWm67a5VMU6Ey13CWr291NawiwnTV2uNYkRjZrpc4anw66UKscbKcd%2BAVO%2FBe%2BNfyG28C01SvNZ2z8KVv3CtjjuwZR%2BlMf1EPs%2FA%2BYXCbIlDEsum2hZI2j%2BRXaNRLBXoA%2F2arNutjI8Tb4NO4GfCaXMe%2BaIA%2BP6w6omauMODU0s4GOqUBTZPhV4roGlusQ037BCvsM0BHhxoQjzsnnotyWnTCV04onJ859a79vGN6g8hCgHglhPPYE9lZkBDlU5KqOyEdY3xRaL7rNufA7Y1BRdTppwGmE%2Fq%2BXOPZb6IYbouEvO1Z3MG4KSIIGTLx8hvQ0%2B%2BhcRDr6jx6qBUdZCC59mU5sg%2BMhA14aL5EK0PA43rjCLvWVG3VB3IS0DW7A8pJOYqrLgitPNnk&X-Amz-Signature=bf54e60a60b61c255dff51a3e3ca840004d2863e53c443bac76773f12319ff7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results

