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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY4YPHO2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCJFqeLxNpU%2Fc5DzOhov7QMr7BRa7beBnD4O6htDxkAuwIhAIZIFDD3z5cPLb%2F5LBuoGCmmVVpW14%2BbxKzmGRYvWYHGKv8DCDoQABoMNjM3NDIzMTgzODA1Igw7HU%2BhHp9u%2FIcFTTMq3AOIhlUz4sADrwbTUZtOm%2BvPAh2LJdieZ9NsuF1l%2FkEqTVdkTM7Y1eEF3rcY%2FxFNdQVTRcD34XdtkzrmGzEVvnuJY9mTaAHQdCTnUMX2yJ0JlliEJZavY310Knb%2BpGzjIiYa7sS1MZlUk18klxbwEUMWbutqEbpjh5gfPLdynVZNxDwDLB5x29KGJzfQUAzkAYxrwG4Y6XW3T0zRnIRjz37HcpFDF4VdB0NlVtC1wswPc7j3eVDbh%2FI9ISSGvQJWNBMpn0uJIKeT5nAinttfCn%2BBq3sePthkJozmTtKUwoz%2Fp0ha3uZ3SlV5zFSiX56osBmqVjgpvZheulwPsa8vr8VLw%2F%2BaOkt5dVSEg6InM%2B4NpmXgCe80CmegwS%2Bn2eb2wx4qHocm65GJlCAp0gaisRA9tGLvPusgyY%2Ff7HMhP6Zs9SQM1DFxO485AoKfF7MHBnsWk9%2B5wN9fOI7BTEnPYSICCQmNXLkfgoIwu5XhGMia1n8h416xMpOx9gO%2FOphQXDw5sO3%2FOzHI0irxuOEd01hfmfwjok86jsRy2JnhOM1QXMjl2nuovTUmm7ylhK3xIGaXdbOWTx3BhwS9owJ%2BCUf%2B%2F9iJ3wEORP0O533IloMUa7wltw2MOtF83X%2FmczDnq4XNBjqkAYBvromzIwNVLfvgFotCi%2FRhGc6NUpgzoGxt2vfOlSq1Ewua1KTBoilFvtEaONp2rxrQoZiIXHq3ulD2h2v3ruTjv1v4jd238U5rTgLK6djnrWmsypN33k5W2D13eJqnwnNrK51zVRdPQB119PXgaeH5X0UQXKXAmyOQaLrnsuVOUwirmbR%2F9e81fuF%2FncYTMfgpLyFMsDI782b17anBZFAGQAzC&X-Amz-Signature=94036951857f70ce7304445b061bc22a89a6c9a152194a767422c9e494dec2ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY4YPHO2%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQCJFqeLxNpU%2Fc5DzOhov7QMr7BRa7beBnD4O6htDxkAuwIhAIZIFDD3z5cPLb%2F5LBuoGCmmVVpW14%2BbxKzmGRYvWYHGKv8DCDoQABoMNjM3NDIzMTgzODA1Igw7HU%2BhHp9u%2FIcFTTMq3AOIhlUz4sADrwbTUZtOm%2BvPAh2LJdieZ9NsuF1l%2FkEqTVdkTM7Y1eEF3rcY%2FxFNdQVTRcD34XdtkzrmGzEVvnuJY9mTaAHQdCTnUMX2yJ0JlliEJZavY310Knb%2BpGzjIiYa7sS1MZlUk18klxbwEUMWbutqEbpjh5gfPLdynVZNxDwDLB5x29KGJzfQUAzkAYxrwG4Y6XW3T0zRnIRjz37HcpFDF4VdB0NlVtC1wswPc7j3eVDbh%2FI9ISSGvQJWNBMpn0uJIKeT5nAinttfCn%2BBq3sePthkJozmTtKUwoz%2Fp0ha3uZ3SlV5zFSiX56osBmqVjgpvZheulwPsa8vr8VLw%2F%2BaOkt5dVSEg6InM%2B4NpmXgCe80CmegwS%2Bn2eb2wx4qHocm65GJlCAp0gaisRA9tGLvPusgyY%2Ff7HMhP6Zs9SQM1DFxO485AoKfF7MHBnsWk9%2B5wN9fOI7BTEnPYSICCQmNXLkfgoIwu5XhGMia1n8h416xMpOx9gO%2FOphQXDw5sO3%2FOzHI0irxuOEd01hfmfwjok86jsRy2JnhOM1QXMjl2nuovTUmm7ylhK3xIGaXdbOWTx3BhwS9owJ%2BCUf%2B%2F9iJ3wEORP0O533IloMUa7wltw2MOtF83X%2FmczDnq4XNBjqkAYBvromzIwNVLfvgFotCi%2FRhGc6NUpgzoGxt2vfOlSq1Ewua1KTBoilFvtEaONp2rxrQoZiIXHq3ulD2h2v3ruTjv1v4jd238U5rTgLK6djnrWmsypN33k5W2D13eJqnwnNrK51zVRdPQB119PXgaeH5X0UQXKXAmyOQaLrnsuVOUwirmbR%2F9e81fuF%2FncYTMfgpLyFMsDI782b17anBZFAGQAzC&X-Amz-Signature=94036951857f70ce7304445b061bc22a89a6c9a152194a767422c9e494dec2ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKATD4MP%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092824Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQDuvuNyoqCUWY%2Fk4ZkjwNY8hqLy3u%2FLbxHwpJC1pbrFQgIgZba1iJ24%2BJsY8hqa15K3Aue%2BnWYt8gPftN9V8awN9lwq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDEoShyZc%2Bk9kx4z9WyrcAy%2FQyNfqFPNhPPduKtDqBE0eMTLtealpbOT7w5j39qN4QuhKstI8ZGU9Zj5WahELTahVVUBjinQXpLG18j70KqCKJQqiXiPJp%2FbGMVy1IolTN8Mnd24i1TTG4%2BHl8tyqfsdzFNM%2BvkydDTsdKtqmbXBZo5mBUCK52oOPfYwHVFW3aiQFzaUd3ZoJICTAIRN8ny4tzXTYAV91Lu2p12cXolfdK5HHqp32o%2BB3Ro3O4KV4JICpe2ZVyH%2F9FU3pi9H3pOikfeHtfqz3w84mB41p8ZbCzP2voBQ2YHY30NfPCyfr%2FBI5mB%2Bv2LtzBq4rUifJz8wPl0BmTm4eWlHD2sGc10Ovl8DsWjAF9hL50Hu%2FVpcC3b0qzsvwa4WPtDTLBk4dZ%2BD40vYVmZzpDVboyCQi4nf3Apqm7hPbj4xImnevAybW0InHeYyA55son5E1QnW2PPM5gCssbYxRy%2Bz%2FgGTY%2FcarPryOV9YED2ApNl1TxZjIgkBD%2BoLEV7fNiQn9K5W9I0eEYpOSL4ymHZwCnVZU75Ma22nJDMf%2BrtMFIAxq7IBF%2FA6ZVqCDD9d3Eq6U2gqZdb%2BPJwqy1ZLb8ft0%2FYwHqksvI36LUeCRsVdQpBUrbB%2BYB90DJvoFLFBtqoNjMParhc0GOqUBSEKqYtAsH9tBT4ceJHHSPxBhWGMff4v9wpavqPXC5SEJasHpH1GOVDiJDWCRBD3YOVrE1k35eiDtlGcwlPsLNb5gi7uduOJigkU0Qsqu2GCnK1CC3NBSadE7OEJufBl7pS%2BnxaY9Lmker8i1ZqPRhPJFf0DkaMBRbgWkOzAWhbYFdi%2Fee25YCu96zDB3ocFQgNTjUDnUXWAayiKSpWq3mA9CFenV&X-Amz-Signature=f331b1ad49503b458f57107f69ea307c00d3dad622803f177aaa98cb72d3a4f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U75AEOAU%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCzcNIeMbIeN7Wtc0Tkbq1ZxFu8AnbKpcu2FCI%2Fic%2B5XQIgXLvV7cICMIUPw1x%2FVzi8M4I9MssfQnPRJK%2FfOWs4LIIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDHI0Hzg%2FKPkbZBj6RyrcA8oo7TRFt8FJsbtjYxnFA82%2BKtbFOJAUgXHFivKpORBPdxC%2FRYXYep%2BW9bOlgKZYR9wGFxtWsgL5xaaBTGaGdAEqc%2Bvs56zE3YOmRZSkogLC3ll0bpmk0JWhQnrTyLDUACkwjCGBfic033p1ECZvXoen4kcZLQxlQJY%2F0%2F2ddrxL0FyhxYnZgmAjVBREj%2FaDHZd3%2BDTv2FXL%2BZEcUmu8Ak7epHIfPGe8ZWiS%2BrxR7PGvEkJYhm6%2BfW02M7qu8%2BtxpBIWCPYKJbCShPPC05WiPlJ3NNRKTlbUauHkqjKb%2B74VyrkGFP520OSwwwuYQZsokSLD5yT9Tmv4Y4ctC0Pm%2F6OKKicUsyomnimMv%2FPzJsgzqr26AdUbBYe5S8hwmBVQ2kSVSBTxQ2B6H0bW8F8fQ34s0Wk7a9KVkI%2FF3Lm73crZsUKya14NWQtVniZRB7H4J76QTX9uMejXHSEO%2FQzTrrAhkH2Z1FYoASLby0ZN5fN4t7zh7f%2BlnPNIydCilKjr170rfxXpwlxz0Sy1NIp9Hm%2B8esDxG%2BhBemri5cWcP4oox0Y3NumBxPIDDrZG4oB13LQkAuKxcdP4E6ViJ54CRDn80NU%2FxXvoyAJ3C6jiAGZu2zxdViCsIiGw5oQ1MIerhc0GOqUB3sAF8hWu3bDsWZFvW13elSIF3AcvraayLDIec8fp0isrWCqJYyMJoY0IsRLtcZXtk2M9CdQHP7cCmlbybqD8nkejPd6larJWl86hXAoaqmkz13iH2DvnoSLgU0Gk5HyjsE44DCdS8qnZacD7xPy99JIEwZe4Eo7IkvC75s3V%2Fe6CmjZP%2FVfPffmit2jvRkaI4N0AVJvKZvB6Syn0XiJNEkVH03r2&X-Amz-Signature=687aec8f2b31dd8a221ead53211ecdcca86eff2e6f64433b436d5d51d95745d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U75AEOAU%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCzcNIeMbIeN7Wtc0Tkbq1ZxFu8AnbKpcu2FCI%2Fic%2B5XQIgXLvV7cICMIUPw1x%2FVzi8M4I9MssfQnPRJK%2FfOWs4LIIq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDHI0Hzg%2FKPkbZBj6RyrcA8oo7TRFt8FJsbtjYxnFA82%2BKtbFOJAUgXHFivKpORBPdxC%2FRYXYep%2BW9bOlgKZYR9wGFxtWsgL5xaaBTGaGdAEqc%2Bvs56zE3YOmRZSkogLC3ll0bpmk0JWhQnrTyLDUACkwjCGBfic033p1ECZvXoen4kcZLQxlQJY%2F0%2F2ddrxL0FyhxYnZgmAjVBREj%2FaDHZd3%2BDTv2FXL%2BZEcUmu8Ak7epHIfPGe8ZWiS%2BrxR7PGvEkJYhm6%2BfW02M7qu8%2BtxpBIWCPYKJbCShPPC05WiPlJ3NNRKTlbUauHkqjKb%2B74VyrkGFP520OSwwwuYQZsokSLD5yT9Tmv4Y4ctC0Pm%2F6OKKicUsyomnimMv%2FPzJsgzqr26AdUbBYe5S8hwmBVQ2kSVSBTxQ2B6H0bW8F8fQ34s0Wk7a9KVkI%2FF3Lm73crZsUKya14NWQtVniZRB7H4J76QTX9uMejXHSEO%2FQzTrrAhkH2Z1FYoASLby0ZN5fN4t7zh7f%2BlnPNIydCilKjr170rfxXpwlxz0Sy1NIp9Hm%2B8esDxG%2BhBemri5cWcP4oox0Y3NumBxPIDDrZG4oB13LQkAuKxcdP4E6ViJ54CRDn80NU%2FxXvoyAJ3C6jiAGZu2zxdViCsIiGw5oQ1MIerhc0GOqUB3sAF8hWu3bDsWZFvW13elSIF3AcvraayLDIec8fp0isrWCqJYyMJoY0IsRLtcZXtk2M9CdQHP7cCmlbybqD8nkejPd6larJWl86hXAoaqmkz13iH2DvnoSLgU0Gk5HyjsE44DCdS8qnZacD7xPy99JIEwZe4Eo7IkvC75s3V%2Fe6CmjZP%2FVfPffmit2jvRkaI4N0AVJvKZvB6Syn0XiJNEkVH03r2&X-Amz-Signature=7569d2091aa57099f50f2b3d6027db2bd3dda00184c0a2e75a910d79f55175e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VH4T45R%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092828Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQD5nBDJuJkDeSgPfQO1sdtTFiZeqUA3vdB8EbXHWKj9jAIhAPnNS%2BWqfMxgSV2fvRCAjz3UxDcqyUiRkQas%2FSl9qCC2Kv8DCDoQABoMNjM3NDIzMTgzODA1Igx20M4yr7AYvMczKbAq3ANC46iNHNnuRZfOPcbzoAvksoYcH7%2F3HOAP0tamQTvs5PP9HgOq%2BCXZh0%2F0KaPni1T9nTTTAPMcuvPaWWonQ%2FGIhyMwxHdnYO4bpQZn6PhQaUfcsdBTW%2F68nzZHegJF6eYDFHqz4uuiQvG7LFOUGc1Ev66Uf%2BDGohL8p6RyJjT%2BDiojbYGyTJpyAxUKE7WZsmq2cWJZ3NluH1iTVrDb1u6enSCs9%2FCok9yItJFk1S7lbRGj1pgqXFNH3p8PJ7cvos7KPHKeBO9vxDb9h75qBQjhYl6DrGEo3iltKpDcxQLbCK8t2OnyigWnRMOwTUC9HwcBnIjtUMnL5EZWwFiJeSm8RoKJ%2FKRfurgTjnsPK%2FP%2BQI8GbVS1khXhjW4F1bXAwkjNM1gCCimwLgaqsyXV%2FsfmWn3C3uQUu1F9rTq8ve8QxBZTnth3%2Fcp3HV3TnzjoJvUe%2BtnlMQ9mK37jdrrhY4q8y4bFprshv%2FUaEUvy5J17f0uIyp7T3SjHbdJscmficoqxq3cq%2FyfOA%2FQ40Tcl%2FuoIa9%2B%2F1Rp63fIWiiNUwhDEXUFV1b55h8evGhZl5shneN1xIR3ywUu%2BZr76SDBKRFOJS3z8Clm6ssWggPocbIOKh%2F04ZMmbsD9uiKOkQTDmq4XNBjqkATH3mVWsukxapSHv8v9xL5Q7Vwv1Q6wO%2ByTAtpgcHNcxW6UFGNCwvzJz7IEIB9ukrEOy6UARULhHko14UFtsFGKvkdUD2iG946hgX5vz5m2qcOl0LbBYeUfhXp6VkoHUBkwgkOH%2FPxsBY1Mzp13ku%2F5bu%2BBZ4ZSh9Pw%2BwmKvjddObs7joBfXxKNASig4YA64B%2Bb0P%2BhsDp%2BkNBNGr9BgffE9M8VJ&X-Amz-Signature=de9c5aa3eb07c9cf7934a0860057dfa5d6a54732bb1da0fb999f78963cee836d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662HCGXT67%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDW3prP7okZSFeTCJcEEpb55TGHr1tDxDx%2Fr1uKoRW4HwIhANe8ilfwBJhkvLKlZlabTePNjy7Mwm4zKPlwxOip9TNWKv8DCDoQABoMNjM3NDIzMTgzODA1IgwW2nbtYg8D0FwsZG8q3AOa7eZMuIcoLMZhUKUTJaVxhtOXFGwqNat1YtCXNKIjqhLydgktdZCTXMexOELEoCbwbeYnVxUIM%2F7lrLJjHdthyTA7R%2BRMPx6nLmbRXLTAOYV5yWdesWA7DDZHGCQOjVX0B83BsUIJ0u%2BNt5B11CQbQTbMW3RQGbgrxNQqK80AU52495WV%2B%2BpiBJ5mJ3n8tv8uYAOo%2FUTmWgW5qBpqXhEK8xxCRsdSMlUsuWdahwG2%2F08ZYrIKGATXj6ey5ou507zBjNi7RVyp1qpfKq3jm0QcsdjIY%2FANxfEVPyJc2i94SlqRvBf8JNPodayvTzokiTYfLtEJKbYc3e0TXBZmmv9yLfdny%2FUeyeT55Dqe631R%2BPDY271DxCqv8E%2BOoDhVvKQ%2BPOJBtcVNOf7lbh%2By8Kn%2FyYxKOWA87jaWBxVq3iVxd%2FJb0JbBTvLDxuU9ERcm4MP%2BB9iTJzaJMGMjO1TFuJudnCAd7t8a7VKKUo1oWB0Wg92tYjIBjG%2FL766uUAmXe7IWUCKS%2FVzUvLIBWI4n91MnLXhIuT5WaPLnFhSP8FI3vYe%2FgnjWhxqdkEfalOODRKCyM%2Btvmo4r9StfBmaH125maEJekKlpdYLDUe7sHmPFqetXSfVp%2FWOJzvQM5DCtq4XNBjqkAcZax7CyT9GdXEj2El1ls0CKuR%2FDmC3OKSu3MwshgFdmE40j9md4X%2BXGMXkG6fMTRemi2C8QKvORyOK70v54QjoIk4yqPnCCx1%2BGFd2GTjIkFIMngJwadgmjo3QSBWWn3aZ6UDWj6FdMEPvZdSJBGUPitDSh8Y%2BhlAJt%2B0uqZx0lO5hr7%2BU8vtBgr%2F%2FdnIpZoAa232rDotp63jiSyn9tf6dNdptz&X-Amz-Signature=9e341d216d38a26762ccfe5bb2500c0bc7e5f1b455a3f3bf70c0386b037593b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662XCHOUQV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIDP%2Fewm4C1vTHuAuwGmGZjjeO0FffiwZ26c2UvlOV69JAiAM3ZHNu0dvriQ34FLn2Viox1q2R6UF6%2Bd7k%2BazruKwkir%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIMjnfiEGYHbAoI9LtxKtwDe8nWntrwiMnyLSO%2Bb3tjLMrM%2F7zykfG45scJyp02Ngv2mxrjAMbW7SPHujlgXWODXvY%2BUlVH6pCkiVYkEOHcEfkJJL%2BCAvW%2FrNh7%2FWiCmZlK%2F7zRQm0SwfQumBTTyGCaI%2FFh4K77Q5TwGRkDtfbjFxPuzW36HQNvLmaDgErhIp2de9peI7KGKU5uuWbfOuO5El84sGTRavYitaaWrSPAw0azL6cMmFIb2DdD4hni6VQH4FfGW33BQCpXq%2BLieD%2FjqAz9oNZt2I0pxROBKt6rX%2BZmpKTUtC6zm95%2FNhb9KL9xOnn%2BO59QXwdzEKo1bOztc6RGlu7jeCndHW%2B1VmtImH1vHXPlXGxfjOvBOHl0lahcRqdl1k5DaJpT9Jvhyr79CpbQUbe7ozr%2Fq7ii6DpfpDcy0zEs6dQurF5Hu%2FTAgCfntygIIo012GFvn39DXdtimNwPWy8ohHuDMktamh9YaBDVoO%2BL0ikRK340pXGwPoXXsoz9T39kfkQZPtKg%2FpZkETnUL%2BwaQRzHAP1W49X24aj00kWeWe5H7K%2B6UlYB697O5LVTbi3ioQAK2C2FEakKdW0FW0nWBR6HxVuH8iqp1li0K2HMSu8pkD0qdY04UWqv%2BuPXD%2FXvXvWRdfIwkKyFzQY6pgHTisz1IhuiCVp7aZzBexlpK6rkOGjsBhbUCabUrbMErfiqHTdMuCgfdDc3aBGFdSvQ4fUePGuITMM%2BV2UQGfZuBWart8NaFkQem0jIjsefqczGpBIHVCUfaW5%2Bf8097%2FrMSREaHFx3EFwaX%2Bh1aIc8jlTqKgq%2FW17poepDNR2uK7y4RZyBK7fcjaM8FxXQmNuGfGvSzMLrkQOY0LM6jESXHNxP%2Bnqn&X-Amz-Signature=a2ee8a42055afa5833f016cc40db02471272d34314c0d1bdf9b263ec3af69133&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOCPKZSQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIDIwY%2BoJtah0xfzeozQDAPw%2FlOgn1w1ZvtTgu9pHkwMcAiAX7TgMc5SHWpcFkU4vR8rFj4iXKCMS5JVDSgVA6M0%2F0yr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIM7HwMMECKLj8rgpqCKtwDmIsPi1lQuRmJ%2FhhVA%2FacFjXFcMj4mSqucX4BgiSkJDoCrPugA2MBFxA17nQNcVeKgQY63M5cliv%2Bxm5FsNHmmlcfM3Tcc2fDaJR3Qek7mPrmm6AKr%2BsjuP64u1OVXCn%2FYOcfM34Nq%2Be%2FH7NIVJPZ%2B5Yac23DZfvChQRyLRnPGz33mqYbTEzbqTtNv84iHsxcZ0DPcGKkAkLz%2FlMzDINfaOlS6GkjInsVoo3qHn3djc2%2FnCtMq1Tjr%2F5fasGhy%2FmgfmYw3DH7wez70owt5zO6GllWA4EE4V0yCag4sJTf3O8fe0I5ujkr4N4w2UEh%2FMTuBLJ9QFWhoO%2BhHLIUoVb%2BsHb52HPgQMs7%2BDytTEOu7LOnZCB%2BR4JkWvQshAlrufqjRjQL4ntI8koqgPiZEMngwtVVwwdRIk4v%2BS0xwv7M8npzYl3Ly04y5pc3zB9bJO6YuWOVEQcu85RDwAZCv9%2ByYclGawmBncAJnyLLdSGmePp2ej%2FqQyNhFeQ8LtABL7i2FIN8G%2FRFuOK1MJuziHdkyQncof2iYdYFfxC4XGtTVdtPjFfIfDosHyOGTrLvlIsznGt3OtxD1XZzrGl6DIlP1Mxq%2FhT5dyPKWbFs37pUgg7dJauk8Ge%2Bb7Ij9b8w5KqFzQY6pgGB2Q7BC8CSaslccQ0N8ObdOb%2BvQG6LIw%2B88uKJvZOjE%2FymyjyOVEgJw3ZLM%2BTqIzpdTt%2BwkKrFR0F1rzYsaIp%2BNYQB3e%2B%2FUMuiYc26bqKiCRBmMdiIEIqUUQdx%2F%2B%2FFkATKDP83PVlXU0NTf8EOTH6AzZArCtXVVoS%2FY7ub%2FX%2BmjJgYg2GttjuW7ut3%2BCtXGUCktJyWL5lcmPtLwi%2Foc4KrsL%2FLovhr&X-Amz-Signature=ddb57a255ac97289685f485f32b4d3c638a93d3dabaff4197283d7d902ec87d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SOCPKZSQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092831Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJGMEQCIDIwY%2BoJtah0xfzeozQDAPw%2FlOgn1w1ZvtTgu9pHkwMcAiAX7TgMc5SHWpcFkU4vR8rFj4iXKCMS5JVDSgVA6M0%2F0yr%2FAwg6EAAaDDYzNzQyMzE4MzgwNSIM7HwMMECKLj8rgpqCKtwDmIsPi1lQuRmJ%2FhhVA%2FacFjXFcMj4mSqucX4BgiSkJDoCrPugA2MBFxA17nQNcVeKgQY63M5cliv%2Bxm5FsNHmmlcfM3Tcc2fDaJR3Qek7mPrmm6AKr%2BsjuP64u1OVXCn%2FYOcfM34Nq%2Be%2FH7NIVJPZ%2B5Yac23DZfvChQRyLRnPGz33mqYbTEzbqTtNv84iHsxcZ0DPcGKkAkLz%2FlMzDINfaOlS6GkjInsVoo3qHn3djc2%2FnCtMq1Tjr%2F5fasGhy%2FmgfmYw3DH7wez70owt5zO6GllWA4EE4V0yCag4sJTf3O8fe0I5ujkr4N4w2UEh%2FMTuBLJ9QFWhoO%2BhHLIUoVb%2BsHb52HPgQMs7%2BDytTEOu7LOnZCB%2BR4JkWvQshAlrufqjRjQL4ntI8koqgPiZEMngwtVVwwdRIk4v%2BS0xwv7M8npzYl3Ly04y5pc3zB9bJO6YuWOVEQcu85RDwAZCv9%2ByYclGawmBncAJnyLLdSGmePp2ej%2FqQyNhFeQ8LtABL7i2FIN8G%2FRFuOK1MJuziHdkyQncof2iYdYFfxC4XGtTVdtPjFfIfDosHyOGTrLvlIsznGt3OtxD1XZzrGl6DIlP1Mxq%2FhT5dyPKWbFs37pUgg7dJauk8Ge%2Bb7Ij9b8w5KqFzQY6pgGB2Q7BC8CSaslccQ0N8ObdOb%2BvQG6LIw%2B88uKJvZOjE%2FymyjyOVEgJw3ZLM%2BTqIzpdTt%2BwkKrFR0F1rzYsaIp%2BNYQB3e%2B%2FUMuiYc26bqKiCRBmMdiIEIqUUQdx%2F%2B%2FFkATKDP83PVlXU0NTf8EOTH6AzZArCtXVVoS%2FY7ub%2FX%2BmjJgYg2GttjuW7ut3%2BCtXGUCktJyWL5lcmPtLwi%2Foc4KrsL%2FLovhr&X-Amz-Signature=2b47d71e9f3b8ea3ac3a6eb649384428bc36c76fadf3b7606b510f0a57fd7c66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664I7VH5PT%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092820Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJIMEYCIQDajpTOElXAux4BYihtmo9OemeKaU%2BqCm1kazBYOBk7DwIhAMEpsdSWbIwtyJn6V5s8KEZEoezdIrbLoa7V4XrgXjSCKv8DCDoQABoMNjM3NDIzMTgzODA1Igw0M5gqudOTiRa4lCIq3APLahrKS5TJdaaWD0bUXOeFa6TOF3hhVpmx69XI4eOeFiWHvQgcvgyTUum5zYC20jgsXBSKdyBfD9Q4%2FXxI5in%2Fvt7hnNRO2pmRtxFtgnz6B%2Bvecg1heBmV2hfcokmWQbfxnG7JF63mbiG0OLmO4QOjcxEhRv6QK32bfx6dNPqP2zRBTRac277qWXSTCrG45G3UkD1wKrWs26UGcZPLZDIj9if84mp4diaABktFXM7lFTr2HrnNkBsBr6HaKC5gXXVH61awZQACWAMnipi5f9rx2%2FPfTzE2tH97n9B3fyPMofrIya14XkiHvPvyRi0JdRawV9jbhzP3YMB%2BpILvfGhUe5ul%2B0R9WkZnQwOmpDmrKTBxQBJjsGKWAnZ9XXGefJYfFM1lNHRESCZAMjGMe2uqn3r2J5N8oRezTbnReh8kPRTla9nedCRasvbgq%2BqXgEj1HzRBeGxPP04Hi09nx5gLb0JuXVf%2BKyECZJPMZKw2mFyfp0kOEAXWAVIawIEx83I3JqWodi%2B32onmLpeqJLBP60bSexQIs81%2FF8WUeD5gwvvM7eRjONnmMPKM%2BFdYcZtnLuR26toMeDnEuU3BkvPHtQrVRN9UL%2BDf6C8tukKhLrX05M7efPNfnMLa2TCqq4XNBjqkAd2vCbZGMRbuiYF0L4jnKcl5pvlN30Q4EcxL7q%2FerT4tysZybPyXwMOgZ73unrE3nIMn3vqvE9ou4dxj14iiPEm9RtvCgbbjsCjQYvBoxBenbqAp60Tvtwtz0GMpULzgdg9HUdzrfuscY%2Ff5mD12j27yQ4JxElB1fiBjXjSNdX7fvgG%2FvnwIFa3aI7YCAdaJVeQczg7%2F5Zl0Onv5Dcve6C8Q3870&X-Amz-Signature=6b5ea5623e0ce69e5b6cac6bbbad726ee154e02224b7745f094adaa0a86eb269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEMZJDS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDv%2B63RR%2FbPKZfK6WfkJOKAVQhG6yu6RGY4rppLfjqo%2BAiEA7ebkcU1M8WGM%2Fxrmugp0YAdGGn1JHoyAe0hic6sB0dUq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDP3jtreTWXLLbvVSFCrcAzZQ05ZtoSuzrChi191OXvH%2B83bBKiECaMFREa6a1mWZAOXDmvLerI9iHqaFUIGORnniMkwEGeFbZ1oCuou5YYgHjrLY6qKH9zhSbA9FS4dhJaO6iYZ6VB1Lxs4xewI5lVxtlb2BzW4xLlZYbt4ipZ788ewZQ6BpTZR5k%2BM9Szdo5WVjfQkMNR5yb3VUOQG5A5VdUXqr1xOhCPe4QZR%2FApuRVSQLhjuC1CpLyia5dekgvBan7%2F7rqb83j2Ay6hP7lO0Adho9f%2B3ctWn0a4pTjBzP6XhYUiRaN6jC2gZ2V6Fg4dv35yA%2FxXDjRlUgXXHGWeoau3HHZYgcnRT6NggzroO%2FRGAFALcedZgzsZikZ8PEI8GTpUmdeiYDRB9WKzyTj4Qw%2FoGaZK4IBZBkKsiz7UKjI6%2F07o2EDyhm9U6gJARQsb58RrdFQCY35ADYGsizFxM0Wt6mqYVe3roP%2B89oLzRMDd0wUsBgp2MUtLQknqC1z4JWULUwPx3WFcZRR%2BpNJ9l6UM%2FSffew07M9v3BYhRNwaNmRzfb1lN18nnc7%2B8LCjWUcs6iLd1WYxgyAsGPiGvJCFIyChe6LftMtXhYjwSFBspgYqeKcNUs8sTKXw5FH9u3zWeuxMnxnkaSFMM%2Brhc0GOqUBv5YGRAGrlUy4pnZ%2FBzYk1Ex%2FaA5nIkRLykcagZl%2F58puvUoWxjWGRX7Or9AqSpTeGbNMhDhOvnCAD5695NpummrmiluzpyEjBzP6SzCNGGaB5qCFo6M7p17T7DO7xxo%2FAi8l8EFmo1jEQjhy94C264dQp2lknqa6wT9xgyfQZm5EQmIdSaiOEmmwgnenneYzwks%2BZunPnuaaep8b6prL0Eq84hRQ&X-Amz-Signature=4df8ad0fb3495dfb1daf61135fe2b6e690477ab10f3062b8019f4efc49021a50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEMZJDS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIDv%2B63RR%2FbPKZfK6WfkJOKAVQhG6yu6RGY4rppLfjqo%2BAiEA7ebkcU1M8WGM%2Fxrmugp0YAdGGn1JHoyAe0hic6sB0dUq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDP3jtreTWXLLbvVSFCrcAzZQ05ZtoSuzrChi191OXvH%2B83bBKiECaMFREa6a1mWZAOXDmvLerI9iHqaFUIGORnniMkwEGeFbZ1oCuou5YYgHjrLY6qKH9zhSbA9FS4dhJaO6iYZ6VB1Lxs4xewI5lVxtlb2BzW4xLlZYbt4ipZ788ewZQ6BpTZR5k%2BM9Szdo5WVjfQkMNR5yb3VUOQG5A5VdUXqr1xOhCPe4QZR%2FApuRVSQLhjuC1CpLyia5dekgvBan7%2F7rqb83j2Ay6hP7lO0Adho9f%2B3ctWn0a4pTjBzP6XhYUiRaN6jC2gZ2V6Fg4dv35yA%2FxXDjRlUgXXHGWeoau3HHZYgcnRT6NggzroO%2FRGAFALcedZgzsZikZ8PEI8GTpUmdeiYDRB9WKzyTj4Qw%2FoGaZK4IBZBkKsiz7UKjI6%2F07o2EDyhm9U6gJARQsb58RrdFQCY35ADYGsizFxM0Wt6mqYVe3roP%2B89oLzRMDd0wUsBgp2MUtLQknqC1z4JWULUwPx3WFcZRR%2BpNJ9l6UM%2FSffew07M9v3BYhRNwaNmRzfb1lN18nnc7%2B8LCjWUcs6iLd1WYxgyAsGPiGvJCFIyChe6LftMtXhYjwSFBspgYqeKcNUs8sTKXw5FH9u3zWeuxMnxnkaSFMM%2Brhc0GOqUBv5YGRAGrlUy4pnZ%2FBzYk1Ex%2FaA5nIkRLykcagZl%2F58puvUoWxjWGRX7Or9AqSpTeGbNMhDhOvnCAD5695NpummrmiluzpyEjBzP6SzCNGGaB5qCFo6M7p17T7DO7xxo%2FAi8l8EFmo1jEQjhy94C264dQp2lknqa6wT9xgyfQZm5EQmIdSaiOEmmwgnenneYzwks%2BZunPnuaaep8b6prL0Eq84hRQ&X-Amz-Signature=4df8ad0fb3495dfb1daf61135fe2b6e690477ab10f3062b8019f4efc49021a50&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I5R3GXB%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T092834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHEaCXVzLXdlc3QtMiJHMEUCIQCIg7qXIB2kd0ERQnfbCNEsT30Xf2EbcoZPxywXJc0FHwIgZcN1o0kY%2BjTKAF30ZeQDVmYX0iOI6NgrpVXkOSvTaNcq%2FwMIOhAAGgw2Mzc0MjMxODM4MDUiDGR6GE1hF2NqGCvc6ircA2dNSgiMBQTiC78v7qvWd2hXn3lsjoiM3lVUyIGNcudZab0nt5D%2BRN4wEvfKm4cAseTWk8hKJTfT%2F4HTPURW%2Fw%2BJE7Ji7oEwyrFk2gxFq2t47E0CC6z%2FojiYTEkcRfhTNlxGnIsZV9PIbBLdzy4SzwDqdRRn%2B7t7F%2BkU3rKYdlkapkGqjOLXRhPSNj4cz2GRa7Cdg9FLpopYkjQlVeGsHsEK8vBsW7O7fnlzx9AzyMmbXpbrLbRIuSCeUDqD9WRlsXjRXvjmDfiB%2BlobMCUEhHmnqAA%2B%2FV152h2f53KaUcbHLdtN24qZQWNsDQCYa8XlCZ5ZIMYMhmzWGY%2FqQFaS6tdQx8nEYedyGjsS53OiKsAVa5bBE5T5TOg%2BvBx2k0xlsF6pD8PcfnhKzoPhJW620f5%2BISYFjTuAUdQPA72hEvt4fm6gPAzSi3P%2BgPHWV0FohhD%2BWjKmd%2Femfvy56t%2B%2F%2BPBb5qk%2Bn5NRN%2BVhSECt21Y8TsRMRRG6QRb4ufKzlDuWr9MJp%2BZy8dO9inGgcG4%2F%2FXpHdK640EcUSZuAyauhxcLZ1IbJaLAcJCc9RGotHmAVwzk0rQoazzCTN%2FeitVA%2BEroMk8DkyC4FO4ZEnCYTkK2JBv3Y4XSX5XHdsf0AMNqqhc0GOqUBYGf1oDqbt82eOl6nAap8wkk2ucNVDzkjhLsGw%2F4c5dgYIztApFUuuKJ2A4%2BNJy92%2F0VKLAuei5EHnBGzm2lnaCvV6p3cgHsEYjp75h8C%2FMdQbXG315%2FYYM8Vz9g5Y0U8pti97mVquEnC%2FvXSznCUsann7c5f8fUTLShUD17UDQyWL%2B0U5izUHE5tU9B7cIuCFSsaye8wYDAauaY9670HM0qwmxBx&X-Amz-Signature=2c6646722c1b0793b6d486d49e2cea3c127aa6cd4daf098c85a29db2081c4982&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

