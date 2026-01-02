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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAA7EXY7%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIFTrTAUm4TRAslPXCWQz8MbYr3lRPQRb02vv74JvnFCiAiB7RpB6QIWJ8Mjdms2yjFkNchR3S6EZ0USn8m1aO2rtmSqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNGn8k5PhhmYljnWFKtwD6r1e5SHptDIewQ5vQk6OnopLngzrPPgq3%2Faiwb%2BK4QoQTrUocUo03UWs4pIvTuUqrjanekYFOcsKYCSgzJKNAQWu82pZnRwqylIruQGwBGzKcbHWX3R4wOR8J6w5%2BkR8y6RK%2FJRze3VnLeHC1QxKM8hVqu39w21bHOMkqh07I9w4mTGea%2BKP%2BM93RltdbiKO28VYCW%2FyWuueRqWLKMIDgcg%2F1reSM8hjE4y1C1PNLJOKbdPjcD12Q5ZSh1yaFLO%2BMeE5oznONvYAC6TriXXSFxvR1VWgujN%2F4eCkO4uuNIPvgZDJgTHygZwEOHIB%2B8K2KbDEmWyw%2F4ajxFuUf0VDlnsU1TIr0xeZZB0CgFPNWyUUNmwdcxAs2HTRZGCsQNBzFFg8QF7rw%2BtPxxccEU1hbN9r6RE0515cwK4U7S8Iw9hXGkVMP0dwqPQUgXAQ6EPSVDa4gOF4oc50bGdWTWUZJYCOmwIJBDqpYZXi%2BnfDA4gdZ40D4JnAjXw7zeB0S6iyI649Pko9TPUMkpeazJdJs7c58xTdA5aLAvHE5DhAjOYtxARLmVzNfVdpj%2F9o04dG8JwwpXtxfELl0a2dLUgEjis6gQ7ncRI%2BCeZobMzezZshYG3Bsc06b1RHpPMwnZ3fygY6pgF7SlrRsXhNxDXvabHcWxuUtaBCYHxQb1PaiG2RaxBKOmzo3yslCKop%2FO8WacsptEaAK03OBGFqJ0o2rre5F%2FoUSDO9HjURHcmLg8pw1a8c8If821IaSzR8BJsTRf69MBzgT86I6vCJRLrzMA4ElT9XJStgCMAWSnQllE97GyQ%2Fn1c57nVeSQJvWPEwX3SLJsQEbwLsVeu39vQKLsB1wba58cTwUGhU&X-Amz-Signature=730af55d6bd73318d7a3f7982d773565c94c83c9f6ad26575b5d98280290ce65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAA7EXY7%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIFTrTAUm4TRAslPXCWQz8MbYr3lRPQRb02vv74JvnFCiAiB7RpB6QIWJ8Mjdms2yjFkNchR3S6EZ0USn8m1aO2rtmSqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNGn8k5PhhmYljnWFKtwD6r1e5SHptDIewQ5vQk6OnopLngzrPPgq3%2Faiwb%2BK4QoQTrUocUo03UWs4pIvTuUqrjanekYFOcsKYCSgzJKNAQWu82pZnRwqylIruQGwBGzKcbHWX3R4wOR8J6w5%2BkR8y6RK%2FJRze3VnLeHC1QxKM8hVqu39w21bHOMkqh07I9w4mTGea%2BKP%2BM93RltdbiKO28VYCW%2FyWuueRqWLKMIDgcg%2F1reSM8hjE4y1C1PNLJOKbdPjcD12Q5ZSh1yaFLO%2BMeE5oznONvYAC6TriXXSFxvR1VWgujN%2F4eCkO4uuNIPvgZDJgTHygZwEOHIB%2B8K2KbDEmWyw%2F4ajxFuUf0VDlnsU1TIr0xeZZB0CgFPNWyUUNmwdcxAs2HTRZGCsQNBzFFg8QF7rw%2BtPxxccEU1hbN9r6RE0515cwK4U7S8Iw9hXGkVMP0dwqPQUgXAQ6EPSVDa4gOF4oc50bGdWTWUZJYCOmwIJBDqpYZXi%2BnfDA4gdZ40D4JnAjXw7zeB0S6iyI649Pko9TPUMkpeazJdJs7c58xTdA5aLAvHE5DhAjOYtxARLmVzNfVdpj%2F9o04dG8JwwpXtxfELl0a2dLUgEjis6gQ7ncRI%2BCeZobMzezZshYG3Bsc06b1RHpPMwnZ3fygY6pgF7SlrRsXhNxDXvabHcWxuUtaBCYHxQb1PaiG2RaxBKOmzo3yslCKop%2FO8WacsptEaAK03OBGFqJ0o2rre5F%2FoUSDO9HjURHcmLg8pw1a8c8If821IaSzR8BJsTRf69MBzgT86I6vCJRLrzMA4ElT9XJStgCMAWSnQllE97GyQ%2Fn1c57nVeSQJvWPEwX3SLJsQEbwLsVeu39vQKLsB1wba58cTwUGhU&X-Amz-Signature=730af55d6bd73318d7a3f7982d773565c94c83c9f6ad26575b5d98280290ce65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WUGEG7MW%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIQCdzMQjEQ4VzRPOlmIEWCSFJiMc42P91i8M13qN5%2FvmawIgTOez9fgDcgGFCsOOTNmfiMOluxjrvyC%2B56dnbauUzisqiAQI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHzGN1tSFFKW2533jircA1LZDrhiBMtadSfnalqBCj0WFF2xbtOYBwT1nn36dT8l91n63QSLJxdK5bBuLsMMRVdXVib9vsoNnLG5k737iZcAM0AxRf9SRnwIsi8O2dimfcaWP%2FqxMERmRR276Ku%2BTxv2k%2BlrNThWZTuAkxb%2FZ7yOEY5GXZIF1M7WQ7nRZ9yqYpGP%2BHxe2P7aiJxlO1%2BKpXYEnByU%2FW27BTlzgUvDX%2Ft0oHvPGwvrz552le5eb9eSoLjOYg989KUYOsn3koz5NbcMKPhdMaCRFXahMUIWiP5HJdzzwxSqcXpQ7NHeIwLgJFbUHZaHhlP3PjCk30B28SnDAsyxqOUAxN9chuyWaPsuD0N06wFnc0UemOcLoFgAUNrhTPfdxRLaL%2F%2F7bpCratbS1GaAx%2FGBZAOUFNayz48dF8AOsL6cdYtCOE47kLg4s1lHC8qcAJ9ligaY5SqYrlyhUBz12L8%2FDWtjUxhUmyud25qI1gnckaPE9E71Rt%2FD6XpBUmpnc2wZWXnlV2HKxJxEPnSK8hf%2BhgeoBlsgm7OKSBspS1KWXldUi%2ByWLMNXGT5UFH%2BbWUvwyzKvBIZG4VBrwrwoDLCaTO1y%2B6g6qIQ%2BXTrof207PZkmrFYsD%2BwRYPH4419FLSWdWeCPMPub38oGOqUBjBH3MDCtBQ3E7J0EKVMYOEYYsk%2FyFb500VyDFwooGYX1TaE61R93fEzVrrZ7niGR2omoFhJzkLE8Ty9%2BqZbR%2Bq%2Bp5QTUDPXLQ3gHpthKi6giykqZl9mLCURDboiHh9DQskG%2F7E%2BESXo8RI%2F7cg%2F5zUWHSLsiZ7BdGdO%2BFAAO%2FV%2F5%2BG220rGSTxpnOWfQY8GW4WuT8arNX8K%2BJ1hrAz1jfXmA0ZmH&X-Amz-Signature=8a137b2489d530904d35813e6db0dcda953216129376d64e82f607f5ef6bfd65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664M5R6Z2W%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQChpC3FWgQWiaqA7E5TkWXQvQerFAxIHT5w2JAkQppnRAIgGa910LUyRJsVBFE5jXjZDs87OwAgOcvtIiprx1zMs7cq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK9PyZoYMFFA3y2BcSrcA%2FJcHqZVWjuh0%2BfbIZ5m1nGSvZvht%2BmwO0LVjWhCK5iLmktiBTDNC4gx2XJ%2FYrxklw5%2F6RggCNKxU3T%2FZYnVkdXptybddhzQeFEeebC29kSWDyEdXeBMx6Y4O%2F8xfz6c%2BHgHiaqKkl4MvI6fOI4gBfrlJbzHIPJZDJoBRV0j6pk9oyS0u5Yo5%2Fu8NmYJJOjZBJqF%2B839kiPQioQtwfD4i6wkhqbdnwVLDYrQ3HOeYF20%2F%2FuJyvi81HgZi%2BbWw3yRhqTD5V0xQesScUxTWbEvi7dt%2B0ZA%2BSZRUE67H%2Bg0psGW9PKrUF1oArYjd052G60WPhS3Hk1WudcvTU1zuNTGRsLxgg7RVLl%2F3KcxQS1fQ9vXdLcBkICuyASanU1U8L%2BAH%2FTG61njwx6vyALtfUbREtgpdXO%2F1PiWFu2t3GL9WtqOnUailpvdJgx08CBEtKAEu9LmNmHMauQWtn%2F8hx2tK%2FMay%2Bz3VwAxNYBjM6QLbQg0WmrhGIBnAwho2tqEYOiZN3I%2BcJwAo%2FWEHU66oWNoEfg%2FDZpA8zl9a4e3lF1ZujdKJwM4wCgsTOf42iBfOdQtLoXu3GyGMISDoKFccV08W4JupsaOwkyDgRM62%2FPVjB2Tzl%2BsDjkRmre8p3fiMLmj4MoGOqUB%2FZAh5zhj5H3wNWk94S2n%2FfI1YAFOlgGZZNcIBKhwJuTfUk8mRig38mGjHr2OQ%2FyZeX4eNM%2FPEd7%2F761dRTaf%2FLmNVQ5crXRChnuJCZMajWrf6E8pYKXjtiCZibmi86V%2FqPUEwq9PoC6XL%2Fn3r4QUWSMGUIExtJpOSARwwAd2LLDY7%2BGujmsH2gb8FESFnwrI1wvGHc1lylgoxa4PQcog9YSREriS&X-Amz-Signature=29c6e3a00534f595ebc1d6bd455040cedab7ba25d9da3defb56ed467099b6f74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664M5R6Z2W%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQChpC3FWgQWiaqA7E5TkWXQvQerFAxIHT5w2JAkQppnRAIgGa910LUyRJsVBFE5jXjZDs87OwAgOcvtIiprx1zMs7cq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDK9PyZoYMFFA3y2BcSrcA%2FJcHqZVWjuh0%2BfbIZ5m1nGSvZvht%2BmwO0LVjWhCK5iLmktiBTDNC4gx2XJ%2FYrxklw5%2F6RggCNKxU3T%2FZYnVkdXptybddhzQeFEeebC29kSWDyEdXeBMx6Y4O%2F8xfz6c%2BHgHiaqKkl4MvI6fOI4gBfrlJbzHIPJZDJoBRV0j6pk9oyS0u5Yo5%2Fu8NmYJJOjZBJqF%2B839kiPQioQtwfD4i6wkhqbdnwVLDYrQ3HOeYF20%2F%2FuJyvi81HgZi%2BbWw3yRhqTD5V0xQesScUxTWbEvi7dt%2B0ZA%2BSZRUE67H%2Bg0psGW9PKrUF1oArYjd052G60WPhS3Hk1WudcvTU1zuNTGRsLxgg7RVLl%2F3KcxQS1fQ9vXdLcBkICuyASanU1U8L%2BAH%2FTG61njwx6vyALtfUbREtgpdXO%2F1PiWFu2t3GL9WtqOnUailpvdJgx08CBEtKAEu9LmNmHMauQWtn%2F8hx2tK%2FMay%2Bz3VwAxNYBjM6QLbQg0WmrhGIBnAwho2tqEYOiZN3I%2BcJwAo%2FWEHU66oWNoEfg%2FDZpA8zl9a4e3lF1ZujdKJwM4wCgsTOf42iBfOdQtLoXu3GyGMISDoKFccV08W4JupsaOwkyDgRM62%2FPVjB2Tzl%2BsDjkRmre8p3fiMLmj4MoGOqUB%2FZAh5zhj5H3wNWk94S2n%2FfI1YAFOlgGZZNcIBKhwJuTfUk8mRig38mGjHr2OQ%2FyZeX4eNM%2FPEd7%2F761dRTaf%2FLmNVQ5crXRChnuJCZMajWrf6E8pYKXjtiCZibmi86V%2FqPUEwq9PoC6XL%2Fn3r4QUWSMGUIExtJpOSARwwAd2LLDY7%2BGujmsH2gb8FESFnwrI1wvGHc1lylgoxa4PQcog9YSREriS&X-Amz-Signature=809158acc19ffe16587db065e4b56925ac61535f52a482c347c51ef93e3c8158&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CZ5CC5J%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIQDBtGV%2FoMdfslycsacMfvVBmQeKZJ4Kh0E%2BQ2peOyB2XgIgcyJv2P0Nfq3Dmg63tigAJPZuqMaa5gVPt%2FnFbKURpuoqiAQI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGRMh4OHndNfGX0AQSrcA47VRKui4YLcna0vopd4FopGjm1YZ2xVF4pQrBbJyi1%2F7cS8aiTGIt%2FJvBMpXgQBYSqoUcI530CWAquX0jNBQ%2B%2Fk1LoM2BchCZMGM7U%2FUsbBvQ5egLT22gEpl9YQ9tiRRDjuTN6vEu4PtHrI2sPm3%2BvPfnplKXu0SrJCJDlB4nOtoMkAUSq%2FP2PrwWNtxQqyGxTM3DTu%2FaxIrKJg4M5M35lU12bImWHTcCuLpgyZwg9Fj9GKtnKKQG0LFgXK5GrjfqQDhGqUD%2F%2BqdkbNfEm3SLxk60C5qFj8T3GFojYbX5k5doWJAgNaAr2MBCz7NejAiJ5nGbCeyEJ5FfQ%2BIXbzFRjzdkhBglPnGIOiyhJ%2BUTdzG0zOtP8HPqKDSzmGDKRKetMsrWNZnMtdrsea3PZftSxwxy%2BKTzxAQzuUkwPjfpcXLrEfPqghLSx%2FAY9mFp%2F3ttn7S2hB%2BOMRhGmp6To1w9URQkaa190nCWwkmrYQKQDAQptmHjmRwRdiKSs8rp3CuC2Jn71RpbCH1I0jIJglpwAc4RF5c71Nm8Ho3R5L6wUVwJ%2Bdw%2FYbWdnCrHD8sI8mhAk%2B7%2FJJeHPLMJIQq0mo4CHsCXCulE9Of2Lq9BSaePgE%2FMM%2BBmJHdAQB5pA2MMac38oGOqUBL%2B4Th0CqnescQrKCEEnHaXM%2BfkqbKaWs0Vfif594miLDDFmPLheIv0G6qQ%2Be5k3z4pOmTANJ3jBfcI%2FXtQYyJC7vgb6%2B1Tt%2BwqO9HUiDmk4s3GGWWstTAD%2F2%2F06xG2vhjkbX5SUfzvvPCdcsFPjPlI0glOVtT2V4wYb3GKn7Mjd5I96F5fF1qSjy0pSikgBvm382uIQiaiSRJUeu7tZXWvQRpWX6&X-Amz-Signature=bebc2ee0155f579aa1156ed188022cd1c8879ae208ee7ad24560bf443c7cbdb3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666WRJRXZ6%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIFXIdIoP4uTdsXe5UvYnjniQKcpIBQftmRNBRd5nZHFiAiAbXiaA9km0w5ydOCh8MaHTsTAA2b6i2AkcG5tsIeaZpiqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMBxulkVYEb2RH5uCRKtwD%2BuXwEEgnKuPfzX%2B3Q1Y9zFXXJ6LGCLEtlQaKkWBEU0SMG0miM7B7czwvOpkJeT21exN8ioHYJFqFkSxvVFt4nhszsv3Z1o%2BcxyPKO2%2FWivN8ZLe92hkbO53UUebiAyi%2B2E4B6C7bSy%2B8ZX6ozLbdXFe0HNdvm4PO3g0Sd%2FU4b3kn9KSmZYAufczDq85bzQPsQgzRZVEg9815uQxZLS2xItOBl7cTazpbtxOlxxtEU4FIUXonQgpq5eEuqhRPK%2FHAUXBjbBubmtAxdgnQz43SlrLw%2BdH8H1dGa6KGAZimT0Hlk23QmLChac4Ponfl02OekR%2BJviggVlTZSPUWQpagt34YZwZUX4Pa1cJZxxyfB3nqHB8cE5m84CffbMjAk7nKOmP3w%2Fv1x5M3kbux0iW3Ga8rOUFsuWhveToRcYPpKLHyVMD5uaRarlx5%2B0JXSQgqUn%2BaAX0DoScfZAgJsNwKYihQglVwl4n%2BHxnxEbGd7ZGr82PjWjHjekHaRGaZd%2FInXDMDHpNxkFMYUzOuJ8rmnONbxlKk2hkMs2KgtT3EWpOIefDRKkIYzs7CyWHXA1oyzzdOHR7r3CNvJEAsSbacvOlTMPGA6oezh%2FIRwoJAjVvQ7smk8yvgVpBVEIcwhpzfygY6pgFB3D9bXmdYUzv08fjpDoh3uaRHTo6mIQ0oxhMJtbkkTcGQ3TtvF3HX52RdtaLiDbLAAB875egu%2FnjCIJ%2BQp6afw8vr08kZ2dF65K0flmK67hENf66EI3j9rWTzeqgVwvPLBNXkBjo8lXd3llC8bNghPwhp2xB8ksti2slO0fysNUyPajiTOzcSSb6TYrkdxD6RPRCn8x8U2pnucdBZ92lTZ%2BpSZ26x&X-Amz-Signature=ab8e62bef275f64a732bf28a6b75456b02cb18768d9697798bc9cc9d87ef6c1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TWVT3CSQ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190118Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIBt1M68m0E%2FRBNceISieMSNPAURNX8T%2FhWs5%2F2hJQJ6wAiEA6cbekd9dBaEkEn9VdwJnmsTci03zbSmVHVNkM2TY5OMqiAQI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG3jYATGkz%2FbJsuQYircAymAMiriq7UNtrTKoTWyM7xP9ajpj52%2B7HCfhZhv%2FF4mVQ3RdbuXQeKgOlSUfmnjdUMBt9%2FTtewg001aM%2BdKYS38BMlVGVMuUDESCuQLkLh9N6B6sEFSn1uOWofkN7atCJSVGy1lpHDCjisgrNtByL48EhK2b2WEE9SJmHLShv3nsMdvLgP4MDE%2FmGyO3IZdU4eKJ0IF3VvQen7goWQtptPEQagv19FU25rV21ZFlgx%2FZbyQdU170iBSHlfgxNXlcidjModwe9wtvrcBhsmqCsfm6Xy5coijAGCT740BT7bjB2Xn3idPat2I3DbT0RWo9yXlQavCSP2v5hPZGs6RaVYH5usf%2BbWywasoDfA2OBKs52bNOn3fKfx%2BJDQOEG%2FQEn9vlkEpjq0hHoTEo5cFqKSGzGaMPLxaCJR08kEdj3yIfti09jRfTsv%2F%2BI%2BBSZnMZJdJ9r84hvmHKIUXWXo6ZEJ%2BnXudmdveY2S2CiKYlhtUXbcyO8Y6BRTSJmY%2BfiBuAf7yBo9sYkbS1CajXy61BNpv16GqIUZnUDd6r37URi1%2BkhImSyGg4W0a0TViw%2B4mGuUNaqmsg4LwM%2FsMl6QDftO7bCE9PfBBFGd2lzOVkTwH%2BkllvS1eNL877NQqMJCc38oGOqUBFfSA2FaixgwF0fmDNxsi4c16Cx9cRMqWsr2lL6yNKMv8tII%2FCGO2rDu2WoIO0Ad5YTpeRnOk%2FlB4NWEgvUwubzxI1yOLF865PESn%2FWJHgC7Ty%2B6nRd3yAbhVYCEHCLMb%2FEjM2G16c0dmO3zFLDtukfxppq1agpal%2BVfzE2wF0OmN8ev2F3%2FU2dtQsQwBGtBJYRPgca16UYQ8C7Cruu1DjpsS00Vf&X-Amz-Signature=62768573ae9c7e815f681cb2f1ca0d83573f05452c8ee60907cfde53b3a71599&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653IGVHPB%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIEN15ezU9sb7vT8%2FQu2DUU3Ivlow2atsvWjRkqKuqY1MAiAcFbDLPIUoPKYx5zYU9ThJKs2NQKHKpu5OwS4mHHyuHiqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BGrmg5SphE90IFksKtwDxmmNR9xy%2BM1ToOqLgxCTBig1C2PZVHlBCs3bKQhGxNVe0cMK6PMewGo4pNGgMhp7wgvzXVceBsJJAJUot%2Bnmaqk45TBBJ6kREdpFSME5ANBYhJN3hnuVGRLzW8Ejd9Wub6RFKyrLUM3uVcEdojtcbJdgFbVBFxplxhrD3LFdjW%2FrwjbtHtYI4D%2Bwv%2F%2BQlqBdmCU1WxvhInI8XE%2FHGGOhPsVNDICnDlwCj0FkQQ6JijXuuNxzYUvEHVPgZrd33hkr%2F0PYth%2BXpdf8RbOOGrE%2B7VXzsMdBr13xj6vSJrIz%2BZRQeLGBAIvO%2FpGXzmF8qsisUfEpBMca6wlroUM2K4lDgq585iIDkTCbrPDqNPimkcoA3Myw4h9CccM0tMNccaI2uhIRlbUlRgWDKPf12GydDXIjxOv38v0gBjzkgxRu%2BhEqzXNWGZhVOdai%2FHnSPd%2BvJVX0ilKD7FnmpPE0FiYJMoQDyQPGuRyWom0pL32Kn6vsdn9YEGU16i9qXAPwNupJuPyB%2Br%2BK%2B%2FcDiypad8eFgclMpFOsbr8V8A4sZ%2Fna7%2BvtJq%2BJvnqGKJ%2Fzdls5z8egsmy5aF9Zp1IlA%2FgGZMcjNXK5%2BeTDXg%2FONgzdXGcxdM5MDWopoCrnBUB5Geow6JvfygY6pgGQXxYus0pLig%2B76HCRNS9lAFfU6qp7%2B06t3ikdicljNzrUZoI5tbTWpbj0h0DOw0mk1UBnYWIIjZ2LULApKJOFrZ1d9QuY%2FP0ZOXa9WZwzqSr2wZ91JAGPQZ%2BCC%2ByfE7s41awYFzlDO7fuGe5jufFocNM8v8GTHUsTAtaYcPH7C1m2WSg3diWQ2b3R9dXsKDPh%2BLfZGy%2B9nqNQTnL%2FD5TqA6RsXeK3&X-Amz-Signature=5c699fd7420d15cbe06f4ff078db3763438f707798810f3b93ed85818f76957a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653IGVHPB%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIEN15ezU9sb7vT8%2FQu2DUU3Ivlow2atsvWjRkqKuqY1MAiAcFbDLPIUoPKYx5zYU9ThJKs2NQKHKpu5OwS4mHHyuHiqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2BGrmg5SphE90IFksKtwDxmmNR9xy%2BM1ToOqLgxCTBig1C2PZVHlBCs3bKQhGxNVe0cMK6PMewGo4pNGgMhp7wgvzXVceBsJJAJUot%2Bnmaqk45TBBJ6kREdpFSME5ANBYhJN3hnuVGRLzW8Ejd9Wub6RFKyrLUM3uVcEdojtcbJdgFbVBFxplxhrD3LFdjW%2FrwjbtHtYI4D%2Bwv%2F%2BQlqBdmCU1WxvhInI8XE%2FHGGOhPsVNDICnDlwCj0FkQQ6JijXuuNxzYUvEHVPgZrd33hkr%2F0PYth%2BXpdf8RbOOGrE%2B7VXzsMdBr13xj6vSJrIz%2BZRQeLGBAIvO%2FpGXzmF8qsisUfEpBMca6wlroUM2K4lDgq585iIDkTCbrPDqNPimkcoA3Myw4h9CccM0tMNccaI2uhIRlbUlRgWDKPf12GydDXIjxOv38v0gBjzkgxRu%2BhEqzXNWGZhVOdai%2FHnSPd%2BvJVX0ilKD7FnmpPE0FiYJMoQDyQPGuRyWom0pL32Kn6vsdn9YEGU16i9qXAPwNupJuPyB%2Br%2BK%2B%2FcDiypad8eFgclMpFOsbr8V8A4sZ%2Fna7%2BvtJq%2BJvnqGKJ%2Fzdls5z8egsmy5aF9Zp1IlA%2FgGZMcjNXK5%2BeTDXg%2FONgzdXGcxdM5MDWopoCrnBUB5Geow6JvfygY6pgGQXxYus0pLig%2B76HCRNS9lAFfU6qp7%2B06t3ikdicljNzrUZoI5tbTWpbj0h0DOw0mk1UBnYWIIjZ2LULApKJOFrZ1d9QuY%2FP0ZOXa9WZwzqSr2wZ91JAGPQZ%2BCC%2ByfE7s41awYFzlDO7fuGe5jufFocNM8v8GTHUsTAtaYcPH7C1m2WSg3diWQ2b3R9dXsKDPh%2BLfZGy%2B9nqNQTnL%2FD5TqA6RsXeK3&X-Amz-Signature=fedbb58ffce76b08ed0b7437a43b2928e79cb38f889d6076a19548ce44e66b72&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NEGVYCM%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJHMEUCIBU76XtqB7vbUiQ%2FKquwcUVtWKlNRnZjliNqFEpk2gPMAiEAwJj1voDqyWumbtUzRZlHyDn1xMGYM6jJk9u%2BFp4BcHcqiAQI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKizf69elf80RGjIvCrcAxbse%2FeAjD7I3gJzolhmXMkTK3DFVBUAPhUmVv3eGq1qyatY0i5AM9J%2BGmnYxYk%2F493vYnB7rvE42iaB3u0sDsjOZct5yaiL39e1FzyQ4tyLR8EmO5EGX0w4BKA%2B2osefPExnR4%2BDaMfdFMDk0BgbsNgcreKS9c%2FCeBqqL%2BSGoc0LkfpYj2jf4BBql%2BAUeOaS%2B3LSGUFja7NVqmpwrJ%2F8nhZlwVpSQiGiVTglPCZ3oSBDKBGViFW8V%2FNLQwyPIPlfWJ%2F%2FSRBk51llEC7d1ruB8onzjg%2Fuddqxtmi7k1tPls7Ub3%2FqTI4Mn66AVvwt5tQ%2F3VapVbcekwVNsAcD64%2BTCUuCvAFERojoCzpygjIcp70obnD7GhBn%2FK7EZOYLFepOamBKC18H5bXSDIr7CIhb4VgSl19kbnjzWxm9ozSrm81bOw8dsTkjNPU1Jd%2FI58dIWCG2ewiNX399BkLY4Tz0D5HC6RmKzlZvK1oHBNx3x4FYb6v%2Fz3b4G4z5g3lENk%2BAPufV8pfaqikdwoUTVUXLxwrb%2FUkt7o4USEBnKQJdqdPy9VZN0FrkByNWsHpvRx1t%2FyIuUdWavn9f%2FQuev9kCH3y6W8Q7qn9hPHK5olvvdpVwE80P40QGrlFPuIPMKOc38oGOqUBd5AbwryIkGiV3nfIYcG8dnyTUB%2BLXjFsjYxSo25pXqy1UM6I7M58QTaW9rTFBaLABusbIeLJmFzS2hRA%2Fg7zHwf4Rd2UOH0OQbWS2ShM0VhVY4CcBypESjS9a0DOyLMSXv8htUiRQh3kkBP2ZjVZTHiZowRR21nLZFXwV%2BADqcP3S0pAPMMWlB7HAm2Lb90dqaS7LOxCCQ01j3DhMUHYyL7w71P%2B&X-Amz-Signature=4df41552f5cfca92cb29a5ffb2e7fbfef67304b0cafdf53d57b5927e3ce7a0cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBWITIZK%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIEID5wHuvdiJ98TCu6bfWsQxWRf7fM2HfIadXxPm4kYUAiBi4aw1WHAe236C6grfbeYveZ3XhM9S0dfsfFsnxAt98iqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMO%2Fb2sGHFeG79GUZpKtwDsPWFGd8aWp3gl%2BlPAMeAVp4QltI17y5QWx4BNQOxfLIili4mTdno44Yl5tP2ChfgmHXUArtzjVeQSGvy1oczK9Lh6zvB%2FXjBoXQCS8x9BOmReTqaJad8lAzBwJF545mrc29InJhSh2yJ%2B76prTmREonKGuYMlnnlhxHdjGMog5T%2BTUhFvPRC%2BA5Ou4I272nNcKppBC2LxdSGjgYvH%2Fi9hZQ09ng7giBO9tZ%2FOhqgLywHeP5eA%2BicHKBYqqiO24PxlUFhksJOnqbz7J2hCI5y23GQgU9HXsbcBPdAjSqO5og%2BEFJ9vM%2BdOjTm3JEQKdxlupKzZUJKfBA9aJ0h0HtHyOkW02khfoAcYI8vEv6RazDOoNVSsUB4LC2aDUbEwCJH6ACgRmgasDdI9BtRk0GLGMqdmv%2BDB1x6gPs21PwrIIyOAjoytmQV7wvcSN5hMHvG9Rji2s8Nl8UJeFKZGl4bEi5jYtZPJSPAfMfHUsVG5FK364LiWyRyfeY2tcSxZgeTU85kSrdCsVYl3uPb5Ixoqq0%2FsG%2FcVOn7LlK6m6KrgtqPl03oZqjBUnyUeZZYu8RgkWqt04IGcuzngvwzM0ISKEs0f3ZHNsWU4vXjsPFnPQV0OJXSfgHPNF6SOh0wxJ3fygY6pgG3PjCZitV9h1TYLXkgMzZQmcxsOt7iw4U7KoXdTjY1ViM%2BSdUPEzg%2Bj7cBGhdKZhua7XnWaGnILQs%2Ff1Y6cbbS%2BTYnZ9%2BVYVvs856QNGesWxJ9a7p%2FZNyB2OIftkpwbWSoIxsGRtHIgoQn6f%2BYsRthLIpwsEU3C8VqfpnfjwRQSUAPl5s%2FuVqUyun%2FQ7AXV%2Fsv2Ii8mQgJnf1yoHs%2FBBzV1nvSNzli&X-Amz-Signature=478c5a68e36dc71edb8eacd57ed23463826920549a6efc7ccf6379c722359c45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBWITIZK%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLXdlc3QtMiJGMEQCIEID5wHuvdiJ98TCu6bfWsQxWRf7fM2HfIadXxPm4kYUAiBi4aw1WHAe236C6grfbeYveZ3XhM9S0dfsfFsnxAt98iqIBAj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMO%2Fb2sGHFeG79GUZpKtwDsPWFGd8aWp3gl%2BlPAMeAVp4QltI17y5QWx4BNQOxfLIili4mTdno44Yl5tP2ChfgmHXUArtzjVeQSGvy1oczK9Lh6zvB%2FXjBoXQCS8x9BOmReTqaJad8lAzBwJF545mrc29InJhSh2yJ%2B76prTmREonKGuYMlnnlhxHdjGMog5T%2BTUhFvPRC%2BA5Ou4I272nNcKppBC2LxdSGjgYvH%2Fi9hZQ09ng7giBO9tZ%2FOhqgLywHeP5eA%2BicHKBYqqiO24PxlUFhksJOnqbz7J2hCI5y23GQgU9HXsbcBPdAjSqO5og%2BEFJ9vM%2BdOjTm3JEQKdxlupKzZUJKfBA9aJ0h0HtHyOkW02khfoAcYI8vEv6RazDOoNVSsUB4LC2aDUbEwCJH6ACgRmgasDdI9BtRk0GLGMqdmv%2BDB1x6gPs21PwrIIyOAjoytmQV7wvcSN5hMHvG9Rji2s8Nl8UJeFKZGl4bEi5jYtZPJSPAfMfHUsVG5FK364LiWyRyfeY2tcSxZgeTU85kSrdCsVYl3uPb5Ixoqq0%2FsG%2FcVOn7LlK6m6KrgtqPl03oZqjBUnyUeZZYu8RgkWqt04IGcuzngvwzM0ISKEs0f3ZHNsWU4vXjsPFnPQV0OJXSfgHPNF6SOh0wxJ3fygY6pgG3PjCZitV9h1TYLXkgMzZQmcxsOt7iw4U7KoXdTjY1ViM%2BSdUPEzg%2Bj7cBGhdKZhua7XnWaGnILQs%2Ff1Y6cbbS%2BTYnZ9%2BVYVvs856QNGesWxJ9a7p%2FZNyB2OIftkpwbWSoIxsGRtHIgoQn6f%2BYsRthLIpwsEU3C8VqfpnfjwRQSUAPl5s%2FuVqUyun%2FQ7AXV%2Fsv2Ii8mQgJnf1yoHs%2FBBzV1nvSNzli&X-Amz-Signature=478c5a68e36dc71edb8eacd57ed23463826920549a6efc7ccf6379c722359c45&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YC5UVNLZ%2F20260102%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260102T190122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC%2BiU4UJMpOyAUi12y7O%2FCc6UZcjGX0SV65S7%2FTE0m4JAiEAjHewqF%2FpzdXrBg0qp7%2FnoDXud%2F4107XvnHes2PIRBF4q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDFxtYNt1wiJdmGNS%2BircA63jAb1EWjnSI3%2Fl9wchBs9RxgtpixTD9trmoBjkPBVuC7kNAbLQTdl8DzA%2F6v7F2pnkH%2FInrZ6kJGTSNE7Qdn2Wmd2dDnXf2qAG2gcPELC5hP7DZGQ7u32iqbTqFl0fEodbCowu8naBHU9QNZsVnLhfsrkWo3uoKrSfIlC9RU7b7%2B2Ib3dSxQcHZ5%2FXbVb6UN1nPJ7Xpqwm3b1vt34FX9AcYOAHRnrp0l%2FZpihlF%2FbMl1GrolTqTNG1Z9sYMa4oghyjeFMiVKbVvjICliDQlZfr8WRlPhyWQ80U3EN1zUkWEvVeI4e%2FzZCzojowaowjK5aqSC2RD2XPSSba2QOCjpHRr4iM5u%2Bhuoncr%2BNiNlNY0fy4t%2F2OU4DOcnsbrty41DKboh4PrBn9Yv7QVKte7ZFVxE9QsWprchdb3H%2BYGvZNbAlapphGSs392QiVlxG1guePE5ayFseZ7IHT20sXE%2F%2B52u25xrSOm3%2BKM2JLxa%2BLGRCyIae5FQzP6Z7oeRfgY5f5apO3Mwutz8HNfy%2FqkeIDWFg4iLtN47zr07XvqD3rQvmw%2FUi9lct5epc0KXyj43LQ%2FEfv4r3GmJh0wJ0VaQydrZFpCtpVJtkj93Uv7j5VV1pKvj1fchIB1X5eMPSh4MoGOqUBbU1RN005Dn%2BAdd4fFr5NrSUq%2FNU8N0q2VxSc9kM0zcz6aTL7AXOPeECTf1fAOxaeXvgQm5LS4kdcPaRl1DptcEXlNzAOplKHpTUXndOAqIxfolOC13NUMjxX0Beazx3KEUYhMO6D5nmq33Ye9iuwh0zn6SbKedoKYP2l9CqVpPPD2c1zCyfIZRbfxdhuortn6EvErEdmInGnCwwuzsffOJkbF8sE&X-Amz-Signature=fc3054957543111c6bbcbbe72aeb0fb891bc6d0b52bf8f42c680f20bd1baab74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

