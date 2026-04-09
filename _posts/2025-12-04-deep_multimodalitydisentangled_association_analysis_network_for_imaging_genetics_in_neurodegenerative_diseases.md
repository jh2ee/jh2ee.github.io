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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP6UVUKU%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIBIhtHzog9aLkEKRD11GKiLRMXnXZWGY%2FbYSfMIpOh9%2BAiBnwdzpYWPlBQ%2FKMPTf%2F%2F3tA8GWj65GlE%2BPZ6M4J7rtLir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMcB0iNJWqLrMbQLnKKtwD5PaPa9XDegYm%2FieXmBTT%2FEyQnD3CHV8j3rWKGoytLcQOyxqad6wz7B82JUSUa0KP7dwcR5UFwNDLSw5DHeCOr2QL8mYX2p12E%2Fus9EKdeKeDJgi6BIiJ2jWqCNnY5JEJ7ytqEEC5D%2FM5F8sj03wDh0URnpPMxPcE1E4V1ubH6y5QU8YHnUbPchx9p6lgbwAIdEDkiAZC2JSQuNbbbHOry4Cui2zlKpsBn6sTq%2Fc2BGrFOMehvWwL3ZAJxJbnJ75Y4wnuc4yaXwZe5uZvHDbG1SzUxbHAgkAY1dI5CXg8Q3mn6vpVx5eXNe2kWqT5y05wCiLseSJzuYtkohmcPXCRxE1aacT3KIaLjIr6fu4VELm6AJbVugW8fUPd%2BRrg769AmJzjxnTKIFq8zzp3o6WKDRJ%2BSXAUY3UCwwTw9%2FTbg%2Bm%2FMYhxH%2BB7DnGuOEfOyZlaNn7QSxU0KKYKGkU%2BQeBK7vwNrsqMexMmSbXRAf4cz5H1j687MwP3cr9mNKRL0ZNlS0Nyv9L9nYmFv6EwlNYRGB1PhdRdXGhMN2Kh94XU5nQSUkEv8TzZGa2gx6r2A0E55JHRNyRtagYuLLu6%2FaSDzrBx3QWZPMZuJRxVFXPG3RBP1XKzrTghVmj9kKow677gzgY6pgGlzXfBa4R6R7SjZzmSQ7COCPyqP827giyUtYuXeiwBLy%2BTyP8cRuxLZ%2Bstf3VJ0iQGgylGzFWXTjdDADLtBTcttFifXIAUBZAXgvTpAT75h8BQ8L2zul9RRH52Gfn94De5HKP5svCMPU3xnznS1uBH0lRzXahhTOko1AaqB4plbse%2FDC2HBMqjQK%2BjUYMXv0eqYj3qgiDaGuyZARLq94OKvtOYfcWU&X-Amz-Signature=5f3948d093873e9d2173c4efe8acd544c9037d4139c348785ebc1a10e5724d6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VP6UVUKU%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIBIhtHzog9aLkEKRD11GKiLRMXnXZWGY%2FbYSfMIpOh9%2BAiBnwdzpYWPlBQ%2FKMPTf%2F%2F3tA8GWj65GlE%2BPZ6M4J7rtLir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMcB0iNJWqLrMbQLnKKtwD5PaPa9XDegYm%2FieXmBTT%2FEyQnD3CHV8j3rWKGoytLcQOyxqad6wz7B82JUSUa0KP7dwcR5UFwNDLSw5DHeCOr2QL8mYX2p12E%2Fus9EKdeKeDJgi6BIiJ2jWqCNnY5JEJ7ytqEEC5D%2FM5F8sj03wDh0URnpPMxPcE1E4V1ubH6y5QU8YHnUbPchx9p6lgbwAIdEDkiAZC2JSQuNbbbHOry4Cui2zlKpsBn6sTq%2Fc2BGrFOMehvWwL3ZAJxJbnJ75Y4wnuc4yaXwZe5uZvHDbG1SzUxbHAgkAY1dI5CXg8Q3mn6vpVx5eXNe2kWqT5y05wCiLseSJzuYtkohmcPXCRxE1aacT3KIaLjIr6fu4VELm6AJbVugW8fUPd%2BRrg769AmJzjxnTKIFq8zzp3o6WKDRJ%2BSXAUY3UCwwTw9%2FTbg%2Bm%2FMYhxH%2BB7DnGuOEfOyZlaNn7QSxU0KKYKGkU%2BQeBK7vwNrsqMexMmSbXRAf4cz5H1j687MwP3cr9mNKRL0ZNlS0Nyv9L9nYmFv6EwlNYRGB1PhdRdXGhMN2Kh94XU5nQSUkEv8TzZGa2gx6r2A0E55JHRNyRtagYuLLu6%2FaSDzrBx3QWZPMZuJRxVFXPG3RBP1XKzrTghVmj9kKow677gzgY6pgGlzXfBa4R6R7SjZzmSQ7COCPyqP827giyUtYuXeiwBLy%2BTyP8cRuxLZ%2Bstf3VJ0iQGgylGzFWXTjdDADLtBTcttFifXIAUBZAXgvTpAT75h8BQ8L2zul9RRH52Gfn94De5HKP5svCMPU3xnznS1uBH0lRzXahhTOko1AaqB4plbse%2FDC2HBMqjQK%2BjUYMXv0eqYj3qgiDaGuyZARLq94OKvtOYfcWU&X-Amz-Signature=5f3948d093873e9d2173c4efe8acd544c9037d4139c348785ebc1a10e5724d6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7D2OXIC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDUlRc2xXIFikMnjNiOU%2FB4PmA85OHtKUfJl6OzhWKUvgIhAMWY3s194cdHmdh5wveCsdnWS3zbEFCvucSiAP029y%2BbKv8DCB8QABoMNjM3NDIzMTgzODA1Igzgl2EZGfCudfyDu18q3AOUWCgtMQXpL82BaqVgRMn4eHUhYPLjZDc0fkxKmCF7lUzgCwINWWRErJukJ200IGFSnQwaZWvT5s5BsqCxB3F8y1hyTt8hF4asAeUnpqwt%2FBMI731w5sQEsdMXiDn77mxMiHMLY3eIRpVa%2BvyPQtdQioduZTMUwBN0TBXrZVh%2BWtzlzGotXo6u0c5WbXHPn821tcmywkMPSAs2CrxPK0VZbwMZND5LY6Y6UiDZoayeyEXWgUxJEaOnfHeV3a7Z7oNrEiYCWcmIEz4zpLaI7Dw91x%2FbywumBIc4HNiiF936s7NEbuoFuZsRfBrRB%2B%2Fawi3OeAJ17k7sn4%2FLWyelXPPY6RxhrnTHmhsy8xEhlhGck2k7aW9R4erirDyVYvWHhwkX6QYvRgAagfTSaO8zVToP%2BLNhA%2B2xH9s%2BltmbeHiqg1HZwyu%2B5s7rhEkFl4ty4LU70rY2VFh%2BjnnGo1%2FiTox0EqV47wT3b3nuyHV0A5ZBzodeO9T3KGf6CG86ez7gGTw7HuVz9ak27GneWqSVwv6ZS4BK2WRjSyDtwcXMDfUp6yYAgca6L7ST7C2dJ8%2Fu4qLDMfHZ1VG1E%2Fnbk%2FEA%2Bcs3YaVpYd6aeTGNyPnD5ubsra6Xyk2GQOmISMqcbTDcvuDOBjqkASgordjRtLww%2Blkyju5CKt7BvBfXP%2Fo%2BXwSlwuSVx9JdusMtpndoj5ZtxqUndEYw4LurKQbtQO5ybgsCMFtPLBO48xHPn3HEkLdLUhLq4MEYqpSQC9uIXFcPHfIarXK%2BokIoeJMGY8ED8d3h%2Bc5RGvJmK6B6RQHrLDn65K0OYbdtyENXySPU18Xxo1L6qf0hQVhej4ZDTb0zYC%2B4Jtr1rTsSD5rc&X-Amz-Signature=2aa7df726adc3fc5dcc239578bdb0060753c9b4662ee3253ff6fcd585bdbb21a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UA2XZOC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCy8SIb1KeZ1OdO8e59vhDjQZD0thXm2FL9RxEjtYlfQgIgDZ6cfUWHVqI%2Fju13O4WFji2g415f6uLdLh5Wmxmklq4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDCT98c3uBN8avTR1HSrcA2D0brUWoFy8Q14rtdTzs0BLfIlT5duP%2Fjh8FnfmYNyrx8ff%2FPnnNtFhsUOXWlIonuYHn%2F853I7FqzY%2Bm4a4%2BPlNrwLm9ghbEFB4fcytI9hYvPrbxeJlcs7WxsVE5AvA7IKBhhqN4YVTkJznsmDaOuKvpQ6SR2Nm4fUS%2B9jBftZlxLFI4vSRfAAoCElHFVq0PNAZXZupSAFNzqyC1JC4CrUKXwQavwv4uxo1U1ed4mgr0GyRSrBoPZhktoUK4ufSca931i8Fyih0I5AcG466PibfBbfIF0Spmk%2B1Z8EhQsmYFPWiNJZ0dHcE7g71rjLhBhnTYpfi4OrjsmH9eAfu0Lsj1umklCGl8xItz1rz4H7VTAozsw1B1F4fhIxYCm%2BzL5hPqAp2QxeaNXPaRkKiOWSoeeKkMNqghd70YUb12sa%2B5C8oDxKICgNBYQQ4fa3Eco6MaFKdBnlPCXP%2BjBLQSOIj5lICWUBC%2FUJZ1gYy8%2BO0sq4ICAACNq3ge6168CrupOAKBmFdZJgYTPpsfvynrOL4TKQgax1%2BsIbZBWZ%2F6iIXvgdM5qnzQM5UZwO7myapnaiyB3ItpDTcQ5f%2BL2zwbbL6Qx%2F4aVr5fJnINwDF%2BCgd2TXLpjqUPe75evqZMMa%2F4M4GOqUBCuTEXLF6ZIHE8KqxWPhhrv61ULWhnYnn43Ql8m2ElA1JWrNsEd8dBjnfWoZH38%2F2HwXevZwvdKrRBvoF54apEzpmBON6ZoYAu0nuHHv4sbAhHEQSL6tjw0muBi9R%2F%2F6C%2F%2FzQOI6dbTP4G3Gc8Yc%2F6YIpYDIInBJb%2BNo6r3KW2Dlsnl8oP9p8EGfe3NctK7TSZvY4X3XvMzfBgE66ZH%2FMEJTZdx1J&X-Amz-Signature=597e6593b490609daf5d30e9cad025de65cbd0ec3c578d3c5f436cbf7047c20e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UA2XZOC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222804Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIQCy8SIb1KeZ1OdO8e59vhDjQZD0thXm2FL9RxEjtYlfQgIgDZ6cfUWHVqI%2Fju13O4WFji2g415f6uLdLh5Wmxmklq4q%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDCT98c3uBN8avTR1HSrcA2D0brUWoFy8Q14rtdTzs0BLfIlT5duP%2Fjh8FnfmYNyrx8ff%2FPnnNtFhsUOXWlIonuYHn%2F853I7FqzY%2Bm4a4%2BPlNrwLm9ghbEFB4fcytI9hYvPrbxeJlcs7WxsVE5AvA7IKBhhqN4YVTkJznsmDaOuKvpQ6SR2Nm4fUS%2B9jBftZlxLFI4vSRfAAoCElHFVq0PNAZXZupSAFNzqyC1JC4CrUKXwQavwv4uxo1U1ed4mgr0GyRSrBoPZhktoUK4ufSca931i8Fyih0I5AcG466PibfBbfIF0Spmk%2B1Z8EhQsmYFPWiNJZ0dHcE7g71rjLhBhnTYpfi4OrjsmH9eAfu0Lsj1umklCGl8xItz1rz4H7VTAozsw1B1F4fhIxYCm%2BzL5hPqAp2QxeaNXPaRkKiOWSoeeKkMNqghd70YUb12sa%2B5C8oDxKICgNBYQQ4fa3Eco6MaFKdBnlPCXP%2BjBLQSOIj5lICWUBC%2FUJZ1gYy8%2BO0sq4ICAACNq3ge6168CrupOAKBmFdZJgYTPpsfvynrOL4TKQgax1%2BsIbZBWZ%2F6iIXvgdM5qnzQM5UZwO7myapnaiyB3ItpDTcQ5f%2BL2zwbbL6Qx%2F4aVr5fJnINwDF%2BCgd2TXLpjqUPe75evqZMMa%2F4M4GOqUBCuTEXLF6ZIHE8KqxWPhhrv61ULWhnYnn43Ql8m2ElA1JWrNsEd8dBjnfWoZH38%2F2HwXevZwvdKrRBvoF54apEzpmBON6ZoYAu0nuHHv4sbAhHEQSL6tjw0muBi9R%2F%2F6C%2F%2FzQOI6dbTP4G3Gc8Yc%2F6YIpYDIInBJb%2BNo6r3KW2Dlsnl8oP9p8EGfe3NctK7TSZvY4X3XvMzfBgE66ZH%2FMEJTZdx1J&X-Amz-Signature=6b123ce7ada2856d02a205155f747fa867efe5b8b47d0eb3620ad246213299c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662SLAQYNL%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIBkRYgkv8oC2j61XecHQ3Ni2eHpL%2Ba%2FSH8XiTi%2BjNfkcAiBu3KDDVObOiqLUjuR77w%2FCGOvNFrvo5bxxk%2BkR1ReezCr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMxd5cm1UROvef64trKtwDRWzolB24RtbccOfoDakcATXVxxb%2FuokuJInA4aO6E8Wvv7cpjfIoen3YjKkPCZ7JfYeSruK2E72Qbf6LDol58btiKIIWxDFhPhH2oUDbwqneLYRxv4tyiFT6ZHwEIzPVYzCXa1yu3EtwTAkrkix9lkhVgBCv9HnQ1rjztQroeZj88Io7YbNPgC%2FHWyYHMs13yi%2FH0cUTKyqfGnS27F9L0%2FLDHjM2QpapCrSEatA7VjYoCFJQ9lhG4MHougEIFp2Cp3jePdqcQDpQ6j3PX%2FugTH8h3Bc%2F3s5ZPkNzP2LbKlj0EFaXruXmrNy90Gdxp8BdVTOHjWJ8iDuN56aFo9hkr5UvaCcyNJbs9mJqNcmTmxo98ebcrcZzy0LXKRGCa7dcgqCp%2BbDfVxA%2BuKKQIOvNdf7QVFalH%2FlQrNioVkdC3d%2BlaXSzdGJcF2o5sqaq0WlYQVONjM2MFqzo2PTWOgWc4f4dwNmP44t3N831grDa%2B%2FVNzljnCuhBe2werWGSiydjPfuueGGQwBtD163JMjOkC5Qtew3PvOP0hiqPdkCuNbMASN4vuP0O4QisBk5INnOHgBVucwHquGuW3v3Dl0h91iwJ0Z8lYm787meNWxI4ua8WiKeMNVlWewPWnXcwkcDgzgY6pgHHJ%2Fs2WXUtthNOp7bjumPcWvVsz9bJHDSHVoeljD3gm3aIKp1uWwxudNOFNCtrHIuFDw0PRQ4jI8N7ofRkC2dxtsJw58%2F57bFjLFOyWW4ep%2F9TgvLm6MpaJDlAYyzFX59YNwdYgipknp4CIM7LfhpK%2BmLaBjs1QZk9XZGPGTaKqM3k1bfAwucau5EfYOwAVqsr5fs%2Fe78TD6w4OysQ1AN4tDCZ2vdj&X-Amz-Signature=57076be29fa8b66cd12c1f92fcf0e6e6010b43f694d7984f752d0a232a0454a1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZYRQXNN%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDEWSvkhXptGtrav%2B%2FbhsIxfXpUJf8OqGZKX4L12vHKKAIhAL7EJorh88xdruv%2Fotv0bRom4n3Ywkw9AeJNYpx%2FonS%2FKv8DCB8QABoMNjM3NDIzMTgzODA1IgzrdPW6c%2FvMSPGEFWMq3AOoPdhd8HGavLsolxFtywbm6ftZD68LTUTznX%2BPzEaJJhmM350%2FeOUUIGZXU7Aev%2BqYEiHhG4bwUPxG1s%2BFNPpIutvhFzP1a%2FO%2BtiRvDbBEhYg2NrOEolzx91Ds3IDsgXGHOHHqkbyEaXmTgfi%2BZPOPJMG7%2BHebFoKfFknP24kouBbgNWGsapukaj%2BiSwboy0sx0%2BTexyuscZQC6Uz2hTiVwEmKrvkOjphbe%2FjLd3ovvCteeCBqaZ9spekPCGd4hJKhOg8JoLejPQ%2F2F7XTAglsdVNxMIBbMp%2F6TE8GKzCcNiAm74UhLijsGC5uDTjRisTFwNWj6zcjebSWsl8uIeaMSccldJOIQ2DTy9cybCUI7gLV7xMOF2FnHECBZ5fMuHwyaB6Nx0IUIhsVBvE0xaU4mmWqe0dxuI3sPUgdavEjmxk6B97pswJSXQ0j0fzNxrlSBw7uZ50lTc3zt88e8IDJ4BSURy86QQbUdfWZHsyq%2Fz2hi5ehxPK3PNr0QimCfhAgbJ6kHiMhHGY%2BdZtnqvpEqVDKZdl0hBrl%2BwS%2FKx0Njag490DyXle61M0JQYea4dRX0hPLUnzRnhoiCAZzcEeeoIBDVqUR%2B6ydRlKhW9u5eNKg43P0ZvS40%2BX2%2FjDAveDOBjqkARJRWRBPFioMxSojt6cvwK7LMaY3UBkC6Kn1wxb4K%2BbFYUXVLHV%2F4Sk572qqGKRiTcAzhWoBGbiQ0%2FXOpajeSh3SKk1Xva1V4KwyyYFxjM9J%2BIi9yHhEMlsSn8Jm2Cth0I2L1y13CFu2OHP11BRZvh%2F0vMHS1bOk%2FEaOj0ulzYGF1lOpubwI2uxbchkhbgrGv1cX%2BsLkz5MSrg6Dz0lqq8%2FMe1Wq&X-Amz-Signature=d84d6fc338c29283e25a5c7d0295488068638936991bd2d20cbe3f8f87b35ae8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YM6VOVOC%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIAwfvnGS4J9Vld%2Blls%2Bt4rPmZdHhvYBswKL%2BPjG6HVCSAiEAhtATIn7dPDTOWQ71CZk9dYKxUeudFwS3%2B2ZqOUcjY3wq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDMgjHcairtliOzjDFCrcA8oDRsoRej5RgjP4X8ld6fKXVFzuQhFyp%2Fs40rRfukS%2FCVJyfieJ0Hfmj763uup2uXwjPJxiaXxsSKy6JQJ5BEUO8RpzgWBwBoSbe2yP8%2BCNAYpUrZxg9ehMxCza6uf5T40tZ%2BIrGxLY4Yn5dEEOXQc1T4yqPvK5eHTwo1KXfSEDyE%2BcuMQDq6vpPIf133%2B7Ca7QDJ5sOdm%2FwSfZciRQkm%2BHLv6Vmr3bJfpp1jQENuWHov4vKTxaDnJTzNK1iR%2BzFCanfotrMh5Cwpaxyvm4WvH6RZOcU5sadvTUwbUe185QDstk%2FYIgr2YZsXZ8aiAeDXnBEX697VnhNmG7281jzhKdQYP2iTo0EY0%2Fx%2B1rsAhjIinewYDAWPvBpXSXjCelHhXSBKKjW%2BUkpczHaaHfcZzEzgmrrXH%2Bw4LsIR6cZ%2B9gOkYezX03iHya1qjwZx%2BgQm5O01cVHn2LWBWCaj0V6gJCW8yQgPErfpamw0vF4wVecmpLHY6dKVch73zLybrBDXznF54HXy5sHHOSaY9D3hloEcyFcT68FZG7G2Vzq9C5pTZOxUJAUsJ7KLkJZxGsvspgmDSiVL0PWItCDP1MGn9QoiBVxPtMs%2FHrM%2FcxeRITF39gP9rurRv9JQKnML%2B94M4GOqUBQCJlPJpxJKEgDAWsIIHQZx0Aleth4Duw81sDjioM3j%2Bv9qcrULhIUpswj%2FpehVEFqzBY2xm0hEKIeLF3xLODUEACuj10uQJpX9OFywk4EP7Eyn7R4gJZ2V1PEDjWapsvzZVoB7uGF9ymwOo7oGvjsAjiOW1QsvLPo83glw6HC5QabO2UrnWLYgWfjm3dgzg0hzaWReJMN0Ek14uBEl7wklsGzwe4&X-Amz-Signature=6054b7df0b9a8a9bf03478ff124770d435aa199280514d27768587a09e4b9dc7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICKP6UP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCID2yyZ3NQItLf%2FoFSfKbJ8k7j0RWJ%2BYOF6l50senB1cpAiAwlhP1ovtZoev1k6qnIhVbOX022y3KMe%2FINGDXGQloxir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMPzQK8kUft%2B1KkvxNKtwDGXMIb2616RwTTwQssdiBbXnDv4s%2FG7CrVBIvUFFg3B%2BvMifez%2FyH3mXoqR2jYx6mr4bgt5e23Tvo%2BPOM7ZVwvl1PTCruxmkYl8Ufnhw58SoG0ny2PuoMmB7aLwfFXEC9oVMi673tfkHqK0RN%2BYNnY3MJquLvtG3XXGRapKYjOmGqrF4sSg877F2zOUMM2JH0FXK5FOQUA24QvVDDjJrZJOG26F5cOoyO6pZfcuI%2BO2q8%2FzzABL%2BQX5xf%2FmvIGbtJo7nWoj%2Fmq4DvsHQhELC75ZOx6Jh%2BxRkI1AuERMpSamiLquvhJR3VEpCakL4RbthdY7bSEHIm3GZ4bdPNPOxfF2McTZVbPJkmY6rBFmuLOve2ud8nNnXOxLRkeeNkv9ylO4HZeAs1CQOVHydTpgJtFOX9AEXwWUUiq1zK01HR3KFUDsjnwGkNgkKwbzqa2Pl4NRLWNlJagw2RSjZYO0Xun6HbzjLa6k2bRYPUr0nk83Map2g9S00h0sHn9PAHX1NiSLqXXMil42oS1B0pQtClhg9H%2FhWKXf448s3NsP25yFSYUQzfGeWarDqcCD1yVUnZn2BuFtPgOoMcF8p3G9LTGBQCy8erP4bdXsKK6UyundCk8PEaMhH6b%2B7jPnEwxr%2FgzgY6pgGATUmlfFIC4imHmavILN28iL61JcvN8N50LukLwNVqc5S6Rmm2dpdzMqeWMFyqirGnPQmpf1GUEj%2BnfxrjTmiwFgDov5DFOEyakSHUh7nqEcD9xV%2Br2s0YbW0509vgfVVC15hk2sjLxLxJ526bSf4Su6UzNRCgTXVirj01mS97yAiYi6iGJkrVf74EbdDUTF2upNmxZ9SD%2FoSzYUMOWM8lHwyLUrjy&X-Amz-Signature=50e1673dfa1c7fbde37be1325066e35a89101f4c727f733220e5f2c282532b02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ICKP6UP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222810Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCID2yyZ3NQItLf%2FoFSfKbJ8k7j0RWJ%2BYOF6l50senB1cpAiAwlhP1ovtZoev1k6qnIhVbOX022y3KMe%2FINGDXGQloxir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMPzQK8kUft%2B1KkvxNKtwDGXMIb2616RwTTwQssdiBbXnDv4s%2FG7CrVBIvUFFg3B%2BvMifez%2FyH3mXoqR2jYx6mr4bgt5e23Tvo%2BPOM7ZVwvl1PTCruxmkYl8Ufnhw58SoG0ny2PuoMmB7aLwfFXEC9oVMi673tfkHqK0RN%2BYNnY3MJquLvtG3XXGRapKYjOmGqrF4sSg877F2zOUMM2JH0FXK5FOQUA24QvVDDjJrZJOG26F5cOoyO6pZfcuI%2BO2q8%2FzzABL%2BQX5xf%2FmvIGbtJo7nWoj%2Fmq4DvsHQhELC75ZOx6Jh%2BxRkI1AuERMpSamiLquvhJR3VEpCakL4RbthdY7bSEHIm3GZ4bdPNPOxfF2McTZVbPJkmY6rBFmuLOve2ud8nNnXOxLRkeeNkv9ylO4HZeAs1CQOVHydTpgJtFOX9AEXwWUUiq1zK01HR3KFUDsjnwGkNgkKwbzqa2Pl4NRLWNlJagw2RSjZYO0Xun6HbzjLa6k2bRYPUr0nk83Map2g9S00h0sHn9PAHX1NiSLqXXMil42oS1B0pQtClhg9H%2FhWKXf448s3NsP25yFSYUQzfGeWarDqcCD1yVUnZn2BuFtPgOoMcF8p3G9LTGBQCy8erP4bdXsKK6UyundCk8PEaMhH6b%2B7jPnEwxr%2FgzgY6pgGATUmlfFIC4imHmavILN28iL61JcvN8N50LukLwNVqc5S6Rmm2dpdzMqeWMFyqirGnPQmpf1GUEj%2BnfxrjTmiwFgDov5DFOEyakSHUh7nqEcD9xV%2Br2s0YbW0509vgfVVC15hk2sjLxLxJ526bSf4Su6UzNRCgTXVirj01mS97yAiYi6iGJkrVf74EbdDUTF2upNmxZ9SD%2FoSzYUMOWM8lHwyLUrjy&X-Amz-Signature=3d0cdd23d1f57cd0e57f6cf9bfcc9dad0e5f6a481d751e5766e442845230403e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JA2VDPM%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDL%2Bofr1XyU5EoISVRbzChAYjyWvdTuNONHLMx303z%2BTQIhAJPY4mjlDBQmG%2B2CiQ3YQZf1Hbb1XwjYMfIx27p3OFmnKv8DCB8QABoMNjM3NDIzMTgzODA1IgyycSXu8hmVuKNCZc0q3AMzU2eTewcUhLT%2BPyzZEtAzKV3Z6CdhcZvjuwf5OvwizqLHipePttUh6VBAm4K8MWXGLqpxcj7mRQtw6DVqMZo2Grl1no5zakKfKEwcWNwbDnveFuHjjuvxBduMFuuk1tcMAMLeYFUNZRlXL2HUKB3JsBx9C6oiH9rZjT%2F7ZQ%2F13dw1UPCGkZ8MZR3t9wQlVJmPX7maRLmspO%2FYp2Pv5FQBLvoCcqZcKkHzXiLF2aJVwjA09n1ZJAD33LZxpUexFLGcQElhiUn7vMZP3ZtMhXQgOOY74e0KMW4OcjvJO7rc%2BcDYsMvTc9%2BGI1crSe%2BAlZ0TDZVFV3KthtQVDHir4iPGNsdc%2BbY7NEYrWvsL6c4sJbKZQXhEIr2IjWzA9QZVJRIB65zd0Ojume1N8QZCV3MjQUnaC8seKnqPjHeSuU1acDtwsw%2BiuVN7ck5JnFxw1KduQ26HLidFX%2FBz8ZSY%2Ffa5dD6gD6%2BS55n%2FVnV0qQHaGsQNdiYxhC2URbdHnp0pnr8WuQjOSRNXMfqIwqQtbbvBxiK10ZkTqvM5aZ6Nlap%2F1euHLnPTdowwUJRRzhHug3nVLfAtww0uXMMFtLIJn9iYRKzUfByMQaXsvzpziYYYp8omACLa5bBYLqCv0DCdv%2BDOBjqkAfyi2DfVOh1A88owyFfW5bkfWVtNL6%2Fq%2FgwF1n5nfs0IUGDyHj2%2BrKfJTa%2B5PhwJVse6lgEgnO0%2B87ckIIEiVcaKfuocGZze8cKVrvEhjzddout5xG%2BfsidkcZ5UNFK%2BLOiifrCHaXDHzeIAhHKcMCcb%2BclXX3%2F%2BUmj6hhL4j0nUqLpX4AFlaEQTXTJOmGOZEgs08gtBwIzi4KWPH4cukzlOp9LQ&X-Amz-Signature=c087f65237593ee2a58ab70bb5bec529005bb6460f36e255b9257741d10c2fa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GELA2FS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIDlyEO6RKtI6yqZoWWpAe7N6WAJmdfupw4W843BsAFVWAiB7AQSKNhxD1LV1jXQh%2FATWoHbMIEWYFeOVem0yQKWuJyr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMfkxze6aTUs66Z9H3KtwDKYm7AlYNASrWSdF%2BmH2h%2F%2BwFWvw91UYZznhL%2FfYaoAILfBiRjpAQnmcH3e5QPUzrgrYZPcuDnzDloKGerbzoXifBX3H%2BbF3NX6zX48V%2BCcUxsGbx38cH1MsdxzmSINY1F56EB17RkYHYJjZ6X0U3GAvyV7TmCvIbhSYS9MKUnipeKOlxGxnEjXYL%2BQfCo1KAz%2Bc8hnjdCMPwyafueBv7dAkuRLJAoCgzFox790UBlAnkc4g9hROy7%2FZZp7eZJsIEDtUJRmVKHlzd8yFZsyiKFVg9F0cLKwQ06j6ttsNoIkNLchFyc3AFASO6Bqg6iKrWipfHttOCw%2Fa%2Fqg775G%2BL28wGgWdNyzfCtXPSeZcDdUdne%2BGJMA2b5efSe8diE%2FCdgbt26jdGIiZdlg669qEQu51b8u6HFGXZnSJ77JiSG4Y3G4fXqfa%2FcpEa7cWfGvrE0O5%2FdevGkFwwtqRx7fBaiLZJVmik3z2bAAIcUn%2BOHOs1yatrgi%2F%2FQJwLsSLqsF3BQCcEY21DNzAaH2rEo0%2BSlzKehl2H20iF2XrugSsjdHT9X8%2F2By%2BPIvjZAgvCONsGmnhPRREk1QWIvnB%2F8%2BuofE%2BEoVRKqflmtkpMhYShaE%2BVVAW%2FCB2%2FzhmCbI0wrMDgzgY6pgHXr5RHLqrN5BL7CQKP5hPO2wScRDowZSC9k%2FPRbQnlGQzKkrF2OIY3fxONQjSXA1QRKq4f3%2FvOtMZ5qMqFQHGLvfeE5%2FOYQq41RIN7m6RtQ1Q9rkEz%2Bqs0Q5bpqWXwV6PrNWny2Vq4hAWWbyk%2Bi7DLhj3sitaLYhDbiLtG5DW6o6lA1bzIB8kVjaCGno2fekvrXbVv6otBfk%2Bnw1q7kYvozw1Hb1Zt&X-Amz-Signature=37d337dc24dddd5ede0ea10953be983d5670fb069af2d63b193edca8cb22961c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GELA2FS%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIDlyEO6RKtI6yqZoWWpAe7N6WAJmdfupw4W843BsAFVWAiB7AQSKNhxD1LV1jXQh%2FATWoHbMIEWYFeOVem0yQKWuJyr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMfkxze6aTUs66Z9H3KtwDKYm7AlYNASrWSdF%2BmH2h%2F%2BwFWvw91UYZznhL%2FfYaoAILfBiRjpAQnmcH3e5QPUzrgrYZPcuDnzDloKGerbzoXifBX3H%2BbF3NX6zX48V%2BCcUxsGbx38cH1MsdxzmSINY1F56EB17RkYHYJjZ6X0U3GAvyV7TmCvIbhSYS9MKUnipeKOlxGxnEjXYL%2BQfCo1KAz%2Bc8hnjdCMPwyafueBv7dAkuRLJAoCgzFox790UBlAnkc4g9hROy7%2FZZp7eZJsIEDtUJRmVKHlzd8yFZsyiKFVg9F0cLKwQ06j6ttsNoIkNLchFyc3AFASO6Bqg6iKrWipfHttOCw%2Fa%2Fqg775G%2BL28wGgWdNyzfCtXPSeZcDdUdne%2BGJMA2b5efSe8diE%2FCdgbt26jdGIiZdlg669qEQu51b8u6HFGXZnSJ77JiSG4Y3G4fXqfa%2FcpEa7cWfGvrE0O5%2FdevGkFwwtqRx7fBaiLZJVmik3z2bAAIcUn%2BOHOs1yatrgi%2F%2FQJwLsSLqsF3BQCcEY21DNzAaH2rEo0%2BSlzKehl2H20iF2XrugSsjdHT9X8%2F2By%2BPIvjZAgvCONsGmnhPRREk1QWIvnB%2F8%2BuofE%2BEoVRKqflmtkpMhYShaE%2BVVAW%2FCB2%2FzhmCbI0wrMDgzgY6pgHXr5RHLqrN5BL7CQKP5hPO2wScRDowZSC9k%2FPRbQnlGQzKkrF2OIY3fxONQjSXA1QRKq4f3%2FvOtMZ5qMqFQHGLvfeE5%2FOYQq41RIN7m6RtQ1Q9rkEz%2Bqs0Q5bpqWXwV6PrNWny2Vq4hAWWbyk%2Bi7DLhj3sitaLYhDbiLtG5DW6o6lA1bzIB8kVjaCGno2fekvrXbVv6otBfk%2Bnw1q7kYvozw1Hb1Zt&X-Amz-Signature=37d337dc24dddd5ede0ea10953be983d5670fb069af2d63b193edca8cb22961c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBADX6WG%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T222813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIGYd3ReaXQ%2F7nKrgk8%2FgeWKj4XNobrHJEOaptWKXxWrmAiEA037tzyp5TBgns3IwbBW3wITPRfUXvGFzROuDCtZX0Vkq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDCeFM56iQyCnrrBpxCrcA5MGzxh3nLoZL0doV2hU0%2Fx%2F527p7RC8E6E%2B06GiF%2FLqG6TRqJeKHYVsQ3he2StvbimIhdZwAJI0ffbwLzDo7a7s2hxugFXWtxcn2FNS4Luwbs64n24WyshZ7LN%2BnARLjpW14fYxcFp%2FHgzRT0Pe6n4JR9swQgd3QrsR4rc%2FS5dzUK9pbhCbXF%2FETLcqFW%2B9oCnFkYNnPkRt1xy0k0C42gW31zdih4d%2Fyq3wCMO6Hz7vni6zU8e0CVCE%2FspQbVktRtaNAQMDGQCsaVImnbOPktwapIe%2B%2BNZ3f2O0wffes47xYOPBxNoMZ6e1JbYmxSOE%2FxGIDJ13EXKo%2Fz9UtIFr7eoInV2crKqS8HBr7Rmjvh6e2bchzY0OkciHGJM8SMeHwhYDcUj%2F5cpjonofiGQJiZjfNfIIk4W9NoKQdRX%2FCo%2FdHKV4xMouMfU4LZEgG90WkeS7vf2z%2BtOcSfYJcQWWEeLGNA5XQ%2BsAMZX40ZXRpIs%2F8eUERAL4Bj4FDQPD%2BrOqH5%2BZLoUclTGrjI6o1s1RMdc0rOj%2B7xqElygagbsbM5i1mwrGpMTdIo2Ht%2BfYLzs%2FI%2BuAmmJLh%2BHlR5smJmxmy6iAhexiPyrtj2oT5tZ2aX9twz6iIqlmm9zRzkmSMKi%2B4M4GOqUBqO5E1jN3JJXCLS%2FP5iSHGlm%2B46FAuvAz9vXZJwHnH%2FIV5%2FpB9pLd6k8hxIbHy6hxsCMgDBJ0ag6KOgXUJPFI9GBdGXXQJGE%2Bv3vVM4mbVTiGjcyZTas4%2B3bpAsFsL%2BfPAktS8jPhsHzZpRfRmnwXEKN8LrQcVSNj2%2BgpngDs%2BFojh4L06p0T%2BuXDnXzTVpcJD5njsk6orIeMH0v11ASty8qrhImz&X-Amz-Signature=65b7ad95d836fe8358ed94538226eab708cef0b09bbc9a5342988bff02a3c165&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

