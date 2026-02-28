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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BPHG4AZ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNEmCUTM9uaR8VOpIwnSEq%2BKjJTdM0uXaqyfq51oLRtAiEAl2u1sTkilhvhJbLYdD4Txj59djfVpJRI3etQpLm5teAq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDOv2TQNM4UB7476ffCrcA1ej6wCPwB1b%2FvahMjA%2FHxVt8D4OUbl%2B27NUbhUUXgsSUPfbMMjLK6hcZtaIfmnBH8fVGbaMId3ynDTHa74q8Ygc7NiOV3CPcdbAYWADlQ9vnreGfp%2B0AWvBAzx6DZyhIOt%2FuY8hRCcQNjXQ7%2B7W4AqJHyPlvo%2BRgzgTczLRmXJesSopoFzMcZPyuEdEsWIMLgLqk3tYSb9%2BVRuCykXZWaUAskNdxPdD0Rbp29WNCEhpX%2BSNbpGxHHNN7hkDL8EDmJQ%2FvvwjpHZykSywXXuH38EMTA8CAE9kZjV5hxJGBYVi6ut1iWI%2FiJrJLcJncaoSalv%2BwEFlLhVxmdNMAuuRAYyJCA1INaCjM679%2F3Q3EtaMXSYQObbQogPsnXmVpHZ5RLCaXIM9%2BoOK5zvJ6BmfGtfhNB022fRpIl440zFLxmpo2lzpekRmymePbVfhZvpaL40d7yWI2RDEm%2BW1f%2Bsek3S9bkTFaxG9yrgHRMK9L10U8Z181JRKS63KZK4C8cvyLd4JeJLreSf5R1cXo0RfORQCd%2FRo%2F5RTtbMJmV6Uo95SH1YS1zEiq8X2FPAwwOAwjC4%2BFI%2Bwocmha9DqIG6QnG9bWuehBoNs3TRKKmp9ER6Qwfhc2BTa9%2FZpPdjtMPXOiM0GOqUB%2FPtcNhM6opNsZmTGe7TJHH%2FkmKpDQPkw5WgSwTC9Ek0mY%2BIaVUx1XkHHtHdn3wUvptRwpw73NqgYK3huhEhuRNKePKda4khIkstD74%2F3dx177aYREMq%2FqyOPelzKW3xdRnTNaLHzepL%2FMs56fEjrZilLgggIvhonC4LUHD079LmoCSHqdxnZ%2BiExKx6ITVY%2F4sycpsP6arR9ZDw6qyFzfy4ThLgB&X-Amz-Signature=ef1a9ebeaaa52526f76bbe4bba7cbb9cd03c6601ff5c16547a505bda06073373&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BPHG4AZ%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEID%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICNEmCUTM9uaR8VOpIwnSEq%2BKjJTdM0uXaqyfq51oLRtAiEAl2u1sTkilhvhJbLYdD4Txj59djfVpJRI3etQpLm5teAq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDOv2TQNM4UB7476ffCrcA1ej6wCPwB1b%2FvahMjA%2FHxVt8D4OUbl%2B27NUbhUUXgsSUPfbMMjLK6hcZtaIfmnBH8fVGbaMId3ynDTHa74q8Ygc7NiOV3CPcdbAYWADlQ9vnreGfp%2B0AWvBAzx6DZyhIOt%2FuY8hRCcQNjXQ7%2B7W4AqJHyPlvo%2BRgzgTczLRmXJesSopoFzMcZPyuEdEsWIMLgLqk3tYSb9%2BVRuCykXZWaUAskNdxPdD0Rbp29WNCEhpX%2BSNbpGxHHNN7hkDL8EDmJQ%2FvvwjpHZykSywXXuH38EMTA8CAE9kZjV5hxJGBYVi6ut1iWI%2FiJrJLcJncaoSalv%2BwEFlLhVxmdNMAuuRAYyJCA1INaCjM679%2F3Q3EtaMXSYQObbQogPsnXmVpHZ5RLCaXIM9%2BoOK5zvJ6BmfGtfhNB022fRpIl440zFLxmpo2lzpekRmymePbVfhZvpaL40d7yWI2RDEm%2BW1f%2Bsek3S9bkTFaxG9yrgHRMK9L10U8Z181JRKS63KZK4C8cvyLd4JeJLreSf5R1cXo0RfORQCd%2FRo%2F5RTtbMJmV6Uo95SH1YS1zEiq8X2FPAwwOAwjC4%2BFI%2Bwocmha9DqIG6QnG9bWuehBoNs3TRKKmp9ER6Qwfhc2BTa9%2FZpPdjtMPXOiM0GOqUB%2FPtcNhM6opNsZmTGe7TJHH%2FkmKpDQPkw5WgSwTC9Ek0mY%2BIaVUx1XkHHtHdn3wUvptRwpw73NqgYK3huhEhuRNKePKda4khIkstD74%2F3dx177aYREMq%2FqyOPelzKW3xdRnTNaLHzepL%2FMs56fEjrZilLgggIvhonC4LUHD079LmoCSHqdxnZ%2BiExKx6ITVY%2F4sycpsP6arR9ZDw6qyFzfy4ThLgB&X-Amz-Signature=ef1a9ebeaaa52526f76bbe4bba7cbb9cd03c6601ff5c16547a505bda06073373&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMINNDY7%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIFCFXTyBDFjGxzRs058Bspd3gP5GhHmHlh0WcHwz%2F6cEAiEAsbbGdb88r3wDPna0A%2B1rEjkXoURz0UwZFb2UMiEe89Mq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDFJHE0VO1iKCAu%2FccCrcA4%2FFBNc8HKADl4%2FiYZTEjLBcptMtxEkd9R%2BZCmS7Ee2xZDX7raSJcep8L%2ByMf31xcjJE9uDUIjJZPMxeJWUNCrIkiEZKj4p%2BRlniIVrdpnUk0BQLFdthh0f8p5Bgu%2FM3Vt0QU1ht4iqODPQ%2Bxxt%2BsKzXXC9%2F6bFg%2BWWeXjZsPImAD3n3QZdSBSRQ0mN0ptmdgRAAYP5oFImLpyHNtZbGNSmtWtW4sFZvx5TayrqKeKEkQz2f6MzNbk8G2hv%2FaebB9vZI6XnxyS08svUVxfAYNZBGUvzDTnu7H7g42Wo59zwiErtKpFtsC4yHnYYQPB3NAhW8jsgOO0D4bDErL30G%2FtIOnVLmlop35pa1Fs678fwEtolbPVpIOvqZABP%2B%2B8BP3IV2SOzWTqr8%2Fjf63m%2B8IKHFPA3UUcR2Y%2ByttkEHDvOIPYuk1vJGPI4CD3QpmWoONNjlawc%2FBclNMVZLF4Vqqbtjk31ruPjrIourhNd4OAXw5SzovJE9ohBOcsOINlWzQv3mX0VizJZyGfi1oHPAndqogFFupqDyO5fUeGQHg4QZc2ddq1JUx0SZYh1VlWmyRAQh60MJHigISGayLhfRta7GS7X%2FkxS%2BHndqCw6A65b4AdclphcdykbhrlZyMIHGiM0GOqUBUrLQBK87lY2g7IwH%2BMopciqE%2FNAH9u0o4duP8s360pbL%2FsLYlrDbbALu8pY2AfHDSJ4nks%2FnOMnOyQqrjr1hDC%2FrGZawrPpRIsqJ8eNmFwd2%2B8xiMdoa83OQq3LBsA85%2FZ5c%2F%2FrqW7AxTAazUF8%2BA7Uq%2B%2FiEHO4OKVfgmSsyzO94jq8ogmmaLXaP5RoJMuGrqq%2BLkRvlSmwQA3mYGNXJru3mB4Kq&X-Amz-Signature=f0d9199f224ec94c3832b86801a6e05294ad1262c93bfc7522dcbfc4a6145de2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3WRW75F%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDJTm0MdlLBhFt31PbDCsJEte3zgIS9F57s7vHytYEmjgIhAL7z3PTwgEXj24V%2FeT7fc%2BVEy71291wp9mpvdAayexChKv8DCEgQABoMNjM3NDIzMTgzODA1Igyv9%2BwsUzXpAGtAVmMq3APGdiqbTYnKubpNeeih2hve54vOX2hnBQSGW1czAxqNXJs82CJQbTkEtmGFmWiGvGPg1bQslCRHIid67KE2td%2Fso%2BKpZIsHQUJxp5LP32fz%2ByofulufOWm%2F49iU5TKCEb4Y8lc6TuMdvbOD5NJsZzkoUR6I5suLDYwAjEXNUaherOBDjbmndKxmX%2BZg9kcD2UlLHD5yBtUA%2Fc5KuEHrSBgAwPPjUra%2FwZj1XkmKLMrlEdmO8uL2iTVfMuDIyf32ls9%2FoiuUTWw9tPA69lL36JTU0B4ErUQ2v1FU8FzKrJmUWPJMMU%2BrZ15jE3E8YMsXyF8HQhehx7%2BbgjxgcLZxTQPBGTYgacSFflCCmCSCODeNiqC1QiD4IqSuzHSrauHxjZyfyBDnFsKhkkMV04Qu56klp3MiUc0fOtYNRbZ6QyDrlrcVZbP1aVrDirn19%2BqyaqsL%2BN4dDedMOdF%2FSGB%2F%2FB1RDcaMBKih%2Fn99u3y2r4RGOLHKJcP6z4Vp%2BmNfTw2KycGhDw5714NdAzApPRG4Gye1cwKKWn8mdCGstydSRZ%2F5D1my5og9oDqsapETJ2hGGMdWZ9GZxgA%2Bk81NPxNSNl%2FJW2Nr%2B2yQ7gto6BuOxdksPxHNeD9gwkzm9e8DejCoxYjNBjqkAX%2FcCHLo6dfRJqh27OLMKDXAjMzve2XsTdG%2FlAcQb0jcjZtTgwIOtE9CBjs6XePFHlrgYLprE3WFg%2BdRoFotB6nK6fwI7hrMAzSqNZRxxhobgCTAEcW3Hr4Ezp7PwT%2F0LFKEvloKVA9v%2BFT6f3z8C%2Fpiznm4i%2Fh0cMcbAe3rmVxpvtaYXRvm31weLK8nL%2B6mdE5nCNvOJEVhoU00iL1uN5FnhZRD&X-Amz-Signature=03d9776c3e1496d6cef6008ece4a0f1986ac9a6c6f34048e9f3a29942aee8817&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3WRW75F%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDJTm0MdlLBhFt31PbDCsJEte3zgIS9F57s7vHytYEmjgIhAL7z3PTwgEXj24V%2FeT7fc%2BVEy71291wp9mpvdAayexChKv8DCEgQABoMNjM3NDIzMTgzODA1Igyv9%2BwsUzXpAGtAVmMq3APGdiqbTYnKubpNeeih2hve54vOX2hnBQSGW1czAxqNXJs82CJQbTkEtmGFmWiGvGPg1bQslCRHIid67KE2td%2Fso%2BKpZIsHQUJxp5LP32fz%2ByofulufOWm%2F49iU5TKCEb4Y8lc6TuMdvbOD5NJsZzkoUR6I5suLDYwAjEXNUaherOBDjbmndKxmX%2BZg9kcD2UlLHD5yBtUA%2Fc5KuEHrSBgAwPPjUra%2FwZj1XkmKLMrlEdmO8uL2iTVfMuDIyf32ls9%2FoiuUTWw9tPA69lL36JTU0B4ErUQ2v1FU8FzKrJmUWPJMMU%2BrZ15jE3E8YMsXyF8HQhehx7%2BbgjxgcLZxTQPBGTYgacSFflCCmCSCODeNiqC1QiD4IqSuzHSrauHxjZyfyBDnFsKhkkMV04Qu56klp3MiUc0fOtYNRbZ6QyDrlrcVZbP1aVrDirn19%2BqyaqsL%2BN4dDedMOdF%2FSGB%2F%2FB1RDcaMBKih%2Fn99u3y2r4RGOLHKJcP6z4Vp%2BmNfTw2KycGhDw5714NdAzApPRG4Gye1cwKKWn8mdCGstydSRZ%2F5D1my5og9oDqsapETJ2hGGMdWZ9GZxgA%2Bk81NPxNSNl%2FJW2Nr%2B2yQ7gto6BuOxdksPxHNeD9gwkzm9e8DejCoxYjNBjqkAX%2FcCHLo6dfRJqh27OLMKDXAjMzve2XsTdG%2FlAcQb0jcjZtTgwIOtE9CBjs6XePFHlrgYLprE3WFg%2BdRoFotB6nK6fwI7hrMAzSqNZRxxhobgCTAEcW3Hr4Ezp7PwT%2F0LFKEvloKVA9v%2BFT6f3z8C%2Fpiznm4i%2Fh0cMcbAe3rmVxpvtaYXRvm31weLK8nL%2B6mdE5nCNvOJEVhoU00iL1uN5FnhZRD&X-Amz-Signature=8565f9899d286a006eff44940f547a05ac03f35d7a3fcef96f51553e1ebb32bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCM4M7AN%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIC3bput%2BBglqoWbNfy4FAgUtCMzWltiQVP6MuVqu0ry8AiEA6nLBTiVYuJKED9tMXztjBg2ohoURuxpPDx0pTdQdolkq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDNGD87Ea7Pf9Glo2PyrcA6jL1SCGtRbswNSqWpogkbIh%2BYLQXK8bFgRoGiNxGnEB81j36%2Foej7xbfLqAsaG13vqj3fpTY9ItUNmDQ89okc2y3OuIhFTYYGtHjBI0aeV2kfEYF1xl6oga7ffDSy%2FwFXwGP7k0bW4Ji829B7RyK02LirK4dEYto3JIIuk9DYrUXJsK9yj%2Fa9XgBiCq8jZspUVazfJB0kCFQU9jGTqFlqmWpE61N%2Fja1o7HGyYfk4O6t8b8NuSviRN1fq%2Bqj2jpr%2ByE%2Fs2t19q%2BYfrLzpcw%2Fl3yKSAkpY9%2FgH8GUE7AJia4PfNwwqlH6Rgwoo0EIsiYLw0DfVWOzpKVzNUk0Qqm9LTho7UYFn%2B5Ebe64%2FIRAEUBMuG2NDWeEl3ZIoUE7%2FxTdk3vInIV54JmB8dX9apY4avaSBqOLsh5o4k%2FqRUr8ifpQOAGQnKv4jVWpSE7JEJd7LWMZDYuT7CRjbXi1kD5dtdG6w9hElwH64xMpjNwTgpG8VJOjRdaEuSIBWSbt%2Fb%2BIkk72aVwF7Osb3evnyStzEtJE%2FUb7UaYWnZkOmwWrtF%2FxdTB9YZwNiSCeNLkaVJDPU2BES0kaz4rspth%2FVYdbpqfDdn8agFNIw%2BEnoJhXZ29vmm3tYBQHh6jKv5NMNTFiM0GOqUBuMDKfDbdIyOOIxSJkgLAMu11akOxoGja%2BpdOgoYXdVBt88j7bnM1tFZz0saPagUgmSYJ393vz%2FXXhztKqjy4UsAnYO%2FsYKHqIhDd13mccbrH6BJgdksXDdpGCQsxOgtigDHVTJdijRwIHDtO9Yo80qjkLrDh%2FdW76xwvKBv6PY7cpVWkZwVTKjRuqzTju7H5HRi6K6ZyeAjRDkCxz8%2BK%2BAUbLTkw&X-Amz-Signature=7ce2155706fdb903da5c7a702bf719d51bd3d6205339f9af85d83bf3bf96cf95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7UMTNGM%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDwstGs0%2FJxObzYkzgvVx6vBOK%2BPJe0nEZw9nxXA5yK6wIhAOpLdu4Mb3bEC1fNeirU1xeLmMswJr3h2zSbxyOuqUU8Kv8DCEgQABoMNjM3NDIzMTgzODA1IgxHeb8lwCYAxYBRZHAq3AO3MMxE8oIJdDyBCp3Y4Pib6FA5U%2BWmVItg6s8beHmBZ5HOFl4ry3%2B4y7FZ%2BDo1J5bOei9mIHSIGdBaJbdEumXAWiLaqNKcz4ubcZMu8Mo6l2UN44AgdaQdDILCRG%2BvdEnFbR2x9dyJb3hQ15J0HTWU7QGkE4SnjCHxJcNqOLRRDMZpW9J12lcVM740qV9DhK%2B4EBwes7cEfMjr1ndgnVKKB9o17ri7gdDSNMMsVjN0bV36qAAet0qxhbNHKjzNmw86Ln4ErFvfTkrooqax9SpocFdunB96x0CuN%2FBXTdCCFCtcw7qdfNkGP89XfLp0ADzIJmQRKroMjjOQYjVJm4Kc8dpElfQvK%2FXzA2sxd6haBnWEnv5ElI%2B8ZaOS898LFaIikEFyj9tClomm91EQCa3wlZ31q5oZ35SiubRBXXMhcz0JodjFwvrvozYK7v7SE1tTEAjBEC4Fob%2FF2tgpEvkCfnlRs6w6WABDFC08D11CjgtDuHQdHu9duPPNvDjQjTEowvuIa79qlGnIZNX7nx%2BZbVM%2FioLaiuZpidCBkgApOGwxr9msRQGFUpoAgb5qpDGaXNUZuUudDhc7wqjBoTm7tkMVmvN7%2FvKuFZhjtPt18oqysjIbejYkzTvNlTDixYjNBjqkAYfIG7FhalhgpTPb4mTFNUfK%2FquBGSwWULWOBzAdIEO7EGAXiz%2BTjnhhjOEODJ0k%2Bp3NsyJ8Ky6gAquU7UwbwscZnZRzSL5B8ZEb9cJk7vDmex2zzwAgHOO6KMbaLZ%2BAdthj2uV3w2uOw%2BnmS0ML5WwUm5Jdbq3VIDlv%2BghyBSBcv%2FVcDZ507%2BUJ9wshxatxAFmEKRedPo%2B24RIl6jX0yjtWLZNZ&X-Amz-Signature=2ccd5356591d1ad2470c0e24f35449f5f2bab82e56827b805ba3506217f705b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBWHSIIR%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQC7vDX33Tm8%2FRaCXy9RlpwqF0TSxYPAXIUFClkkE3Y%2BzAIgF7s%2B1qj0dtbYJNRZKgODt6gu5vGBC7bjbbT23gMyjOwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDNshcLMKTQxtPspGeSrcAzmkrbbaowsrwhgUGz96C85Xl6OOtqc0VriYZL9jISAJlh64EIos1s%2BY6vCNmvZigie5sRF2IdES6zG6b5SwRll4Yki06Q%2BDM423Cs2j8CKIgXamkxAYgP5ROAhts3RwJn%2Fq8ypPMDwmI8a%2Bob4Jqd3ctnqtS9rqMYiKO5jZ8EC2nAmkCinizUaeBdzUU047Dt6n7FCD8jauPFVUYk%2Fsjn6fE647G8LNB0sWrOX4SH3OfQfFQT9GJK6Wb23stouJb0pk8aFtEqgOVR6V3cNlnfzRlo78vabPqfUJzYEetGkrIdJtF1mCjDGqS3vU8aYg%2BTliMjMnaW0cNPml6NWCchA1zvBwNe%2BfusEe4X0eDn80jDDp2qZ%2BWyg%2F2S6mMp%2BqVVUIqY1K2aj57Bglshsn3FRociC%2F8Jw9jFhtoHkr7JGSvJ9oIUtgSkp4h6QLydlpZdGdrkeUc9p5DUnA4J%2FOMxPWfY9BQTPASh389LKS4awbzm1iN0EfbqhcD5R4%2FSmGYXKW38V%2FJ6gJJiw4ILyFpGCdqJh0p1iZ5Lp12JIM1255xQp0NLFjSxxMicXUhAgZyPRbVWnhP31F8ZWt%2BwYJ2cLAdLpzToyNYeYPSOGB78JiwFCz3d696g3mBKwKMLfGiM0GOqUByDYt%2Byjx%2B3Atq4W8wXRHENN6cOX9GeVepPqclJiPjlIu9FUZUTmMEc2RY25rBgzqHb0OQQP5wsPeT9TPZHb3qdQfCi8Cb4Zqzd%2Fnp96Eq3ubICdKVIOdDA2QHPSA4zcNn4sPSUCDiAo06fag1utTKe5mtRwZn0cyAPjqYBSHPWR0aZ%2BSBqunve8zlF7N%2BlAxAfR87DS51eVZgCiWR%2BmeArzNxHxq&X-Amz-Signature=1eebc8c8590585d86b539a8ddac5176c8a7b64fb67b4fa283a0cbbd288e8d46a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DSVSXQL%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKwrWu3tc6aizDseFzNiOWaZuuYyiYnjBmEwMSDNPJ9wIhAI9w33gkNmxIv37sFuERgXEg%2Byr%2FWhacCWEqj77VtmDxKv8DCEoQABoMNjM3NDIzMTgzODA1Igw4eVof4JrZamzJsBkq3AOkMTnayzsJTeF%2FFL6n4gNPOwpMJvnCZdaeMNm%2BHy3uNG7xZDbpRNsmI%2FQShOV3MC5ZdYVQlaZi1DyTRLld9%2B3jjiBf1IhVEBr20WNy%2BAHKylFKMVvYfqTQbnk1MChCADWZe5WUA7bhd%2B6Z6euupiZPiGaq9uqGVelEdVjoyj64s34Hr9f7GMn%2BpIbdgCpykfRq9EfEvICsgTP0ryQPAZu51ET8HSbN1XEpruMca%2BpRjt6pJUrSbeT8lJhVUmiMhTC2SDXNOGwd9cCICmHK%2FNuO1S8qyKqWJp7PtuFWocd4lR3QQXrLSxmc5663gQqbg9anfFpbDJo9f3q57oQpD1SJrPcLEuAwHT%2Fy4rCiGVKUkuY8jJjfLqiFRWd%2FF0j9P8eNuK5f3z8mJ7YtMJ6AgIU5J7UWdRG9FcC5d%2B2%2BziE4gKqNr1ggBkKL704GWJG%2FE%2BHNpPnis3bqcI6FVlUqbN7jt65%2FNA7dFm%2FPxzUcyMXuwsf2fAbhkQmFOe45rzJ5GGIvY1nbJtN091t2%2Bk8TZ7VmQEem9D5ayF7f7M6j%2FrrILDc%2BJEozX6IXC6UvkSNd2Bz0Zj9PxLpC%2BvdyyCIE4EL4qjnBKpVEuMMPSZubkIQBWYLTi4iGpog74EDOWTCg9IjNBjqkARaPmhsduTuh%2F7TopLcJmTNiy9q8duUJJgLyK5EHpsZNB%2BnXEq58nq55lMs2tC4cE71x9NAU3%2FtrcnorMWhmI6r3cc4SvEqQknhjDwS7qh41i4e1q4cZGJLYKcWSOQTUal4lbpmAhkG8gxvhUwUFC8aAtKH%2BFCEqd9X3dBazKUP2ioosPPygbrQQ%2Bc6OSkZ0NiFK906FqXk%2F8XZRIy5sslGplKNn&X-Amz-Signature=34ecb1b50a8660d3b58760b950592652a75f062045cf6da8b0a921e02d1ca15e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DSVSXQL%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCKwrWu3tc6aizDseFzNiOWaZuuYyiYnjBmEwMSDNPJ9wIhAI9w33gkNmxIv37sFuERgXEg%2Byr%2FWhacCWEqj77VtmDxKv8DCEoQABoMNjM3NDIzMTgzODA1Igw4eVof4JrZamzJsBkq3AOkMTnayzsJTeF%2FFL6n4gNPOwpMJvnCZdaeMNm%2BHy3uNG7xZDbpRNsmI%2FQShOV3MC5ZdYVQlaZi1DyTRLld9%2B3jjiBf1IhVEBr20WNy%2BAHKylFKMVvYfqTQbnk1MChCADWZe5WUA7bhd%2B6Z6euupiZPiGaq9uqGVelEdVjoyj64s34Hr9f7GMn%2BpIbdgCpykfRq9EfEvICsgTP0ryQPAZu51ET8HSbN1XEpruMca%2BpRjt6pJUrSbeT8lJhVUmiMhTC2SDXNOGwd9cCICmHK%2FNuO1S8qyKqWJp7PtuFWocd4lR3QQXrLSxmc5663gQqbg9anfFpbDJo9f3q57oQpD1SJrPcLEuAwHT%2Fy4rCiGVKUkuY8jJjfLqiFRWd%2FF0j9P8eNuK5f3z8mJ7YtMJ6AgIU5J7UWdRG9FcC5d%2B2%2BziE4gKqNr1ggBkKL704GWJG%2FE%2BHNpPnis3bqcI6FVlUqbN7jt65%2FNA7dFm%2FPxzUcyMXuwsf2fAbhkQmFOe45rzJ5GGIvY1nbJtN091t2%2Bk8TZ7VmQEem9D5ayF7f7M6j%2FrrILDc%2BJEozX6IXC6UvkSNd2Bz0Zj9PxLpC%2BvdyyCIE4EL4qjnBKpVEuMMPSZubkIQBWYLTi4iGpog74EDOWTCg9IjNBjqkARaPmhsduTuh%2F7TopLcJmTNiy9q8duUJJgLyK5EHpsZNB%2BnXEq58nq55lMs2tC4cE71x9NAU3%2FtrcnorMWhmI6r3cc4SvEqQknhjDwS7qh41i4e1q4cZGJLYKcWSOQTUal4lbpmAhkG8gxvhUwUFC8aAtKH%2BFCEqd9X3dBazKUP2ioosPPygbrQQ%2Bc6OSkZ0NiFK906FqXk%2F8XZRIy5sslGplKNn&X-Amz-Signature=1cbc801f40db851d9f724dab5468118e837735fdc5b235c11778b20873a65c11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623VKKEQE%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDUzETjQzBi597EVdJTC%2FLvd8AX35bQX16sw4h1cUzWcAIgaFRX8BNa5utVlPeLVh7IzHAHT4T9r7QOudiV77HEJVAq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDE01fE0ioDOU%2BNg9IyrcA2W2%2FxsVlICetfV7Kvduq5R3u20CfJiOyoNFsR0A8GBBwWBiZZox7vAQBGEWWQoUgnVUZ25gxFRqb8u8KAzfW9tR4GWq06v1FrVaSyH9HSFRvRqsqGAYjuFOagAUMCbgwTcCffJxCI0PaY4ZNxAuRNeSRn%2BUdd2YIQZMdjeZyO%2BGnt7hZeXhLx1Q8sukIr7Qm2GwlzRLbFK42IvIOXe8aN7HebXs5G2Y2HYBnEgPymOVA9SGa7upJN%2BzQirCAggcSba1ZR1aYgfROK1reSGOrodBGbwcytdqWJ9slj%2BGOT3AigZrgprvKcY61DIikMXm4%2B258k4X88ZpeJ0XcFo8tnCL29J6nFQ9ZADVzjINVNhHJazEGnXzi6%2FaGlp0dnqK6j8dxv2Us4vnO10ue3Jj%2FFRN2%2Bq47ZNI9vYJkAt3%2FH%2BhkwNcbgswlJm8X3cFnySN12u7WuGGYvU80Zjt1bjs1Oz1IA7arWQ0gNmWQD%2Fg%2BVna6HE%2BPzVi1lnkBIlh%2BhbZPDTCfWWmwLGIcFUdHA60m%2F%2BAGxdVMiITiK4fbU3nNABJzFq1neqL4Rm7KvLUON1vfQ6I7AxOgvaMG7iW2dxrfQk1mBoxc0ujd1wEDVHO8sj8YIHHFfX9Wq%2FrGNLAMO7FiM0GOqUB0ijRiBCo2bot2cxP4t7lZ0YCjc9VaXtX4WEW5NhiAHHgcDKXQVELJaDKNxzh74J31tOIBO0qMt2t8rPpo67A%2FY6UxwUiC2phBowXq1xUlpysH81OvjBw55pLZcCSPAegp0cRSA8NPyQhXNJ%2FPgx6Gu72C76bMLW002Ll1CUMU03O64%2BaduT5TpthSuWrPLl9aEUIRLSMkpKOF57Hi1hgnK6XEoX3&X-Amz-Signature=a75f44ef63afae6d2a6161d3f28664a769ac8f850f09db126c1512cd6e0df129&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4ZHB3TK%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDF3sTA8fT9XoByhPDmSOELwL00IOSWjgeAj8Mm6uVEZAIgS3eeyXCS04pB0BSu%2F4vK9KKOsO0yuve11nX19H1T%2BYkq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDCO1sQoreod%2FjLiWECrcAysLg7YCQNcPnWe2T7nktcIngQz%2FQNGMnsJxnZelgvVNMJWAnZQ3ArKYejN5JhZfdPT%2BzObfXZS1Op6K3DmqsRAswcFRFKPriY9Mg2md7lHbK1uRhtyi42nPienBw%2FJMzWrWBLY%2Bxuy6YxF6jCKXyum3ZtWxcSPvW3e03qQNmoQtMX7oYp2q2OThX2uHbbapZjncUOncd%2Fs5FMwLbtRM7dZbzZTrTA7Yy7f2ncoaCjJQ7vS0uuyQSvQay%2FaUs74x5XBHqJGk4jrMs%2FFzSjXescWVS1mPjtDHews8%2FmunYMwSqQkel0zdnXP7U%2BXr0lGzVjuz5H95%2FU0liSSPTMWC6l4GNS5KVi%2BhHPO%2FK%2B7OFswVXo3xGvUSpP7S4i%2F6jnn0%2Bwag%2F3WZGGFp3pUBaMoetiRvEtOQBrZlNjaA2CrfPPKX8HrNy1Xh1enPBVfbmUxRljVUuAQGiu68izw6xXyZT%2FRUlwSbzbl4iqzQtrYAsCxjCyyjng0QoC6cpDsihD17xLPwPLjlGA0Kq4ZyLOqCtm4EJE9gDETfrTVujyh%2BmQATbgLpfkW2wtxkjEJCBpc9r29pCWgIs87FkQWlfk1G1TQ0VZKlTCmSmxd%2BS203Uu0L4UrLWs03P%2FxwHiLaMIHGiM0GOqUBUvNW%2BLdkEqtCIqKEDTBEmDtd5eQPdXZS%2BFpC1X%2FpX9Dd8OTIPk5bnTPE3ulGqOabnZ2KbOj3HbEkqviut6Bt9k%2FnECBkJqNzyOYQ2PhUaiZDG8s0CC1aYAJ3Z2ub50jBYOiC8OhQ79SaYfP4Mae3KlNBh2PMX3IVbw2GvAVCSrZbV41kdddMDCcx1SsA1UecgcPDU4ZhlT105S53qsKXs8MJdD7U&X-Amz-Signature=e007b0bb20932507f9a0f21a1b6e2d24c1691c3abd608383456a5d981f0730c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4ZHB3TK%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDF3sTA8fT9XoByhPDmSOELwL00IOSWjgeAj8Mm6uVEZAIgS3eeyXCS04pB0BSu%2F4vK9KKOsO0yuve11nX19H1T%2BYkq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDCO1sQoreod%2FjLiWECrcAysLg7YCQNcPnWe2T7nktcIngQz%2FQNGMnsJxnZelgvVNMJWAnZQ3ArKYejN5JhZfdPT%2BzObfXZS1Op6K3DmqsRAswcFRFKPriY9Mg2md7lHbK1uRhtyi42nPienBw%2FJMzWrWBLY%2Bxuy6YxF6jCKXyum3ZtWxcSPvW3e03qQNmoQtMX7oYp2q2OThX2uHbbapZjncUOncd%2Fs5FMwLbtRM7dZbzZTrTA7Yy7f2ncoaCjJQ7vS0uuyQSvQay%2FaUs74x5XBHqJGk4jrMs%2FFzSjXescWVS1mPjtDHews8%2FmunYMwSqQkel0zdnXP7U%2BXr0lGzVjuz5H95%2FU0liSSPTMWC6l4GNS5KVi%2BhHPO%2FK%2B7OFswVXo3xGvUSpP7S4i%2F6jnn0%2Bwag%2F3WZGGFp3pUBaMoetiRvEtOQBrZlNjaA2CrfPPKX8HrNy1Xh1enPBVfbmUxRljVUuAQGiu68izw6xXyZT%2FRUlwSbzbl4iqzQtrYAsCxjCyyjng0QoC6cpDsihD17xLPwPLjlGA0Kq4ZyLOqCtm4EJE9gDETfrTVujyh%2BmQATbgLpfkW2wtxkjEJCBpc9r29pCWgIs87FkQWlfk1G1TQ0VZKlTCmSmxd%2BS203Uu0L4UrLWs03P%2FxwHiLaMIHGiM0GOqUBUvNW%2BLdkEqtCIqKEDTBEmDtd5eQPdXZS%2BFpC1X%2FpX9Dd8OTIPk5bnTPE3ulGqOabnZ2KbOj3HbEkqviut6Bt9k%2FnECBkJqNzyOYQ2PhUaiZDG8s0CC1aYAJ3Z2ub50jBYOiC8OhQ79SaYfP4Mae3KlNBh2PMX3IVbw2GvAVCSrZbV41kdddMDCcx1SsA1UecgcPDU4ZhlT105S53qsKXs8MJdD7U&X-Amz-Signature=e007b0bb20932507f9a0f21a1b6e2d24c1691c3abd608383456a5d981f0730c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXFRMWJH%2F20260228%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260228T004904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIBaepyfvl9L3M%2B%2BRBxV0CYWRMoQpfBEza%2FJS6nJan6tlAiAwpI7xVCKLeznXd1v5iZFd7HXc%2B04NQ8%2FfBa63AVprxyr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMX9NnARAC%2Fta2HKBiKtwDFABZ5HkumdAS8kIL96HC5tck8BDrU%2FMqbmgarTX6Vzzr2FticjTZICk1iXXPs9JsFH%2BNt0S%2B7Pech9xobOiNeyhnaF6kaBSKFgqVjmRTQZGkruay6zGW0QKYyVMWlndGAPsxnbbsNt4OsPyqbmphLZLVb%2BE5Vc%2FbNGDTNQPMWCirIHallTbuJOJ%2FP5u3WEnB5%2FzmQtHXxbGf7Y5griCwuPHOqVgGDug5avhqKel281qsGwVNhN6j6vPw4HtuFemMquRIRHkA%2F%2F4GjZiknmVTDZGMDsOCYmQYG6G9t078P%2BH3YTl%2BtpD0ITvI02kWqUv8ybC%2BachuRoNFXEqAm9zZTXWfbs03tsO42pR2658dHJtxzafczzUC48fkX7tZqa%2BM1k%2FBe%2F6Qhaiab4sXXvOPkoBo6oOc%2FcX%2BGsGezXiprQOTyQq6L3f9hY3jKdL0gLBzB0dMj9W1QbTS2wE8a0q10qwbUA3VP3nASzjQtl%2BrrFN2qO2DhT2syt%2FR403bcsM9wlM5wZCJT0kX6gNFhx2Z0Q4GcAKJ8YUUyOkwsnIlpzf6BJfE%2FG7Ohmk0fy%2BG2mVlvmb0KLPcUrObof2z%2FwHVpwnrWxAZcja5yPVxYD8zi5nsPq3nXr6WpwPfN54wiMWIzQY6pgFcfcDVFjzeo2WcKZNhQyYDgJ93hCHIoL5LmT0cjlPzS9Ie2fE8UkfLOoDebmyhOPx%2Bn%2F%2BwzpWdH8LR%2BfHQF58d%2FZ1YQMXUy9%2Br8f6HKGhBcvw2CwtpxpaGxs5NhLadG41t0NthDfC1a%2FKYsIcyMqD7rLbi24zQpfpqlUolW9kZrlqPDoixdwVTBxjqJb3a2UuO8FNmC0DicS3eODRHObBuIwgBQ3HT&X-Amz-Signature=769fbd29bafeba9136a4231e259cf201e8f8cb86a5af1feab49631fe3c426d60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

