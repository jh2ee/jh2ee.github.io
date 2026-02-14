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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WZ2AHAE%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQD7SI%2BQlhHu6cGjBtMW6QhkwYlcpVbswEPj55iVlcEF9gIga4BPwueN7pj7zCRpyeWYb4o1qPV4zjVwfGr4QSmQIMgq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDAQO%2FPARcIAk79dytCrcA5kujPB4%2BFEdS%2FGgFIthfBZCUF%2FUHFuvh6MB4AQsSIll1ESjeiHLoqAPdGW0LvHibA2P4WZa23eSVdkweoix8SgIvVYDzFrAjLi405NF6qa6O2OAyQS1BGE%2BA1jqbXznt57pC2zBYZ8U4IQZiYxuj%2FTlRlUTiikI4PfI99Nc9Nm6yAJUvO1HvxGF99xo8lg4rW%2Fi6XuBZM6W8EpbqCPV0mJuj7S6NQpG0RIz9gE3wSHuJDc7c1kiNGvyb9IxdwGjZuSYeeBuqFPI%2FbzE%2FqlfN%2FD2Tr4U6wndpn8PcjlFhv%2FwW%2BQeVksIZpM20l5PtuN%2BNcA6SC71GZHrWi%2FoHn5UzBOoctFbHvi6a0X2SgUgazdeE2DYjPQs2Dzwjta3QzuJw8bcSMve7afAGBgKSlJMcmn5UgZQ6KnLlDOSW%2FKLjooUsLZ9DYVfCo3MFjks%2FjYzcxELzMF1E7ORm0TsuL9olSnD11D9Z4tKuyh%2FoHO9aPEFcXOrEO0KbJrAu6AAreySggN1kEcijkVpY%2BQtfzwsx28t8y6b%2F01vZ1HSupb9ljiGOF58iwpd7IqgPqQunn1TH5iAefrsN%2F3WnlTDYkaDIpPiMS1eSnI2DO3Uh%2Fyra5EEfb9WTqhADiNCxdRSMOLrwcwGOqUBIAibo6Xzb23By3K49R%2FGP98qUH4tr6%2B6hToCE7kPA7qKVqLS%2F3sVVXHC%2BTSwT4Os%2FO7BdXwJWth%2FwH1oWQbkWOBuzUB5K3hxnOc2RXVvpNlDsmf1I7Fwykmg%2FfXTCpcqBnrnn5oT9n9cpr1z6QRJq%2BTWkyZGo8nI2lq10MV4LvRqbPJWTgmd7Zg9089ueJZvIv2OM1jrkHcOXv0HgcbMpZefnNLA&X-Amz-Signature=ee8f87136b80802c0a4c763989e9be63eae233986c5fc2c43588d05aa8553fec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WZ2AHAE%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQD7SI%2BQlhHu6cGjBtMW6QhkwYlcpVbswEPj55iVlcEF9gIga4BPwueN7pj7zCRpyeWYb4o1qPV4zjVwfGr4QSmQIMgq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDAQO%2FPARcIAk79dytCrcA5kujPB4%2BFEdS%2FGgFIthfBZCUF%2FUHFuvh6MB4AQsSIll1ESjeiHLoqAPdGW0LvHibA2P4WZa23eSVdkweoix8SgIvVYDzFrAjLi405NF6qa6O2OAyQS1BGE%2BA1jqbXznt57pC2zBYZ8U4IQZiYxuj%2FTlRlUTiikI4PfI99Nc9Nm6yAJUvO1HvxGF99xo8lg4rW%2Fi6XuBZM6W8EpbqCPV0mJuj7S6NQpG0RIz9gE3wSHuJDc7c1kiNGvyb9IxdwGjZuSYeeBuqFPI%2FbzE%2FqlfN%2FD2Tr4U6wndpn8PcjlFhv%2FwW%2BQeVksIZpM20l5PtuN%2BNcA6SC71GZHrWi%2FoHn5UzBOoctFbHvi6a0X2SgUgazdeE2DYjPQs2Dzwjta3QzuJw8bcSMve7afAGBgKSlJMcmn5UgZQ6KnLlDOSW%2FKLjooUsLZ9DYVfCo3MFjks%2FjYzcxELzMF1E7ORm0TsuL9olSnD11D9Z4tKuyh%2FoHO9aPEFcXOrEO0KbJrAu6AAreySggN1kEcijkVpY%2BQtfzwsx28t8y6b%2F01vZ1HSupb9ljiGOF58iwpd7IqgPqQunn1TH5iAefrsN%2F3WnlTDYkaDIpPiMS1eSnI2DO3Uh%2Fyra5EEfb9WTqhADiNCxdRSMOLrwcwGOqUBIAibo6Xzb23By3K49R%2FGP98qUH4tr6%2B6hToCE7kPA7qKVqLS%2F3sVVXHC%2BTSwT4Os%2FO7BdXwJWth%2FwH1oWQbkWOBuzUB5K3hxnOc2RXVvpNlDsmf1I7Fwykmg%2FfXTCpcqBnrnn5oT9n9cpr1z6QRJq%2BTWkyZGo8nI2lq10MV4LvRqbPJWTgmd7Zg9089ueJZvIv2OM1jrkHcOXv0HgcbMpZefnNLA&X-Amz-Signature=ee8f87136b80802c0a4c763989e9be63eae233986c5fc2c43588d05aa8553fec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XH5SN73A%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133546Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIFISLmlQZgS5kLN89CYjOFrrghrBeW4U%2FWRx9BEqYAWiAiEA1Nln%2BxMDl%2BsYgBbQCnyiAWaS35rxX4tPaFwOYZ2adGEq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDLDvx8ZeGZP2Xj9ruCrcAwy6AGPdB0%2FQkzPgx9xIb3fIwXwg7giUEEM3y%2FZG9%2FoNyGJfn4kuYDtRAljXv3M%2Fm1MvVn2WvgnvXj3p%2BoRpWdggqlh4cTj7uMXlbBT5O1%2FpbNyFKePuMwXweLk%2FZdQHhWXno8T0x3uNs%2Bi3Kdo5%2FonWiplAT%2F3DwvU1xo4q%2B52QtAOIxVMCQPU5DU7%2BAfwfbfYJA0Hnp8yPianujJiz6VusTk5GIOXz3xOyPcFWZi1nKiMnC0GABFQvKime9cTz72VGnYWd7TeKzwrBdn%2F4yNLL8RUu751Rr1oG49Ywwok3m77DgjLWF8i6KO9hv3hW0WbFGZV1wu4OnW0e5SQpSw27cX0gik5%2FMswRYc96NyDyzxnZvfUpG%2B6hnSUIDi6qLQGASW%2FHvlmz1IMeUN%2F3nMlv9v1x0KKeNbd%2FPYZKr2p5whiKHfVmRJ4BUZSRcbeaGOpZipsk%2BMltSIwMFwIe3%2FIr8eM3oo9bKLPU3qY1jcnes7FzsacXyBD%2FmQ0W35ftnW9eqwkS49XXSTIa6oKtBlmp%2FEDLdk28MOJW4drQnGNME2gGEJvpj33LgHzodlACP7NMdeFLvANG%2FIuUw7yvrwI%2B%2FiDZgYABXtLTnTMc7Z2fpd42K9C4rmglhgR2MODrwcwGOqUB5obtnD%2B8lYL%2BBQ%2BZsN%2Fo0UkdJKIku%2BFids4NLJUaIu9%2FCZ1LSQdp2DA8TBVkd5vdVdd8NZGV2I8dlyySEy2GbXIkZR6qtW3bqI18dKbUzwT4LC273BNWRChMNfkvPLSCD0%2BPSmT7H1yWLbZFggfeEcOcfzpvJQXovSjS3w9Y%2BzYL0lNai9%2B58qxmajfqeTKHct41OvGvk1jCby7zntajrDdbFVVt&X-Amz-Signature=29ae7b37efe8c16c1068d7c52e291326067534a57115035eca15b738e1b21678&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZPWL5QP%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCICnCC9N7265j%2Fbv8D%2BdaKivL1PeeUpunoE8KoChLr418AiAqq8cgTMuny6stX12Y3ZMOqUVK0R3wPubxDK5k9yEgQir%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMxu%2BCo8vr%2BLHvOZm5KtwDl7Wt1sQGRoQxoIZ%2BqeofcBQ9u2kXs4FgNT5IjJnNS5rhp5wGXxrMBtD%2FykIQTpLWzH0xBglCftJ8oPBy19%2FuMOORLQmirRsB3Trc%2BOeYx8LZ0Q%2FHcjI%2Bi8UuxZHObg2KTkxu6gRqmFlBM7j7n%2FAB8FjeT19rh73VfekOdAi6hOR6prS51ZKhnqN2EM1q1SxIX%2F3kVyLC1zC5GvUHDrR48UA0%2BdyEpNl0V9uemlCJyBZTp4ilC4HK4yGA%2FHbSz1SW41CdviMUQWSRWfZxSTkKIvGJcfTPc6U3MqgRIW2yD9ail6zLFvDizoyryqtpaO%2FWuLPmhGAszK2PwW%2FcHVc9HEA5oA0majgMOojGwhvo0O2AogecG8CWN3LOhTEkRrcMxuoWyDSsC8TcMSztFGh6cQq5NHFeopCxg80JuqtgeG3YfSpfQRuYoNggCWD2%2FYkSkL2%2FSyDeU%2BOue7ebYiD01e62%2F%2FaqXjIR2ETNkl6QsUyE9oD0dXbqL9VD6p6z5C%2F5Yfvxn3jBBwwEkKMdkkKyWAzIZGJ0niIEsD7WvqYzCltfpNdW%2B0hZs2MPgEwO2IkS7RFc3pJx4o00%2B74aH01qjeQKuu1Odt3pnldbDg9xwsF5KG4tBObk%2BhaajkQwouvBzAY6pgH89shuTV9f%2Fbi9tajFP6CGk9xlbsnNsukDSj5sog%2B9bN8509XOfw2jJtcimu8RJj9d32hfOxXREwRyfWJYPUypYcrtDIata6dS3rmTXO0zAUWIKCljD7CuvhpiI6E6IkF8Sz629rUagCgfqLBmCmlIQLUL4wBAigMBrP%2Fy6Merix1gHMLpxu0EftNdOuxFM9qQ2PMqOPC9mg2E1jTtVWNsBH577lwq&X-Amz-Signature=9fcc60364b9abb12498fb8702326956e0a2a53e360418b08e82178320eec93dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZPWL5QP%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133547Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCICnCC9N7265j%2Fbv8D%2BdaKivL1PeeUpunoE8KoChLr418AiAqq8cgTMuny6stX12Y3ZMOqUVK0R3wPubxDK5k9yEgQir%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMxu%2BCo8vr%2BLHvOZm5KtwDl7Wt1sQGRoQxoIZ%2BqeofcBQ9u2kXs4FgNT5IjJnNS5rhp5wGXxrMBtD%2FykIQTpLWzH0xBglCftJ8oPBy19%2FuMOORLQmirRsB3Trc%2BOeYx8LZ0Q%2FHcjI%2Bi8UuxZHObg2KTkxu6gRqmFlBM7j7n%2FAB8FjeT19rh73VfekOdAi6hOR6prS51ZKhnqN2EM1q1SxIX%2F3kVyLC1zC5GvUHDrR48UA0%2BdyEpNl0V9uemlCJyBZTp4ilC4HK4yGA%2FHbSz1SW41CdviMUQWSRWfZxSTkKIvGJcfTPc6U3MqgRIW2yD9ail6zLFvDizoyryqtpaO%2FWuLPmhGAszK2PwW%2FcHVc9HEA5oA0majgMOojGwhvo0O2AogecG8CWN3LOhTEkRrcMxuoWyDSsC8TcMSztFGh6cQq5NHFeopCxg80JuqtgeG3YfSpfQRuYoNggCWD2%2FYkSkL2%2FSyDeU%2BOue7ebYiD01e62%2F%2FaqXjIR2ETNkl6QsUyE9oD0dXbqL9VD6p6z5C%2F5Yfvxn3jBBwwEkKMdkkKyWAzIZGJ0niIEsD7WvqYzCltfpNdW%2B0hZs2MPgEwO2IkS7RFc3pJx4o00%2B74aH01qjeQKuu1Odt3pnldbDg9xwsF5KG4tBObk%2BhaajkQwouvBzAY6pgH89shuTV9f%2Fbi9tajFP6CGk9xlbsnNsukDSj5sog%2B9bN8509XOfw2jJtcimu8RJj9d32hfOxXREwRyfWJYPUypYcrtDIata6dS3rmTXO0zAUWIKCljD7CuvhpiI6E6IkF8Sz629rUagCgfqLBmCmlIQLUL4wBAigMBrP%2Fy6Merix1gHMLpxu0EftNdOuxFM9qQ2PMqOPC9mg2E1jTtVWNsBH577lwq&X-Amz-Signature=e4bbdcdb9ebab362a53551c1febac8da574d67c3a4b41599edf3b7d6aa192ce8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSU5MKJ6%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133548Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIQDHc0bVUq%2BOdVxOdS%2Fi0DJ0hgin8eCNYJT1UuJUiFtTbAIgNFqUoRq6vmYxoVAyVVp0AIn4zx7pfo%2FCVB55gFP16VIq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDFtDV8WHZ0ekCsINiircA3a8btS6GokLP4CYgWMzUyHkbjoT43iXCgo5HL5C6g%2Btfmx1IK6rt7CStCT885TUUlk1g5OHcMiGlrLGO2PIHf1DvSWbhZcjFGztc9ghx8KnN8eo2moBX%2BGWNkKCvSxjtm5zQs6mm2fKzkL7exWvqMD3JV9t4VwxlbTqpK1ER%2B4D6rQEYJNmt5iYQTJm37eU%2BnRF9CQoUnCDm09PWQhHJWPItVBjkcqbRmhd4RAsHaFeswb%2FqqQYJz2T3xbGnjoOIIwNwr0DyLXnK95Lf3cFoyJ8n1lCs3aP1oEf%2BBeQClqANI90zk7eo2VsRKW%2B7FLLxkdquOx4gHtj70OVQvHak9wHUzHxtCRyfunmYf7bbX8FpV8R8sOemLrvGVzed0DPxkznQXPYH7%2Fu36IAzmpWlyTTpRj%2BNXo1bbve5OP54aME%2FS5t0dP%2FkaE8teQQH55wQFz%2FvlVmFL4I2azD6vRa0SgnMOKImmzXwhLfnABT6xeT319qKUMb2ofW1acrlIs3hJBTkwodN6F6QvDg5%2FGMkPfNMD7gz0IXlhBgeFywyEnxBu4PMgB9E8hwK8plZw%2FWLvHyu1fdLz5JpzqnMExSsl0wNtAzN3e7lTg36BfCWwcoxqunuEo0Fo3GEQC1MPHrwcwGOqUBJzpChf2s6wLJm6nGG1cUe%2BfSRubJHIZL5ut3EbdKJigjGEhmo1T0wmNBMv26vk%2FPJjk7tu6DXOa%2B8Wbru23GHSgB3RNC0GO0QmNmT%2FyfOHfpcgBxb%2FcuzljGuIX6O2Gza87RDVJvVRUwlyLNrjCPCSolzvB9MB0kh%2FHUrqozAb3mCjXOm09HCqivP3LULp8je6uzpqgRdvZxPgjOgh1%2B0V8PKh5d&X-Amz-Signature=d7a032083577785dfe8ab92eedc5e77c5ce57af995ffb3941e994830fcd817a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJUZIMHF%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJGMEQCIELAtxR2LG2mmIa5H%2BIGz6WD6WuVIXrhUCkzVQpSPHXoAiAuk%2BQt4UOTZSHBvYCeL%2FhHuF8CThe188Wx6WyMgH3hDCr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMu1ErB813c4bpLS%2F%2BKtwDpVqaEV2iSsY5MuVit2YjWGtQnhAGS34d1yBCM%2BbSL3GPMKYyaFqDNJuxLVljbcOg0Zkssc%2FkgrNxrveikgbaKjD2j7KRSio0KYGnM%2FJqffRbiaQZDQqwrtlCxbyi3LEJO1F0qEseB0cCywqjzMLvDQWOLlklLxhBFYO2%2F9R4IccoUu0AummA1Muhv5X%2FjGJRBxQBg%2FmFmcZs6zfI0kGI5IYdigiBEhWAbIfBOvJEKktF5OZFbO%2FeBWAzL0E6BU8ka87%2FxJQx2Uwt1hK3UqLvT73PFGLWaW%2FiklyNsv90U7NSTTxpSDrwSwt%2FVpwMEtGMtvBjYXdkRtxO8BE6LIRVOvQGcQ2aCgWOzLE9JQUWGVErexXyG1jMEVX5XYYwSc35GW7R6Wk%2BYCmVj9yO3fbmn1aXN%2Fzq5H1W%2BsIOa2dt0wi%2FLAbUuUzAAr9to1b2Uyr077q3zI6H9UCCqt8T2eD21PsjVMDu0fwfTDx8VO6va4CISfGKdKMOtfEZrIuQcS8m3dfCGcTzqRqrrXuM%2FdsICDUJUdYIMAFvx5YMK7rliz%2BVs00%2FWDI5hojk35HBcCiVuTz2H95r%2FcdNPWR2CIQwikKvj9WT%2By%2FB3BGS2hMWoQyBaXkDO0sOmhF%2B3Ykw4uvBzAY6pgG%2FXQljYvph68omBQNQJWmol3RUi77xBw4PZxJ6kkQbHUUow2PGRwTj8ih8wt3Rg9LCWtNCiwzWL87gK86jcZkiqGm0UtQ8ESZROAMmu8911C7KIz4qrxLCsgdYt9rzFFbmH6GqpdOcq1TTTqH0krbIgT9r5BMyO%2FC2GfrQ3XkxLKPuLvD%2FlLCs6TQI6fmgAIai0WD2wcbhmq7giC5Yn4HlDfBev1r8&X-Amz-Signature=f742384a874783c9462eb6e2239db82e11983965116222cecc18437e729f8cb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVD6XLZY%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJHMEUCICyirKGwfq1hnd2eBV8xWfwB36x6mokqBTdLZBwsevhIAiEAx29IfvQ%2BWzGbt3Smr%2FeqHJ3%2BYkecVlNN8GZuj2tvfXwq%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDPEUHzXC4P8vnFtxnCrcA9cHgu0v8siHW42lU6h4B3BkGIfyKGGTG0X8%2Fe6HdKgRqhfCXpf%2FfSm6a5r5CjSGi4NPGzQrdPNopjQJDPFaablw3BBKLvNfVq84QvYFuniSqTwtO9dnkgoDawZPAvtuekv3it%2B7zWbI6cayRWmJ0LpKKH2u1BK164ifImobfcPgyUAQPM41w0w3TMvy8kRMZuBlpwnkUBT8%2BEOzQhkA51sZjfZcT6RP1rlY%2B0iEOZqURTTiKB3LJU15QmbsY%2FCuhwNIRNrBLNcME0N47hih34lD8G7jsesl%2BchzUTi8rYQgzLTlvCu6Zpji8SwCtUf9afyJ2wjXwslfqhJ3nJjbN64247d0tHvdsZ6nOuxbJaxqqBWRZT1%2F7d%2Fq8c%2BL%2FOtzqPHwLMx9odnhimpiUTz4uiG3I6QnxhkTXkujMxL9fCNirENZvyrReWlFYf6hznwPwBrSAouSWXBLqVglXywR3s0S2Hx%2Bp9RqMUsPier%2FfYljIisLA%2Bx%2FTRxirNrHd%2BmdGPK42OpHhO2kkLPhq0kN9MTcHLeAJCZk%2Fkj5M7zNnDkJ6YU1L0logyYqo%2Fc5WJSE12gBinYGN35jGU7I%2BteTacTZPF93MgGOygzP58n%2BXPH6QJSfOD42L8ZS7kP4MIvswcwGOqUBFovik6AdAxO1a%2FkGNTjORq1ynYT%2Bzo2OP7eU%2BhENEFFb7qg7YoqpncawLYiHCyXDarFh77UX6MZc3uLFf7Ss6SV80X%2BaufoIeyrcUF1AxR%2B4ipr8hRxLS5OvCKgBjtuK5uYdvXisTVUubJTWPfF03Nf5vO%2BasXbattqSCxe9j2918RUwyZN3zfimjRd9qrNBRGlsunpbVtecOsfLxAUOUQ2PyggN&X-Amz-Signature=deacd584be9800e2193c906671162f83a3db88781ad3cfa3723998564d8d7511&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFM4EURX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIGWGqJKmYFLzbDqw1jZxIP38M4aFckEqfeUkkkYAht2nAiEA%2F1m6SYavDdc6NOPr16j1A1rf5htb0tt4Ko5sDnfNy10q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJuC7nxt0t4cTGUcGCrcA3jU2p5dDEQEmMsnfb%2FKogyGJCtt%2BR3m4qXJDNO6ClykrqcleUB5DacYsP54wZzPu9%2FPbTePGz4x3RwMI7bvySbx4yXjXpNZp5MRA09uuz%2BWEWmy5WkoGdRKruhNVA5TFdThka%2BRxAlqtjGydQSlrfKLVnyDgdz5rUV6jTcVnNLTftOOjC55pGDTgJI%2FmZTyRLmRS1fCocs9mlTUtUjSm6L0DL6d%2BYS2UU3S9wIRyq2egCY9pjcAD2uGq%2B%2FmoiF0ISiCCbz6SYqkddFU5VFlBmAde0aXezwYrg%2FmDbz1EddoZFuk4Ho31IZgrlD8CHIy9dss%2FlHrpPihC%2FD1Mf8%2Fdpl1OFkzPn38gCXdBrlYrw06SVSMqRPUtzA%2FzLgifTgHv1dTv0J22gze%2B7LQU%2FdkSSqjeEYYgaP1hFFkGDclaTu9WXj%2BcSF8hLH4pwx%2BnNIqXilp2SnNl%2BcCOIP7JzgFVBXL00KIyVTASjACcR8%2B%2BPkaaGeX2v0oZ6s3kBUTNQA0czIccUpaj1DcYnBJioq2wToe0Lw2xqzBbjMflTLMdC%2Fn01i%2BBr1WlvFmUC38E68c2XwU4OJny7fMMQw%2BE28jaU%2B0BeIz3SIeGO%2F493k0R0AcGta5JVBsSxFvS%2FlfMPLrwcwGOqUBkkun5W3yQhZo8T1%2FhoXH0Ccll9xkt1izk6my1H1qp9ISvVySq1GUHb3NewmmPO01DTgwXNbP%2FLqqLzjQHnArWQxGX17BWURbXAmMMnRF99l5Enl0TI8YX1Q%2FdDMQeHsyJt1PEHyktnqyzsjCeq3ER2773GmKWvOSooVjFIIX9RgFizDPZvWgwkTaV5lHJLp1boXeoC7Wx6Jjp%2BOQuuNW3maqMr%2Fb&X-Amz-Signature=d532593153b01375ef8abef9b468b5365985e07bd13ea96c0d196ed32f24b37b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFM4EURX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133550Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJHMEUCIGWGqJKmYFLzbDqw1jZxIP38M4aFckEqfeUkkkYAht2nAiEA%2F1m6SYavDdc6NOPr16j1A1rf5htb0tt4Ko5sDnfNy10q%2FwMIBhAAGgw2Mzc0MjMxODM4MDUiDJuC7nxt0t4cTGUcGCrcA3jU2p5dDEQEmMsnfb%2FKogyGJCtt%2BR3m4qXJDNO6ClykrqcleUB5DacYsP54wZzPu9%2FPbTePGz4x3RwMI7bvySbx4yXjXpNZp5MRA09uuz%2BWEWmy5WkoGdRKruhNVA5TFdThka%2BRxAlqtjGydQSlrfKLVnyDgdz5rUV6jTcVnNLTftOOjC55pGDTgJI%2FmZTyRLmRS1fCocs9mlTUtUjSm6L0DL6d%2BYS2UU3S9wIRyq2egCY9pjcAD2uGq%2B%2FmoiF0ISiCCbz6SYqkddFU5VFlBmAde0aXezwYrg%2FmDbz1EddoZFuk4Ho31IZgrlD8CHIy9dss%2FlHrpPihC%2FD1Mf8%2Fdpl1OFkzPn38gCXdBrlYrw06SVSMqRPUtzA%2FzLgifTgHv1dTv0J22gze%2B7LQU%2FdkSSqjeEYYgaP1hFFkGDclaTu9WXj%2BcSF8hLH4pwx%2BnNIqXilp2SnNl%2BcCOIP7JzgFVBXL00KIyVTASjACcR8%2B%2BPkaaGeX2v0oZ6s3kBUTNQA0czIccUpaj1DcYnBJioq2wToe0Lw2xqzBbjMflTLMdC%2Fn01i%2BBr1WlvFmUC38E68c2XwU4OJny7fMMQw%2BE28jaU%2B0BeIz3SIeGO%2F493k0R0AcGta5JVBsSxFvS%2FlfMPLrwcwGOqUBkkun5W3yQhZo8T1%2FhoXH0Ccll9xkt1izk6my1H1qp9ISvVySq1GUHb3NewmmPO01DTgwXNbP%2FLqqLzjQHnArWQxGX17BWURbXAmMMnRF99l5Enl0TI8YX1Q%2FdDMQeHsyJt1PEHyktnqyzsjCeq3ER2773GmKWvOSooVjFIIX9RgFizDPZvWgwkTaV5lHJLp1boXeoC7Wx6Jjp%2BOQuuNW3maqMr%2Fb&X-Amz-Signature=8a7b40632da8ef9ae75330636733bade3b698b0ce98f4946c68a246a169a4cf3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664G65C4IC%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133543Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCID2ggQnxbnokTMN9bKeeiZlzkWPcPg4p4MDVcc0FYSmGAiA00ZVl78MI98qAiWYoCXduIfOzP1K%2Bzt43SnV3%2FlqKqSr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMej8gbtBAoe2xh3VAKtwDUjpquKW%2FqjO8kfws%2Fv1sQMWDlJmGYFr3l0CJhiVENFs8AXq63PvdMrJt0svQDJ4hGnnPIRynE5%2Bj9clB8fiq8o1KGCQt%2BofJ4Q2liIytCA%2BFicPiQgaetZhBg2xcLa%2B%2BfG66GKZsL9sPBewXsxdXNPyD6OMSl86m1zAT9g0oirgp0ijoNr7Jkp%2FhvY3eltlvnPirMu6Odrzek0KDi0HyNy%2FTOxcCKXEWZWTaj0JdYn3Qt2ItJRJBIjZ5Ia4wU8eUA1X9hkDPkuUHxFWysrXBWL6FSYeFKgR7KFnU234pKkPK9QBziJoBy0Kt1gXcznO7BAeD3Aup1kxFffQhqe6ime2TrHOi1A3T8AEZDbL4TBeZ7hvLpJfFFzCYiw136Lz4dOPXE1cELWiDNv4J3o%2FUZdB%2Fy34K0knfNfIPDJB7n8WydqwCZA7jT8lu38AlKNLloscznjDAS%2BvAgsrB97%2BQLWXb1GBcRLfS1TOPsH1N72ciNymeaUblofOzhwEhsaMeKE5RDa3ZIu%2FUUvmYSSpFf%2Fzoa7aS2LKFh2BNDvQPoWSZktYeeLjLoKo6ay%2BaDCE3Yjj8%2BAPhzAwFF%2FaNY6M3QEGGwfHA3KJdhq6pDzZgsrsEgkQV8UF1dJ%2FlqRgwi%2BzBzAY6pgGd33nFqLqRbh5KhJaoVYe%2FuwLX83ItEFXT6Mt6xedzRWhIlskwhwRgwb9MoMqeUNx8NTMxCDkDfQviLcCXucsA1UO9UIgp5IjghAxUgyXmteICdlnIgu2%2B95zXwR6iXEbJwR9DVCFm8djCkAdV4laNT27FvalxgptUwUnnCGlVFrUSagDqCr%2B4WOwjMX%2FBn82eu%2BF1KMsubrrKeR9c1c9E%2BqEGSY1J&X-Amz-Signature=ffa8105b7c156440543507482a0411e55ef9796299fda6b38324c695ea8582ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVOWVL7L%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDB298b6LPjL4RgOU2osfEICQ4UROqVG2Jd6%2BDOnLc9LwIhAOXRfOlnQWM7BkAfUL52fiMekpa0%2FU95BXyYj%2Bs%2FpHLSKv8DCAYQABoMNjM3NDIzMTgzODA1Igz0wQA5ffJad9rlJLEq3ANORrAiUapKtUQur6tyAOY%2BIYKbTvcxaGu3SJ4MIfpn7Rmi63QQtP9FH93umU5SVCMMShiGXNlxSY7QVUbGDdHW53KfFH0vw0C4JXDNSALIn5LzJc1PED4qvp2gc316IXEHkim1qEYigQ4oyDgiCXd4mozP%2FFhe286%2FF84gzx26qi3VluIxtd%2FmnLDb8pif30hZx99t1COQ1gcfVriIpojCKeLikUev%2FGHLxJS7OTXD9UW7qh%2FU85mu0ozam3K02jTiFLN6gckTg3i9wrXABkDMRhMMbBYYeCJn97blAuQknbgXXbDL57CaaprWMRZMEttvI2wvzkUxeA2QjI5S7cvecWbP3DV8dwEC5WPE8Je7KLALHGmYdnqFNibRMDs9BF0vcT2JnyNteBg%2FD9d%2F0lQGjjRwTlS%2BqgvDkFjFqUej68DAenc7pAXqL5mnMXXLcLEbOxnviBILR0aBXYMRGl0%2Fiql4TXU3S%2BaXEkK61vAKxcVEYfJL1G0yJqZvs6wwz%2F2et0eApAAH9aUdLNAlf3yLJKU6lDE%2BYOKmy8fPQfk3MN7Xb6fq%2FDkDS4MrBfS0G0TudcxX8B%2BI41rrC6X0kYQA%2BfCalTZT1XtEgG2P%2BLEvp%2BSzMdTdULw2kzT7eTCQ68HMBjqkAa9XtZRFL7oxH0Qh3JZJSrxluOXOYlGVRRVoipUOa8%2BSzZt5jVtcxv0SnQyUcYtvQnZlADsqtcxjaIU0yRYuo37dKIkrwRVv2NAwEO0Hoa2cy%2FHYi656vaMpidGy%2Ftq54DxHe%2BYf7COwyV6ID6oExjjr1kOEzC%2BjiCMTFOrQQ2F5m1hVtnTRa1iixAe281hpweG8KRCo2W78LE9KQWj0BlawXLca&X-Amz-Signature=693b9d41e7b568fbef305d7380b760228142ff984233c02201360258e8af16e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVOWVL7L%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLXdlc3QtMiJIMEYCIQDB298b6LPjL4RgOU2osfEICQ4UROqVG2Jd6%2BDOnLc9LwIhAOXRfOlnQWM7BkAfUL52fiMekpa0%2FU95BXyYj%2Bs%2FpHLSKv8DCAYQABoMNjM3NDIzMTgzODA1Igz0wQA5ffJad9rlJLEq3ANORrAiUapKtUQur6tyAOY%2BIYKbTvcxaGu3SJ4MIfpn7Rmi63QQtP9FH93umU5SVCMMShiGXNlxSY7QVUbGDdHW53KfFH0vw0C4JXDNSALIn5LzJc1PED4qvp2gc316IXEHkim1qEYigQ4oyDgiCXd4mozP%2FFhe286%2FF84gzx26qi3VluIxtd%2FmnLDb8pif30hZx99t1COQ1gcfVriIpojCKeLikUev%2FGHLxJS7OTXD9UW7qh%2FU85mu0ozam3K02jTiFLN6gckTg3i9wrXABkDMRhMMbBYYeCJn97blAuQknbgXXbDL57CaaprWMRZMEttvI2wvzkUxeA2QjI5S7cvecWbP3DV8dwEC5WPE8Je7KLALHGmYdnqFNibRMDs9BF0vcT2JnyNteBg%2FD9d%2F0lQGjjRwTlS%2BqgvDkFjFqUej68DAenc7pAXqL5mnMXXLcLEbOxnviBILR0aBXYMRGl0%2Fiql4TXU3S%2BaXEkK61vAKxcVEYfJL1G0yJqZvs6wwz%2F2et0eApAAH9aUdLNAlf3yLJKU6lDE%2BYOKmy8fPQfk3MN7Xb6fq%2FDkDS4MrBfS0G0TudcxX8B%2BI41rrC6X0kYQA%2BfCalTZT1XtEgG2P%2BLEvp%2BSzMdTdULw2kzT7eTCQ68HMBjqkAa9XtZRFL7oxH0Qh3JZJSrxluOXOYlGVRRVoipUOa8%2BSzZt5jVtcxv0SnQyUcYtvQnZlADsqtcxjaIU0yRYuo37dKIkrwRVv2NAwEO0Hoa2cy%2FHYi656vaMpidGy%2Ftq54DxHe%2BYf7COwyV6ID6oExjjr1kOEzC%2BjiCMTFOrQQ2F5m1hVtnTRa1iixAe281hpweG8KRCo2W78LE9KQWj0BlawXLca&X-Amz-Signature=693b9d41e7b568fbef305d7380b760228142ff984233c02201360258e8af16e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE7XTUYT%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T133553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED4aCXVzLXdlc3QtMiJGMEQCIFm3SKd7ecmBijJEmUx738BMLy7iU1H2%2FecZzr1qeIOcAiAz9MyQF2xklttGnjAo3fsQo9UUZBRCNLqWgtQEgC0Jiyr%2FAwgGEAAaDDYzNzQyMzE4MzgwNSIMFK%2FRAee%2BBJSrYVS7KtwDaBR6uHZjUTchaOOmRsNy0MLgFG6UfEGTceODXhVd5QUBCEvHENBHbD4DA%2Bm%2FjPPyOOU2Fs2CisbDV445X65EUAhMvJHtrDaPeV7SJ4%2B5bSmgqf64UzZSjFKoTa%2Bj2PXolwCQ4GHJRTO8f02adHMpEfle%2FTjx7TFQaKIcimye%2BDYREE6pMO4lLcAQNDFotMJ06TY7spwO9hRCHRq5kmPhK2yJG8Xsx9kARThMKEeO1fTmSb9m%2F8yFtEhQV4H5Kagd8nGjdPKv0SLixOy2q3E6Nw7yGEo%2FpdyLyXH8YdRwGZuD2PiMxgZFaT%2FDshrBd9u%2FpJQCqoc9xNGZviHgBlJB0PaOnxTcC1lKGoFF6zXsuqjb3fhTVN5r03gFYbHXvOunjtwGR69xpo4BG%2FifoC1M1rKbymyr02IaPsshl3m4YYzHMTiGabNX7gevz3nreGzlAKA5i4DgVQamg80%2FMRkR9MNwC7tTRStjh0lpkHCjGMRSH9GUz3f9pTudGxTfl5Zf2atBjLkRsrYxUWXB0jFNvTc4q8CFWu7IpTj91H4ho4%2BhydhXJCIu9nWskaJZVvvsVxXCsTJw6zVmbUlzKX7sUvWicCDyDVAwy%2BxTYJwMMBgDX4Z%2FXNSvzfHsiJ8wkuzBzAY6pgFvTYOdpwQot5rJvGTwwc6BmEv1V3C28%2BvEWi8ocuFRHm3wywqfvEtAwubbYlqNofrQKtJIeWQVjXg6VQZKCOg94Z5aHknajRhhM2FO9WbrlaJLVfBfKGBqqKs%2F9cxrZkZMrILpVPNoG06y%2B8xbT%2Bxq2F0zP37DUZHBoz4wwV8uCguTB45Yy5e20m1KWlg74y3QmTJ3L1AfaPJjEe7R53OAjvSTUabr&X-Amz-Signature=8c5494c6c4fc6ad1790001d9edc34cd5a3628e1c4f46aba8679ea8102dc9353c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

