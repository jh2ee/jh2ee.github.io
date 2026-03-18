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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPIMFP3P%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCI2ttq6JoKqZK3TFGhE0un31qAsndLm9l39brS4tn9KwIgZVMDgtEyA5ywEBsIwBhYZgFTODQH6uVWfKy8lBcjgFAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJH4Lrl%2B6eC5vaiwCrcA557K02QJ9%2FlDSqT%2Fy6aEhdtMYnRULIBAoA%2F6RZeGz%2BCSHAoojmf0k2H0m4Tl7gTJ8YB2aChgXTlRn6xlMX8bBWxmrfMdHNW4LNYLu05%2BKV89rsps7hGzG7JHuJUqD%2Fi7Xma5yW4Qf7WHQKGsJJ4PHSU2AZQXYUWctYfGhx1AGc1lsiKonvPNhZlgVclhgfyx6X0Tr2i6QzZHScHenQZolOIydprYIHmCB9yhsqdynyZXfzvrNDapjRAiDMB5lnUuuIbJ7Gd0KjkkJmkcsK0GYE4Nm5XP9G7VDOpn1SmrdFN1%2BFiBXJsZPvjEP7HLSVsET9vtYBuFYZZVDISmncC9avq6QJRpV3V8stK3SpYgycxPnEjjkKGrpbc7JgSIUj0Olz6Qskv%2FraKwaHqcYdKlNu6J%2B0maowc7aIl%2FnNgZFjqjkLOT54h5BMBzEJ1%2FVliB4WH0ZBZ6a4W3uy8bkfq23g5totFsHckN64jBXrNpbXU2H4uceKHsJH20olRzmE1UeWlXxrpFOwc50BR0ECprCiV7XANLx1rPbaNxS1SuqxtIgJkdVTUv3Bn8OIzk68KJEl%2FgmhAW9NBS3SnjdIn9gqOtHFUKNY7qkuG4MJL4LEL%2Fj%2FnzqApQKlDFcHLMKfc6M0GOqUBJUf7CD9ntICTe4Uj6g9UpM5z9mzK6ZZNoIbTqGqsVC8PsOubDPPL7Zn1wUnPSBOdRhmGZCsNob8xwoeHN3nnNwkWYHtxVXLU%2Fq0cDO8H8YJrjy3Vph%2B0KDVFp7qC4fmflPgXYWLl0424Plvr9Uywu9Y7K9seCaJ1WF6XDTJBK42Zf8UPJcNZnbMk26rwVvoWYloVBouEFcpwJjxwIMPIeFHlK9YX&X-Amz-Signature=5c0c64612624af0320cf971f0104fb7c06be33b612c50f84594a55eeb147844d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPIMFP3P%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCI2ttq6JoKqZK3TFGhE0un31qAsndLm9l39brS4tn9KwIgZVMDgtEyA5ywEBsIwBhYZgFTODQH6uVWfKy8lBcjgFAqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGJH4Lrl%2B6eC5vaiwCrcA557K02QJ9%2FlDSqT%2Fy6aEhdtMYnRULIBAoA%2F6RZeGz%2BCSHAoojmf0k2H0m4Tl7gTJ8YB2aChgXTlRn6xlMX8bBWxmrfMdHNW4LNYLu05%2BKV89rsps7hGzG7JHuJUqD%2Fi7Xma5yW4Qf7WHQKGsJJ4PHSU2AZQXYUWctYfGhx1AGc1lsiKonvPNhZlgVclhgfyx6X0Tr2i6QzZHScHenQZolOIydprYIHmCB9yhsqdynyZXfzvrNDapjRAiDMB5lnUuuIbJ7Gd0KjkkJmkcsK0GYE4Nm5XP9G7VDOpn1SmrdFN1%2BFiBXJsZPvjEP7HLSVsET9vtYBuFYZZVDISmncC9avq6QJRpV3V8stK3SpYgycxPnEjjkKGrpbc7JgSIUj0Olz6Qskv%2FraKwaHqcYdKlNu6J%2B0maowc7aIl%2FnNgZFjqjkLOT54h5BMBzEJ1%2FVliB4WH0ZBZ6a4W3uy8bkfq23g5totFsHckN64jBXrNpbXU2H4uceKHsJH20olRzmE1UeWlXxrpFOwc50BR0ECprCiV7XANLx1rPbaNxS1SuqxtIgJkdVTUv3Bn8OIzk68KJEl%2FgmhAW9NBS3SnjdIn9gqOtHFUKNY7qkuG4MJL4LEL%2Fj%2FnzqApQKlDFcHLMKfc6M0GOqUBJUf7CD9ntICTe4Uj6g9UpM5z9mzK6ZZNoIbTqGqsVC8PsOubDPPL7Zn1wUnPSBOdRhmGZCsNob8xwoeHN3nnNwkWYHtxVXLU%2Fq0cDO8H8YJrjy3Vph%2B0KDVFp7qC4fmflPgXYWLl0424Plvr9Uywu9Y7K9seCaJ1WF6XDTJBK42Zf8UPJcNZnbMk26rwVvoWYloVBouEFcpwJjxwIMPIeFHlK9YX&X-Amz-Signature=5c0c64612624af0320cf971f0104fb7c06be33b612c50f84594a55eeb147844d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6O45NES%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064501Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIHo9KkXT%2BAEZFph4arR%2B3DjPNQDJf2iNbKoTv9OhS2QuAiEAg5vRw8MPwmoQSaI%2BlglAdPCX9LS2fnI11W%2FD2gDKCL8qiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNxwjLno42Rxzfas2ircA0xnXWFlOAbxKtEekva3lNChYXGJKqGWDHWwxGvi%2FDEhdniO7sk%2Fvik4rSTF8X9M4COliMP3LAfIWwkTCj0DGIwxv5fgY0%2F81FupghRorPAZqhqWPoJh8AXl9BS4ka%2BMJgzKDCgtCuujOy8IlyI6oXIIEB3eJIdNnr080JNcjXVXSdsoaqMUZLzJ2kkMjhpB3uw7XJH0nHSWhjdmVjX%2Bdr30BruWdu%2BjPsKFRxfLL8cAvsKMHoH7TE8rsdBmjgmv5AsUBMXQIsear5jAGWNUV8PnQ%2BCWStjo%2FlyZyZX37ARepi8JgDs2eKwbX5V%2FWjdKE456fQ6JkCiuJc%2BtEKWhCmKIgrrZNTYkyj%2FNq1H6JiVN7EGJtD8tWpKPJfWCNaL0ZAxhslT8g8fdpRyFtTIo%2Fyx7KyanpPfmpBigk4KNADTNTOwxXG48MxRvfBdPqsUI96mtbqmTnXmCos8AuW7zXkKFtmc9PkHmKQvgx5AK2V8EV6xDO34WTkQFwevfdpDo9FV9kTGlxPfgRSfkEDmSzuUpBG1EIku6Tlg2QW0bYI7oQMpnwttXen5Bl59L8%2BkGdwXfpnoN1YupcV5BFqmWEpZJ98zNdf6N6TE59x9%2F5QgmYSSxWwTBd6Hj8mg7MJbc6M0GOqUBLXusf%2FnaNmTzUDniGpQi7CsqLgvblGqaCZq7c6IWXpT9DaEpInOk2cyZaBA7R8hWpECNmB89DPUM%2F6GN4zAOCoGCfXdyD2q7xzphpfhcQES3AUZAKi7xLMuMYSVvWpHVmXYiJupqh5dEdnZGe1tWXKz6A3Q%2F9xTOnz5QSLWvmq2OaiKB%2BiiDvh5p%2FVNSem1fBAdqff4I7DulEwUq%2B4vFs6Hky5Qa&X-Amz-Signature=2ae2ef89f16938c0002cd9a4696839db47a4591002e8f0e2ac77ea73f413b491&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NFOQUEY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCF9RqhnW4r8CC3xzHO3lKSzhdK7RDPki7F5Lc2elor1AIgRVTyEotCZf7JnxzXbfR0t3QIJSpYFLjDhDAjAqrw6HoqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEaBbWDQBP9wULK17CrcA8c4M14P6TSyMKRwwHip0Xi2qhK8q%2FsCG7TY2MSc54J0wcvmMaHcgOMhskWONzNHWW4jCI2aJjKSVnNVXUgM4S5kOduIwmiKvv0px3RZS%2B%2FvP60OT6WKT7oaeV%2FPl65vFrbZW7MT0BpNt0ageUe6ScErfJuNHqqH%2FNVaBqw3CcVrR6Q0o7Lnq7GgKrWO1RNqXibZL1MGpsBB8pjC0hyc0JySxH90z9jSlv1qrUKa4MuxriAUVnSDIYJwLTVHw91LauLSN6EMeq7SAsAKCepH6mR9opEb6bra0Rlurl22HBWfiVeUyiXZAh%2FVqr7%2FisHmqTzVyGmDW%2BYmXYkFzWujctZm0bEaX7rF%2FG27DhJdgjQkiWzjzgkzSDqwTP7AF3WG%2F6LPcBAGgXrs%2BI7K%2Fzv9ND%2FMoZY1nZEJamYNCseyJ7QUjLqUNSYYwiwh682shY8sffnICpHbvSqH%2Fm%2FfblSTXT8QkCTKuS0WcobxQcU6AnC1Sghh7xSs8orG33p%2BczY51%2BZRuIa9jOQ3DU9VeoP2IOmfnKVMWktL9ZZ85%2BrCDMyG%2Fp%2BJxnEBKha8neqb02Ad0EQSYEei5w0XsMF%2FJX9q7gLMBeX2T46Bjy80FIH9zTSew%2FphaDU4L8ZKLEcJMMLc6M0GOqUBDo8a6%2B2br5L0f%2B2bHd7sLkB373a%2FDnIaKY9sy6xQQ7NBteuTM402wow4dxMf3uDM8xo1c4JdpIQK2f0djBEhXgQEV4zGHCulw5aVw6O%2FeSIDX%2F6snZH04F4f7n2avWYiMDl3GDmvVsDnVEUrLQwb%2BNIkld5eqWzskDF3K3BZd2LusQv8gcs7XXWYlKoFliI%2BhTXJAf%2FmJHttbXaEjojG5Vhlxd%2BA&X-Amz-Signature=ab037d5987497372400a0e64a1f21287e0a9e4ec6a858d72b00318389567ec5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NFOQUEY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCF9RqhnW4r8CC3xzHO3lKSzhdK7RDPki7F5Lc2elor1AIgRVTyEotCZf7JnxzXbfR0t3QIJSpYFLjDhDAjAqrw6HoqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEaBbWDQBP9wULK17CrcA8c4M14P6TSyMKRwwHip0Xi2qhK8q%2FsCG7TY2MSc54J0wcvmMaHcgOMhskWONzNHWW4jCI2aJjKSVnNVXUgM4S5kOduIwmiKvv0px3RZS%2B%2FvP60OT6WKT7oaeV%2FPl65vFrbZW7MT0BpNt0ageUe6ScErfJuNHqqH%2FNVaBqw3CcVrR6Q0o7Lnq7GgKrWO1RNqXibZL1MGpsBB8pjC0hyc0JySxH90z9jSlv1qrUKa4MuxriAUVnSDIYJwLTVHw91LauLSN6EMeq7SAsAKCepH6mR9opEb6bra0Rlurl22HBWfiVeUyiXZAh%2FVqr7%2FisHmqTzVyGmDW%2BYmXYkFzWujctZm0bEaX7rF%2FG27DhJdgjQkiWzjzgkzSDqwTP7AF3WG%2F6LPcBAGgXrs%2BI7K%2Fzv9ND%2FMoZY1nZEJamYNCseyJ7QUjLqUNSYYwiwh682shY8sffnICpHbvSqH%2Fm%2FfblSTXT8QkCTKuS0WcobxQcU6AnC1Sghh7xSs8orG33p%2BczY51%2BZRuIa9jOQ3DU9VeoP2IOmfnKVMWktL9ZZ85%2BrCDMyG%2Fp%2BJxnEBKha8neqb02Ad0EQSYEei5w0XsMF%2FJX9q7gLMBeX2T46Bjy80FIH9zTSew%2FphaDU4L8ZKLEcJMMLc6M0GOqUBDo8a6%2B2br5L0f%2B2bHd7sLkB373a%2FDnIaKY9sy6xQQ7NBteuTM402wow4dxMf3uDM8xo1c4JdpIQK2f0djBEhXgQEV4zGHCulw5aVw6O%2FeSIDX%2F6snZH04F4f7n2avWYiMDl3GDmvVsDnVEUrLQwb%2BNIkld5eqWzskDF3K3BZd2LusQv8gcs7XXWYlKoFliI%2BhTXJAf%2FmJHttbXaEjojG5Vhlxd%2BA&X-Amz-Signature=f88ccc94059bcabfa50969b57d180b3e97825ecc1f9825c472c3262f3edf11ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWZPHRUA%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIQCFMveAWpUZ5moRH8TO73E%2Ft5uDI4bOyaGvF437FYzG%2FQIgONHehVx9b9tb8UuGbAPQuW9ocMiCfAlqr54YYC47u4MqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGv4pTyHcwcDk%2FoclyrcA6k3IoLDCEfZfVOUt%2BvqTstMznwCCGTb0w%2Bb6r%2Brg2VcnpwdT%2BlyD30aNx5f1NaVThlQas3%2BcXEOlLgmgb8%2BvQb%2F4uIPtHSL%2FMGMzIC%2F9tSRQ%2F979vwrvx6e7pEndPUZgxcte42lG04ld%2Bos9%2BT7W6hdKUTmCezFCYMNl4rDF26Xr0v9wuqzJvbFpIN5n%2FunR3gySajfeZS%2BVfCSdf%2B51BBA838JPCDxSwPARhZSBejX68iwfayUwqX9Uh%2BOM%2Bx%2FL%2FKV3g5TdmRKt7xqahb8HzFic0TQPSSD4ixy8%2FxHSosPcbHL4y%2FMHQbSh0b1%2BZZ037On3Pm7dwZWQKRGS4G%2F%2FJ1chi9d7z1JKCqkO4UeqADKvrLPpHkNwVSvx4gRtwzQwrLpqtxuiCdCk6laD54ESqOfTdUbs%2B6JGCMA6fGk4Qsq4j7XyRFEBZrfDUqoWGgzCxffdM%2FyA2PF8OLVYblz2%2BuFmpiTbC6eFLOi00kGTOlb3g2LTtn4fXHnmASwH79GPugcYpZmi3dYCOU0ILq2nzeBib5OevHgHCdYFUFuToNyagdEvNG6ByhnIFIGsXF9ND2FFSKGIm2izi3oTwp2d7kHCZn7cahxx5gdeVgDBGwbPGU7IlrGcwe3H4PXMKvc6M0GOqUBksAy6KMvPVJOdNZe4m2cQeFY3VezxekzsmfdCIAoPE0NwZ9%2FLl6JVxf1TRFDBgXLx3n%2Fa4isSQRA2jbCDEEcKgJAALkGowUxAytDn1k%2F0Xdv%2F2BoPdZM7C8ziotnP4DuJCexi4vF2PsI0NG7OcIwT1cc48uUyum%2F5DJ3%2BB5Myr4LYUKqaTH2XXv9BmPKyFn%2FXr4tVe40KLDtjN%2FGN8UZu8FGzAkQ&X-Amz-Signature=04ccb44782323b0fcaf08c3eabb883aed61385cd985d709008549c7d8bb24c92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZYMI5GP%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIFpQ66GNGOb0euvMYqJchj8tls41amjr3y5oTic4FYAWAiEA32TM1gslVVS3EsWncT4aghuhS8K6QF3j%2BMnOncKLB48qiAQI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPUTAYspKAr4k2ujCSrcAyU0hBGXdq9H%2BMCokSfYP105%2BnNwIC3KTnXb5h1G87w%2BRDpnp2CNOFjo5xlmegk%2F9X0WdFD%2FacDF8QsLPMjP0jYKKPqPtSZhjJeJdDFski14mCAdQfN5RQszPK4WmVv0vXMJfp1yTTwuMTR34Ut8iVHBL43IEuZi6VEZZsUIti3Bs6YZwXu41q4dkHjuE7NpG1hSpv%2BaN7YWzATfgYk0FOL0X7lNTq%2BP2%2Bmb9NNkal2Hz0wuObdmYkS72ju0mQ7obMP9iAzkhx%2B8yNlhYIOp8jhaV1czc7qpchpot93vmTvTn1GPUXv5TFHxvBsl6YKmdNa7foV7xZnH83PAcFam1ehvLo%2BuYevXHS44J8Z7qMyaFXheJdlMV1PZ4l9w61A7CQR6Yh5gpMOwZs8PFs70PI87fUxTPsZDp7EKV1faxLwltx3fry63n5obCTOTUwtf0P%2F1QO0gjPyQKu6zE57m5yjE3G10o1s%2BRZkogRmCeZP6F2SR%2F9MrqqHpx2UsdBUI5d3PUWk80hiAK3dVJ2tvRdQe7wYHhPpt1rO2xqXpaY4FhEsQzxbc9Wlidq9bpaTffPhEmleJXIo7KMVYL89bnLj1MfJrOZROThpxk%2B0mImN4SgaEzrAzTtD7wQ8pMN%2BD6c0GOqUBgBmcJXqbW%2FYxNjj6If8WOpjJNYc4NSBb49wBv4wQx0F3WAWKySJiRJNPk52c2UYys%2Bk3AY23EL9KkIY3cEj2%2FkGjMLQxbPB4GJrknwULPKRtX9nuLoEB6%2FGEGtf9p52vuTNMwHAR3bJWfcCnF%2BwDe9yhEfr2T9sakMHHpxacxZO95B0LwRn7CZDT2Q1GCaWAMeRN7xtdAOqL5yXD5Os63txMvqnU&X-Amz-Signature=9d1c0eea62d2f9de7df462a72fc45b97160e6f4e9ed3dbd43391043400a13619&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TBIND53I%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJHMEUCIBJYk0I44hywB6hH9nEy8yDzsCdzjpgMSfNWVMaO0unrAiEAsvvoxT%2Fcx9X8iF2gqbmGYGPft0A%2BOMmE0ltfjn8d02wqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD3tA9yrFqII6pE7NircA27bM0iA%2B1eyp6FHQrPSXXrhrv2JRnjsUQuu4PtemFmfldXWevWW0O%2ByQXXnzv6dB20%2BjaL5sDPvUl3n7osSTpPg8LI1bNSQibZesCUrf3OBUZN%2B4VAb3UQZdWlxeMDdcS1%2BSX7fomEqrzRO9oGr8MMD9uVkI9TXgil%2BA%2FiEH6w2pbAkY767MNw5hietVPPAZWN%2BvLCP3pWfV1Z%2BURhXjJxuU6%2BhBpxoShqYrDHm%2FUZ0bs7YL2PF%2FyfSFh%2BXy0LBJgG5h4eRaH%2BsUZNVMjy%2Fw6M7eYgTiQ7Fr41LBkr7xbVevBkmq5Fm7rxE6wDPdJ1KTrjuC6n9KoCgieh6kVWtITUkrhwl7jPtn6a7rYa0tq6HmgH4w0EvX9wN1AldakhBev24QJm%2FFF6iWjIwJcge04QQcbO3sKFwM6GuqL9jKisP%2BPBwmfkhlaDQn4TMSM%2FeASZiWBV%2BszfaVE%2BpSdu9MZlg0%2B2U4BbNjynjuzw0dmVnPd1Z9HCe7vxSmBGxInDY53uzn4wfdedw9vIuxtt%2BK0TQPHkRcBTCJ%2B40OnOstqXApF3EDwqweMg%2BuK65TdYbSXkj1wnxAqPyvqTnkc9nAVLCwKPSNhfMLGY9MFjVpGF%2Bs09Grl8qxaGwjNLNMJ3c6M0GOqUBPHeOLPQKH1iJB2vjkXAQhqakSXP3gB10B1%2Bmffy7jYqMvYGrqKYrzByl5sG2oSjNwqUh5Ro9i9doZ52CiO2OfQQbA5fb7gLfMORjyKFOOE4bg%2BQ%2BEINJ6oj8NLeHswHt9LpI3DQbbX2LDcoBwyKLAFsfZ0W0SyY%2Fjq2gXwtr7pNZ8wWyBkTYJuIAXbofySRRJ93POE%2BzGKYfrpx2VGl9EgykHnLr&X-Amz-Signature=017d4f756dc07da7dc7cee83d08358992e5c7fa2d138b18c78aff33b67906bbb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RA5ULXDY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIGTjZa0680%2F%2FaV%2FyVW6%2FJDFfwqFAoEilAU1OtUj96wPRAiBPoZVFa1RglB3eT%2F0JGOJ8IMDgukot646S%2FxrfzbG4zSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC8eVMDSXnuPi%2BuIMKtwDETvd8wNNblMpfg0ZRlROuKLGGAKMG0%2BrgmVSgL0XwjmtguEbZ7MZdCRiGmqO2XqO92JOVEGffaTOYGeo%2FchcRLcnYTt4TEpCCxRY2P7QyDBT8DhXg6AOnGV7PN8SkzSNYE4LOKeSHDvwZJ5XwUQ3vrxVNktMvPOIsgDugzNDsW%2BdI0g6Z%2FpLsO7%2B6iApQxqALKK1%2FQagT7RtXOPWb3G5HtJ1GlPJgYIzdXKdB6fy%2BQdeproVLmIRaeF%2Fk%2FltgCzuXuuxWgD2oT4mFeh7IudCopKIsmFGWJuzAau%2FF6WxpAmp10%2Fek2Do6MgZcCS2WzEuDQ1VQV3UtNv3WOrxUGUtsqXcOnCEex7TijJAm4NxPI7SvTeNcJDPPrLUDvqmad1cU%2BsA70EDjHFJ4QH0C42IUYsKTGiW%2BgOm4FPqPHaUTxJM6kUJimKA8OJ9Pzf3FJPket8WVSivl3rIyfK6RhwNX4oTkmXb%2Fgcns4FCgGyPQvx0ARgyuJK%2FMFnQ56T4iFk8Qm7XyoAFciIKh0mokFHIdElKJiRxgJU3Q9Q%2B%2Bc0J7ubxtkJWSIj5VPWiPPPo7jfYg%2FxGkCwcMyJD1eNcRKoYiy%2BJY8%2BPbXyhADf10jhydxFH7RgyB%2FhkYc3PHMEw8tzozQY6pgEyh4zjTFCfU7tSRGjf0ecZY2lwBnB8uT2dlQ5a1Ctu5tR9p7W%2BgOlySPVZScJoIITnC0DB%2F1dIgBPrmbT5DoECXR8qIa7VRiyV2OLPy%2BheQ2vZNoLpjjLQOI7XlyxyBYXLbnpPgieDIVWfhxh%2FEpS6ps3V4cEB24t3v6v47Ftke8uSqNKzvlGdehuQn5lHunAWoUBQgAf0wWzm9QIDfTrbz20yoDJS&X-Amz-Signature=80caecbe5ac9a4c643b8d644a5f9b2d048aeb660b2f5c4c106d33b2fab570ee9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RA5ULXDY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIGTjZa0680%2F%2FaV%2FyVW6%2FJDFfwqFAoEilAU1OtUj96wPRAiBPoZVFa1RglB3eT%2F0JGOJ8IMDgukot646S%2FxrfzbG4zSqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC8eVMDSXnuPi%2BuIMKtwDETvd8wNNblMpfg0ZRlROuKLGGAKMG0%2BrgmVSgL0XwjmtguEbZ7MZdCRiGmqO2XqO92JOVEGffaTOYGeo%2FchcRLcnYTt4TEpCCxRY2P7QyDBT8DhXg6AOnGV7PN8SkzSNYE4LOKeSHDvwZJ5XwUQ3vrxVNktMvPOIsgDugzNDsW%2BdI0g6Z%2FpLsO7%2B6iApQxqALKK1%2FQagT7RtXOPWb3G5HtJ1GlPJgYIzdXKdB6fy%2BQdeproVLmIRaeF%2Fk%2FltgCzuXuuxWgD2oT4mFeh7IudCopKIsmFGWJuzAau%2FF6WxpAmp10%2Fek2Do6MgZcCS2WzEuDQ1VQV3UtNv3WOrxUGUtsqXcOnCEex7TijJAm4NxPI7SvTeNcJDPPrLUDvqmad1cU%2BsA70EDjHFJ4QH0C42IUYsKTGiW%2BgOm4FPqPHaUTxJM6kUJimKA8OJ9Pzf3FJPket8WVSivl3rIyfK6RhwNX4oTkmXb%2Fgcns4FCgGyPQvx0ARgyuJK%2FMFnQ56T4iFk8Qm7XyoAFciIKh0mokFHIdElKJiRxgJU3Q9Q%2B%2Bc0J7ubxtkJWSIj5VPWiPPPo7jfYg%2FxGkCwcMyJD1eNcRKoYiy%2BJY8%2BPbXyhADf10jhydxFH7RgyB%2FhkYc3PHMEw8tzozQY6pgEyh4zjTFCfU7tSRGjf0ecZY2lwBnB8uT2dlQ5a1Ctu5tR9p7W%2BgOlySPVZScJoIITnC0DB%2F1dIgBPrmbT5DoECXR8qIa7VRiyV2OLPy%2BheQ2vZNoLpjjLQOI7XlyxyBYXLbnpPgieDIVWfhxh%2FEpS6ps3V4cEB24t3v6v47Ftke8uSqNKzvlGdehuQn5lHunAWoUBQgAf0wWzm9QIDfTrbz20yoDJS&X-Amz-Signature=1d605e67d032b0019c1a8ce23487c7bac3399cd959a07e2c37c8e9da178c3d0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP35DLNR%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064458Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJIMEYCIQCx5gWtpkIJB0%2F3FiDa6sQpO%2Flp%2B7GIEbZ3CCE%2FkFxFZgIhAJ7U%2FFf2fICDEkRqrg92p4KVC9qYeFDX0og6pvZfdBOQKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwnGwa5T5PVdroWgdkq3AO4hk53i3myD2o%2BTsCrXrYJx61w01idKH2WrK7XRFjg0uab47ltKJMHMpoiUr0n85uOhK%2FvuLzyDcoOweao7hw6GycCN6kGd5xJUDSIjvt9ZQSrsGZ2tplG0S9B5CaqriatLEdY3FqR3y71vQIH1YurRyaCkTb2kWYZVcCMSc9Z2ZFCzRaImn4vBnNhmfwRKN1fuB7tOc2p22S6WCpMxTcdxXBKWjYQp%2FGTBWfU4bM2dcppZWlhsIyNvcsGDJNPBbI7S5XaLxHdlL8LPcnuiVezAtY%2FdxBRvxJZycKwgmZ4zRGp9H9%2F5q7cUFxVrrd4NLpKBinNYItpQ4PpcH1XTeHJi1ygn4AELNHnYblzBd1N3PTQQxOOOwvq4HnEnQWesaV82AWlQfr9iTFonWVFur32QpHod78F0MLKsr7Uuh2JwjTouz2mZ2hG3bEpXWUeQOyxUkWq5VnDe20npCI7FzA%2FSGwy5DXfjdzpK4YLIqAZbhhN026SLHDvjYixQyE1Ym4JCDLZiFqNum4ciMsuP24BPU0d%2FIhhtBR2wSZYw7KOaVJQE4JJRWBZcVBFeY9%2Byo6QHlUTaiYddUXQNctTYAjil2zu5dA475pgV1Nid%2F33bmCyHfWzyC9p5rKayzDs3OjNBjqkAdR5KvAGMvsziCYaHWoJFAufOsFanZAzVKpQLOoGm3KBciA6ucwMXbut1kgaezAPrU3osuG%2BrDnYxzqgxf0fnSIvGUH9Kv01KR9%2FhpuxYMwgePZI24zEp26X3i%2Bv9HKDGKuniPiCrN6UJvVLzVlJmRSmo0xhVoWP%2BoMuNGU1pMboVIUTsRAdZz0y1GdQ3qGN5Pv35iH0y7OqkU%2FYV7JxRIvXxeDG&X-Amz-Signature=cb122e02a13a702df76b3a0058cfe2f8392d802f307c7ba2f4cf42557552abb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIQXDZYH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIAIpgf0C%2B16cFpx4BWI8C3Zq%2Bscg5zFkC97cXJ3nCQkSAiBk9WASHNwppQ0g8e%2FH6zFALzxCW1L8S3hJUBnKwUQxaCqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSXhvtOty1lKEeZxDKtwDMup8%2FxGKLTHWeoGRMelOYPK5%2BVnTc0Li9iI5fOVbk19LAfE0o1huZo1iBlj4wpXEOzPr%2FbLdExa57SxWQptBQLd3sguhFFYgwr%2F646Ho6nvvg6LfomyX1o3N1xmdYVHLKx2aFfG0B1o39%2B9S2IRbuadPIAyOedl5wmmS5JZ%2B2F5poD7SOu01FzdHud%2BgQC6wWPYS1tW7l8Yw1DTcdGLqzewqBoNiQ9s%2FDoIxyM4Pxi547zchoCXB5AWqFIN6H35v%2FZRVGMio1FdoD2I1oHkyhlib%2B9PopVXyEx21gZvqcflFO1xXXK3%2BgecHUT4pi9sRdM%2BRl8yCtTteak9OoAry2Wt%2F5L1oRbI5amPq5taBL8MNZbcibBRFfddZ0qpFYOpanPq%2FOS1s9fkGFFcacH8dTAUNnXHNO4CsnloE47y9Ljlvdld6m%2Fjxhe1kNy8fuLnotqzX%2B%2BAjYF%2BgZzNaslLhNqVPblYJ13kn6%2B5vE%2FQD%2BTsAZ3vvXK3DPosWadJm80bwIVITvXXzjEHNPxrnJ8vh1gQqhbns%2B1t76gxL30BXmoTqwkANfmbtMAZlz1hiQ3yY6O%2Fkago2vXa2teru5dU9l0VDYYgtRpjEhnYE24N2W6Qzebk6GE5QYddWOQkw09zozQY6pgEaKhVrAuXD0814oL06JIxMnPTnEmcPrFpMLSCdCws%2FnkkNQBeauC8tit5Ac0MmiY7WwNvddYkxDcdPPTitYyQngf3UedhEWyRFPwllOGq8teFtR103GCwhEWGZdovfuwQOMBNbwlSxgt3UCyC7rY5FNTwubSv0kiAZxmUXuRdhzEPD9k9VbWJslhOJPhc6uNjM8DWvg%2BffDIkw%2B%2FFJ9Z2g3jvD25el&X-Amz-Signature=ebb937b01935e933a88574f42b61a46ec6f3783ad3c0dad52f655d4e82d026c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIQXDZYH%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDUaCXVzLXdlc3QtMiJGMEQCIAIpgf0C%2B16cFpx4BWI8C3Zq%2Bscg5zFkC97cXJ3nCQkSAiBk9WASHNwppQ0g8e%2FH6zFALzxCW1L8S3hJUBnKwUQxaCqIBAj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSXhvtOty1lKEeZxDKtwDMup8%2FxGKLTHWeoGRMelOYPK5%2BVnTc0Li9iI5fOVbk19LAfE0o1huZo1iBlj4wpXEOzPr%2FbLdExa57SxWQptBQLd3sguhFFYgwr%2F646Ho6nvvg6LfomyX1o3N1xmdYVHLKx2aFfG0B1o39%2B9S2IRbuadPIAyOedl5wmmS5JZ%2B2F5poD7SOu01FzdHud%2BgQC6wWPYS1tW7l8Yw1DTcdGLqzewqBoNiQ9s%2FDoIxyM4Pxi547zchoCXB5AWqFIN6H35v%2FZRVGMio1FdoD2I1oHkyhlib%2B9PopVXyEx21gZvqcflFO1xXXK3%2BgecHUT4pi9sRdM%2BRl8yCtTteak9OoAry2Wt%2F5L1oRbI5amPq5taBL8MNZbcibBRFfddZ0qpFYOpanPq%2FOS1s9fkGFFcacH8dTAUNnXHNO4CsnloE47y9Ljlvdld6m%2Fjxhe1kNy8fuLnotqzX%2B%2BAjYF%2BgZzNaslLhNqVPblYJ13kn6%2B5vE%2FQD%2BTsAZ3vvXK3DPosWadJm80bwIVITvXXzjEHNPxrnJ8vh1gQqhbns%2B1t76gxL30BXmoTqwkANfmbtMAZlz1hiQ3yY6O%2Fkago2vXa2teru5dU9l0VDYYgtRpjEhnYE24N2W6Qzebk6GE5QYddWOQkw09zozQY6pgEaKhVrAuXD0814oL06JIxMnPTnEmcPrFpMLSCdCws%2FnkkNQBeauC8tit5Ac0MmiY7WwNvddYkxDcdPPTitYyQngf3UedhEWyRFPwllOGq8teFtR103GCwhEWGZdovfuwQOMBNbwlSxgt3UCyC7rY5FNTwubSv0kiAZxmUXuRdhzEPD9k9VbWJslhOJPhc6uNjM8DWvg%2BffDIkw%2B%2FFJ9Z2g3jvD25el&X-Amz-Signature=ebb937b01935e933a88574f42b61a46ec6f3783ad3c0dad52f655d4e82d026c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QM5FHDPW%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T064516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLXdlc3QtMiJIMEYCIQD2X0zD4om3IUtZ0WvTZIRNsBFLC19sSc7thA5oHgxwvQIhAMoj%2FrCkNc%2FeFUVZex%2B7gQS769wQPu8uhf6MBu0FuFoOKv8DCAAQABoMNjM3NDIzMTgzODA1IgwPxxM%2B1w0MtbLCtZcq3APV9ZXMliG%2F5kGsKG9NzKkuCnDQx%2Fmk04OAlvZbTDT3%2FL52g1je7P6dGjSlvaEp1KT1U085Mj1Vx1GUKBFWBJ9joZ7XUGCRppyHFQuTTdV4PDh%2FQI%2Feac3fpnsbTfwAhmAYWGSfn88CL0kKtjWX4c0AgpcyczaLJV0WLpykecbWo54FUIWKl9KVppOVuojkjKfyy4Zf9EySDNRDJqwPcfRktynIaJXgKmyWDAsFJbV7B%2BNi2ZfYtqVY9gGZB5jUAu3vwrLJTQO0a7tnpx61xs8fC8seW0wvNQuFIF5d%2BzGC323FjZqVaBfJRKpAn5h3TtFdqfqYMQzjubeOya2ziRGiTQiqxoOAJhYIJfZuXIw8cDMm1zv6%2BRDo5LYSY1dtC8F1oY6jj511p0%2B39lvI6Js5%2BT0U9YlM63l2VR6VDEnoSk9MDXwNx2IJS0pY7VdIq5so%2Bi5rP7Tc4wCsa936Xe2olE427mQXzW9oboQ%2Biq20nX0NwifUgf75GcqLQKcrAczFuWkJ8naeDWFs1nypA3xYbC0LnwTTqZ8Iq4cysiLpwfIFI4vhodNU4axkeckUT9V881OYQ4TePwu2TWJ61Erb1KgWq2Sxs2WgL65tP%2B8CHqwLTencDzIhi3fLxzDwkunNBjqkAWWNM60LCsz9P%2FYxzbtfccTXGrhrDZ9T53cWfrFKgFnxAyXKkY14VG3kiBMBf83fripZYcKlLZ0cIKmEN%2BEn0Gy90yw3jLcBDY03%2Fm6grW0a%2BC514rkXdsJ3WF9l6jM20qzY7fQjSmReHCacZKN0QiuH6Gq%2Fnwo5iPiNNrgcdFnqdkwuCHsTd1oQOMbe5oJ%2F26r0fY09Lxx07Ct0ezttilFwBW4p&X-Amz-Signature=c450ba113d7175b04bfe9a9ab2822b6abce351ab27a5ce6b11ecaa6e58d3eeee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

