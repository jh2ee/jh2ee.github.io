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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XLOWDOL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBoEbKNZrVQILhyuMNTmeA1CtDUfn1qaO%2Fu%2BdhVViMmuAiAPeSBd3Le%2Ftz0ff1pTxupZuKAxyUjZ7FPcVgamRWeB4Sr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMj2aijRoWoouG0lTIKtwD2x8OJo7nMQWbyKhioZt1bD2N1S53oi7jRg9KT3gPeRght2yCjZMluNdWA0P4oy%2BGO6%2FSvj0J4RrREZtCYVKGFzsap9yVnL12rnJnbR%2BbDkkvO%2BdKXo5g3Wr7Zqr7OK2elkXlr8Hl%2Bzn8gs%2FmwTeEumUV4pPwotvOJjNaeYZA%2FdZ8NzujShwrQgnRtYR8bDhROaHFziY8%2B5QAgeW4hWxstsl7uGLjlGk1SgWze%2B7qqHWtcsCllxNr0DHekhY6gtb8C3FLBOmv%2FHEN4t0NTvpNggzUnlojtABVJVVmNm8MfgjO%2F5DP%2Br0NJtZqBHZPkSgxLMiqeH%2F%2BTOIWc35FWCtfgPMYFM40%2B%2FIQo5%2Fq0Zaiqy569fH3zd9FQ0ULfj8s7GOH6BoWznuaLcIVhiUqgYFWePyf4v%2B8evP%2Fig7PIhzQo33SJrQWVMVKEYhYizIC9K5OrEPf3G4UovJ8eRWz2s858gwrVbl5NUEfHCZTMPguHHcoewtnCIjvrypsyD1ZIXJ0aT6W40a581GWPMF8ZqbKKnjfep7Z%2BWq%2FbhE3sti0Znh0A%2Fl481QRJfq%2FyVBaD7qn3%2B2shwwRTyERNordVG0xp3s0CRpEvvxvKJTEBoKCKMYuAzSUeomDcT5ya7QwmfLqzgY6pgEdtCUvFMBKWke%2B1nokW6GP3%2BTfKgal%2FceT92Xx3u7cRzTrS3wQ%2Bah92MCYwK9S7RMDBFnWrHoJ1e8CAnTXbiJV943uQaxzhw4PlrvpQCtxMU%2FBwqu8oTRtuJk%2FdatuCHlHCdzBztgY3kS3gQuU%2FNX%2BL%2FoytdV6z%2BQxdZREyVCDLYEjiR9Ua4px5K1rKxIdmPi0SleJTULLVF0knJbov3jMZB8LNptH&X-Amz-Signature=c28a408de56585fead1085d30a46dbc49ab9d660502bcca5e14e91bfebe4eb7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XLOWDOL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBoEbKNZrVQILhyuMNTmeA1CtDUfn1qaO%2Fu%2BdhVViMmuAiAPeSBd3Le%2Ftz0ff1pTxupZuKAxyUjZ7FPcVgamRWeB4Sr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMj2aijRoWoouG0lTIKtwD2x8OJo7nMQWbyKhioZt1bD2N1S53oi7jRg9KT3gPeRght2yCjZMluNdWA0P4oy%2BGO6%2FSvj0J4RrREZtCYVKGFzsap9yVnL12rnJnbR%2BbDkkvO%2BdKXo5g3Wr7Zqr7OK2elkXlr8Hl%2Bzn8gs%2FmwTeEumUV4pPwotvOJjNaeYZA%2FdZ8NzujShwrQgnRtYR8bDhROaHFziY8%2B5QAgeW4hWxstsl7uGLjlGk1SgWze%2B7qqHWtcsCllxNr0DHekhY6gtb8C3FLBOmv%2FHEN4t0NTvpNggzUnlojtABVJVVmNm8MfgjO%2F5DP%2Br0NJtZqBHZPkSgxLMiqeH%2F%2BTOIWc35FWCtfgPMYFM40%2B%2FIQo5%2Fq0Zaiqy569fH3zd9FQ0ULfj8s7GOH6BoWznuaLcIVhiUqgYFWePyf4v%2B8evP%2Fig7PIhzQo33SJrQWVMVKEYhYizIC9K5OrEPf3G4UovJ8eRWz2s858gwrVbl5NUEfHCZTMPguHHcoewtnCIjvrypsyD1ZIXJ0aT6W40a581GWPMF8ZqbKKnjfep7Z%2BWq%2FbhE3sti0Znh0A%2Fl481QRJfq%2FyVBaD7qn3%2B2shwwRTyERNordVG0xp3s0CRpEvvxvKJTEBoKCKMYuAzSUeomDcT5ya7QwmfLqzgY6pgEdtCUvFMBKWke%2B1nokW6GP3%2BTfKgal%2FceT92Xx3u7cRzTrS3wQ%2Bah92MCYwK9S7RMDBFnWrHoJ1e8CAnTXbiJV943uQaxzhw4PlrvpQCtxMU%2FBwqu8oTRtuJk%2FdatuCHlHCdzBztgY3kS3gQuU%2FNX%2BL%2FoytdV6z%2BQxdZREyVCDLYEjiR9Ua4px5K1rKxIdmPi0SleJTULLVF0knJbov3jMZB8LNptH&X-Amz-Signature=c28a408de56585fead1085d30a46dbc49ab9d660502bcca5e14e91bfebe4eb7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XN5NA4TB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEQgrV9H0zsLUijmFVqtDS6avZ07kZCxmxxlruSkE3F9AiBGEiRDTZpu7TjtmZSfhejGpCVXCPVBlWcdQDBg5Pt3BSr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIMrHyCKbVkwckCEYFCKtwD4ud7oWAyciBpJ1CqtTsi0HdnYe6Bn02zlHWUIdbdxgapcToCI%2BbVmKH3GOgUNsVJQ60TNYDayXacWhZw7lz1Scr6oY%2BMyk6l%2F0rlKu%2Bc5wnuac3yUVnSL0X9X%2BpTXSGAVSpeSnbnACGQw48UdQRPIH%2BklIPnG7wmJUw6I2a5NknNNZ%2BEqatpQPYrvVo6ffFskg4%2FphQt%2BDFEqPjg172eTF49o%2BGDUizDhs67GiaRNbpDbiNWNp4oUBjKBQWnPmvmGy1FlVD%2Bm7f9u7NR8l8AnHxhHfkqJNgmITwNbwRozLIs%2FK%2FhYZvvoUwuyo5KF60xWhpzsKxs8HQ8EpabNQaJuI7mDBjffe3R6DHfXAS0JnS0u6CJ93TDVexw5S01AbTYyAYZYakB5HaKXK5uscyukTduFSV9g1wD6eYhMYp1QMFqvkAmzCzK%2BHIg8nIk981tOMYxsDlCkKN2fDaaG1nxbr2lVCdYjZ81ZkamC8MP4VCAL5sP5NceErhoHjOG0Ol5ftvM47bfzpD4QLZ37eUEOPaE8%2FJJkACes90J2oZuaB9DZLd5lGS545ZYQ2oXgX316EXoC52OCrGds%2FAIGfifBYjg9aK%2BkA3CtpGrv1ZVH3BWMEQj1l34P2KsNtEwsPHqzgY6pgEQS40WqRqHUqwdE66LFdEAl8z2yF2iEio7vnvonWBEDDcRTCKshu6kGB9GLQwNncudc097ASK%2FV27nhQKtwKmHlhG7fYZoUokGOyr7f6BnThsgxcp4qVf7KDjISiM0YMWIhikzm%2BwE0hGJC6CEzGTFyOQE%2Fb9CKa6KewgXl%2BC4zPUq9L22VMsuhdIhuqrr%2F0NApKNF7XHHQsv3%2BeG5KC6Fa9YQy0vZ&X-Amz-Signature=efc8d92fb3040a32275644881b5dca55a6474c3e3cdb1eb2c6847bc9c6c0c86c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZCZBYDE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6kx2%2B2X%2BuPglTO0afj41pIi0d8OKbWUEOlSEp2Utw3AIgVBQ0kDBET%2F4j6E4%2Bg6TSjhKQ4E5idIy6fBioJ9RZCZgq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDBWDH8i%2F7v%2BdPlq3VSrcAyJzpg7n7n1SakBaaRv72xJ8F5Ep6fl7BVY92JwA28UJQ%2FYHOtWuBwHdgNpbZt19s4nZVYoF%2BnSlwQZIjGKLKrge2RVXYxIixMWYaX2JJEsipSjJh0yMB9gixsKemD1sJMhUlsV1Yxo3b3RZLdKv0QQ0t9NCGHV92biHfgbCMkeeGMDhxqL8pnxpj%2FcHmmfOpMap9IadWPRSthfG5yNWk1TpTnfIN78omG2k1pkfL7wBADhECM4r8D1SVGa87GZqUVsV0FYB19LvC3YWlhJm8O92lI9v20%2B3IWNiIiYpUllVXsTRsAAm5ZGWbrSwQKXk4iRr4RCTaW70XlZ4RrumTYb7hAOtGt29QRwaE3w4yijYmHk56GxK1OtJypiW21Y7TfhneHv0L3JjZF0Dt4b7K4q7UnsirjWo7%2BWspagaODiNO4k8kJ5n1AsLKsB0U2zZxTVt%2B1x3ul8B%2BtxkbldHo5s69ZslLJFR0xrdjOt3u%2FIuGgoTspSxK7961ZVULmHOif3EjNHwy272nzCXWOMI0rpnu1A3HOgXg4ARq9jbrCr2oo1cz%2FA%2FMtc2pw90yRWeydx3GVy4BAr3QKqYftptCHn1DuKRpyYgatrBVIVxITT0fPHql39I2TGUUqYNMO%2Fz6s4GOqUBfhHRF1zVP5geSobibp0B9wzWEn4Fe4A4qOWTSZlpOrrRZY8mWwyOGrF5xLxxDNHd%2B3EtChyMWtIWRJord98iyP2eUzCIctzHs0to3rySJ5YK3rZnJTvicoiTGqChJaRp%2B7aBCc5RV4cUXSdjgIfrP6daa03i0KjJLJ473b0oYO5QtMITrVyXoxEAyjEjjO4GpcgUAS8kRp1ct5tuFdNchBzdxJ84&X-Amz-Signature=949da8be54855ae87cdc08f1b2c2a5629a69a7d51815b99d89b6382b4fb6e1c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ZCZBYDE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC6kx2%2B2X%2BuPglTO0afj41pIi0d8OKbWUEOlSEp2Utw3AIgVBQ0kDBET%2F4j6E4%2Bg6TSjhKQ4E5idIy6fBioJ9RZCZgq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDBWDH8i%2F7v%2BdPlq3VSrcAyJzpg7n7n1SakBaaRv72xJ8F5Ep6fl7BVY92JwA28UJQ%2FYHOtWuBwHdgNpbZt19s4nZVYoF%2BnSlwQZIjGKLKrge2RVXYxIixMWYaX2JJEsipSjJh0yMB9gixsKemD1sJMhUlsV1Yxo3b3RZLdKv0QQ0t9NCGHV92biHfgbCMkeeGMDhxqL8pnxpj%2FcHmmfOpMap9IadWPRSthfG5yNWk1TpTnfIN78omG2k1pkfL7wBADhECM4r8D1SVGa87GZqUVsV0FYB19LvC3YWlhJm8O92lI9v20%2B3IWNiIiYpUllVXsTRsAAm5ZGWbrSwQKXk4iRr4RCTaW70XlZ4RrumTYb7hAOtGt29QRwaE3w4yijYmHk56GxK1OtJypiW21Y7TfhneHv0L3JjZF0Dt4b7K4q7UnsirjWo7%2BWspagaODiNO4k8kJ5n1AsLKsB0U2zZxTVt%2B1x3ul8B%2BtxkbldHo5s69ZslLJFR0xrdjOt3u%2FIuGgoTspSxK7961ZVULmHOif3EjNHwy272nzCXWOMI0rpnu1A3HOgXg4ARq9jbrCr2oo1cz%2FA%2FMtc2pw90yRWeydx3GVy4BAr3QKqYftptCHn1DuKRpyYgatrBVIVxITT0fPHql39I2TGUUqYNMO%2Fz6s4GOqUBfhHRF1zVP5geSobibp0B9wzWEn4Fe4A4qOWTSZlpOrrRZY8mWwyOGrF5xLxxDNHd%2B3EtChyMWtIWRJord98iyP2eUzCIctzHs0to3rySJ5YK3rZnJTvicoiTGqChJaRp%2B7aBCc5RV4cUXSdjgIfrP6daa03i0KjJLJ473b0oYO5QtMITrVyXoxEAyjEjjO4GpcgUAS8kRp1ct5tuFdNchBzdxJ84&X-Amz-Signature=91737f3b05bf32ff01d8723812d143ea664c19a900954803e697407295299d4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7E4SD3T%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAnIJ3drpHNkoKF8qK2XmGWudwkshdWvNYcoHNioM2ujAiEA2pHzkbeKNUsdm9DiZcMoCyjZHbcOMgITTg9o4i3dRJ8q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDGljpLl0vN2fUoxuQCrcAzgvNToZVZN2x0COAiLKBzT6H3DYOVqG%2FWoLxyUJNQ9j48a7SrArrg6oeAFdUHTr9K4NAykPwcluiykCHxApH3w%2FgYl0SQjPshLeBBXXqIlhGQ%2FSeMrj6NbqnrkIDg3JrMpW2y8jud6NrmACxF4xtADdvU6%2BGvNvomEOrS1lmW%2Fi24UEVENILiLs5LDeJlQ259d0Tv9k%2FgHvSf7lWq%2FHcB%2BVOZUJ3qVR27Mgicv6yGcfBuMbqtgnAVddvAS3OSR9w4n67oiymg9rWpoadfJzokiUDxW7CWgnIMMEnsLWJjVZ7rehaISlnabnjVPnhngwZNoYt8o1zyK4uYo5mZ%2F0amKOQk5KN1DfMeftxOCkJyL3QSv3LHE%2BLxXZTc35pcTenM%2FeXdAsCFyJzze1wx2z6xHqJAQ9KfUZrMDEC6L%2B4Ge6B9kNmVuDEWT6AYU6kPX2YpchJWeR81WJBgR4UczIXJ0AVLq5WGxHSZIKiJaJa4E6QHWsGi8LLeHMJJYYM2p%2FC%2FCWXI76f67LLa3ia2lSb3%2B7UToBDmDVlxQADGvUfUAP1okd1eNgj62jsy%2FNcIM4a5GAofKsYcwT7aLs1cPs78ztL%2F0Q%2BppMQFrjPju52zPeLVhKvq3QFhDyHDnxMJPz6s4GOqUB7yxg0z4ENx1dpOLPaGlDwRzr%2FxVXdhsaG6LO1yDfezzHTBB%2Bki6GkjULjuROJ3CwyAHs%2FUVlAHiA5ST1B2nIDjcG5%2FXMUp%2BoPH8UPOdg3OIYTLew1Ft5KRBKHtrbXp75i5RDlUx1XRGwDMFhiDvnQPgb16dMlw7XiBR0kEaftJYDAhSgiHpzauQY5z931RDy16sGtt7FS4HHcPhTyYbvLfMWsCLK&X-Amz-Signature=297b6f5c7049b1ff0aee14d44bb11bc6c6668be044e3aae66a4f250acec6ce1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVBDKQOY%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEKBcm6lJrHKnWFZXaSkG%2BxdDs4U9OUelE6frz1lwf0jAiEAl50zzvHIk86IobGR48se2srmU5r2W20%2FK7fMZhZGZkIq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDAP8axMIxflJAty4DyrcA%2FqzkTIYkhVVT%2FxtojPUALxurlRTm9MIOxEqbw%2FfIf3Xe2Ze8ti3ltoNLWEFMdJzIa55j5ZzgNxSemQGAL5%2Br3ebdzGFGTYFKsdmnzZ2%2BvD0wsfA1STtO7PLOBEKFq%2FxTpRTKOo79H8pnGG1XXjqaFc%2BIAHBSS9xN4nxtNE%2Fj1URMbwoDQUgW%2F265%2F%2BSAxLOitLcvFBp0nPsHIEeLthbBQ%2BGFa94u56Xsm4IwAy5xgrxRp8O3PuUHhggDXfeym78sAPvhRlrZA%2FJyn1E6J3JUslshpkqBXwm3yVdpDLYi%2FXUXq72f1CoQMmtsXjISWPHsF88CAehDUQQzuMz1CQeZ6hpBL9VsiRboZj2MK2ms17U9MG2LL%2FsGWp8pUds1APgfsvhwKvcrTdYE0gnQMUxX%2BQ4LSw7HFrMaF%2BCDNdihKoKPmDYLc%2FfqPO2T8uwq0JZLWCkgf%2BQy93tmVBqXWouZF26b%2FJGM8jbC7IcrkprvIMGYl9CvhedMoRe2na1mkhrURqm6a4B074BsMgKZflh%2BT61gcIPmciWPcdNzJOG3pPuMirl8ylkoxNqJVQwXPPDtZ91pGUOnBTq8fPs%2Fc8fICC2BXK60DWtfr0IvMy%2FCY9uzIpaEF4HCn0BEPZAMJjx6s4GOqUBV9QJrrTuq%2FxBv9FDbDKG1MEH%2FxfNkaybqUc8Lrq8oD2VntDKfAWf1zBQbf4KlK8ll319nznPyyKCpkSvfKdSaU%2F2RYHXXtgolfFpM%2F1vKETrrcF%2Fd15fqqNDJ19IS7pobjcrAh7qRTRk0Sv%2F3fTmthCpzlzIRmTWdIOIj794sP%2BOJYCACyunAa3NUkefX%2FQH7ZPrm9mAGxeLT6nP6g1ET9QJLJUG&X-Amz-Signature=161e0edeea028d4e93e8489171a0c41e0b375571e8a009a27b4b83860a166cb0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XM3ZO62E%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAOpmnyqDeOCCMA260qB7LFACJGuFAPA2vQiOmCevS5fAiAcDxqejzxMKZn0XL2gWPNpQVAIUbbolGamhO%2FYBFPtKyr%2FAwhOEAAaDDYzNzQyMzE4MzgwNSIM1NE%2BWpNd2FirZZzjKtwDzC5q35xjzbgfMPMo%2FxdQCZ7F5hM9KQXM8CH3ihqEbKunANq2%2B59Es7uv5Xsa%2F07hdUJyOqkZIDD0wvPhiYRhpDQC%2BNa32r%2FktmnZx5EigMmDVb06jIf9%2BVYQe73FkB9oJZmVNZumKPP1r%2B4NNTmGRtaqN%2BV1PODOl5Nl%2FSn%2BKnoF5CE%2FrYksrasOLR6nwM6OKFJe5osA6MPzrGazKLgmLLbqDTTZEtmJ%2FVuUh0svBzbNChzZ9h7XCtStxc12HSjCRQEJ%2FvNDKzc5hsb6RoDE1FeWMYbyGR2c6EeVE596ubJ%2BYLe7PuYuJyNegrQTHw2S5zwOdIKmifL%2FO3uxhtte4H%2B7znF4dgJQOeY%2BvFmdP2dCyxD45a56fNO65Rx2uGDJmI3AmmZZeexcgAPXnhhcUgC2V68ubiaCLgKc6fuQvdbnM%2BPWMkDaUXzSUFGC6jcdwB7iw977o3QJqQC%2FCkFG%2BO%2B4GTIb2G3FiB1xVIqGcYe6ycaROMNSojA4RfIkweiLRptUhVNVOEwtagRrUhPVipcfAleDqokNfPd85H9zUHF2CkrmAA0eKTe9D53J262HKpCnqQdvVkcPwU6TSyof%2FGeytBOIvkmdo877GoYiBetzQdvb7WM7rVpbL1kwyfHqzgY6pgH68e8ytlzBtnHTsmNWkWpW9ZcGm71J6GLX%2B5RPEQn1nBFOJyuTumU6qm%2Fo4GqaKTFgBcK6T7BRftjwxct3dQm1niIHABzRl3%2FgeushOZLYE45FRb2R4%2BpfnbBnNPlVoNuV00AAQSSNKxT4PpRzZvoNEC4eFv28xjvb13RM26t%2BkhCnmtxeLQJMADfXZeL3N8AzRJ5Q9OfoavgmU6IU54oknEZUhKXu&X-Amz-Signature=202b2a00e6a6aec1af6379c3ebbd6886207ae3a408652f06a7437394a8388ca9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMLBA7PN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICz40oUzrFa1p5Rdadjkb66WDOm8mD%2FHiOWg491JCFwGAiEA1d6idXgS8qWLqN7%2F%2By0eJBEOJ5hB%2BZDS2YF7Za032rkq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOgbLN405NY4L%2B%2BTbCrcAy%2Fkov8kaIDgEaJRffQZ1vgNpfEugbLipJbJMYmxu7XessUugVxyTqP0YMNeJBa2Fn32J877oFdQCy54DQaybaC4YBompT03tI28j1AYYUvbECvGLx1Sn7W7jwaEToMt19aerasdvxm27h16uFElJaGPsTILdpazO4b3h9g%2BeJ8HPBrPhWfyqhGZEYuGauSRolT2LUOOzKMEmrXCaWTHMIR4DsgmAao2JATOQ5FArfZqc6ratUYAG3zd4IOfcGi%2FHEyx4BZdQJopcVifLomBHaT98jS24olezoI1TfzcK5c%2B7wDNjlc7JNUdsDHxcdTKHpVmKNF7XmVERO375OIbpxH1JEWchdfInBSkgfCYItR2zb3%2F6gKOCsAW4Zu14WdI8K%2F4rEpCKISHdu4lHYa0CmB3rvj1%2F3cJ9jYVSmiY%2BUPEeozcFqHSYEQw6D7Kk2B50aoFXVny%2Bvj%2FTetup2NTq1s5TcgkVFzHZRqYrRBhpmrPaJ4bFPhDJugconXHJWCj2jfL11aQDVqLMCVeG9iUjF303DPBq4ugbrd%2BTwZJd3gedDVBeBV3Xtb7CV8k3BcrVbc2nejFzTYLZtL0OY5xLu8flzUHkl1jk9nwePJbZNTVKhPz7noN2oeCfXNoMIPx6s4GOqUBk%2BpA2JWfjw1efApwraH9lWeZrs0JnJAUe7c9E2oNhREp3EdMNr2CysFCXLaVXbs%2FGIOHNGKxzDOnGx5OgIpUhRAp846R3fMlctngwtj%2BVJsZDWFffcEHqdM6JgCAgQ0E3r4%2BKI%2BRpiZ6%2FafnzCNhwyCsf2wp6jFRB8hWT3du7wHi59adb0M0K0YQv82Awd5XUiWxRSodyCrksu6JoqbHTuTvk9AJ&X-Amz-Signature=5d608ffda6f99fac6f1277bca5be7c1f7b435b577aec3efbbe6ccf11fd382d22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMLBA7PN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICz40oUzrFa1p5Rdadjkb66WDOm8mD%2FHiOWg491JCFwGAiEA1d6idXgS8qWLqN7%2F%2By0eJBEOJ5hB%2BZDS2YF7Za032rkq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDOgbLN405NY4L%2B%2BTbCrcAy%2Fkov8kaIDgEaJRffQZ1vgNpfEugbLipJbJMYmxu7XessUugVxyTqP0YMNeJBa2Fn32J877oFdQCy54DQaybaC4YBompT03tI28j1AYYUvbECvGLx1Sn7W7jwaEToMt19aerasdvxm27h16uFElJaGPsTILdpazO4b3h9g%2BeJ8HPBrPhWfyqhGZEYuGauSRolT2LUOOzKMEmrXCaWTHMIR4DsgmAao2JATOQ5FArfZqc6ratUYAG3zd4IOfcGi%2FHEyx4BZdQJopcVifLomBHaT98jS24olezoI1TfzcK5c%2B7wDNjlc7JNUdsDHxcdTKHpVmKNF7XmVERO375OIbpxH1JEWchdfInBSkgfCYItR2zb3%2F6gKOCsAW4Zu14WdI8K%2F4rEpCKISHdu4lHYa0CmB3rvj1%2F3cJ9jYVSmiY%2BUPEeozcFqHSYEQw6D7Kk2B50aoFXVny%2Bvj%2FTetup2NTq1s5TcgkVFzHZRqYrRBhpmrPaJ4bFPhDJugconXHJWCj2jfL11aQDVqLMCVeG9iUjF303DPBq4ugbrd%2BTwZJd3gedDVBeBV3Xtb7CV8k3BcrVbc2nejFzTYLZtL0OY5xLu8flzUHkl1jk9nwePJbZNTVKhPz7noN2oeCfXNoMIPx6s4GOqUBk%2BpA2JWfjw1efApwraH9lWeZrs0JnJAUe7c9E2oNhREp3EdMNr2CysFCXLaVXbs%2FGIOHNGKxzDOnGx5OgIpUhRAp846R3fMlctngwtj%2BVJsZDWFffcEHqdM6JgCAgQ0E3r4%2BKI%2BRpiZ6%2FafnzCNhwyCsf2wp6jFRB8hWT3du7wHi59adb0M0K0YQv82Awd5XUiWxRSodyCrksu6JoqbHTuTvk9AJ&X-Amz-Signature=d5d6772768f5126b9a8866cb3820d5be21a3899ea9a66d7a9ed264f8bef8f244&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667ABZSGZA%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCC%2FTa73BTvq%2B0lanRo6I6l56GkoD2A8P%2FbwDjRifiHxQIgUZzNWGOso7r%2F2yuBvdT527IVsz%2BMd%2FBU6s%2FYylxgRG0q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDPsGRn2WPsAgfgzpoCrcA2y5Edihj6GNLidyYik7Tv91BSIbg%2BqbMHCx2A%2B3Qm0M%2BqlfSlDVBo5BOV9wIPq1fM5Mrbmt01EHHjoKo8Tfok79zDfRQVaqVOrZ%2F2wpasQ05qk5pbujSpmwlJud0OXpwgAmzUkSWgfwfIyRr6J7OWoX6FhRv8lkO72Pan4WLv12TSRh6oPLvCmgTDk%2Bt55JS7X%2FW2d01R7DeRi5u76aYa%2Brre6zPDwuYUd55gYwNtdsIDtbJOVXdCVAlFokz5%2Fx6ooFa540RmZYdeL%2BYCONhsuyRuxDuN37zRO5c3QVz2EgqrFdo4xBrvqWh7NihAQ%2FtciNFnXr%2FwJGiR7N5Bd8wuNLvfE5997TP%2B3Gk8N259Q2V2j5jeaovvCFTA3HAxmfVSNfRM%2FojzWl8isPOPVDL%2FlBsYwA2H9jYiS%2FIjI9USR7s0HUkBjf5IyUGXZJz4uv5CyhuoZccz3ysO%2BdlV8FbRmWoYwAG%2F8NvroOIFTwarEffT1iUeURYMScBjkk4VnMYPtblz5H1Tf3EU0TSKm44qBq1ffzT9PmIwaFj5%2Bu3xTdVG%2FoNTxPJBTG%2FtYuvLiiva83oS%2B%2B4c1T9efKpLdxv%2Bd3Jx4wZ%2FTpGfBJH37VS1zBkG7%2BfUFUYT01pPhOMPXz6s4GOqUBsQJxkJLvyC4A96VHMLU31XyGUhVRxf%2B58Cmz5mIt1yhtW89D5QZ%2FkHGdeuZ8VBG5QIXBqTD6um7dbHeqwR6E3%2F6UCPYEtLr1BxBg9gcfIde9H6ChvcQrlNBJbftF0Q8bUssHOxM0NlOQGeF5GbeOOKEU8ayH94CyQ5a33I7O4XsmMdrlGIXuhxdUH1F35HlaE%2Fd%2BAYlnuPezz5AeHXKQJMBX2Aik&X-Amz-Signature=1ddcf2de0a898df6b2c279ddbf45595396281184e0aff2847c3e7ac302ca7736&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642DC4WVL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDzl2rhJY2ce%2FeFm4iG4Cf7KcK6cXQOdexT%2BlE26HZPbwIgD81vzxmIXmq2G%2FXURDUpd8ABi2CQIFCcO2tNmwDpNw0q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDI7TRS%2BObkX%2BzXVWWCrcA9uAvuvt0jLLBji2D5QeFbuOVdfsgW5OUqhx6hY46IsLLVveu6Nxo38rln%2BwKz6ukml9p52YbDD95sZTPPDjrBKOHeZj%2BfHaiJYeEDUvALbJWpR4Jg8IOkJ%2BJe5RBuyJMDglv%2BS222IExc%2FYPOwWjEOmn55%2B2CUw%2FOkjGiosj64FX9WlHDZzWw%2FCifUb9QVZoNFC6dX9TGeeWLxhQOq0mb9sKfLSvFNxPVPuAvMCm%2BKEGizagigAskIj%2BeyUYRdGlXp9t7f6loyevvEZ8QUwVjizVf1xNCoPd1josnjJTPBmF2GZEhBX6j3fCQwYhrxTp0qOUXCYmfqQwqqniqA2ijZILmG9U8w5DHXZJCZM5%2Faae9du4YZ2gSXF3Ci5zFcfbqMAJqAu3Qz0C3QzNIT%2F%2BI%2FtsDozRsGlxDt7fxb3gOQE3yHaxHSdpfrPQHmAsnR0v20jMacbngkOb%2BvwHYTqQhrc4lJmQ6yvvlBE2KdLqrGRx3F04Um7Ime0WltSDbUd9x3fNEwEi6ObZSu%2B9XgYB%2BG14En1FsLAYWH5honH1z7eVAmWAQUtqPOJyE8mTefou4DtsJNwAZz1uYL5xBt%2B7CtihZuHRjVaRxlbsJ0%2FOOmMcIYSViWlhxGCTIjnMIHz6s4GOqUBfK69xoTUM59svLKY2zvKOU6MF4elrW9a7R6Lix1bXoCubtKgG%2Fbt%2Bp8ksPJqVutc2GOqPzQLTIrW50wK05guGwqShEJpWvIuBK38eGaxSZ2XFLPtXHr3g1k3NDi%2FwjL%2BNkaI3wstPR3aBhQ5t4l5RsoGYtjqQXlnANr8G3dhxvx%2FBBrpoTcZJyfJg0bhytCOQqG6%2BbFNL1SrRcJYmk%2FryLbMZMr0&X-Amz-Signature=fb0643e7677a1b7c404630c9e8003013626425151332836a02ffe1c97cbb2879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642DC4WVL%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDzl2rhJY2ce%2FeFm4iG4Cf7KcK6cXQOdexT%2BlE26HZPbwIgD81vzxmIXmq2G%2FXURDUpd8ABi2CQIFCcO2tNmwDpNw0q%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDI7TRS%2BObkX%2BzXVWWCrcA9uAvuvt0jLLBji2D5QeFbuOVdfsgW5OUqhx6hY46IsLLVveu6Nxo38rln%2BwKz6ukml9p52YbDD95sZTPPDjrBKOHeZj%2BfHaiJYeEDUvALbJWpR4Jg8IOkJ%2BJe5RBuyJMDglv%2BS222IExc%2FYPOwWjEOmn55%2B2CUw%2FOkjGiosj64FX9WlHDZzWw%2FCifUb9QVZoNFC6dX9TGeeWLxhQOq0mb9sKfLSvFNxPVPuAvMCm%2BKEGizagigAskIj%2BeyUYRdGlXp9t7f6loyevvEZ8QUwVjizVf1xNCoPd1josnjJTPBmF2GZEhBX6j3fCQwYhrxTp0qOUXCYmfqQwqqniqA2ijZILmG9U8w5DHXZJCZM5%2Faae9du4YZ2gSXF3Ci5zFcfbqMAJqAu3Qz0C3QzNIT%2F%2BI%2FtsDozRsGlxDt7fxb3gOQE3yHaxHSdpfrPQHmAsnR0v20jMacbngkOb%2BvwHYTqQhrc4lJmQ6yvvlBE2KdLqrGRx3F04Um7Ime0WltSDbUd9x3fNEwEi6ObZSu%2B9XgYB%2BG14En1FsLAYWH5honH1z7eVAmWAQUtqPOJyE8mTefou4DtsJNwAZz1uYL5xBt%2B7CtihZuHRjVaRxlbsJ0%2FOOmMcIYSViWlhxGCTIjnMIHz6s4GOqUBfK69xoTUM59svLKY2zvKOU6MF4elrW9a7R6Lix1bXoCubtKgG%2Fbt%2Bp8ksPJqVutc2GOqPzQLTIrW50wK05guGwqShEJpWvIuBK38eGaxSZ2XFLPtXHr3g1k3NDi%2FwjL%2BNkaI3wstPR3aBhQ5t4l5RsoGYtjqQXlnANr8G3dhxvx%2FBBrpoTcZJyfJg0bhytCOQqG6%2BbFNL1SrRcJYmk%2FryLbMZMr0&X-Amz-Signature=fb0643e7677a1b7c404630c9e8003013626425151332836a02ffe1c97cbb2879&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDAL2ACW%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T232051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDBzCuFOSRuqd7MC4cbiaZLrpFe5nqAhwXmkg7QamBr9gIhAMWS97cW1Md7V722yPT%2BTdoq4EpUhi%2BPmC5IdPlSfvoiKv8DCE4QABoMNjM3NDIzMTgzODA1Igxu3kE7%2FlT5djubRZ0q3AOGThpQ5XRcRdiX2vp02r4rCjixSeN2vffsg8hw%2Bow7L8N5eFTo%2BmfNVtQl9SeSuRUUwjNuvXEukKcF54bS4UuJUn03NMPpNef5Y1MX8Yw9k4IlUOnT37m78ddneSykdFnNqtnLwh4J3rr8mco1w%2FvX%2B6zo1Z46aF5%2B1%2B465lssOy37tKLdD7Rz0lnRKpmP9vJwMh9HZJkAoCO7GKePDqo%2BCEgJIMWdyAIC1YoAuGwYbT4YVxJpZrcxIDxF%2BK7Yhj9gcdp%2B4r9WKUGAtlsfdFKfgbJC%2FgKmfsc%2BtUgLU6NDMgl%2BPIoh4kHz4P12VrdACrGVlnRvCLw9XDSR6pWiRKqIjO3M7twmU7AQ1W%2FDz7ugvAnAJdF5%2FKdbSNosfux9Gtu7b3E%2FyxVVZNFLhNN3G1VgJW3yE%2BBnzWYa9hWi0b4A1FNKChbsh32px62qqmK0oMNOGFj8hKVMlbWt8TGyqTXI8q0wWhIyiUKZckNG%2BSGd47zOI5iYivX6VhkC%2BSFU0FOD8m3RmIIzmiano267ZVHK127RbEndrS8uULhLd4n2TW6vd7yAaE3IHLN08i78HeaGxa%2BakcP1WI2tI1H67CapQAbAJSH8Sqap63tt0757TF8O6JZNFG3Wr1wUFTDE8erOBjqkAY%2BHLq2La91y2gQjL7j5jwJ4s03qEVDoHCjtych0OoA2YGe%2BcbvcvfsuJviyf5BUnoZdMijaUzEvPV%2BAQCS7SVoQG0%2F2T5iMyMAo0CDf0QcrMCfK7pFo%2BpxqP9vzrZiBM%2FD5B5OmwNi9qUeMSgf6xKSLt844IXGDUqBtgb1IZqn5Zvy%2FabBcWmxBiryLDAV7C8xXjB2WpccAvM%2BXFNsxSa6ntEFE&X-Amz-Signature=a0c5c5164a4793f54db2a75105b7ae75ad75e91e8a4720e87a68d553c43f51a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

