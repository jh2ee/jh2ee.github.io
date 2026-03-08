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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKKRBFFM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIFlGyT8GYvAmNJYknjkkAmKZhT1tv1mS1hvU1MB7ZPyLAiA9%2BPhXYwCqI4AzVl6QKMRPXH0sroyzip7FJm0P94APYSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIM4oxhLR8FdqllJ0ruKtwDs3o3eotPTxzvZKOrNnO51wWpqqE%2Fwpnv330t%2FIBNkOGi1rUWNApi64ZtFVn2n9VTwaf983qRxHmvyw%2BQOTgeT5LE5fmu%2FVAWw%2B8ug2Fs4cpUzW%2Bx9UlaDzBHRZJU%2F86enIp5%2FaBzCC8XWxnndPo8OOGBI1dZWXEscsulR9goVHDfvB3A2j2cwUnI7v%2F5m9D1iubUtn2LwZbPCrnnrlSHe51tVBVdPVxuQxfgOAnhiY1kjc1mSN0vV77gE%2F%2FjSH3pbDfqUoMkrSxHrJ2PpMdAaXa6UBWq9zaH84yK3dCVazusFw%2BK2Z16z5R2xWPB8GwKxEd9clpoZ1ZUeRxabl%2BLTiy9zEwHz%2Fkc2i2fpnY2m90OeOQnOLyxJi5%2F4gWetGuqfGUP5jAuqIGNUUFkcBh2epRf5ObRA6jZiDu9ANwSW%2BWNso8QCWVIebN2ufHsT6w284EyLxFf4EHaiRGThKKwb4f3LLw2m4N%2BeKDL3lSdGRH2j34zis1m0oCxmeOTaOQ08FX%2FlKbAaRecEbsTWYP%2FYYDLxK%2F%2BZ75Dd3mf7Dxt%2F8J9u0UlenwmOTnhTuQBRZjkWs2DW0SQ24TCHjvWeFU6IeiwLrLL1wS%2Fk58RkI3xgADns0Wpd%2FfvNqFAIrcwn%2BC3zQY6pgGHNmhd0e%2FTG7RQYlzZ53gNxko07oQ9mWB0rfmUEqBFStdkupMIxljSauiY5e9lsbOS4hXQZzzyk%2FN0WxezUvq1QDnBprGs5ql7RXD3mHOJRaMkeUHURn2UN2x67erWWShBaYiKHQdhXQskGmQ1ZrO3tsCEORAbLnUjHb27Vkz5bBoh52CPKv%2FZ1VLqTFtfXCN%2BgHRtHVHOrLJHd2LpA4OqtMJSjsB8&X-Amz-Signature=c52c8944c60aa643ba89b47ca4f16551e04a2b5b2e0ef37c0f22eccbcc55f75d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKKRBFFM%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIFlGyT8GYvAmNJYknjkkAmKZhT1tv1mS1hvU1MB7ZPyLAiA9%2BPhXYwCqI4AzVl6QKMRPXH0sroyzip7FJm0P94APYSr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIM4oxhLR8FdqllJ0ruKtwDs3o3eotPTxzvZKOrNnO51wWpqqE%2Fwpnv330t%2FIBNkOGi1rUWNApi64ZtFVn2n9VTwaf983qRxHmvyw%2BQOTgeT5LE5fmu%2FVAWw%2B8ug2Fs4cpUzW%2Bx9UlaDzBHRZJU%2F86enIp5%2FaBzCC8XWxnndPo8OOGBI1dZWXEscsulR9goVHDfvB3A2j2cwUnI7v%2F5m9D1iubUtn2LwZbPCrnnrlSHe51tVBVdPVxuQxfgOAnhiY1kjc1mSN0vV77gE%2F%2FjSH3pbDfqUoMkrSxHrJ2PpMdAaXa6UBWq9zaH84yK3dCVazusFw%2BK2Z16z5R2xWPB8GwKxEd9clpoZ1ZUeRxabl%2BLTiy9zEwHz%2Fkc2i2fpnY2m90OeOQnOLyxJi5%2F4gWetGuqfGUP5jAuqIGNUUFkcBh2epRf5ObRA6jZiDu9ANwSW%2BWNso8QCWVIebN2ufHsT6w284EyLxFf4EHaiRGThKKwb4f3LLw2m4N%2BeKDL3lSdGRH2j34zis1m0oCxmeOTaOQ08FX%2FlKbAaRecEbsTWYP%2FYYDLxK%2F%2BZ75Dd3mf7Dxt%2F8J9u0UlenwmOTnhTuQBRZjkWs2DW0SQ24TCHjvWeFU6IeiwLrLL1wS%2Fk58RkI3xgADns0Wpd%2FfvNqFAIrcwn%2BC3zQY6pgGHNmhd0e%2FTG7RQYlzZ53gNxko07oQ9mWB0rfmUEqBFStdkupMIxljSauiY5e9lsbOS4hXQZzzyk%2FN0WxezUvq1QDnBprGs5ql7RXD3mHOJRaMkeUHURn2UN2x67erWWShBaYiKHQdhXQskGmQ1ZrO3tsCEORAbLnUjHb27Vkz5bBoh52CPKv%2FZ1VLqTFtfXCN%2BgHRtHVHOrLJHd2LpA4OqtMJSjsB8&X-Amz-Signature=c52c8944c60aa643ba89b47ca4f16551e04a2b5b2e0ef37c0f22eccbcc55f75d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VI55XAKS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIDmgTMAsH2WuJ%2B2%2FriegLEtsVl1IVVNPNMtGDQpsg9pGAiEAkNrG0%2BZgoHbuSRnYg6AfstAAty9letSqjI3halmlLUQq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDJTsU4E6JTSsuyPSEircA4ti9%2B3fqIuMcVLgA9T2yC3FK33x7mR5j7gEOs44kvgrvfWpXtjj3rGPiEaJT%2FjZhFz3jPx0n1ooxuyBID6SFhkXpWcQJVbsDarzMfVHMa1PwmPTrbtwF9rMj%2FKC9ntfx0MKFaR19BdS%2FDRc8HhdPSVSTjk1m3kamMHsUmoYC94b9FCE%2F%2BRkqCWHJyxnk45UkwAWS8UUuoTAgViph5QsVQWnNoSOo1HMa5gFbK4CAZfT55QdOujqW6ew5N98cIx2ID%2FfE1hQQdYRoCfVHrTOf0J%2BwSch%2FDl2Lt6bMumI8nYIrdNOAA2vjVR4aMWWcUsCrkb6OmM%2B3OmUmszfqxoyLOy2vBwHzkv1aZHI2V7OIIrm1zaWF4xZxlG2v08H9l1CZ%2FNuBURDj21s7jvOShvGDlRb1SvnCssQRlYxf68NDcKEOfLsdJipesRKkkf8dMZXsPI2pnHwl8YBp%2FtWWW6DwWJUMzDfLfXnfiAsuIF%2BMW56esMyqhBtRpcwJEyrPan7ysn6jgMQeN9YDL75Oh47ptjM0bffLWxhLKc%2FeO4x6dUvbUPQLH%2BFStYtkQdNgtu0lyoB761zSUfetJswNAFf3WcYXufoybG1XdEYUA6iI5cOMHeJ2vs2UcLr1o3BMIDht80GOqUBAWFDlNqmOv%2FNizkyy8jyGu09OwzbPGTqX07poDwnhR67dqVAGPf8I775VBxDzn0EtckApt7pJzFZP2yKyQHrVnKQPS%2FW3LtSGghDVWgWohoyCS9cnIXhF699YgYaahKZ56jpqznx93C%2BJAmZiUHDNBoYF5YP9qpewXtiutooMLAjvqefct3bavEWoGG6rcfyIi0zbwVrTkig4SRxCTvJwrF3Esus&X-Amz-Signature=da7e0b92e4ef5864b99f526ce5824a0e7fb15869891f0f1da4f092146493f89a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7WKTPZX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIFfNutgXwt5MI1dgQdM6%2FNdzDhKaYKe53ACoz4xCSs5nAiBhLcWbRryO2QkKx%2BCCnT4begYhotU778EXvzg7jNS0mir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMueIp97VcpDhqeV1kKtwDKlDdYx%2FuCda%2BG%2FqZuJ2R3Sjtu%2FlNZ5rc31tdQX9N0AfOvQnTlHGz%2BsIgRmkEKglYf91NmNpIPuYDLt2a1LGUMHhmcX4ZVSec2bMxm0kbO%2BW0bpcsI9y7LNVVb%2FEZOhLAl92RyrFgdVc1z3ZVlwG2Ckilu3A6XVi9COdNDxSV5tYpzuVEW9GKB5xlcciRSl1EEkg9V56me09p8KAM8Fo5uRRuk1T9t4TRrAXvtSpMBTmlxccjConqQRYIzdJx3b%2FdMtWQnFDTVCjAU%2BmrFmMb4iV4KRuboxeyzHKG5%2BhewVSXwzateuTLq1xj2Sdgtc5YfRMDXPPQM1Lg5bBWidA9m%2FgVRsEVbunYetE1DlVA4Y8igREHuWK73Jls5IqU9lcmk0fb6npe26vqD87826isTty5On53119w3KPzy4OCTrIebSAc%2FejrTUAIDGmo0Av7aA1os7kZLAy%2Bfcv585FMXe2tcAO1QjgftkPcP97thkxzSjJWWfY%2BiF%2FyoYWiN8O%2FCrBA06OhrGfui7joWY6thtpkfx0Jl9nrice7z13mNnANlVLVNcndNnFgic7Q2FY%2BEcwv3a0FTGiwP1Or%2Byx86iVuK%2BrT0hLmiIewLo22SL1sYQC4AN3MB0XQHB4w8OC3zQY6pgFe6TP4RjmNH44lsstfYYCkwJ9GDcJrHwdlnWYeD8ZW9s8bzUxtoipKS%2B%2BXjzjKL%2Fpz7TGesW3H7Vv0PiKdsi5dSC%2FetLqABNRdf%2BIWZsJlZzQxK%2Bq%2FnffkYiBPw%2BN5INY3xeapS1ogTCGugoAFItx0Mioh1mlssNqOAoS3jBVcsRb2%2FX7rW34GoSWgYWitVgD5xth1o1PPnDqFdDjJ2r7SoHwPAsbx&X-Amz-Signature=8cc6253454a42f090bbcdb004d7119a564f528779b1483e4fa8a12df45bd8f5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7WKTPZX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIFfNutgXwt5MI1dgQdM6%2FNdzDhKaYKe53ACoz4xCSs5nAiBhLcWbRryO2QkKx%2BCCnT4begYhotU778EXvzg7jNS0mir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMueIp97VcpDhqeV1kKtwDKlDdYx%2FuCda%2BG%2FqZuJ2R3Sjtu%2FlNZ5rc31tdQX9N0AfOvQnTlHGz%2BsIgRmkEKglYf91NmNpIPuYDLt2a1LGUMHhmcX4ZVSec2bMxm0kbO%2BW0bpcsI9y7LNVVb%2FEZOhLAl92RyrFgdVc1z3ZVlwG2Ckilu3A6XVi9COdNDxSV5tYpzuVEW9GKB5xlcciRSl1EEkg9V56me09p8KAM8Fo5uRRuk1T9t4TRrAXvtSpMBTmlxccjConqQRYIzdJx3b%2FdMtWQnFDTVCjAU%2BmrFmMb4iV4KRuboxeyzHKG5%2BhewVSXwzateuTLq1xj2Sdgtc5YfRMDXPPQM1Lg5bBWidA9m%2FgVRsEVbunYetE1DlVA4Y8igREHuWK73Jls5IqU9lcmk0fb6npe26vqD87826isTty5On53119w3KPzy4OCTrIebSAc%2FejrTUAIDGmo0Av7aA1os7kZLAy%2Bfcv585FMXe2tcAO1QjgftkPcP97thkxzSjJWWfY%2BiF%2FyoYWiN8O%2FCrBA06OhrGfui7joWY6thtpkfx0Jl9nrice7z13mNnANlVLVNcndNnFgic7Q2FY%2BEcwv3a0FTGiwP1Or%2Byx86iVuK%2BrT0hLmiIewLo22SL1sYQC4AN3MB0XQHB4w8OC3zQY6pgFe6TP4RjmNH44lsstfYYCkwJ9GDcJrHwdlnWYeD8ZW9s8bzUxtoipKS%2B%2BXjzjKL%2Fpz7TGesW3H7Vv0PiKdsi5dSC%2FetLqABNRdf%2BIWZsJlZzQxK%2Bq%2FnffkYiBPw%2BN5INY3xeapS1ogTCGugoAFItx0Mioh1mlssNqOAoS3jBVcsRb2%2FX7rW34GoSWgYWitVgD5xth1o1PPnDqFdDjJ2r7SoHwPAsbx&X-Amz-Signature=e5ed54a54fb572fd5aff6fe271658e24b80c04870283cb7a6ead655356e90313&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633YXF4BS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIEafrQlkDSUerokZANBTWDSonpY9L%2BU2Ts6oInbKgiizAiA7quP1n7k8UaQloVslnnqN91HG9M7bH9GgvhUi%2BCYg6yr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIMZmUqlEpU62Es7IbeKtwDg7OV7OLLvVlXtWsjPLKUX9H8z%2BjR8l0XfAw3uoLN8pzZ%2B2peDguLjEfnsHURPdkgQ%2B8SxNlheqovrWGbmmRN%2BVouIaql7EiuCQsJWjbC4Arb2DmlJTriQnwU8hDO6S2Ryy4nrYm2O8nGTYeMLhcPo4WKvTmr1ekSxNm18y5voe%2BzwCSovafTJaOGS9gxj4v5WEjYISeobVs4OW34%2FvnJ7pY0vF8MKCHxgxTu5iH8aDrB3zlhnl0kNsCHSPLZrJDZfbwW4QzXqY%2FvGQqcUAS8WABJp6iN72tbBXA%2Bh6leglOjeTYKBUwRJ%2FO3pzkXvMK1mM7S6gshzBNJ7R7JKnKC4K00vl%2BP6X50sdIFgixceRC4Ay1%2Fh4IrOb6X3gx473OeDZQtcW%2B3LMXDMBtlZcuaRU4FjfCCjqD%2FXh3ciblL5AWB15vAkr98gGx5zXKBx3Wg3whIpNvI2x7GrGII5NFNNLfUMmTibPgTsigj45ArP9GtsdwtYD1bMOI%2F8ymZgu9hre49gNbsIBMlZXywy63%2FX1UD%2Bg1%2Fc8c0wsmy0tqzxwGgbX2Q4lIVUD8pdJDzh4%2FWV1CxDCwet7W3%2BYE2Wi7mRHa%2FE8g7P1RUyK%2F2GR%2FxGVnjSTkcYvKOLT3WJj0w2%2BG3zQY6pgHUNVBu5fPNlW5JdcARakjaYvHFAC2Jja9NyPZIYNxkUCya8OW2U%2BhxpWq%2FXR204ot1zruvkgAhfL4kPG9YdC%2BYpjpe8mMxA4L57VlrZLtN419%2Bhm%2BSudOE7C6LorFpm%2FOWQL6DzEr6ojRLM3jQekntFCPRGlx3raJlFiFTUeAFgzLnZLfzmbIr3DeK%2BO85Q4NorVGkdz%2FFljce6MmUUWwCXkceJ5UW&X-Amz-Signature=9b3fda2fb136173daf39ce594e8a48905306054f2fc4ed293ec7de29c83c70c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665JBW3OYY%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIBmZznUHikn8guhPa2UZaToBghHIVDVll1l%2ByFYN32LBAiEAnedCWHbBzgSxYtRuN1qSFB%2BerMtg%2FXLED1jt5zjuoxIq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDGNcY78yw4gAD5zpvCrcA6Puw%2B%2BYO8htm4EcK1HvYKaKYvy91%2BI7orePWyAa4y5d%2FmMcF4kYQYvXDRBevgL2Sy7gJKl7%2FW5o8o1xpFnTWcmxTXgsFICMIvPQtYyQ6KNNpOip0loi%2F6YcW7WoeUif12tDkx9uJs8UN4LEQPvCw9wBy0Ndb%2FBwE7wTTT6x0EofcFFZdoyVg96GX7aB3XlmV2wx3faZrwpe1XG4SPGOpl%2FBPTlNaJxAiOh5wgs%2B54%2FQGo6rGdtz%2FxwFzc8E5Nfd6MS847JtXZ6bOkmTv7jCMwv66nA6qpj3F6CYZBA7ujzjH5TtGOTr%2BlIccDmPOdqibMSnm5IY%2BbbqoOukceMn05%2F%2FJ0a8C0b8owdOA5Z9GWoFUVq3bLpeIyHJoP9GQfvDqrrswgvuhIKCObvZkk8oGxFsuPhMve55IRF7jifEKBQ1xZ3EvIMUummuMAibUNRiCzm3eDp4zOEyCnLOsSTzokYmFQj24KjRhJHj3O49F5GqmusgIaa5Dh6F%2FDEGNTYUhOauGvu8IiHwM9JoNWXze3dkZj2xkD9g8J6bPug2tjSNLB6jd5gV1OY56ynTj2Lt8hnbQorGQVZWf%2FNg%2BWocqB3pSlF0bRLR7m2g6w5bpah28Bga9SvUq1vmZuCAMMDht80GOqUBitHM1SYawL7uhIgHHqW7VvP1e5Rxj%2FnwPIj8kJucHwU09YLcoAjqm2mahLUBNT3i5zWKjJjraYV5tyJo4Ax81zvtB2ZcqxAx71Q2F2d1NH3QV3gaOvn%2FqBobh1weLggVagZ%2BtwFsvkZ65N9dYMJew3E%2BcQOD4qgVMXLPPc634wpWEZlYo8S3ihuzA9QZxuI5IOSWZdpLjWeEOiSG%2BVEQV3k9%2BOaU&X-Amz-Signature=210fd07e2599bba32a01ed98729ef2d5d41cdb8be81cf95c073e14f9ce137c26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3FTTCDJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIE4Xp0Ez%2BTJPZM3jbrpFTVP6Dp4DA6N67hIbpETLevgNAiATtZScgc%2BlYWXiAGem5VTL1oSyrSEMZNi9nUbuXO2KTir%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIM%2Fpzbws%2BoqfEj7LqgKtwDBSRsKYjj8j9U0ayrlmd1Oyt5NSg1myFghrLiP%2BzQviOw53m9%2FiVfEVeCnXgFubQght283ecZybzTBN5NwWS%2Fe%2FkXz5uHLjIxJj70Jv%2BEmV30UfpADGLWHH8zzGjQjDrsQxmypNSlKsE5csYfCjvKra24YV38HU9da4UiEUQv7OokeABTljIv3QqE4CaddaajMJ%2FmYgVQ4OQplkCNZr5VT1sBnF7tt49h4kTkAZ78z%2BAsRhWwDG0VJAY%2B3H3%2FzEjLN31B%2FnWPRDvykV5oUdYLtGpgRNVt%2BGtwxSwhWivhSZ%2BUt8woGGxT45HcvIUYG6w26etqRgdQTUAtmavwq8PODzCIn%2FApMdH7Z5EHdG93V%2FS6edJkkyMJYcLAVuNghtD1wTH1fZ7vEDPbqrTwWHN2TtoXiXe9Dkvag23ljB4qfC8cHSdoUHv0AccNG%2FG0dyAOIebAlE5kAEOeQGV8RrOuBimSZ2%2Fr4Tv%2BBNV73kEHxCWCT41m164gZVCCmqzPuwvNHBKIHmcbzKTNZAN4cmsmE%2BIemxp%2BQNsG9aCjeR%2B%2BOd%2B3vA3kxaKmWJR%2BGsVcsqwUYcdkyUJ1J4qt2Iq9JsESZmPIHjy05Uk0kRbwhULdPOyHLjlwHNnYL%2FOlp6cwleC3zQY6pgEKeFiYfQYj5xLq2%2BY5MHnlvxSO0284lQx5poDCOM68nXCP%2BFXchWIlOpXSDd2MS9Fhi5jgherBcgvjgEiff6BkUgG57PYWxywm%2Bcdzk2dluIPAFoIRkkrQuPLdNE4%2F7tBz2gLWSceB4tD42KzZyiVIEkljmJkpwEur4uj7dZuZD3%2FeFpe%2Bd8YMzKQEdPNUHG2f7rZ1fLKMnFCVMJGyHQ%2Fepdb8GqP4&X-Amz-Signature=8d4d6ccbcd3e3c921f3d76c19cad29f1bf143df7e4c97aa7133be1fb3fc0bc5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEWAXBCS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDfNa6L8Gr9tq%2BfY67HYwuv9BX0FtkyG7lfreN%2BmCCf2AIhAPCa0Q%2BwX5gr%2BnJQXS%2Fets4bBjgrIbCdHO0Cq6daDnpJKv8DCB8QABoMNjM3NDIzMTgzODA1IgwUSZZ1jWKi9Kn5l3Mq3ANZPVYIDhFonPA9kKcK9DK3g%2B4Geon7p5EwkabKKEsoLegVXo3iEu735v10716JgFLutxzBC9aU37MiIXDH6v5RTLP%2BQGAV%2FEFh2FDPO2tNxjiu3M58U%2FyxSOcA8JIckUzl9rVnjTit4hIssPvwaBzPU6w3Tow%2BRtKDqC7fzV0sOWZ0yMPQ%2BvLhMX%2B3Qrvp%2B4OKoBj9df%2FINIo1ZGzB4Z862Vcdx10%2FX0AfLnhmrHmywilv%2FHp2n%2BeNvOXSYAmyU0BvG6Sq%2F%2FeGVm3up%2FXSyeZIP2%2FsCWW8762DBQGIe2aOTcRTsrt74rEGui%2Fi4JljfBHmNVK4ksKUfKVfm9kCuVFJTqfADBFqCPy6WqmS84jQ%2FpCfDugyZ3v7271TjRq4sigydN83RT2pZWtCMAbfY8TVsXcUv21Ns4C3P%2FAbQ6IrMsG98bx%2Fc0KdqBz8IdyRNaCvcS9mx9D3CJA4mpD0tQgqAuSlJkFVtkAzjP%2FduS4anepb%2B85gx2OKgjdJv70Rm%2FOk2VuE0cH8wOzWUNawoF5hRR5aTpcycn%2FHlabsl%2B5kPeghDhfhuW1X8C2Rwjd1qpnKCV8tHikndlzltLOT%2Fi4IAkNnGqoGMv%2BYY4rQZQBSlfVuz%2F787bTRieElMjCN4LfNBjqkAfFKXjARDIu1CNH89KrdUTurZRqq4RboI8wxY1p4MjlB3lPwYGZbhtZ7i3uaEYFCtD74bX9zVfoOnJTgo3h%2BaLLYS3UwBinwBq2Gl1K1rgLBaR%2FadyiTAKZMsLmLueLkAtBzd11V9vKGmsHSMn2BPZot%2BrGwQnz9AvPNZj4RhDzhsCuFdFizlYJoBR5yhvVaCJQEb8m2%2FESTr0e7%2B2xN6%2BCXm3U7&X-Amz-Signature=1680c4a0b6d72691bcb26045de0c82468cc265a81d994cacb349fe6d0b60a4fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEWAXBCS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDfNa6L8Gr9tq%2BfY67HYwuv9BX0FtkyG7lfreN%2BmCCf2AIhAPCa0Q%2BwX5gr%2BnJQXS%2Fets4bBjgrIbCdHO0Cq6daDnpJKv8DCB8QABoMNjM3NDIzMTgzODA1IgwUSZZ1jWKi9Kn5l3Mq3ANZPVYIDhFonPA9kKcK9DK3g%2B4Geon7p5EwkabKKEsoLegVXo3iEu735v10716JgFLutxzBC9aU37MiIXDH6v5RTLP%2BQGAV%2FEFh2FDPO2tNxjiu3M58U%2FyxSOcA8JIckUzl9rVnjTit4hIssPvwaBzPU6w3Tow%2BRtKDqC7fzV0sOWZ0yMPQ%2BvLhMX%2B3Qrvp%2B4OKoBj9df%2FINIo1ZGzB4Z862Vcdx10%2FX0AfLnhmrHmywilv%2FHp2n%2BeNvOXSYAmyU0BvG6Sq%2F%2FeGVm3up%2FXSyeZIP2%2FsCWW8762DBQGIe2aOTcRTsrt74rEGui%2Fi4JljfBHmNVK4ksKUfKVfm9kCuVFJTqfADBFqCPy6WqmS84jQ%2FpCfDugyZ3v7271TjRq4sigydN83RT2pZWtCMAbfY8TVsXcUv21Ns4C3P%2FAbQ6IrMsG98bx%2Fc0KdqBz8IdyRNaCvcS9mx9D3CJA4mpD0tQgqAuSlJkFVtkAzjP%2FduS4anepb%2B85gx2OKgjdJv70Rm%2FOk2VuE0cH8wOzWUNawoF5hRR5aTpcycn%2FHlabsl%2B5kPeghDhfhuW1X8C2Rwjd1qpnKCV8tHikndlzltLOT%2Fi4IAkNnGqoGMv%2BYY4rQZQBSlfVuz%2F787bTRieElMjCN4LfNBjqkAfFKXjARDIu1CNH89KrdUTurZRqq4RboI8wxY1p4MjlB3lPwYGZbhtZ7i3uaEYFCtD74bX9zVfoOnJTgo3h%2BaLLYS3UwBinwBq2Gl1K1rgLBaR%2FadyiTAKZMsLmLueLkAtBzd11V9vKGmsHSMn2BPZot%2BrGwQnz9AvPNZj4RhDzhsCuFdFizlYJoBR5yhvVaCJQEb8m2%2FESTr0e7%2B2xN6%2BCXm3U7&X-Amz-Signature=cb83df24ded2afcb33bffa7e5cc6e298c605254d2ce6b9e10d427fff6860d6c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RLWS4TA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231141Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJHMEUCIHMwCltm1Fw2IM8hB3fWThEItGQaxAHb0vufZa3AdRvbAiEAh242wHfE4vuHIzA%2B%2B5CT6iwL2dpaSk9L0PCt%2FoSKt9Yq%2FwMIHxAAGgw2Mzc0MjMxODM4MDUiDKW6R1xarxsEvLrMVyrcAxVGSEdM%2BDk2r48MMEfjYEilnRWFoNV0OIa5zzNabxm1DeZmAiUFbmUS16wjDP7Ue7jZEJkwMfJQLIfzOoSLfSwQ7nsYhcDvJeuKhcj1WvaBTR2eXHB0CVUEJdwgzHiZ%2B%2BtGU8HstRZDGwMe2xGSTfCLvoIrt4%2BLuwDX3aRcIxy0SRIBjqWrnGVEcIRXrPU7YR%2BkQBV4P9zTIxzImg1UFD49p3pKLBuXJk8gVQbbit38SNBwch8hHTyDe6AT1dt7OAXH52pQQPFOVPwP9F29BQoiQFB%2BOl0ja3IifOF5FSAclU6jDzkj%2FTGItZloIdDzIdGDndGZfQA6%2BHIRMxi5E8D7cJZnNY7ajMuOI%2BJUfhYueSOHpHddNPP64CvRcAsXY0SyjGjMDqIGkvwhSJiTigVYw%2BP57Q7gJnHVpBE6igw5R2ukdjLF3AwnsYDO5Hls274pysMrBhMux9sWicXuAf8FEf0R5e14GhZVRDu8gFMcDlJDinch4v%2BSPWheq8eWoqXDmWQVowwVT2ISYM0svplcXOwwQMxODyjSKob4mXe2gj8IUZBjrHVjN0JO2u5phUDlxdDRxC4bu6uqeNLmvbB2JMgDF3%2B8Li7h9D7z16eRVWTUIi3HL9aWBRkzMLXgt80GOqUBr0AqxEDDqEPFL0C3WiSfxUnM2cfanWns%2FLU7m2f8APt8v%2F7g%2BGFJr9pQAU6fLmkN1XwHT7IcBv3nhOWxkXsofWZRyfCoB79OBuOtgSA7UdB8739ybSafu%2FRhJPaDmHA9IG10UrtxbBsAo7%2Bq%2Bx73DRpaTQsqV7mhTyraR9JzrpPAj%2Fghj8tBGKgQiXEvAj8Hldksq12NhVemfr37DhjqIIp5LRNt&X-Amz-Signature=b23c64cd61e50e369bd998a6ab4262ec51161beaaf0d71f48c758064b6bb4777&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P3SI5SF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDMllX0eHn7ELrWXssbPPDg2pk2BDK6AUc8PM6gmo1SAgIhAMzzWyPoMkIdCJJg0PptldugC2PeMLQJOKkwTJJx7zCaKv8DCB8QABoMNjM3NDIzMTgzODA1IgzsaVlLth9Sw1qBvN4q3APrpS9GHDqK0eO8H74QTaCjDdfqzX5QD2AejaPGM4quYv0Ivzf4Ll4l7Lwr6viYhrX1pQpqWBY6pMScQm1TA5VigFstOkgS71t31BN8L%2BQykjv0eoo4kCFt%2BLkk2AoQYbkdt56IkP9HSGtvtrBFmx3sCftXkXRbC4Frj0olbb8bJb15zpY1UkpwgRrUsXEQXiTVYVJ05e%2FhGWwvgnB2TJyq4cImeqNkEwGX%2FBLlmgW1nckcKxtNXtyX%2BymGeUFoT0yByfERMnOBOP0VtJyHg8drilOcgA0U3y7xz8jjVzTZ8zsbrczRrDOF2aaE%2FAL%2F1%2FcSUxYOQFgEkjadbINQ%2FXZiuFz05tN01ND9V2WXCRcL9ZxQVPxRFSZjqwWQS9tl2EW0iNGNtgC656p3fuM1nv4PqikJFVza6j%2B3iflh2e6ZlUktV8a5i%2FJ%2F3EieBT0aH61y9BZ2kT2oNF2bBWWC7wqRmB2WQXw2KAzSQyi41Z0OMsOLSDm9imUenmPMkhW7s%2Bb1ozjLTfDesKVnH1QI1buAoFf3tdJ5X%2Bnc9%2Fjoz1jQKmMSa0g5Y02%2FpoyWqSFRawwKGZKpkQHjHxYGnXUPfWtCU44XKESAu4FknamoJEw%2FMqSJYBVpGBWLJXy60zDt37fNBjqkAV3c4UjKKd5yzevrzgN32sNTrUqIyrTLD7UQWoUoHSknWkmCVxN0bQIHUbC4oZla4Lq%2FTziO8mJ%2FrVXxiQ1DHqhGQ6XqGMjV%2FAkWOBRtuOlbvr%2FMPfUgFi0FXQisP9fADz08vdFHAgF0jZS%2Fmo2ux9Ehbm03z4WfbjfbrhNbr%2FywMPii2lnhFxZJi1qQRaPY6jFGkX7gxl%2FCgaXzDYmB8l0tD3HZ&X-Amz-Signature=959283941738c94ba2263e0187771485d311814e80d8c285b37d391bdece7e31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665P3SI5SF%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDMllX0eHn7ELrWXssbPPDg2pk2BDK6AUc8PM6gmo1SAgIhAMzzWyPoMkIdCJJg0PptldugC2PeMLQJOKkwTJJx7zCaKv8DCB8QABoMNjM3NDIzMTgzODA1IgzsaVlLth9Sw1qBvN4q3APrpS9GHDqK0eO8H74QTaCjDdfqzX5QD2AejaPGM4quYv0Ivzf4Ll4l7Lwr6viYhrX1pQpqWBY6pMScQm1TA5VigFstOkgS71t31BN8L%2BQykjv0eoo4kCFt%2BLkk2AoQYbkdt56IkP9HSGtvtrBFmx3sCftXkXRbC4Frj0olbb8bJb15zpY1UkpwgRrUsXEQXiTVYVJ05e%2FhGWwvgnB2TJyq4cImeqNkEwGX%2FBLlmgW1nckcKxtNXtyX%2BymGeUFoT0yByfERMnOBOP0VtJyHg8drilOcgA0U3y7xz8jjVzTZ8zsbrczRrDOF2aaE%2FAL%2F1%2FcSUxYOQFgEkjadbINQ%2FXZiuFz05tN01ND9V2WXCRcL9ZxQVPxRFSZjqwWQS9tl2EW0iNGNtgC656p3fuM1nv4PqikJFVza6j%2B3iflh2e6ZlUktV8a5i%2FJ%2F3EieBT0aH61y9BZ2kT2oNF2bBWWC7wqRmB2WQXw2KAzSQyi41Z0OMsOLSDm9imUenmPMkhW7s%2Bb1ozjLTfDesKVnH1QI1buAoFf3tdJ5X%2Bnc9%2Fjoz1jQKmMSa0g5Y02%2FpoyWqSFRawwKGZKpkQHjHxYGnXUPfWtCU44XKESAu4FknamoJEw%2FMqSJYBVpGBWLJXy60zDt37fNBjqkAV3c4UjKKd5yzevrzgN32sNTrUqIyrTLD7UQWoUoHSknWkmCVxN0bQIHUbC4oZla4Lq%2FTziO8mJ%2FrVXxiQ1DHqhGQ6XqGMjV%2FAkWOBRtuOlbvr%2FMPfUgFi0FXQisP9fADz08vdFHAgF0jZS%2Fmo2ux9Ehbm03z4WfbjfbrhNbr%2FywMPii2lnhFxZJi1qQRaPY6jFGkX7gxl%2FCgaXzDYmB8l0tD3HZ&X-Amz-Signature=959283941738c94ba2263e0187771485d311814e80d8c285b37d391bdece7e31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637D6XLJA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T231150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJGMEQCIDPzD1SoDcdvWxENJoul0bDU8FY%2B3J2Gp0I67gmIqXqCAiAwsyI9mnDmK%2BZCS%2FYgBUL5PmRYp0Zq2PKj7o2X3HJa%2FCr%2FAwgfEAAaDDYzNzQyMzE4MzgwNSIM5sl0Je4L8WAR2f6aKtwDJk6GVCq4%2F5fYhwtt3R6PvXeL6Z9KsCongFbU9seD5TtooWjBJhB0asNHxHutjUBgy2b84nRvXtlwf35QcnE8VwvYoxcpz%2FfkXWueRQPVgj%2FFgUDQ1IU7ZJ3%2BOxl7HGIfitAWsUlQVBYtsinQ0pjzieMeJt%2BkuvBlw70H2W8LUkfjuNFW%2BFAGfwaG7gP%2FaeOTU4AB6ZuBBIcnVLt1fHvsc8KDWkN2oMUVeAEDCtNOoxtOIMy8lq7IdDIhtupXLiszcsfACChqaolkXDaWitYyI6QgHx938tFjtG%2ByLLtdviKSsWGRrzUHoDHeoND5IytOVK21FE8HuLciaylFNJS3AQdBOwtUvRMHYFnVk%2BrUhWsku%2BT2l6XM2SFuW7z7xfJbDabMxl0ahj9QqjWoUwqkYHt2nmVXx7GqvcbLIlayGYZoUONrbkYzcZPPCrz%2FMOXf8w%2BLewr%2BO%2BUYrXOsEc4drk0wQ61Y6U8OWWsQ%2FiJhf5WHRcjz46EVBH30PjVWytrM%2Fzl4LQkq%2FhTpTNXkNmuX3nR9Rkepve9kMDLQ4DReic0j3wcPRRNq7SpbbXgYlMLzO17A%2BZMdNnLPnt1EENo%2BVLz2GpaIvwcvC7w7uwByGMTt2o9R6baKnEFNdCAwoeC3zQY6pgEPtd5nIJK7zfIq3cCeJqf2waEF8eYBpAXJu9PRriyoqpWahrpVApWAk0hBhcr%2Bx9EhVWCHmpj8g6ncPyFGsAcYZn3ck6K3HtBMIrlr5%2FHBGSDjVimGg29wzBN6TDv8qGnex5iMzkfU4j6%2BcLt4Y3%2Fw5Vw3TKlvhTUNrTRCc1xBeUrqQXhNTTKJuyyg02QUb7Jws5c6cYeAkt1Lr%2BHNYp1k%2BVM6ZZTD&X-Amz-Signature=a55fd5bb72bea403816a36b65acfb6cd47e609e70f50cde9514e7941adeacb05&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

