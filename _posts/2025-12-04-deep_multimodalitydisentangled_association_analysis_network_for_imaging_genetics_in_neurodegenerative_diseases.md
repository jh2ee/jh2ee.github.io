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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIORUHFG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIB%2Bx%2B2CwpUFmIN%2BhXQIHCNeY2D%2BN6MyylO2Z9mXnYT5JAiEAxRCBlc9NRtt0%2Bo9eyiyyQ91fewrkX%2BOmbC6W8BMs%2FZ0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDD%2BYMX3eeQqBWBXLmCrcA7mYH7iB%2BwintwWDhTMbj3WW8q%2Be4U5%2FTLzKkjnFMp6VX9aKLmmRZU90FNRPNZLLpuhCNKw%2Fsz0T4utREbhuWWIjkbQqqhFG4nSIvOq8p2Q33HQ0fbgD0AwqhqttlYh1gHGQWqWzWl23XUctU0woHWOCytIkTeJnFd%2FEa2Z1Bd%2BPyLvQWS0SRpIc9lbjZm6dT9HNnl42t6%2BGK4gqRqd6d3VSLvszemRi6W7n59ceobhBhu1JoF6iYy6s8mkLxzdTreZEm6AJk3%2B7HaW7bHY1Qe%2BZ6zx4cs3xIisKoB5bmwTZlw7yXA54zskyknFIkBn812WUe7CB9Db4CmkjV38bTQTTBe5ZB65vUQW128OEzUxhDGDwFS%2FytAO2fKnGbpkIftabily4flz%2Bgz6jhuH1J%2BOS0aXzDfvoptnEpUKgTiuZsuKoXT7QNcQlu4gcXy5oCwMzKNqsYRYVoFRmVsDtwNwCCHJZ4hVlisZywOZ0%2B3xXhZowws9WE72i03AU8BlTze3lFzMjrib7FXfTa7LWbex%2F1zibOPQynHTDasYWWEDFbbZ26K1oU191sRG969oQ70y6uNRRzOk8lqU4LfwI0u%2Biuxqcl6Z0W4dsv0Rslth6yEpb5BxJyhV%2FFv3fMLKehs0GOqUBAGBMum3XHqMDgIx3Ywc%2BlinAlF8rn8WMyA7pyKLiywKYz7Y6hmrHNbALR%2FCfVM89zEKLlKrbhL8nQ1tGOw6CCEYA9Z4GH%2F4bsc%2B3Sg3lFOvkGXxSCdCLU6z7jZv86BwgetCcP1X7QB%2FIVdNj27%2Bkt2ZthaER09WsmrOt6ynZoueGcCcdSiBwH%2ByglEEmayA%2BgnxnREIoPW5u6PcBY0L5oNxoH6qF&X-Amz-Signature=71710ee3e8d95b6a01adfe1d8f4b31a1150064500e446a8de7aed5411046570e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XIORUHFG%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIB%2Bx%2B2CwpUFmIN%2BhXQIHCNeY2D%2BN6MyylO2Z9mXnYT5JAiEAxRCBlc9NRtt0%2Bo9eyiyyQ91fewrkX%2BOmbC6W8BMs%2FZ0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDD%2BYMX3eeQqBWBXLmCrcA7mYH7iB%2BwintwWDhTMbj3WW8q%2Be4U5%2FTLzKkjnFMp6VX9aKLmmRZU90FNRPNZLLpuhCNKw%2Fsz0T4utREbhuWWIjkbQqqhFG4nSIvOq8p2Q33HQ0fbgD0AwqhqttlYh1gHGQWqWzWl23XUctU0woHWOCytIkTeJnFd%2FEa2Z1Bd%2BPyLvQWS0SRpIc9lbjZm6dT9HNnl42t6%2BGK4gqRqd6d3VSLvszemRi6W7n59ceobhBhu1JoF6iYy6s8mkLxzdTreZEm6AJk3%2B7HaW7bHY1Qe%2BZ6zx4cs3xIisKoB5bmwTZlw7yXA54zskyknFIkBn812WUe7CB9Db4CmkjV38bTQTTBe5ZB65vUQW128OEzUxhDGDwFS%2FytAO2fKnGbpkIftabily4flz%2Bgz6jhuH1J%2BOS0aXzDfvoptnEpUKgTiuZsuKoXT7QNcQlu4gcXy5oCwMzKNqsYRYVoFRmVsDtwNwCCHJZ4hVlisZywOZ0%2B3xXhZowws9WE72i03AU8BlTze3lFzMjrib7FXfTa7LWbex%2F1zibOPQynHTDasYWWEDFbbZ26K1oU191sRG969oQ70y6uNRRzOk8lqU4LfwI0u%2Biuxqcl6Z0W4dsv0Rslth6yEpb5BxJyhV%2FFv3fMLKehs0GOqUBAGBMum3XHqMDgIx3Ywc%2BlinAlF8rn8WMyA7pyKLiywKYz7Y6hmrHNbALR%2FCfVM89zEKLlKrbhL8nQ1tGOw6CCEYA9Z4GH%2F4bsc%2B3Sg3lFOvkGXxSCdCLU6z7jZv86BwgetCcP1X7QB%2FIVdNj27%2Bkt2ZthaER09WsmrOt6ynZoueGcCcdSiBwH%2ByglEEmayA%2BgnxnREIoPW5u6PcBY0L5oNxoH6qF&X-Amz-Signature=71710ee3e8d95b6a01adfe1d8f4b31a1150064500e446a8de7aed5411046570e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633SO27OE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQC9DzFlza9k8YM3GnWiDFghfPSpiHSLwfwjB6i6syT0zQIgbTRFmyCTNi6f9D%2FozdBPz2gg4lt38fr8H6KrlpaX5XUq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDP3OJG9qkcCaS3846yrcA7Q%2BwikxoRGEJZFl47ctniAujGwYiFKYu5yQ619nYc%2B8pWMxMGcAv8%2Bd9aB1RN5Pref7ZCNIKBD98YKBeY5%2B18zd3NR%2BhuyOvdUMg3CDWtdT0%2BhOcVVgLO7r3lDs%2ByG%2B472anDOOcYg9yr13Bx0eU5gkcYrjSUk%2FzlqRuZwZooppIzcSL1RvtaGo53toBxMmF5kXGEAJrslb2Tx9kF3HRQFjQG7xDpWs6I3QXFXFmda9zZMdzRohN7KB%2BSqZlILTHFm8VaqiHhyK92%2FYBbBTxA21WR9N2lGpNmeS%2B41cYAlcfHPjUaFs9Q%2Fe6UcXyHleu8cPnUmZ2R1MCyCNA4NDJs3EMiQmtsXR2ShIJm8%2FogOROvWq1n6Rkpjm1bhG9NeGChmrnzP14o4p5fa5t%2FirVxyfu94wRen39ytIfuZbmv4TiMdxR4W5ha2x7uo4DzWifsYWFba0pY%2FBKiQmUG4e1KgGSUmbEwYSybNcMUMvPU8NvKCg0bKl0AgkzZitPKz1scIIaEqU3mTteuI7VbeWA12UTu%2BziJKX8GL2t5y3gwS4nJSXt8r1Rp0jVCTVaPyGGwRIXG8LBJxe0zZdXjCFwXyW%2FyrZ08oZklM2ajtG0HedYG8tC17vf5%2FAT6yqMMSfhs0GOqUB%2FUT29G%2B9xvinxyndSbwHG95plpYBYzUL0z%2FTO7ekBa5QF9V1Ls8fGUmkovyQi8e3UVcJKMKTElp7E4SAEL3dhxR8i00giEklC7L6bocTsAUxD9JqOGz6%2BUJ6SwGR7xWK%2Fqu5lvueQBfHLYOOLJxfdbR4XTPtRaTr8mb%2FLnzO3xbM3SMyjkavfiSZzLDwoD93TO8YNU%2FtJiaGZV9uV%2Bgo1Zd9Pmxh&X-Amz-Signature=4ae5f6cfab57c32defc028fe1a93d1e4c5c6cb5606fa0f5275098c9616d33b26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMHP4HFV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIA%2FELFT5pYVKxjeDhI8W9tK84dbP4WNx6ylTKwqXRCb4AiAvrtsDL5z0Kys3nobQ5oME5N81jGfbA9EsJ4%2BEYrGwLyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMbYNkkx2fXOHDxrfpKtwD0Hs%2BtDobuWbixjGi6TmtIRVfEIjFcGP2%2Bj9M06UJ3fJE6Irwly9UIjhbl%2BwcL7hX413guuWtcE9%2ByUYlnLQodnDgNx0TjOCQPVTm%2F%2BpazWhNbvDaAqgrnCC%2FlGjOs2gYZ00kbdv4UOs%2B6616tow%2FIFs4z1fOg2UtytTaenJV2m8l19BZMVz0I98A5xr4m6NT3YC9jiMOe1p7WYk8TlyJNiOqJHhxKCIXQi5BbMmvp3Sh4iMA62oN3SCB9TCJj20SfM%2FzAWmZGQ4loJ%2B%2Bhvs7CMqQOnwHvZOysC6rBg4lBeZX0848SYnniAAKtTXgVKIwlUC3LGb%2B1Zab5Baxl1IrVGwlxg9GvTNTCJAnZFPm7nGCBoTOtgus9YfmQaknOTWUbimBmjjQACGB53dm2ZDIYs94n9gAzMqt%2BpqTZ%2FAYn1m5%2BZTXdwLg07LfOUjTEHUrZKYut40J2W3wS%2FF8gtz6BuoypWVhfhvGUii1EwBR9sJTL0Bz%2FFAH%2FvKR3BjTOdteZk8cP4NQxbuyGC0EfL2yni4Hb6oTSFrzjMym7dPVeZWXdbOdTWbl4ZJk40TMfPvhWE4%2BN7d6vlSdovuno9eFQnmrA3FQpT9byr5vze3F3b2WBd2zOktjPMlVadcwsp6GzQY6pgFisKX3RJKkNvMirem1PZgdYwIYmG%2FnEXtQzrmKOA7oO62v%2F3ZnGQjryiHThCUVEW%2BX7VmHiKmyPzQNKMpzoRH4HetL3Myb%2F4WoVWB9ISXH%2FDvmimQ%2FYUjutUmqgcSagPcg7Kvtd92bxOZXtGjKcezTE5fTHX40kr0fFWzBQPApu2E5MXDqtA%2B1ddjb8yhB2BqXXdWv8vGm9VESPw4sq0UoSlf1vGX2&X-Amz-Signature=70c3975b5c63e6b394f8a17a2bc0459559fa02b571c75ba9ab206a3b52bfb744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMHP4HFV%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIA%2FELFT5pYVKxjeDhI8W9tK84dbP4WNx6ylTKwqXRCb4AiAvrtsDL5z0Kys3nobQ5oME5N81jGfbA9EsJ4%2BEYrGwLyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMbYNkkx2fXOHDxrfpKtwD0Hs%2BtDobuWbixjGi6TmtIRVfEIjFcGP2%2Bj9M06UJ3fJE6Irwly9UIjhbl%2BwcL7hX413guuWtcE9%2ByUYlnLQodnDgNx0TjOCQPVTm%2F%2BpazWhNbvDaAqgrnCC%2FlGjOs2gYZ00kbdv4UOs%2B6616tow%2FIFs4z1fOg2UtytTaenJV2m8l19BZMVz0I98A5xr4m6NT3YC9jiMOe1p7WYk8TlyJNiOqJHhxKCIXQi5BbMmvp3Sh4iMA62oN3SCB9TCJj20SfM%2FzAWmZGQ4loJ%2B%2Bhvs7CMqQOnwHvZOysC6rBg4lBeZX0848SYnniAAKtTXgVKIwlUC3LGb%2B1Zab5Baxl1IrVGwlxg9GvTNTCJAnZFPm7nGCBoTOtgus9YfmQaknOTWUbimBmjjQACGB53dm2ZDIYs94n9gAzMqt%2BpqTZ%2FAYn1m5%2BZTXdwLg07LfOUjTEHUrZKYut40J2W3wS%2FF8gtz6BuoypWVhfhvGUii1EwBR9sJTL0Bz%2FFAH%2FvKR3BjTOdteZk8cP4NQxbuyGC0EfL2yni4Hb6oTSFrzjMym7dPVeZWXdbOdTWbl4ZJk40TMfPvhWE4%2BN7d6vlSdovuno9eFQnmrA3FQpT9byr5vze3F3b2WBd2zOktjPMlVadcwsp6GzQY6pgFisKX3RJKkNvMirem1PZgdYwIYmG%2FnEXtQzrmKOA7oO62v%2F3ZnGQjryiHThCUVEW%2BX7VmHiKmyPzQNKMpzoRH4HetL3Myb%2F4WoVWB9ISXH%2FDvmimQ%2FYUjutUmqgcSagPcg7Kvtd92bxOZXtGjKcezTE5fTHX40kr0fFWzBQPApu2E5MXDqtA%2B1ddjb8yhB2BqXXdWv8vGm9VESPw4sq0UoSlf1vGX2&X-Amz-Signature=55af1516e95d20c5f148187755bf315bb85659ffd8d2801603585b5310dca8d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663BTFKGFS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134943Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQDU23TVuUgYrKXK5lSeiYYsx7HPiU2FXTpGRG0wHQ85AwIhAIdp5MM9rAkWzOJapj7icjf6mV7NB3NQC7f5XJJbnJWlKv8DCD4QABoMNjM3NDIzMTgzODA1IgyNM8%2BGEjNlGgF%2Bfxgq3APjWAPIWVIfiO4YKvGvZ8Wk8jtJqGb888r1Dg5zS3pKpHXbw9DEV8RX6Cvp5LMTCjL8d28kgb7WYGq5rX6%2FhoCLPvpjO94Oihdx1kl73zfCmNcBEDD%2BkzLOqKKRCIU2sVZb5ra93StFFinpe1%2BQYT%2ByEG2tj4Sucw1%2F8ks5YgGUapD%2BB9VJPxewUNRC%2BtvuOeQG9wEwqZp0%2BwPPtsUqPMV%2B0R49%2Flsa8G3UCalcg6XRt9k9Qcu8Q9U2nazIcLs854Ro1XVjOXdFBGTfqlk39x%2BO2fyJgpT%2BpVB4HTVG9OB9WLbUzXE1yw9RTPg6Q0VeXx0nXcgtEIuUUu56%2FAb3AfhUXpCZsn5Go9wl2Fn8bsgxPstMmB5wgz2SOX%2BT7nUA%2FP00VPfu%2BEb9uS9waVHSo2zR3C4S8XxldOsCRp%2B2c3WiqLXaEFzpt1jX41WmZdtdpI%2F7lPEB0opdFNU2GwD2fKF6y%2BjzpVqgI%2BbvnY65SqtfTw3ainTQRJEZkKumrAcKO%2Fe5wcV%2FWvNYM8P4EbOhC6Ch4U9qPzR3j%2FPepzp9AruWgigAqYa7QHCN7sE4JgQ9BG0%2Fc6LeB5or%2BJxcIAgvn9L3Lo5ozoBA7e0y65S5XBOXNBNGVWYRpxUoevoKxTDEn4bNBjqkAX0FgJ3RQjq1%2Bzeu5ZRV1apu8X9CLYthWOg12CNLRMqM0oEb7ZPdmPLiH1Ob1RIyeeE0h2aAQmtPFPlYTwpBrgPW1FzYexn5wuBsa%2BVAe86s4KI2Ibdi7if%2BP1Wf8vx%2FvOagvP2YoD98iVzGs3GAtMNHPQxd2nV1XKfeMtHGio7rdh%2Fw0ewLjUB%2BvOQmq6yYqFaOkkNQMCIssfXFMT00S4K0AZdq&X-Amz-Signature=42453afaf0ca959752b8c8e7098ae6b5a1642bff39f94f9f62b0346b03d1df2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRJJKZ23%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQCx%2FQkCq1kSJkHroKIdnXOsT%2BEiLDDlBREwwQnLWTlxDQIhAJo%2BOA%2FgB7zSjzt6q4cnu8c0zA5%2BCDl5p2swOf0%2BvlNLKv8DCD4QABoMNjM3NDIzMTgzODA1IgwjNoxqt%2FeIhqEZSSsq3AMOx9q84JTTnaIm6f%2FEwgj2dBHSyInA2sVWv82tgvPmw9Ao7Q0Ka3Au%2F84wrrhteY9fehJVz41klpH1HZH14%2BLpcfFVveNN8gGig6eNVRhd7%2FPKUbZVISSYo4IPg54Its5EPXwuI%2BaM5%2BD10ovZCrIhbfW4PeBwEaRGOpEv4ZD6MaIRRMviPIlBOQ7pQ39IqQR0l8f6anN9D7pQChFkD8%2F7k9ptC5cH1iJB9h13LQ5sKuFN38xLeJ9d8EdrOYDTx4Q7zlHH0H4inVD2JYbyJ5oirx6RapfQ8gIIgGzIuYPPnk6a3YlWhz2oVZEjo2RUll7Ob0CAyPwdzoYRXmdSKl1V3p8Bd9XjG7U5JIsd2lcEHvhp%2BIrEI6mWCIh7s5KUNLHJ0PLGfxhSxwndtnSKycsK0DHgTsq%2FKTOb0FvVfJ5AaUEJMYwnAG2y6ADK0234W%2FapXbm7Z5JRZ3s26zeWVkzKvcl3a4SXeibjLuNM5ubAJEnhmFIUROBbw3YFvRHW1WBofuChNRTL8OFvDmidvxaGCjyNqsMP1UA0PA0joxtlfBCQlVs%2FDHK07h5DYVfD9%2BLw0HxVBOSEImtrkQ9UoZ3PsuUta92AaShKCMcwtZXqrV%2FQaS2SEeRl4A8yeDDfnobNBjqkAVmT%2BiTd6B1PsH0IzLFr5KRb2wCWDBDOQ0Stcr0Ds8FnlCRXXaOagdF8DN9G2bTuiSJpzgyclIOeUEEfKF2EnI5W7opgYAi4z1Z1dKPjlUdXC3nxFiq215HhxQHKRTyod2mP%2FJVM5x1BVK5WyLWHwi55%2Fn0ytmQHREWuvEg0inrmS2NCCLEVcDA5qGZE6Wdx16PPQ6PMV092nZ2vRLMltDTg%2Fr1t&X-Amz-Signature=879b145eef7c4e4867bc35a1dc8f1dd0ed2f521917be3083dc64a3ae8a7d5980&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667LNVWPOD%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQCn3fyAyOPfqeS7LahIerxEyPYe7bPyoG%2Bgdr%2BA9Cg%2FKAIhAJuR0qXh6qIjiIo929Kvpg%2FT5omM%2B0ZkWK%2BoDdm8Qq5qKv8DCD4QABoMNjM3NDIzMTgzODA1IgzA4MoyerZ5TpOj5Jsq3AN%2FZ42Fx6Fl%2ForOPX3eVqtHUwegeQFEn1BF4e%2FpxU3FHOgpG5K%2Ba80kbwLINZB3%2F4yKh2KMNMCyBM3kOB03vZ6Ba04TZ6TtxOf6Xf70uxc7Adk0rPjZrz70GsTotbkNn%2FD6%2BSI3OgV5dsOCRxzDyPXcMU02WuniQZ2hLdttahgrNsvEzqV%2FbHUFMosmnKsI4HfooNI0IsF0F2rMzvtDA4LWp4sJghemVVWlQHDXL5o9QzlvvXaX4AeDrQe8dmnIkQa8WtsSRZ38bUnfMBTOKjLzLOYYv98NEhzfYx4gZHwKGynv%2Bv62cQq6mzlTD4N6fnctgsBNtHC0R78t2HkiCDfrfLLrE3X4fSJLONFA0rwE%2FQLt2uy3KFMuwn6Xs0JxkfkDdhkNSzOrnbuxBBiQRGH0T6LM8eqKO6%2BwgACrkpPETNNL%2FX1i3jZV49ITfcW2TKBA0PWRaZBKOLpTYckc9k2oSir1QoBlPl9mMBs8375pbAvRJzxTwWrBziKiQ45%2FYP7mtTo7zOIqI5uR1Rvil%2BocRhyxCQLHRG%2FFHxKfxJzSYP53NWV5N8BRc5GUv8Fo1Hb2fB4sh%2F17h9iFZsohwAc79IbW3qjlz1s8aWMugGNEue0gsN%2FV3N5ljkcUdTD%2FnobNBjqkATR5Bu561ZahWxegKK98Xu0tieu3CkJTsNDn0M%2FA63NtHKmVzp6O0u%2BkDRW9r2eV6Y3RV2BAB5uyZB5GkGYKEAWeKtWizm5QnNGH4F1xHfdZ6vGnEITcTDALxr7J0BvwYLz1pN19vQx%2FdoMdbxClpiBk1Wrt4swRe%2F4sBV%2BDPkvFzIxE35pjXCEuvH8sFksWOTBpW0s0oxPsWnAjIQeN3kHuKClT&X-Amz-Signature=8ecec790182c46497df2efd7eb8339d0dcbcaba0aca86c8e800c0b9cf6155ae5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QATBD4MM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIC84G0SPteT3Zt%2FxbPFpOd0u4J0QuYlsJgZi3AvPO0x8AiEAxaEND47%2F%2FwQFVJdPDJwz8I0z3Z3I8vVzZY%2FBMunR%2FWYq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDK7Rn5Rb4ng76GBnYircA3S1Ir9QrZsxVjWWe6BVHeco1IIFO%2FT67q9ZamGEnYyf9bL%2FACcsn71o3c7M665gehBbibFuqTNIagtF%2FRvntaKZl5H023GzSQUrbD7lJpyx3nP6nWlKMReGi2ZEvVpFvAmF7gr5V7IQ%2BriJJL9tmWX2mPn4W17mxVVElXZr5uhPAfqD%2BfqwtGqt21kUXYpkpSBTQUTNtag3KD2WEIz3uPnKMWa%2Bgo7iuCXsF4zJutKFYTmtaK9m9X0xrtY52PalDZFvRTXUGdUUifkb%2FZerUDjmkFOjHIRWr1DZ%2F7uM7bVpVYvo0YvBb8kqHdshEEO3QKme%2BpilONJ8WLgL1E5NxMu8d8vFXBkXsTyBZzCpWuP0zkkP9UUmGdaMEI%2Btvv0Ei1gVlFyN0EiHyZj9F2Cs0vX%2FiGrr3RT%2BRnKPw9%2FAZBioWMkyf4cRclJjv8x64xn7gms3IOMlxydxV4MAiIjX0Yt7nVckv1V6ttnDeio4%2FftJmRZFFx9T544jfXu%2BQ21N9yfEsLHIkGCWmrwpzIyeFODaO3jwH%2FmBEtw3XyVlrA2TmwkJBIxTa2PG7Y9kWLl2ddTe5sVUWZoFZhms2ZsaVpPS4BVQhRTg13sRXl2P%2FF21glNWoeG7FKdSRO7AMKufhs0GOqUBUf%2BuPbzrm6Z73Si1JG7lPFgOIv9Ucqb3yXBzbRGVa9nGrxXp9p9lCr%2F0XjZprpUphrnJ4q%2FkFmcZALheHxYGC5ciqRaETVtXrZrjrHTmYygR7cnHg5SZ3%2FBaafOF7PzE%2BKPcqF0FyTxxJOPOv%2FL06eGRn%2FD1607dGG9EEYqg2gk4vVn2sBG%2BKLMJxKVeJRwEwUCuV0v25Mf%2Fmrh2A6HO3t4NufNr&X-Amz-Signature=0ea07887859cab686bd5658a4e7b0b2acce5ee48c61d9737ef084a41c788ede0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QATBD4MM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIC84G0SPteT3Zt%2FxbPFpOd0u4J0QuYlsJgZi3AvPO0x8AiEAxaEND47%2F%2FwQFVJdPDJwz8I0z3Z3I8vVzZY%2FBMunR%2FWYq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDK7Rn5Rb4ng76GBnYircA3S1Ir9QrZsxVjWWe6BVHeco1IIFO%2FT67q9ZamGEnYyf9bL%2FACcsn71o3c7M665gehBbibFuqTNIagtF%2FRvntaKZl5H023GzSQUrbD7lJpyx3nP6nWlKMReGi2ZEvVpFvAmF7gr5V7IQ%2BriJJL9tmWX2mPn4W17mxVVElXZr5uhPAfqD%2BfqwtGqt21kUXYpkpSBTQUTNtag3KD2WEIz3uPnKMWa%2Bgo7iuCXsF4zJutKFYTmtaK9m9X0xrtY52PalDZFvRTXUGdUUifkb%2FZerUDjmkFOjHIRWr1DZ%2F7uM7bVpVYvo0YvBb8kqHdshEEO3QKme%2BpilONJ8WLgL1E5NxMu8d8vFXBkXsTyBZzCpWuP0zkkP9UUmGdaMEI%2Btvv0Ei1gVlFyN0EiHyZj9F2Cs0vX%2FiGrr3RT%2BRnKPw9%2FAZBioWMkyf4cRclJjv8x64xn7gms3IOMlxydxV4MAiIjX0Yt7nVckv1V6ttnDeio4%2FftJmRZFFx9T544jfXu%2BQ21N9yfEsLHIkGCWmrwpzIyeFODaO3jwH%2FmBEtw3XyVlrA2TmwkJBIxTa2PG7Y9kWLl2ddTe5sVUWZoFZhms2ZsaVpPS4BVQhRTg13sRXl2P%2FF21glNWoeG7FKdSRO7AMKufhs0GOqUBUf%2BuPbzrm6Z73Si1JG7lPFgOIv9Ucqb3yXBzbRGVa9nGrxXp9p9lCr%2F0XjZprpUphrnJ4q%2FkFmcZALheHxYGC5ciqRaETVtXrZrjrHTmYygR7cnHg5SZ3%2FBaafOF7PzE%2BKPcqF0FyTxxJOPOv%2FL06eGRn%2FD1607dGG9EEYqg2gk4vVn2sBG%2BKLMJxKVeJRwEwUCuV0v25Mf%2Fmrh2A6HO3t4NufNr&X-Amz-Signature=d7344fccff27d167aaaaf947f660d08b292b239eb9cce6f59d42a80017e0592a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SELKK6VM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIDIxuDc3humOrA0G4x5T5UlpbCTgbVAGxZnIP5wP8BdnAiEA7ENXaidVlQZPcXxNjvfdaPfldvxT5tnbrCHlJpftNYQq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDDQzfZakxXGzhl2ltSrcA0%2Fl%2F9BgngvuOt3fR4FEevLsafC9j4bTZ5CAr%2F9zgNlQ5q2n1VSdokehcnbbwbAoDHAAOj3h%2BNtiCCdScMpD9oLYfNipK9JBWHgxrUJ1N2f1GtS7YNCVPZVWwWaDzNlOUcF7NFZFPcBxAfJeGp%2BoYP%2FEe0JA6zwJPUjP3avnKXqUgEd8nqzM4aAN0rvk1x4E3TPFasWmFZPvlU8hgej1YujB9HHC%2FV04GGYBYECK7R%2FfzkQ2tR389uqKV5xLc1NBhHXWoETJkSWunzz8DarD2EBvGzz9DWP%2F2h%2FEz4UnGPx11uIOhKR%2B1kRyLGC58Glly50g9V1mGBJ7KjyDFI1yUdq1xYSEUSszy6CLEoWrER9ryFLdFXZ2JJ0oKEb2nLfTI98aWJThhG%2B8E%2FZO%2Fn8SQoHQ%2F%2BvHHvAOapnGQ7p1rFHQ1wJndS%2Bg%2BjOUhpjDFFt6ZsxMG3ogKxrSPiMM9%2BPQh3e6BVkHgBeQITzascIJyAn9V37Kmx4QvF5me8bkhgIYG2rMf1Wh0AMWOR3UxgjzgogHhF%2FLLrmCpUrDf0piRL2trLOZGFn3nbiYWskTnfPg%2FRg1K2JjN8hpirmnZOtX7k8IBjm8wT%2BKCF%2Ff6nGkNQqvEUpGrgWPsDrnhD67MKufhs0GOqUBgCcvdjuRAPkTL8w9eRcee5J8xZTj6JUkBGTFZZfX4agvMrTjWebTgPeCmFa91%2BVplYt51AzZYCVJjpX9Zodgd13Cqnx3QjF1SEsaxhTSrtmKL8H%2Br5uRSySSevEQX8wMYOhyR5vz2vT9Q4T%2BZaPi%2FRo6EnNXQ2ncZ4ShtMqbS4JSHv6YkMI1CPaqwyLu2%2FFJ8uJXVUfSw%2F0DrSwXThVqQjvwATvW&X-Amz-Signature=db02df1534a2c4f0871568cfe44339c1aab366a02fcf9425fdadaeb578e7ad7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZP7W73XC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCICyD%2F40ZhrURQpVB5TTpqKsaP0PLQoUOYdW2QBk3%2Bsb6AiA0RsOS38DVgUPIOlTQCt%2FE0Iy1hFxWvQvzamJA4YhjAir%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMt2gemUyGGwZA1rI6KtwDJpiPca3p3CpC3jq05XPNk%2BX80N%2FpMDgxXgAakUmWmFQOOEiqvSwIqnjOSQRL7MEesF0cqhoD5CBgrxJyQGokf24WJWrCjYjWrDeNEEyNCTDPwvwdQJOqfr%2FSudnJDADbWCtL1T20ICgsVdpojAxHkuk9AhaNSq4wxrOOS2EhPZTLb%2Ba7VbtY9qiEEJJhFykrZDn%2BQSnudLOSDJROoXwRr4%2Fzlpn7pK1orlpwct%2FOGkhQ8SgyOLs%2Bzu5FvP2FmW%2Bft0ztpr9PDCLXH1RvFm3A9r9qbVC0%2B06gJJSKJzczrhol3iht6Xd0onv7rLPKT6Ymf4rvEcBqnAUWX%2FQ7Cw5zqnv668NOZji2xV5Cq0%2FUJLrg9fVS4C8VcZqrjbYq6QhWnGLipBEWH2ap0FFfoNYPBm5KWjlabwM6xY0BZob%2BS5B7DW01OG1%2F0ypbFt4GHD10eTo2O%2BJX0DXq2zsl3ZiQE1PQkZzE5YDBVKOmudoW4J6XwPxb75ZUGfkqNS6c%2FxOrizGRtFNBAO%2Ba6h3OrA9ujya044VxFyhwOdmTIJEUMvrxWollCng5sV5sNDjjkGWUqVqBQ11ogt4tvpliVQ%2FQSGlKVi1dYyD82c0oUgqLpzpotawoNUj1M5O9BbQw1p%2BGzQY6pgF%2BY6NDOaSrAH1IiAGTqP5ic3qk1eT4fiM6oCjTvVaPICUCR5rWFH7bZ7%2B5Wwdh%2BHmxoqrxnxV2TBePw7mZrql36D4eVfKUjZHIUr0F6zogEjdcGBWDUgmpXOv%2FkTosATRnX6rSoT6znzE9jgcCo8h7x31mPq0QApdcH%2FYr74WBAmcm%2Buma9gP1EXDlWTX%2BG%2FUsUgv%2FAxodVCSgKEMk8QeeLfSArZ5V&X-Amz-Signature=73e658dc4b578fb2db944e7512abc58e76bbfa0c518b9a1caee61e79a4cbd48e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZP7W73XC%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCICyD%2F40ZhrURQpVB5TTpqKsaP0PLQoUOYdW2QBk3%2Bsb6AiA0RsOS38DVgUPIOlTQCt%2FE0Iy1hFxWvQvzamJA4YhjAir%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMt2gemUyGGwZA1rI6KtwDJpiPca3p3CpC3jq05XPNk%2BX80N%2FpMDgxXgAakUmWmFQOOEiqvSwIqnjOSQRL7MEesF0cqhoD5CBgrxJyQGokf24WJWrCjYjWrDeNEEyNCTDPwvwdQJOqfr%2FSudnJDADbWCtL1T20ICgsVdpojAxHkuk9AhaNSq4wxrOOS2EhPZTLb%2Ba7VbtY9qiEEJJhFykrZDn%2BQSnudLOSDJROoXwRr4%2Fzlpn7pK1orlpwct%2FOGkhQ8SgyOLs%2Bzu5FvP2FmW%2Bft0ztpr9PDCLXH1RvFm3A9r9qbVC0%2B06gJJSKJzczrhol3iht6Xd0onv7rLPKT6Ymf4rvEcBqnAUWX%2FQ7Cw5zqnv668NOZji2xV5Cq0%2FUJLrg9fVS4C8VcZqrjbYq6QhWnGLipBEWH2ap0FFfoNYPBm5KWjlabwM6xY0BZob%2BS5B7DW01OG1%2F0ypbFt4GHD10eTo2O%2BJX0DXq2zsl3ZiQE1PQkZzE5YDBVKOmudoW4J6XwPxb75ZUGfkqNS6c%2FxOrizGRtFNBAO%2Ba6h3OrA9ujya044VxFyhwOdmTIJEUMvrxWollCng5sV5sNDjjkGWUqVqBQ11ogt4tvpliVQ%2FQSGlKVi1dYyD82c0oUgqLpzpotawoNUj1M5O9BbQw1p%2BGzQY6pgF%2BY6NDOaSrAH1IiAGTqP5ic3qk1eT4fiM6oCjTvVaPICUCR5rWFH7bZ7%2B5Wwdh%2BHmxoqrxnxV2TBePw7mZrql36D4eVfKUjZHIUr0F6zogEjdcGBWDUgmpXOv%2FkTosATRnX6rSoT6znzE9jgcCo8h7x31mPq0QApdcH%2FYr74WBAmcm%2Buma9gP1EXDlWTX%2BG%2FUsUgv%2FAxodVCSgKEMk8QeeLfSArZ5V&X-Amz-Signature=73e658dc4b578fb2db944e7512abc58e76bbfa0c518b9a1caee61e79a4cbd48e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WPAVFWTE%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T134956Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJIMEYCIQC2aCIuQo4jvfaLYKuYgTAZNVhRGYmCH6ITL%2F%2Bic6jMTgIhAIZwGWP1zayzDGYlV%2BZUOyU6KW55qdSnQqZA3KR2k2CaKv8DCD4QABoMNjM3NDIzMTgzODA1Igz%2F%2FFMJKr14rQwJR2gq3AMUfqwx%2FAcksKr7McRRspgUMJvYTFWG4JazyEe3mS%2FlEzZ5t03yWC5N1IyLzY1n4AlfxZkeAdqAuh%2BchLkkxC%2BMEthgdlHEcYcJNFT8%2BL6hlqxa458VN9XpraLvdC4G6Q2EcYR%2FiOc%2Bxdfzk5gjpt1eEOOyDOfpVGzWkKo774TP8slHV9Ky9JZ%2BE4FuboV%2B0Vhcm4zZ5UEUhIbjigY0CzfWR%2Bvq%2Fr1RnpJ3N9Ar33Bv0EPWUiYIDpTaBQFWeLt4x4Amd40kzbAUrHEGN%2BlFMr9iW24i5tg7nFsybCxJZaa%2B8qWGImja7RPH9qFy1XDa4JItdmQAOy4aYs9kn2NqdzNtRYbFOVcaIuPV1sBTV1wOQ%2BpwlFOJJKkpP%2FbqSoqAkIfmPVG24zIlwrwkyL9UY9yRJzaHORhyUrWIkFseRwApupQ%2FLPpPlkKeeQ58%2BiDHNr1MupJMtwQzdcU7ctk%2BM9stBUOf2hdtdoAKJjKphKMkFEJ2d0Jx%2BNE%2BCT3HPDNbzjaEyKfQEOUUl6QUiE5N%2FqX8UeAV%2BY1OP3dc3H9r5Mt8VhcZ7GLtUhCCf4nR52DA6CbYSIAX97iyqd%2BGuCpKIozR85EgfNmW5MMU5QnlbjX%2BhL%2BsFFSYLBsHV%2B2EBTCIn4bNBjqkAdgi7fZCc8hmuAqepfq6BKrIjHqNuM2M%2B%2FuMbJsJL87uLwvvzybI06CerqSKSRVHGATuaOQxE9r0LPrNfWECyOu1xzNgcB3NheJ1%2BwdJDK9HotPGcdhYmULguA9uwEJ5v3q3UnJjJU9MOqFu58IprusGxrE%2BHDoRuzDzfjlZ4TTRrONR62BQHOe%2FObYtrziIcRtjJWBIk19jCSDDYj1MzDt%2FWo9v&X-Amz-Signature=e13dcba6cef5d144d6ed976e0431a6c552985495dcd955d6f5eed6ee0b9d7329&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

