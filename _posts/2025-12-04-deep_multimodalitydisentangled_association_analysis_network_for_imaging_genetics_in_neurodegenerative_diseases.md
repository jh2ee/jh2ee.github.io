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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5UUULBZ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDKORX%2F4mWobLo4ETZTWYYPTqACeXLZcxplmEfsywOd5AIgXxYl3ibH1VBk28EKlxkUtk8y9K3H8SFXPXA%2BpgZ7TKgq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDI0h6lwRZZF%2Bhtj2iCrcAzTiyRmLhEUpmpL6cV6erVw1pyQh8TcjP8kSs57r5DbSx0zsACHrnPPO3TyCpYKou%2BFKkBtsdfda4hXuWodxUf8oAPAcml2Dpqj2n23My2W7f%2B0Uq%2FiT5arBDVzyAGtf%2B3G%2F0FefQi%2F89963USBjmwsM4WM70jRgDwG9NuSBJ%2FD6hv0IJYSqAGyfjckbjvnaiddYgEoUtQ%2FKypZ1DNF4wguvS6IsASdJWVyLozNYgHWdglmglQ5b%2F%2Fg6KV6koumcZWO94yYKoprJFjtyteh7IHiOaXMGcdY9WyETzpYLhiJXkTL%2BT%2FnZwCRR2VKjJLCb%2BwJnFDSoo3UUmrYBYKdkHQ5s6pRtzkfQRPjj6fA0XIrD4TAwl4W0ByGHLZN0b4Wa0uJ1blKX2tfbALtj6KAf9j%2B%2BV3swUTFPEZRnKMbm6NKqf9gBmcC01J%2BPYiJVmtN%2F%2FpqWAWWNB6YN1EkT9DC0liMRo050Lp7T27nw57GjaEBKxGy63zD7ZLWha7eKN%2FPRC4bhu3M5zRaos%2FH%2BZ6EPytchyW%2FeqywismsOKW%2FYM%2BHNN9JrBYWmQ8FcLLALgW9z6rHnRATPslZ2xF1R94lyiLkRWJ%2FrOv3zBqTm76qheTukl2VivkTAE7v0kn%2BXMNT%2BtMoGOqUB%2FPL2fPPR4G0AtY3vv%2B5OQl9cccWAUQTXjmw7XTVBmZRta%2BnbFv3XFCZsfOxkN3JqFp5Tq%2B26jtBiHc1BawKIIADbJcifd%2BcohZx7sOZr8KFm6bzchjERW7WjXa71LiW94xfDJU0IDxhns00WHG6DJ6o5FCxODYE8nWcEQhU%2BUJ19Mv3%2Bl%2B54130hexQnuG2fAkVmTHnFDG%2FA7FeFTA8I3dEfbxwW&X-Amz-Signature=2ebf993a61685c18922d6afe1be40027181ac4e9e3108d2a8f2e24f7879ae79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5UUULBZ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDKORX%2F4mWobLo4ETZTWYYPTqACeXLZcxplmEfsywOd5AIgXxYl3ibH1VBk28EKlxkUtk8y9K3H8SFXPXA%2BpgZ7TKgq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDI0h6lwRZZF%2Bhtj2iCrcAzTiyRmLhEUpmpL6cV6erVw1pyQh8TcjP8kSs57r5DbSx0zsACHrnPPO3TyCpYKou%2BFKkBtsdfda4hXuWodxUf8oAPAcml2Dpqj2n23My2W7f%2B0Uq%2FiT5arBDVzyAGtf%2B3G%2F0FefQi%2F89963USBjmwsM4WM70jRgDwG9NuSBJ%2FD6hv0IJYSqAGyfjckbjvnaiddYgEoUtQ%2FKypZ1DNF4wguvS6IsASdJWVyLozNYgHWdglmglQ5b%2F%2Fg6KV6koumcZWO94yYKoprJFjtyteh7IHiOaXMGcdY9WyETzpYLhiJXkTL%2BT%2FnZwCRR2VKjJLCb%2BwJnFDSoo3UUmrYBYKdkHQ5s6pRtzkfQRPjj6fA0XIrD4TAwl4W0ByGHLZN0b4Wa0uJ1blKX2tfbALtj6KAf9j%2B%2BV3swUTFPEZRnKMbm6NKqf9gBmcC01J%2BPYiJVmtN%2F%2FpqWAWWNB6YN1EkT9DC0liMRo050Lp7T27nw57GjaEBKxGy63zD7ZLWha7eKN%2FPRC4bhu3M5zRaos%2FH%2BZ6EPytchyW%2FeqywismsOKW%2FYM%2BHNN9JrBYWmQ8FcLLALgW9z6rHnRATPslZ2xF1R94lyiLkRWJ%2FrOv3zBqTm76qheTukl2VivkTAE7v0kn%2BXMNT%2BtMoGOqUB%2FPL2fPPR4G0AtY3vv%2B5OQl9cccWAUQTXjmw7XTVBmZRta%2BnbFv3XFCZsfOxkN3JqFp5Tq%2B26jtBiHc1BawKIIADbJcifd%2BcohZx7sOZr8KFm6bzchjERW7WjXa71LiW94xfDJU0IDxhns00WHG6DJ6o5FCxODYE8nWcEQhU%2BUJ19Mv3%2Bl%2B54130hexQnuG2fAkVmTHnFDG%2FA7FeFTA8I3dEfbxwW&X-Amz-Signature=2ebf993a61685c18922d6afe1be40027181ac4e9e3108d2a8f2e24f7879ae79e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RIPVZJM%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIEBHX%2Bm95VjjyBnHJH%2FZcEF0ekT%2BkQSadZd1Yfn2kl4QAiAftl%2F1aPpnkNTgYWH3DdYK4Jw3k%2BGFw2zcl2fRC2bO9Cr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMRlA9Ru%2Bn4rnrcbREKtwDzr6s4c7EvaALUPXTxN2Q%2Bm7HRNgqOWIloOcIUn5tPLxAnaMIov9ZF7Ksikiqiaq78u5RgN989bL2ysrTdjtw2tBZfWv0U0KOasE1%2BV6X4N0vuF71IQc%2BazlWWF725Ez3S5WSTuc%2B5zizJDch83VlwDm9hG4cS4LiyZ%2FXctPy0GIYTJaFD8uTTiUrk4L71ztuI4WEgVFpNkHsoJnZMnRqHAciKDZuKro9M4j6x8RpE6fxK23BiKEOiT%2BnGoQwILZmM6sxNaIICYz%2B9GsBFuF35sa5Ise1FUpcVbLNE%2BbfaCXsxO5Y0dzDNpq5gwWz0CNxbDdh49H2%2BsRzwAt1m2NBnuzskqLl3GzIZXQDJUQtdqsvPx6%2FPwZ%2F9JHDkv9KEOSqyEN4cSlfZ6p2BA8veb%2FABj5uKF9OUzjVpCQK5sOknU%2F6dcXSqGszsPsCNAnhOIt5XhQ4RgU0Gup0tDBWu%2F6MubNBi8wskluirSRk4qf9fFSvPFBjRL3PQP2aG%2FkhYZeZuk3Saf1ynEW8SEyrqN8dqB%2F9LWbc7G8SeW72P%2F4q8u8jni9DVZAVhfqFO%2FNEZ6H4nZF4aW4NYBrnH6SSi8%2BbTxsJdqNoMMv5G59ek288n5wYL997SIG4IqQqWVswjf60ygY6pgE%2FxnqCwXt%2FdhuXfijrJQWafHxBtgmeRb6qpXz9zbYI1vT80Wp1vRXxl4Z5EMcZ2yA8Uq78UclWTirKEgv21M5sQoHy040xkZAEARPRDTqJH8pZkRHkOUQKKTyMUMavL4yQYCVlehK%2FiaWLUHh2GCXXmwV76mr9qIMgErTdI1%2FdgPqzZLYv4tUD%2FjRSK8AbDaN9YwaxEe%2Fe5APnjCLNCn2ufRQZ7o%2BL&X-Amz-Signature=42ce022343787d94190f0529ecff0294b3d1c69c822f8d94b9b6c237d859becf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XCOILNZ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIErjj1zIw8L%2BGlXMlEedl%2FQFPaSEsdqiiLZ9JYqFZz%2FVAiEA%2FYJJj3EA7wYVhuo%2BilX7YirGqlxpMAiICpiW4XMVeeUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDJOgAqubD51RU9yqJCrcA1jmG3OML%2BywEzhJCn8q7VBXdfRhNGN1kPVxygx7fek7jSUAoHnDLRFVlNtRLBRu9OgWAhzWhBztrTqxx1sgpGTcpKwOuJUVNk%2FvvHkx27zH7UpiEbuZaNhPDRAaJEtTJUITBc9lxuHfOjQHDMtY12uqLppwExS%2FFoHha65bgDOs6Ne2%2FOxIxJryhFYaQKiSwDZj4d2%2BrBIdto2IgqBqse3TfTZREJ4bXE6c8BdvzuDExQAoKp5FL5ATuRLNiIJZFOyD8U3ieVAFCup2BuerNAiDMRjtXwKWCAiA94M%2B%2Fyy21afw635i4WwfccugCTksTl%2FVqJXdPnW5WjxvlX%2BMal2orbgWtpfiHZe3oingbcnhjtUXicNcmondrH%2FEqDAZk6kllD98NxRYZDj1FTWcVd7iDxDcBQoZzB6x3VvzefroLst0qyFeVHvmflAr3fNoI1MuHPmfsjkArT%2F5Y0NDr0XEgzPeOwI81CkgWxHr3ECo1on%2F6WybJp3btU%2B1pobqm4%2FProD5JdpBIb0Vqcz0ISbVZZ809%2F5E8cpe%2BmHmAlJ766oPjqXchVKRUD6qe3%2Bzdt8jQfokWb3nPSXva1bIJFliSCquEw%2FWvTjBmXam%2Fv13nhjhO3%2BquhzvK%2BWMMNb%2BtMoGOqUB2kEsiWhMBMm5hluB%2F8pPt5NqR9mnUF3hc6cMG%2BFV%2BMZfREj98Sqb9gAfjRap0LbEf7YAwCzLt5%2BNuUOUKllgeUvL7Zwk4qzRzzA9%2BkYgj2U%2FN18EqoN2jfqaBAQGi0ZZK09IH5XqI7%2Ba2CwhCcpvdHStBY48nZCO1rxtyxooq7CkvrD%2B0mS%2BMStBpcA4Sen6vM2Nx3zWWRCx7a6%2FyaFBmWw28xJI&X-Amz-Signature=52e53262a1cd75cc4205515db1cbc7797c18e56bb93dd3a6bb3b5730faf9ba70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664XCOILNZ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIErjj1zIw8L%2BGlXMlEedl%2FQFPaSEsdqiiLZ9JYqFZz%2FVAiEA%2FYJJj3EA7wYVhuo%2BilX7YirGqlxpMAiICpiW4XMVeeUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDJOgAqubD51RU9yqJCrcA1jmG3OML%2BywEzhJCn8q7VBXdfRhNGN1kPVxygx7fek7jSUAoHnDLRFVlNtRLBRu9OgWAhzWhBztrTqxx1sgpGTcpKwOuJUVNk%2FvvHkx27zH7UpiEbuZaNhPDRAaJEtTJUITBc9lxuHfOjQHDMtY12uqLppwExS%2FFoHha65bgDOs6Ne2%2FOxIxJryhFYaQKiSwDZj4d2%2BrBIdto2IgqBqse3TfTZREJ4bXE6c8BdvzuDExQAoKp5FL5ATuRLNiIJZFOyD8U3ieVAFCup2BuerNAiDMRjtXwKWCAiA94M%2B%2Fyy21afw635i4WwfccugCTksTl%2FVqJXdPnW5WjxvlX%2BMal2orbgWtpfiHZe3oingbcnhjtUXicNcmondrH%2FEqDAZk6kllD98NxRYZDj1FTWcVd7iDxDcBQoZzB6x3VvzefroLst0qyFeVHvmflAr3fNoI1MuHPmfsjkArT%2F5Y0NDr0XEgzPeOwI81CkgWxHr3ECo1on%2F6WybJp3btU%2B1pobqm4%2FProD5JdpBIb0Vqcz0ISbVZZ809%2F5E8cpe%2BmHmAlJ766oPjqXchVKRUD6qe3%2Bzdt8jQfokWb3nPSXva1bIJFliSCquEw%2FWvTjBmXam%2Fv13nhjhO3%2BquhzvK%2BWMMNb%2BtMoGOqUB2kEsiWhMBMm5hluB%2F8pPt5NqR9mnUF3hc6cMG%2BFV%2BMZfREj98Sqb9gAfjRap0LbEf7YAwCzLt5%2BNuUOUKllgeUvL7Zwk4qzRzzA9%2BkYgj2U%2FN18EqoN2jfqaBAQGi0ZZK09IH5XqI7%2Ba2CwhCcpvdHStBY48nZCO1rxtyxooq7CkvrD%2B0mS%2BMStBpcA4Sen6vM2Nx3zWWRCx7a6%2FyaFBmWw28xJI&X-Amz-Signature=e79a26e5c977e2844e9238d079d45cffad094b50220b85aac129f9414d879856&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZSRMKHY%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCwvnzMy21IBhEoZkiHW0%2FwK3jU76Vl%2Bk2vNKbOvW0qpgIgHYqGNIFSONchCiXwJUzEsm9ItE0PO%2BpLM1nfU5Sm2Vcq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKzRsPObb8287cKlAyrcA6GQFW%2BXxnlhJ69SbHZudZfz2Sk0V3BiHUaPvlc6TgEPNHDABRyVR%2Fh6cKmcJyHLbRda0vPkhwo6Xc6s5MutAb4Js6%2BLayC5V3J8PfffhQpkMBtdzQs7t2rx0u53AW7rXpAhKRVbd1IXDwi3CCYaQyRUJPZIYcC%2BKWqmvIN%2F3vQSjQk3Qa1q49yYsgbWM9NBGvZAB9Fh33s6ByOjbzUHikUrKmzwx62igGK5sQYD0XU0qCPx7lD%2Ftu4ohhtpu6h1cJFGmx5IKCCTjP1mzZZyfbKzImMNA51RGD2F4eLK88%2BocAGza4%2FML%2BRaFb%2FD3Cz7wAzxQei4luZbrHfUTUuxY6kmWR7ENnv2%2BviZkf%2FMA0CSAJJMC4sINNZb17kv0LN9fzI9azi%2Bo6D1iYKyAJcjdy4Dg5ra8Q1kjdajI%2BD41n66TXxo43M2TJREFz80oTKFb2w3HzpnNy33nD6qG9Yc%2Bi%2FZpzItOvPANf1IuuwOP0bbZ8Gti5MEaz8BLhx9Rze9T%2FVPfF%2B5wBq6Bh7un13D%2FNAKfSy%2F84QXG32t3Mujkg2cPRsV93LVG8%2B3mRBG%2BoAFwKOi7rzp8V2tTtFcDzDD%2FgfbbhNDAUdGGpBI7HeR%2FokfXhmqaR5KXIFr976DMNb%2BtMoGOqUB8TwoBXGUu0I3ZWK9g2mPobFEMPmk75c3chGbecXjJB%2Ba9JHDkDMGdliWB4G9g0f3hckuIy2gPnWWMCz3oZgaeIaOrGJKkFxpL6CWm5k4ZdJHyR%2BqXMNDEUK4dbJdY%2FzIa0D7QLX6I6UVblBF9xC%2F2kjAsJ%2FYfdZAdyVmgwn1dg%2FwBH0fhwWeVahW5PUJqltGIsX%2FxKQW0a8MyUX%2BArknCNlOp7rS&X-Amz-Signature=8cf5a260ff5cf544701d8020c594586cdf7ca2db3f0d4c17ac8f8c4220ddeb9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWN27ECF%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIBX02gFL3yNCka6mEx1HRuWKoZJdLGesvNQ5f74QtJJyAiEAqtp110zU4sj5Xd8qnt%2Bqc%2BgJcwxLiVccV%2FfITeZoidsq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDONxefCPsjC9xX%2FymSrcA92N%2Br2X94rjB5XYA2BfahfsOpFVN5blWNiT6g8MpE7qL9HDpCfJ%2B5%2FxZrRgTanw7UCS%2BJ08VVldXMl3cjBKufjYt6mDKYi5inDNxBg40CVYkcEXpUei2fhCmsuxpORqkjYmMd%2BBvA22gHj5o6ZX8oDXWLIDJ0ViqJtZyB3q1vppL5JA1Lxv0DjOqMHJHWDssyizgPaGc1%2FVbZobanFJUsMYu9AbBh%2BZg0Z2rCAHNb4E6D701j7s0vzwES%2FfZZyjAeRQs1FCtBue3TmH3N%2FXoRBxalIMjCrAy9%2F7vqd0YjMcRvvNtR%2BLa3cjaYuHel9wXeUBTq24M7BrfptRznQtOZnSiElyDtt9Cm9ZtFfJROz5b%2BiU9C8kJR9%2FtITxro4VY1J7i5FcxfrXf9RzgYccscdd9sxH1x3wE89L5ts9M9lJr4KU8oy5qnSKlwLLz5QaQ7hM2DLJbjQvxTr8fXsVrrLNQSldnHx%2BdHf9E9jnJyz452TL00UZPpnHNN0TIUoA181%2F2EA%2B%2BNPfgYSF9algiQnemndz%2BbpPgk01EDKFkpbh%2FZcpLpRbsvyiwoxbQ3NBemI6Z96FJYzrzNgywI7sub03acPjwC4vhWKkUxMUd6LNsuRoLSrrIWX6sOH9MJH%2BtMoGOqUBekf1bjuAyZopj3PxobAJlcl3QMxmrEph5%2FGJgdITVc9jspMRAxY1RN5p%2FcnX%2FDd0xEXZ7LVyAgugYwgSvUQMP%2BU6vs%2FfE5K6B3mXkKJmAnyt4eSJeXlVm6CX8JzCKAQzHDlx3bs5UCScQd%2FWNlTuqg73rjxGqJ8OkXWjMs7WADvrHjek9sbdzBBWeNCnjpf1Ni0wEvAj6yeLoryrgq8kwoREkSTo&X-Amz-Signature=b8e03c1cd990ee11f9de066830e2205bee193950ac8dc232fbb3da7ac0e2d42a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SBAMEXF%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIETUdh9bYGRqOcY%2FDsF59wqlrXu%2FeDk52Y1mfybSBb4pAiBX2jtwLe%2FfyBeqhKVGb1nqesUnxQs0%2Fox1HQxeiCLvIir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIM%2Br0%2Bzxg92aHzgzssKtwDx3kHYmLS6S7V925aEw%2BA8iV6D7IHzoCl55ZHqyIX2pkjvMgLJaAPmNjOotbvanPXb%2BjHXRFy5YsVeycd7cQlkBoLRBzql6qK4YZzQ5rPgyaT7Cn4D40%2BHTbE3M4qA7YA1MiLTi8c1iZZ1GOoI5yCUkgPlrrOg043opdbYrClDT8UD8a3BCrK3YocDzGfkkCX2XpJ9jMniZ%2Fdag0U4lus9wcuyoQ1gLe7Qnn0ghAjkXyVd8%2BBUNJ%2FMivoAj4dcZn4mXPTrTHT8HrDu%2FsjsetPRd%2FodOSt%2FKIOrPKc1zboO3F0dbzmuFHesV9MFaCiwMIo295s1xwZo2jYprTPpMFjJ4xI5FklRbLUEWhbJVaotCv7PJvPuFXwBaSnG1WpNBA9CRh%2BMkgfHo7OyKCCcUgPmansaJCxmB5jRA%2BZzvBgcy7p8xZOdiGfr0QrK9R02pkL%2BCUKzZa0AoTus7ab4%2F%2BzxdQuEadxPf%2FWeU2nmpyzo3qtYd0uEAcnjacYuVe6VTtWUVnBZGB8kVICz4TXXayHwZuLx3vrpHCM4Dpowu3PuazBKNx9uJDQwkxhaBdfJuW30HJJKjn7KYl9od69oKENTfYs%2BO18PV0jvs3UG%2FfrC1AwR9Lzz8hXlAyxfe0w1P60ygY6pgEVIuJ2XLa5TgZt6eAg%2FV%2FRB11Au5JIc8UnwuSOW56LQTlB6fomdxoYA7YCSoVMCpwfNmg5OKFKcv64ILBCBJs%2BYQddwg%2FyA9nyUpRph9i%2BzIyoV0EhKB0vtI13gyZ%2BML10Ez%2FTROiDQH%2FQbMc%2Fomo9BX%2FSPoa8JjUtOH7CYuwkxVFgRshS1SD42eSJCt1Wag%2BrCrWn8KojkGpyNH8OFTEDw7Cul97R&X-Amz-Signature=8d7b3467a16d2e73b316e04566cc49b142e56184b3bc92de46c6c7cc2b1ef310&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYG2VSL6%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIDDBzrehvxjdQSQ9pT56yL8ta4DR8qoEeQr8Ivz4%2BoOGAiBjEgPjIIUSlbwzyOzbNfe6hHkRK6IYkX7kSbKbTUxrSyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMu032ofrzGpbPtDrGKtwDLJYxx4bSERfCeNM7dorKA5Mb47BVn2p3hzAKyAoB1lMVavePQgt9P2gIlXSb5OHaPUzBno%2FZvmznOnOuL9%2F3BHIV2nQ%2Bn8Eo1tOYuP%2FgkBj2B%2Bg9A%2B27jK6zRsczc0dzbGzViE%2BjCt%2FkX5zgx9sN1ThYijP5t21cLO3bO3NCsFhv00n%2FOodYEbxvR9NB%2BGee0mUoxf7ThZ2cKE0XtcnKm27KGRmDqWToegzPDUovP44M46McuS8mDqW%2FmCHT%2FvKqqGdA6ei8j79UqF9ck8mEeo2jpw0fPt4EdLh8Wb7E5h9SFhGECj4YWGTZDzr59MkAjvCKM%2FENIyiamoB8mXTy5TZhf5CyTjk6TG%2FUcqbsnA2SA2Npso1IzYstYIuNz8jyi%2FSBYXWCBmxuLGZSxXbTETlAjbrR%2FLw0t1V8QzvSe4Nu8n5ACgmjLWlZvINC6y8PSDLmBDlXkllYenxy1awpdJfM8OIZuQ6%2FoZZa0DJl2lh1e%2BWTb7y3pEWC9lfpSil6ukyYHAz4b5fHRkcUOehArR3R1PtGbtNUnsXca14sW74xvTd9ThKZmo2%2Bq%2BGUfFV27oCtoJA2DabsPif8P1aoYaC8AxVX7USiCnjlqaD4wthIzq1Zb6icF0Bzv8kw0P60ygY6pgENTGBZ%2BtmAlDwgtGG93gvL4til8vPMnEqBZMzDpHO1T3lW%2BAh1pJ%2BEtz6802Ve6JcCEPt%2B6RQ5mPIMU8o%2FiOvmlLXzseEcgfe%2FBj7DJwEjfAWw54e6vY2yGqgMxD0LhHnAzWz9M%2Bh9BSPFMFoyjiBQCmoKBZSGjDQqymYG6q9kAblM8HkhXWLcK2LsNP%2FKNHTt%2B5u0m7gXtYsLCKYldprtsnbV3ugh&X-Amz-Signature=d69c01d5afc3a1e661efa877277da9ae12c80d238b5325a9c41a08f0f3edc513&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYG2VSL6%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190148Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIDDBzrehvxjdQSQ9pT56yL8ta4DR8qoEeQr8Ivz4%2BoOGAiBjEgPjIIUSlbwzyOzbNfe6hHkRK6IYkX7kSbKbTUxrSyr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMu032ofrzGpbPtDrGKtwDLJYxx4bSERfCeNM7dorKA5Mb47BVn2p3hzAKyAoB1lMVavePQgt9P2gIlXSb5OHaPUzBno%2FZvmznOnOuL9%2F3BHIV2nQ%2Bn8Eo1tOYuP%2FgkBj2B%2Bg9A%2B27jK6zRsczc0dzbGzViE%2BjCt%2FkX5zgx9sN1ThYijP5t21cLO3bO3NCsFhv00n%2FOodYEbxvR9NB%2BGee0mUoxf7ThZ2cKE0XtcnKm27KGRmDqWToegzPDUovP44M46McuS8mDqW%2FmCHT%2FvKqqGdA6ei8j79UqF9ck8mEeo2jpw0fPt4EdLh8Wb7E5h9SFhGECj4YWGTZDzr59MkAjvCKM%2FENIyiamoB8mXTy5TZhf5CyTjk6TG%2FUcqbsnA2SA2Npso1IzYstYIuNz8jyi%2FSBYXWCBmxuLGZSxXbTETlAjbrR%2FLw0t1V8QzvSe4Nu8n5ACgmjLWlZvINC6y8PSDLmBDlXkllYenxy1awpdJfM8OIZuQ6%2FoZZa0DJl2lh1e%2BWTb7y3pEWC9lfpSil6ukyYHAz4b5fHRkcUOehArR3R1PtGbtNUnsXca14sW74xvTd9ThKZmo2%2Bq%2BGUfFV27oCtoJA2DabsPif8P1aoYaC8AxVX7USiCnjlqaD4wthIzq1Zb6icF0Bzv8kw0P60ygY6pgENTGBZ%2BtmAlDwgtGG93gvL4til8vPMnEqBZMzDpHO1T3lW%2BAh1pJ%2BEtz6802Ve6JcCEPt%2B6RQ5mPIMU8o%2FiOvmlLXzseEcgfe%2FBj7DJwEjfAWw54e6vY2yGqgMxD0LhHnAzWz9M%2Bh9BSPFMFoyjiBQCmoKBZSGjDQqymYG6q9kAblM8HkhXWLcK2LsNP%2FKNHTt%2B5u0m7gXtYsLCKYldprtsnbV3ugh&X-Amz-Signature=4bab16555a89812f66d81ba406b2c7b4ae3fc4a1dbd6c903460dfe50c48d4fd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667GUB5IE%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIGDAbU7zPOYJbpW7GnsUT5xu%2Bq7ugnJ9pW1kj9b7N3u5AiEAiYdAYAUApwNGHN%2FRvmeDBFwqhvDOuy4cEJkJJpaxhoUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDGwnQLnwxuz0lHyzNSrcA0jbXgClqPD0H6scgnPwLK%2BAWL5NZmOZ%2BEfJQCLok2Sw4DkLe65w7WHmRvG1emm2lk4AV07hV2bqGhVauGY%2FkSltxXP8DPPjjpUtocHTFfDRKvXSVoRoOfZ1huUd5waaDEUCe%2FENg8xwPYrh6mp8om3Dzs4u8XsSSkktXnW0fRZABQ6LF84l79b7Plil0%2BXF9ZlMT%2BspB411g4Dy%2Ffiwme8Z6QRie2HvDCNEFNDV2atuSKCL7pCgFH%2BtKix1BNPn8dnEm7pFWA0YSAYLlN6sU8gKepHWq8kVNuSP%2FD0NrMILUTPjoB2%2F5BB%2Be2kMGcIB0SbijNbWwKKOCNVB7yhBttSLvS3MVWCcs1HVLGxNvKVZYFyRQzsTR9ZHTs%2FnQlwHH0%2BRIoxM%2B%2FCMgFrPmKfUW3Vj%2FUUkO4uAvgrJppXcW7aGHIL3UN5BTD8n2elaIg%2B1qSm3bzWeiiH3n%2FycKw8XMAbzKcublqjK4KKvnJy1kmLqfKXQKZCcNToe4dQfFQWLMkYmsd3reRwfnpAWolJkGEd3RvS8MxV7XYgGGJfE2rBO3%2B5cFI4gt6lmifPIB2guDVjIqhfCmkZI2WT4WCQfeTLzr7WdNvWfIW%2B%2Fz48LlJf8BfOMv%2BPic1zNsJX0MKb%2BtMoGOqUBfIQF5VoqarbZCeQl7BdYHztMSGJEbuXVisKrf6wKJ%2Ba1BWmnx%2B3WleuN%2B3ihhAJLpUEgcnF3vu0mMaeZ99yT%2Fz3FWviSNBE4ZxLCqV9S%2F%2Fno6sY64IBnYckIrS6N5hBXbl4yq8oGN8DtvFpraN3q80F2IHwx8bCySyfz9v1nTkbkqK3oEtRZ0iWgxZoOpLKOs4BBKH2f8L09hzOtRTu%2FqJ1ny0jA&X-Amz-Signature=39a12a68d81b2979c4df745e40b0db55069bcab30bdf9a2c442ac38c2a093485&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7YT47RR%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDnMtUf957aaNOX8xZbu7O2TngmNzw%2FWuEHzKl4mEKJ%2FgIgFhtHRDz%2FAMCA3%2BDVKNJZ1nap6vbcC9D5M7AUswSF%2FK4q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKN4Y4HPfKhBQAAzoCrcAys5MRqpLQkp%2FYMN7NmaWhXI3LtZXGEi2T0J%2Bfi8GW3o0AMsXN3kAYCKJC9R01naonvS227P2S9vIfcMkOePMJ40h%2BzkVYmxkIXu9Emzy%2BMrQxzjs6viyfS4uG7u%2FzhSUdOocCQjl3ociXDmUJ0cEfz6zlpnvJEg85pSfTsrqK12c9ZgvMnD0LigbdO9aH4OEYsY7yd5oDYK%2FpiE1sXx0iMdxYMPdAhWkzym4CtvVwl5yBK4hWraLxQqXbReNnvHVkKHfuCHOfgBT1WbBB9J%2BhxNTdCHj2%2B6eHcwCMukbi6K0z3yl3ZtoXz6KW%2Fww99InSFa2uUyXkp7uKcf2PG6gnQXJ1uKRbXfiPPlgYacl7yhQDusvUIinYUCB3dHn6hZHHbtxX7Qj71Z34WYs6%2FO6fNhSl7sFF5wWI5ha2d4fdWLbtOGo9lRu%2F7ZI7qUYfd7kGys5lu%2Fbtagy84A7287BaE04YNYNWPrybwhrFW9%2Bhm9N3k7i6McLwsan8K3DywJv2Z%2BZb5reh0pwBQy5t43uhfQPDlhQrXx9fJcg6O3JajHIIjwO2PFTFYR25WzkuwqpQFPWcdIY1Cz0dMwFrjL%2FA8VyXKnQZ5Gdysrx7JugSQPILaaSSDaLjIk9hV3MNT%2BtMoGOqUBchO1QFl63nlBMBV4jh1BOcRM0nzGA7Xxt2F2jFy9544PQa9nvC66%2BhLD4kTnXHGj3wBZfA0h%2FeDTQe4TJgo72a9IlAGAhMl6HDz6qDdlk0IOg%2F7TFNPYRw8Eok08yVAgCpcZekcrOgigQu%2BcuKpDbkDDAb1aO5fROtGgqu5tk8SnbHEBDopA2xVXgYPHJG7u%2FKI1he%2B4KFKuXRuQeQCa5qaEeV4m&X-Amz-Signature=e86afaf9af3d3465b3723ed3268db60df729b2ddd1081813cb16486e9c9430d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7YT47RR%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDnMtUf957aaNOX8xZbu7O2TngmNzw%2FWuEHzKl4mEKJ%2FgIgFhtHRDz%2FAMCA3%2BDVKNJZ1nap6vbcC9D5M7AUswSF%2FK4q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDKN4Y4HPfKhBQAAzoCrcAys5MRqpLQkp%2FYMN7NmaWhXI3LtZXGEi2T0J%2Bfi8GW3o0AMsXN3kAYCKJC9R01naonvS227P2S9vIfcMkOePMJ40h%2BzkVYmxkIXu9Emzy%2BMrQxzjs6viyfS4uG7u%2FzhSUdOocCQjl3ociXDmUJ0cEfz6zlpnvJEg85pSfTsrqK12c9ZgvMnD0LigbdO9aH4OEYsY7yd5oDYK%2FpiE1sXx0iMdxYMPdAhWkzym4CtvVwl5yBK4hWraLxQqXbReNnvHVkKHfuCHOfgBT1WbBB9J%2BhxNTdCHj2%2B6eHcwCMukbi6K0z3yl3ZtoXz6KW%2Fww99InSFa2uUyXkp7uKcf2PG6gnQXJ1uKRbXfiPPlgYacl7yhQDusvUIinYUCB3dHn6hZHHbtxX7Qj71Z34WYs6%2FO6fNhSl7sFF5wWI5ha2d4fdWLbtOGo9lRu%2F7ZI7qUYfd7kGys5lu%2Fbtagy84A7287BaE04YNYNWPrybwhrFW9%2Bhm9N3k7i6McLwsan8K3DywJv2Z%2BZb5reh0pwBQy5t43uhfQPDlhQrXx9fJcg6O3JajHIIjwO2PFTFYR25WzkuwqpQFPWcdIY1Cz0dMwFrjL%2FA8VyXKnQZ5Gdysrx7JugSQPILaaSSDaLjIk9hV3MNT%2BtMoGOqUBchO1QFl63nlBMBV4jh1BOcRM0nzGA7Xxt2F2jFy9544PQa9nvC66%2BhLD4kTnXHGj3wBZfA0h%2FeDTQe4TJgo72a9IlAGAhMl6HDz6qDdlk0IOg%2F7TFNPYRw8Eok08yVAgCpcZekcrOgigQu%2BcuKpDbkDDAb1aO5fROtGgqu5tk8SnbHEBDopA2xVXgYPHJG7u%2FKI1he%2B4KFKuXRuQeQCa5qaEeV4m&X-Amz-Signature=e86afaf9af3d3465b3723ed3268db60df729b2ddd1081813cb16486e9c9430d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HRAU7KQ%2F20251225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251225T190149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCzyBGaTNVn1xU4oWZYf8ol7lH1evo05zVS8F40XO1h9wIgbQIwLEynEx%2FPTEsbje%2BkTFpX%2B9EQbxR8qYqSHNW1bKUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDHCPUB3VseFZ%2Bm9%2FpircA4GSFG4igXvT%2FGTSidEn96T9AmeWsSJBDqa%2BjqhcPOjorWdL6f6gvKQlg6Mt5Bny8LRk03X0%2FxIfcSot2awHPvE6o3MA5TOnFxOKC8548R5d2SUVXxLm9Vj55HyRvSzXllIb7PaYFGf1vunq4quplYqz84urkBD4iuXzPckENqkt5kmK5LR31aKSmlF8T5plo6tRKZ36ZL8HniZzMfpK5%2BGHGFHOVE0heAN8ujTTpnunUC9UBR%2BPFqzRH9%2BObQnemXF%2FEaYHIB6MR3Q04mjPgBZwpo1Tvf2MTerDAGia0bPAQj%2BIlJLHSYTbax9QcQhzrjKpsA5K4Qe0owAWEVCx1qpsDHyZtpwny56sEOcQ0J6YmiOvJCmTxwvsYqbl9Az1b0wR7psOx5hSc%2F%2FcVpMHYhT24Gx69lhZTabeDb6xNKgVJ4DVcvM6JTtNoM53fe%2Fn5BxD6usKKsHu4I2KDkPgEI4dgkstt4HUleJImdZcSU5rMdQVy0b3AKeli3oevggvRTaWh1Gcbny3lRJBmCpsiGU9lwOejwD3%2Bna9QdT4NgIEuCWyXj89Rmt3TXIRHwueOLpQYDxBZOVJN4psrEmfG7n4QnbU0TEdmhVRUtEK1W1HidjrB%2BT6I84GbcZ2MKP%2BtMoGOqUBN0gJvFZmpX3%2BwEgMwjYVN8U228Wq5mRklUcmrWF6rrz8jK7r%2BxF8cmDMIBuR4N%2FHmn%2FDwhY4HGtnZRsGpZ5cqrKlMWVr8BFrevExDtUDmkiPKjwZvXLSt0Erub%2BU%2BzD94ghUg9HutVsa6rcvZOS28f8mrllXFszZe4hovSRLhonNTQoWf02cZFQkgGq0c0AEMWzBHFG26urxdiQg68wb%2FtIGGiUn&X-Amz-Signature=c18ebd21f50a3b16ac70e4a4f4db08f3a5043ff5a1a624771ac3c0307b1a6253&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

