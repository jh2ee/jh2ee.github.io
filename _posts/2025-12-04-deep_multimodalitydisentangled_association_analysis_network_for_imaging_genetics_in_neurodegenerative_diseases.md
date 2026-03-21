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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKCGI2EJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQC3g%2BdVPlirx9sJnsL6yKWU7velqekpfifn1lhN5udlCwIgCcgKGt758OD1gdDhrbK6jjoKVRdAbnClBIsPqzy%2FaK4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDMRLkasH9HG3nKVFMSrcA%2BYcvTvwJ747blE2t0PGD%2Fb7Ci2Idsq2y00cjWu8Cpdwr4YAku9CdiHE4%2Ba2eGTkV5eKOAdGUnsAmvup48e7WCdtOtL91OVyQvu8fx2Y6nr1zPWaL95BpYencrOU8NxnlkY%2B3O4ueedC3deKBEr1P%2FQerrVWGMSusyrv8cScl4xVzzuwq9OSnI3fJpfioBYhiG6lubRWaguAmN%2Fr40krP%2FvUx3S%2BGIZRUzbxFRzktOmHIGocoec1uXznyTXulInhfrEzRHuEmU1Pc6%2FxuQS9oHuXor5TTzBlskHGGojDLaKDt65R7GfYxoYAZH1VR%2F3mnM1VSG4LcETDs%2B%2FC4HG5X%2FUoVBIJxxWqft4Ewr7mm2LnjuZiKz6cv7HHO0llGlejpbi%2BfNXeuP%2BVMyH32nZQfwfW4kOUxpUZrb92LcGi3Si%2BuvCAogKHso5GpY%2FJyK0%2BaZt66da8WFgXQApwbbBZT64UikNz4%2Fm7Mmf6fyJ3tFy2rBC0GfjO9hCu6OI1nSgt9ZFwzRCw5gR2Ur4zib9Wz%2BPApO1AkizNbY26yTlctpckZhZZ7l7sd2eHePHgf2lKBHN2mDtXTR9yk3oha%2BDTWUR%2B5RuitIYUr6iVZxpfG0%2B%2B5D3qI6gJxU2CNVe7MIXJ%2BM0GOqUBSHIZgIgEe3mkCbH5%2Fkgvpqn2UH43dDjyte4WuQ3XeBzYyw0XtNd9jXvwWJh%2FVTkA1MrpTkp%2BLUhrACYJ2ZYVZ%2FvJL34CUswuLbr70uAM%2BD9WhN6sZKOONyzcaT7ocBpzarEoAXqM7xKsJlxTaLrh1HFvq%2FxHarwexeI3c2ySQiCqQQ6pwUbCDUHt9k0H3Dwlfz%2FNHgbuJ3nQDlemuD%2FcLwKyXhQw&X-Amz-Signature=cc3dd7cae4a894e98d0871a168c7381e4be228dbf2fedbd170ef1683f93d0b14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKCGI2EJ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQC3g%2BdVPlirx9sJnsL6yKWU7velqekpfifn1lhN5udlCwIgCcgKGt758OD1gdDhrbK6jjoKVRdAbnClBIsPqzy%2FaK4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDMRLkasH9HG3nKVFMSrcA%2BYcvTvwJ747blE2t0PGD%2Fb7Ci2Idsq2y00cjWu8Cpdwr4YAku9CdiHE4%2Ba2eGTkV5eKOAdGUnsAmvup48e7WCdtOtL91OVyQvu8fx2Y6nr1zPWaL95BpYencrOU8NxnlkY%2B3O4ueedC3deKBEr1P%2FQerrVWGMSusyrv8cScl4xVzzuwq9OSnI3fJpfioBYhiG6lubRWaguAmN%2Fr40krP%2FvUx3S%2BGIZRUzbxFRzktOmHIGocoec1uXznyTXulInhfrEzRHuEmU1Pc6%2FxuQS9oHuXor5TTzBlskHGGojDLaKDt65R7GfYxoYAZH1VR%2F3mnM1VSG4LcETDs%2B%2FC4HG5X%2FUoVBIJxxWqft4Ewr7mm2LnjuZiKz6cv7HHO0llGlejpbi%2BfNXeuP%2BVMyH32nZQfwfW4kOUxpUZrb92LcGi3Si%2BuvCAogKHso5GpY%2FJyK0%2BaZt66da8WFgXQApwbbBZT64UikNz4%2Fm7Mmf6fyJ3tFy2rBC0GfjO9hCu6OI1nSgt9ZFwzRCw5gR2Ur4zib9Wz%2BPApO1AkizNbY26yTlctpckZhZZ7l7sd2eHePHgf2lKBHN2mDtXTR9yk3oha%2BDTWUR%2B5RuitIYUr6iVZxpfG0%2B%2B5D3qI6gJxU2CNVe7MIXJ%2BM0GOqUBSHIZgIgEe3mkCbH5%2Fkgvpqn2UH43dDjyte4WuQ3XeBzYyw0XtNd9jXvwWJh%2FVTkA1MrpTkp%2BLUhrACYJ2ZYVZ%2FvJL34CUswuLbr70uAM%2BD9WhN6sZKOONyzcaT7ocBpzarEoAXqM7xKsJlxTaLrh1HFvq%2FxHarwexeI3c2ySQiCqQQ6pwUbCDUHt9k0H3Dwlfz%2FNHgbuJ3nQDlemuD%2FcLwKyXhQw&X-Amz-Signature=cc3dd7cae4a894e98d0871a168c7381e4be228dbf2fedbd170ef1683f93d0b14&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W56HIML3%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDcKnZcJOhYtAbhKgxAa9JbUBUJOA8OhdeKESLHhYeAwwIgHgrwFWhX4kYzeSg0Nz%2F7IfkgJbAG14WRa%2Br33bh4GpAq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDAbk7mM5FU69HpErDyrcA2BZyYuZNpv%2F4%2F%2BQBUg2AQV7IuDWIQ56B6fj65nmMAJAI2c341izEMwuKGR9teeN0Vu9JWIRSuZwurzkK1u6qDDi8kAKoAg3YjVyl3f0lJE6iMTANyUEXy9ipZYOphijB5fl9u6DWvIkjB7OJDQD0edLZWRN7wJHdLONlfWVSeDtzvWSWVrBnc0Os8bekUohSXbxSOaQHWGjA8mLDP5l009cLgrVr3frNi%2FFTKBRbiae2dTFJX2HFjGGZQp5eiH5XdhTY1Ws7Ahkk%2Byc7kH9v%2B8kL0hPnbAPNWPCNu259fqU%2FX5CZta6vM0p8%2BqaRoVHNviOTpIKNr6pDGh8gyJHvmOESmA5KQ3DNxdNVzrueJbeoekv%2BQAy0J7Q3CUUaOfsbT0HcpDSRig8fwtIG%2FGhwxaqY6byZRJKS5n%2Fkp5DbPpLuUWk6%2FdNQEAsvhB4baeJcq5LtcE4TmX97h5vPz4fPH8GrydNtYAYsF7mZM4D%2FGo0ANJF1%2FNlZvtgn1FfhDCx3TUGaTrLvgOiHNIFCIJSdpczF4fmty15h7cvvDgz0GE7YZ4SlQEPDsdlVFfXVxR%2B6M0YFTmdxa%2Bos96mbWLwVQE03paBKboeYlTS9RE88B%2BimCmNdvl9dAideKwcMOzI%2BM0GOqUBhLQiPA%2FGXDWsnbyhxA0HzEOxHKbKFI4TRfBK5ozm611ZB%2BU8s9TstkPAITr8aG6i9ELHKII0NK%2BoMNP%2F6IgRdnWZEh3FPym45WAM6JZLVKiN37UuxzdUopq8Y0IunVx6jCoc0K1weDW74qYvCEfQnVS%2Btsd7zJoWmoecfkgq6IU%2FgP2fGJOYRKiZgg4YOpsuZfYhSgLFjTC33u33X1Q%2FxykcL8K%2B&X-Amz-Signature=a76676f6cbb121163426e1baffbcac53b309f887babd1e2e31b0339f03a841d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMZEC3WD%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIAOrPIugwGPGeCgtjZB5T1Ef2Kt3XrDjtgqlzoaR8AjxAiEAjWRBO%2FpabVjpbZbZPkreH%2BRB%2B18a1%2Bjr%2FFSwTRzpkMoq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDOgxbvESlYCvQ7046SrcA19ucJ2a%2Fr8udWo7DHRspgrUpU89bKAnpIviL6puUIWsX0%2BDnTjlXB6dyyqLzog8QGnsl3RTOnjoHpCUUx03TUo15QWNPdcoXmoDWB%2BtpcdEupzzgTfS6o6BQ1w6Uhy85qvB%2FYz3%2F98pbxQZ3x%2F%2FDl%2BmuJflUoEaJBFWurht%2B5O8bErwgkPK4hI2p2jBJzTg1BJLCGtfKiXhgcNLw6YF5xDTeAgDcFQ3wY3RGuyuuZZzN3bfVKdwi6dXeRP%2Fsb1cnE5cqZvLjbAMW6Xdu9a884RSv2jJUZqE%2B4lAZoNUJgJeK8v7Y0k6hVANL51C7jXwMaW78UDrUe9469XI2NmWdjDl7G2laiM88swNkSv1b2tzjY83fX19GISzJZGdgP3urdi2LGctgF9TOS62nPOl1gkimSthLybrIDCQM3I8bIv%2FpNTQzBuvevgAEuWbkAanbe2JocAdqukD16ahK6JVvsKsqCTQrCmogyW6jY69HJNabdgVCyh1iBC8LK%2FifCXZqIxMRNQTOFHwDZfnxSlJGsIIL2Ff%2FGdETW7P%2BphhFoPi4rlVvbkSk%2BNZTjZvacghsMo7gPTx8bREsFv%2Bvyw5U90mBus%2FxphzsH3o4Qj9Az44hX1AGB1lDxBJsRo7MMrJ%2BM0GOqUBRaj0dXyYlBZ8V%2FwaHXldrllin2LmT7q0Fad%2FEiLyswcVeOyCdFzvcKPpk%2BTwqeVKtX5tRWlIfeNUvsYFReX8P0T0aSoJuQRYK4BuOYj88nFkmOi%2FhzMfQKNA9tt0fcowEY1ZixNf2kh1BEnsjEG%2FdjYaGAP7KFmxu8q8EewmN%2FVSlGD9WLfCqzBcGo3aTkU2XWnMYbKwRty%2Be%2FAF6Ky6isiu0S4I&X-Amz-Signature=f02509ae9d1cbb8f753db5dfb0dc249a9cb1c28fd452192a2c58b61a69be50c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMZEC3WD%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIAOrPIugwGPGeCgtjZB5T1Ef2Kt3XrDjtgqlzoaR8AjxAiEAjWRBO%2FpabVjpbZbZPkreH%2BRB%2B18a1%2Bjr%2FFSwTRzpkMoq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDOgxbvESlYCvQ7046SrcA19ucJ2a%2Fr8udWo7DHRspgrUpU89bKAnpIviL6puUIWsX0%2BDnTjlXB6dyyqLzog8QGnsl3RTOnjoHpCUUx03TUo15QWNPdcoXmoDWB%2BtpcdEupzzgTfS6o6BQ1w6Uhy85qvB%2FYz3%2F98pbxQZ3x%2F%2FDl%2BmuJflUoEaJBFWurht%2B5O8bErwgkPK4hI2p2jBJzTg1BJLCGtfKiXhgcNLw6YF5xDTeAgDcFQ3wY3RGuyuuZZzN3bfVKdwi6dXeRP%2Fsb1cnE5cqZvLjbAMW6Xdu9a884RSv2jJUZqE%2B4lAZoNUJgJeK8v7Y0k6hVANL51C7jXwMaW78UDrUe9469XI2NmWdjDl7G2laiM88swNkSv1b2tzjY83fX19GISzJZGdgP3urdi2LGctgF9TOS62nPOl1gkimSthLybrIDCQM3I8bIv%2FpNTQzBuvevgAEuWbkAanbe2JocAdqukD16ahK6JVvsKsqCTQrCmogyW6jY69HJNabdgVCyh1iBC8LK%2FifCXZqIxMRNQTOFHwDZfnxSlJGsIIL2Ff%2FGdETW7P%2BphhFoPi4rlVvbkSk%2BNZTjZvacghsMo7gPTx8bREsFv%2Bvyw5U90mBus%2FxphzsH3o4Qj9Az44hX1AGB1lDxBJsRo7MMrJ%2BM0GOqUBRaj0dXyYlBZ8V%2FwaHXldrllin2LmT7q0Fad%2FEiLyswcVeOyCdFzvcKPpk%2BTwqeVKtX5tRWlIfeNUvsYFReX8P0T0aSoJuQRYK4BuOYj88nFkmOi%2FhzMfQKNA9tt0fcowEY1ZixNf2kh1BEnsjEG%2FdjYaGAP7KFmxu8q8EewmN%2FVSlGD9WLfCqzBcGo3aTkU2XWnMYbKwRty%2Be%2FAF6Ky6isiu0S4I&X-Amz-Signature=1c2a31bc2f07bbadef08118ff8bf514b146c97bf72d9e211eddf581c86d3a145&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SG6UOPKP%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBkHyWm1B2Ym66wCtLrsq3%2Bliq7Os4JlHdOb7q%2FWpdB3AiA2F1urVniRwUJkZuhJvpVVTSTFtX9%2Bva8JHC6T1Gbityr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMjMNdBIJkgUgOa6xfKtwDBWvSQRNzEs%2FGH2VSkD3DQvb%2Bl8IPrjyPe1QjA994pZs0DjUZ2ynSgr4q%2BlM%2FS3ODhQg9FG4Jxhc974C2DlxxtGvFdDQ4xtOEkeVwg1J632a25CUKYeHXFRVtZEvWUft1kXGrsvZDeLcl%2FDOFYBnEzutI3CPnaegORXFctyTPUJxLrLv4lU%2BpiJlbOPqzv49FTtRaEn3DCEB2zwxNW6QpoWOv%2BtGAwLFqcrfyfLuaETni%2BttDitKN66DBzGdxgVXE364iBuPS49A9y9mR1ZD7w6fsQS6PTevbBnYEZf84cjIA6Xp%2Fm%2FfabNd10Nmsyp1rh6B80aMEoVAk%2FSUnLe0lwCxt2g7bOtR1N0NiS95%2BcCmoMQXZY6qu0ZdAuabBtur6z2kzMOWqpsXvcprx1Y1tJG%2BHn4MSbaLImJBnSlX8PLtFt2RkZlQbo8WKvadT0klrEhxJjIRs6J2K%2BAs4O7wS%2FIa6fh%2BfoxnbhpPEu%2F2wIvWcnMztXdSKKOe6LMI%2BBXqn2wk3jVcgkRy%2BXcz%2FBeLpKNWbEGwiaaZxhtQwKIAbfFLzQmV8Tb3Z54f8fgoA77%2Byynwtyv2xlmWZOAmeHjemjmQq4ZbVrQ3cSRQv9pU2QDppD3ivtYhWYx0WzeAw98n4zQY6pgEz23gxCfaU82VZadi88oC8PoBFs9EsriV1uozspfWB9ve5SB3dGgObNZeXFGF6ea3%2BsLW7O9xyGqbQSMI9W4S5rMbyDPg2i04%2FHlMh0qszkYyqjZVPwAXnZzrX7K3Vh9FX9m9JuL86L78vf1QPfrBQoFOhvuyMwx7HJwPySTLvvnPFE5bEdfRfC0qeCZyArivGGGPgHYzxlynfTQMM1xRg3r37RXCz&X-Amz-Signature=7fb5d90288badc14a6afc76a3c7897ec6fc39fedf319a643d42f142501165056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQ6UJDHZ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045858Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQDUsSGH3zyMYB7lMlErNPlB4YDn98wFAkfK1L7TsKXm0wIhAPfQHwvL%2FRbulnA0oYew8yMn3xOq3rGiFDiuF2d6VoWxKv8DCEYQABoMNjM3NDIzMTgzODA1Igz0OfAJIkkmO4kjd48q3ANpVHWHYbXY4CoiBHJVztDH24pe1%2BhOVMBl73NDlcaNQ9ACbz4dn7kJ0KcuSCdCuztWYnccG5uBaajcgeVGBMciEeF07L3iQjFKPSGPWMTuD18HodNKtOluk2W3XsD9MzvQhRi5WCMtglmJ3FY3N0LWOf6KTlt3DlxPG8VoVnrym47N3VqedG4Vz1TdW7WbZP3YCPApQXPM9bsQo1q6W6AYfanQeJdws%2F9Gqq0iVZBA%2Fw8n%2FGwcJCunQf%2FdvK0lSYEBHsaWZaFBLvIo3Dfc8inTUM5IxFaHfg8gi99LZyUGDudsxUWprDlY9Xl%2ByFp9fAToQh9m0ieqVf4Ltzh1VYIsUrR0Nw6y355UkyeLwc%2BUkn9AW0J4fQHyxyfMGX2y19ZHwCV57Tl9nR71oMx5Oxm6CH3QUwKHQRB3gSLnyjVPiL0dq1jFq7iK0K925getaZPwsHvD43BGqkenmpY9YOHeWYczj11kwd%2Bbygns0KOfoO7C70AeqJkLuejPLXF6szqc5Z2XzBuAfNGhjkYV%2Bbo572NtUZNKW%2Fg1T8v%2B3SFaE4QrJrNsDXHDMgt7z2llms6lpBHBIu47R%2FuFnbR8r69jN8K1EZfOVFkwCX3cIRy5vNlRuofg1STi1yCn9jDIyfjNBjqkAU9TYZ5Zr5ozbGx7ujjruivGIAN37KMJmnyLYvdYe4pUV%2BzMx4j1vq5UZ2y8IJxGX8KZMja1Ta9h5lOI8VP0iUoHIw482iNYVrJBplp5PiYefm90XrmkyvZ%2BEAoBMe2CKmqCQnJiry7N8DvPv7rJt2cIITKHJAibzV9SpGtYU80irZDyS3qxHV1Ps2tfBhp%2BX8lqY%2F%2FY2zudbb%2BlzJ0TQC%2FgynQZ&X-Amz-Signature=52d580348c86aaaa79db31758d082714ede5e767d16ead9af44215d1f2c0581b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA6L3IZL%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCF5z%2FOeQpzm5tAvIkNMGhJbgYTZErT%2Fvn8LMWrW333fwIgRQ4PHm2Qbiuc1T4tbV%2FWEqq2npv7CHfsqyuEQ5nNwFgq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDKsa8pcgoM%2BsL6m6oyrcA2vQNwIuryl7kfuS6EmxkR9D5nuvU6MBBHs0AOHalH%2B88cuVfyks3bpQaY7e9L6ufW8%2FLxWmPSd5UE2l4upj71E%2Fqg0fucaRW5bEyCWVMU3GcXIzxzZ9%2FwAsqrDbCVjvRZ2xICA6WdKNPhkznrfSQZ%2F%2F%2BIHtFrSRRD7zQ5zewD7sLUwjhrJzKePCm%2Ff7I3Is5pz5V%2FPOn5rjXlHPD3kEB4n0P8tdRfofquMfx%2FDDrwRbz8tWserTeWLVFVG7%2FHoYH4MbgnSIi5R50x9Iic3CvqOHORIIa%2FPqmA6j9BqAd%2FhoOxoV7GDRPyXOdtSW%2BsZTZ0vEzOA1PKTIuRV5Adh%2BVodC3b7AQZrij7enzvTyjkrkNfwU25crRJzmjM5tunj%2FJPkXTXECznVcILCyuoQbFVTIldaoRx3voUZQHyAwXEdHexOF94%2BuvAELsIZdNFHDAd1EcFQwSQnhUFvzpjtQu7k3S2OnMv6x6BDUZjAGp3xUY7yOg2f%2BUHucMiapfP9B4NDA12UQxHmS5dHGrxaaJgX5ZBO8DTQFQ6d%2F0Yw2RN9JfxmdMSxE2Z2dSnBZ6um%2BhnQjxydtU1zUo3z%2Ben3emsaJHx3x%2Fx%2Fi7a6nxtSzpDNzgCIS%2FrWmj2DzgkV2MIzK%2BM0GOqUBvPyDdET8i0hxvq3dIF7NV7JaXnHhz1WJTaBV01gVVUCdyovoKCAkp94HOXOuF54P77LJPCoHxgHajOFmbilgAQYiJcQmD9fLBiPjCfRDREIXonxGE2cqU0IOpwVQjI4T%2BcI55XWSHjFjVtOf2M8evwxrsuSACT367%2F9e95jF7w3Ywi5GAw5Ndw8p%2BfZAM3NtsF4IGdfOFk1tMDoHqpDHg3Qe2kDq&X-Amz-Signature=0d45fea7bc0b724b42efd74cc0921e5d7a91be6e51f64291545f32e4b90ea864&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4G6623N%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIFvwOtMRe4yeS56sZhpZW0wAoKPUJTW5Jtz57UJxKUCnAiEAg%2Bi%2Bk5xg3fg6ZnVyu1ggKPSP36Gy8daJnob7Q2w%2BXw4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDJAoNwTCiHKRkTbLGircAzmvEEqVNDN9iPcytKuONQduJUeQdd3CycQrOVzjZ%2FCkGzo9Ezc0j3TQ3vL9iBOMusf%2FWaSj5Q%2BlkAdpaShkmjjfGYsizK7mcZiclpND%2Fo%2FAP8uSTkxkBjM2sXB26u1xBo%2FWDHHkXLCzAkfz0fdE1EUrA6Q8M1N0PcCRRj57ehXc%2FFgB1HpjQZRL1kvZz6Zdu0BlxLpRf01yDQpZGFmjdYfTTvMqEMTBq4UYo%2FWOOZizkRkiKDneIelP%2B2CxsknvviqOvz5sP8UFN0%2F2%2FWIiidARNLyvsduBWHbVakMHyz4v72pe2TQGpv53pH9bc6tlXKcIvButJoIcczGZGGXij84O%2FaYabWmXCb2wKN9urEO8z78xor0C%2Bsr%2BJIir4880MpcQIloIUJZaYfx5w9%2FPfyxP3c73GN8%2FrDNeKNk3oXZRrdbwErgthjlBPzFUtCCxYz7yUOnk%2FsczGJ0koUze1WNdt5ERCjRkiv0w7RNEvUIQPqOxF8wUN%2BXXIpbmuaYpG55FUp9hq0PT0cZN8MKNKYHNKbYUBo690XktfuvwbPGkizKVERY5xiSp099jLDrOvwhnwslFYI4vNptsP9sBXvoQ2wzlJkk%2Flf0%2FrnZ5RkTdEsbcmAdcPhVLQB%2BnMObI%2BM0GOqUBAFDesFScUXu3iX3wOhKex5Nqs%2BkttG4Ku9Tk7L%2FuZgZRq6tgyw%2BDFl6pBTHoBDYZMpw6xnpRItzSurTxNqQVP53kGbqJpJO8UqTXulHye90HVoXtFXsuCwsLMzeE4E%2FXdSKpWZOdRPEbS9zmmIEv3e3EDlydpGyHJQrdjoPijs3e0c8eYGa99Od3Vr7RZoCPg9OmFM7Giqpt3JswF5cyCZCJyv%2B8&X-Amz-Signature=3f0549cc55f804dcdd90b4e24e512347410672b0c31b07847b7064f14ec4fc94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4G6623N%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIFvwOtMRe4yeS56sZhpZW0wAoKPUJTW5Jtz57UJxKUCnAiEAg%2Bi%2Bk5xg3fg6ZnVyu1ggKPSP36Gy8daJnob7Q2w%2BXw4q%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDJAoNwTCiHKRkTbLGircAzmvEEqVNDN9iPcytKuONQduJUeQdd3CycQrOVzjZ%2FCkGzo9Ezc0j3TQ3vL9iBOMusf%2FWaSj5Q%2BlkAdpaShkmjjfGYsizK7mcZiclpND%2Fo%2FAP8uSTkxkBjM2sXB26u1xBo%2FWDHHkXLCzAkfz0fdE1EUrA6Q8M1N0PcCRRj57ehXc%2FFgB1HpjQZRL1kvZz6Zdu0BlxLpRf01yDQpZGFmjdYfTTvMqEMTBq4UYo%2FWOOZizkRkiKDneIelP%2B2CxsknvviqOvz5sP8UFN0%2F2%2FWIiidARNLyvsduBWHbVakMHyz4v72pe2TQGpv53pH9bc6tlXKcIvButJoIcczGZGGXij84O%2FaYabWmXCb2wKN9urEO8z78xor0C%2Bsr%2BJIir4880MpcQIloIUJZaYfx5w9%2FPfyxP3c73GN8%2FrDNeKNk3oXZRrdbwErgthjlBPzFUtCCxYz7yUOnk%2FsczGJ0koUze1WNdt5ERCjRkiv0w7RNEvUIQPqOxF8wUN%2BXXIpbmuaYpG55FUp9hq0PT0cZN8MKNKYHNKbYUBo690XktfuvwbPGkizKVERY5xiSp099jLDrOvwhnwslFYI4vNptsP9sBXvoQ2wzlJkk%2Flf0%2FrnZ5RkTdEsbcmAdcPhVLQB%2BnMObI%2BM0GOqUBAFDesFScUXu3iX3wOhKex5Nqs%2BkttG4Ku9Tk7L%2FuZgZRq6tgyw%2BDFl6pBTHoBDYZMpw6xnpRItzSurTxNqQVP53kGbqJpJO8UqTXulHye90HVoXtFXsuCwsLMzeE4E%2FXdSKpWZOdRPEbS9zmmIEv3e3EDlydpGyHJQrdjoPijs3e0c8eYGa99Od3Vr7RZoCPg9OmFM7Giqpt3JswF5cyCZCJyv%2B8&X-Amz-Signature=f50f4aab82f9c5d52084fe7faeea4e9c728e8c2a150d7a5d061c6f80acb4f5e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YRGWGR74%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIDVlPu3fRHYv4OFi6paexZIDP61z8S8VtS%2Bj5%2FRd%2BsL0AiASqD88ZXvDe1Kac7gwj9O1Gxefd%2Bgy7Fthis8fYQl0NCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMy4ECL7VevmLoMxqxKtwD%2F0Wmvec8ZLnuTL%2Bbl1wqVdh2tgOecgU3QJh1%2BMipu0EhKzVL3kNAaTS41HMPHHi5Ta7MtDq1ZsOGwHRRQABIn56oQPJAlDdApOT2jKIsT0%2FZJE90yklZFt32RVi7WOK5TBq%2FMTR%2B%2FQJgRHTlcebdTp0a6bbjq%2BVn7himooMCpeh63mWXHBHQEcXZ5hZSG2t6QclOnNCWC6i7rK3KyA75spUS229dxPYTeByxATb%2FPW3tJv9HcEnjKvtVyS0hioB12bdNs%2BgT53GxHBdOttNH4t2K0aBzjcaX3pIR6jBnqhG27QC5ggrAeBlmtLHTb%2B0NaH%2BaxRJGPt6fIVTr9hq%2BbWzeHghOjnQILZkpItycyL1Fl1paI8CVyWTgeHQ5wuB4VcnfmYS8W92hc871ExCddkJYV4IM9I48C3fgvMtxfqoQ1KXNdPzc3rXNJBi7V0BuwRbMmUfZftIvK2nuDKGP6netzcuWq%2BUQDVBfjz4SUoXPxSQ8lYSl6wuGdLoRJ40PNJ7BozlpO8v%2FdJTUwqNtFIL8jgBjjK93BhdHl4OBO9VZh6YF3a4bEuWD7EXVN3IzsFts9pVP19sEPDkAgkZ6Y%2BlKRDuhfeb3JSyGvyXKJXG0FM1nrhMKTMC%2FiY8wv8n4zQY6pgGFR3CBBbJugOOecqq1y194k8bNEwsEv4bFIV1TCS7%2B98Sm5P2FISEEYN%2BEzwbSPU7n9dMDYmPfecvSXs2niYZibVqoiRVHO47%2Bxiq2if2y7HUOv11wl7p6XIIdiHMjUOMxEHIY4rlfZJPPZ0WQJ%2B04KQ13qqt%2FA%2BZjDJ8zc%2FK2FmCP6fevZyNEgMlfDFTgoQTZPWuSST932SPTLztCvQPgQfgH6LB0&X-Amz-Signature=403402f1e65f82813fd18e2bb248548739f59b7730830de6e63aae8ad78a663b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2RAUEET%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCBa45wdvoSIK8tnYpTg6Gi8h80wXBQmk4zuOHs92uQpgIhAMSRFkIEt6OhGfcV3SefgPlp783xMcjMEdGDqFjd5BvBKv8DCEYQABoMNjM3NDIzMTgzODA1Igy8RDQVzjdSF%2B6i9QIq3APyKyDZeCSlE6G5YIP2TuAhrRYoduAuYlrzmT9B1C%2Bva2ogJ8Aw9Jf70IawLZABLQ3wRJQMGmiNsQZZ6EaToRI3tkntwlr6%2Fzr2VxvmSpacaPYjZvDxMQLCKlPqGVcjf7LE6NmurDJb8DXjTBSdq3PkE2LQIu2HQ16HAC8ovBr8teHlLu4gCVPF6%2F1YuFVB%2FaWonpr2el0g8U2InwswRmBnMHQjcx1naD7798ct3gJWLtY5gJaFEoa3bxCFS%2FwgaQTZBLCNEgPuMCKMHi3XLSYKXOvDENLWVPmFIFmKt6JWEePZ8otkooVfrkSRfXSGmA9Itnq3wfxPSGwPpKUZo36CIYWB2RqgqeGI0cJJKP1%2Fs%2B4LgIqIl1Vlw6jOR%2BjLmB9FUACYnXZwtGaPR1ufi3FMREMq5HgqAtwN53ncGZ9hA7kX7Eprg2ZxiDsebGijM0vEoNhDI7y9eho%2BXYgrrGFaCTNtdOSKzMuIWpenhIWAsP4wqkVp8qWLyNX2xyqd1nOCdyoKA8sI3DRxCvltb6w34mfWqSNmnRdE%2BOVmiKaj5dzmGpaeQQjPESpYuQJSaoZTh%2FPcKubAhgURHt7zFQtdlrPwKtQMT12n%2FSm1SS0Q1D2rmU1C%2FKOTvhh%2BJjCmyfjNBjqkAdwewKwN3AEXcbQCidr%2F8DwVq6P%2Fxd04gskttbycITIASCEbg0uqGr590no93JMZKcSRRV88PtTJMrVZUvJEWp8UkjM%2FGfmwFZFpHCkN1GXTASSN%2BO%2BK1%2F%2BjbIdgpRFP0QieT6EgGgPSQKHGylJ9SsfjUOxU36uk65IsedhYy6F4DPytZaVnHYJxqq%2Fo1mBcpi0QIngs3WGXp35B51760HatGp0f&X-Amz-Signature=e073b073db1c479e0d2f6bb6ef4713f6bbe1f81a5c054195cb3c9eccfcc455fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S2RAUEET%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCBa45wdvoSIK8tnYpTg6Gi8h80wXBQmk4zuOHs92uQpgIhAMSRFkIEt6OhGfcV3SefgPlp783xMcjMEdGDqFjd5BvBKv8DCEYQABoMNjM3NDIzMTgzODA1Igy8RDQVzjdSF%2B6i9QIq3APyKyDZeCSlE6G5YIP2TuAhrRYoduAuYlrzmT9B1C%2Bva2ogJ8Aw9Jf70IawLZABLQ3wRJQMGmiNsQZZ6EaToRI3tkntwlr6%2Fzr2VxvmSpacaPYjZvDxMQLCKlPqGVcjf7LE6NmurDJb8DXjTBSdq3PkE2LQIu2HQ16HAC8ovBr8teHlLu4gCVPF6%2F1YuFVB%2FaWonpr2el0g8U2InwswRmBnMHQjcx1naD7798ct3gJWLtY5gJaFEoa3bxCFS%2FwgaQTZBLCNEgPuMCKMHi3XLSYKXOvDENLWVPmFIFmKt6JWEePZ8otkooVfrkSRfXSGmA9Itnq3wfxPSGwPpKUZo36CIYWB2RqgqeGI0cJJKP1%2Fs%2B4LgIqIl1Vlw6jOR%2BjLmB9FUACYnXZwtGaPR1ufi3FMREMq5HgqAtwN53ncGZ9hA7kX7Eprg2ZxiDsebGijM0vEoNhDI7y9eho%2BXYgrrGFaCTNtdOSKzMuIWpenhIWAsP4wqkVp8qWLyNX2xyqd1nOCdyoKA8sI3DRxCvltb6w34mfWqSNmnRdE%2BOVmiKaj5dzmGpaeQQjPESpYuQJSaoZTh%2FPcKubAhgURHt7zFQtdlrPwKtQMT12n%2FSm1SS0Q1D2rmU1C%2FKOTvhh%2BJjCmyfjNBjqkAdwewKwN3AEXcbQCidr%2F8DwVq6P%2Fxd04gskttbycITIASCEbg0uqGr590no93JMZKcSRRV88PtTJMrVZUvJEWp8UkjM%2FGfmwFZFpHCkN1GXTASSN%2BO%2BK1%2F%2BjbIdgpRFP0QieT6EgGgPSQKHGylJ9SsfjUOxU36uk65IsedhYy6F4DPytZaVnHYJxqq%2Fo1mBcpi0QIngs3WGXp35B51760HatGp0f&X-Amz-Signature=e073b073db1c479e0d2f6bb6ef4713f6bbe1f81a5c054195cb3c9eccfcc455fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WACMD464%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T045905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQDf58mhN7rEihIbtEBQQD69lLmUJTUQ3KevxOvV5CSeIwIgFLEC8q%2FsDDKsSelQcTyLoTlAL2BiwTieN2%2FLB%2F7lQLEq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDIp1IaRl9ci0s3VRjircAx0A0sYqU2iobyPFMCUqraHW%2BtpTBaWd0N2SRYzMeecvuukKmXykP45ajZzNoCPPUHYeQxXVSR4klcgVIill9nPOvT5Oh111GCb%2FmHsGYXZs0MWS%2BQ3YgpFyJvQZmQefE9hBVmywKnuKUw1jnWiCHAhdqwGgGB2SAlb06UdONhmi0E0dnbALmyWw7SJJZMkIDpBcbKjZE8GckUwwd6rxDopYFHhpEob%2BiZwARf06ltaT77x16hvYy%2FR12S%2BWTVtdf5n%2Bny5tTW%2FpPXbBN%2BjIruw%2FZNMUUiXpO4rwSNwTRMECz%2B31V%2F41gu3phm9hWOAuoEtAlzC3WrUYe6j93Hj1ygiQRRj3V%2Feqqk2xlPvace7t%2Bdo0zeIbX5RIRnd%2BmVk0KTLF7i%2FZO%2BXXeDK7QSAhr4%2FlkBpxXnGlQvkVkBy2yFvmKZxP%2FYEW3q%2FMxhHZgUjlGNsKaZKqcxb15ThwQdsbIddKJWsVBjurKsl9v%2B5C0HTC866nuMrue3yMQ1W5QuvdhJkj6Nx9nAwe0lZ0bWYfvYSEbtQ71XjsbmBbvi7RAvshNj8nJDL2CSQfjjS%2BK0HxWBFtxAejEMoHDDqU3Xoq5PGKCwE3D%2BhFAArDGjjLPbsx1a7%2FTUMRiPiRaaBjMOPI%2BM0GOqUB4m7SurNdqd8AValpGpUg%2FguZBaaXXD8q8SKmJUelFBROfKhw9H0Az9XTLrW5xZIt1iqXeJGocuKhe1xVgJZbPeZ50jNTsF8KBwHK%2F4ITmYJNwJtcMsJfX8E822YyfSYsrMI%2F0d96zcBbdDP7jsv%2FVzonRRDMZG8JJqelpID5b08XAo6XAYU%2FDWxBzicUm2WwKeKG9CGXPb5%2BKlcPDSb4H%2B9iOcUg&X-Amz-Signature=4acde3b565a282c7a2ed91b865ef8c32c90e5fdb3572921e01988db3d3a1e612&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

